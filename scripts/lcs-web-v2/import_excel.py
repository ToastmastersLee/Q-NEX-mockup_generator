"""Read the vendor XLSX using the Python standard library. Never writes the XLSX.

Usage: python scripts/lcs-web-v2/import_excel.py path/to/vendor.xlsx
The committed catalog and mappings make normal npm builds independent of Python.
"""
import argparse
import hashlib
import json
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
from xml.etree import ElementTree as ET
from zipfile import ZipFile

ROOT = Path(__file__).resolve().parents[2]
DOCS = ROOT / 'docs/lcs-web-v2'
NS = {'s': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}


def read_entries(path):
    with ZipFile(path) as archive:
        strings = []
        if 'xl/sharedStrings.xml' in archive.namelist():
            for item in ET.fromstring(archive.read('xl/sharedStrings.xml')):
                strings.append(''.join(item.itertext()))
        sheet = ET.fromstring(archive.read('xl/worksheets/sheet1.xml'))
        entries, group = {}, ''
        for row in sheet.findall('s:sheetData/s:row', NS):
            values = {}
            for cell in row:
                column = ''.join(c for c in cell.attrib['r'] if c.isalpha())
                node = cell.find('s:v', NS)
                text = node.text if node is not None else ''
                if cell.attrib.get('t') == 's':
                    text = strings[int(text)]
                elif cell.attrib.get('t') == 'inlineStr':
                    text = ''.join(cell.find('s:is', NS).itertext())
                values[column] = text or ''
            key = values.get('B', '')
            if not values.get('A', '').isdigit() or not key:
                if values.get('A', '') and row.attrib['r'] not in ('1', '2'):
                    group = values['A']
                continue
            if key in entries:
                raise ValueError(f'Duplicate factory key: {key}')
            new, note = values.get('E', ''), values.get('F', '')
            entries[key] = {
                'row': int(row.attrib['r']), 'group': group,
                'zh': values.get('C', ''), 'en': new or values.get('D', ''),
                'original': values.get('D', ''), 'note': note,
                'status': 'changed' if new else 'pending' if note else 'retained',
            }
    return entries


def write_json(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('workbook', type=Path)
    args = parser.parse_args()
    entries = read_entries(args.workbook)
    # Split namespaces to keep catalogs readable. Internal notes are never imported by the app.
    grouped = {}
    for key, entry in entries.items():
        parts = key.split('.')
        namespace = '.'.join(parts[:2]) if parts[0] == 'project' else parts[0]
        grouped.setdefault(namespace, {})[key] = entry
    for namespace, data in grouped.items():
        write_json(DOCS / 'catalog' / f'{namespace}.json', data)
    write_json(DOCS / 'source.json', {
        'file': args.workbook.name,
        'sha256': hashlib.sha256(args.workbook.read_bytes()).hexdigest(),
        'importedAt': datetime.now(timezone.utc).isoformat(),
        'entries': len(entries), 'counts': dict(Counter(e['status'] for e in entries.values())),
        'namespaces': sorted(grouped),
    })
    print(json.dumps({'entries': len(entries), 'counts': dict(Counter(e['status'] for e in entries.values()))}))


if __name__ == '__main__':
    main()
