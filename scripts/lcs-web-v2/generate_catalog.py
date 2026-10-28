"""Generate runtime dictionaries from reviewed, explicit factory-key bindings.

Run after import_excel.py. No fuzzy matching occurs during generation.
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DOCS = ROOT / 'docs/lcs-web-v2'
APP = ROOT / 'src/mockups/lcs-web-v2/i18n'


def read(path):
    return json.loads(path.read_text(encoding='utf-8'))


def write(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


def assign(obj, path, value):
    parts = path.split('.')
    for part in parts[:-1]:
        obj = obj.setdefault(part, {})
    obj[parts[-1]] = value


def main():
    factory = {}
    for path in (DOCS / 'catalog').glob('*.json'):
        factory.update(read(path))
    coverage = {key: {'status': value['status'], 'controls': []} for key, value in factory.items()}
    counts = {'boundControls': 0, 'supplementaryControls': 0}
    # Validate the complete binding set before writing any runtime dictionary.
    for path in (DOCS / 'bindings').glob('*.json'):
        bindings = read(path)
        supplementary = read(DOCS / 'supplementary' / path.name)
        for key, factory_key in bindings.items():
            if factory_key not in factory:
                raise ValueError(f'Missing source: {path.stem}.{key} -> {factory_key}')
            if key in supplementary:
                raise ValueError(f'Duplicate source: {path.stem}.{key}')
        for key, text in supplementary.items():
            if not all(isinstance(text.get(field), str) and text[field] for field in ['en', 'zh', 'reason']):
                raise ValueError(f'Incomplete supplementary text: {path.stem}.{key}')
    for path in sorted((DOCS / 'bindings').glob('*.json')):
        namespace = path.stem
        bindings = read(path)
        supplementary = read(DOCS / 'supplementary' / path.name)
        dictionary = {'en': {}, 'zh': {}}
        for key, factory_key in bindings.items():
            source = factory[factory_key]
            for language in dictionary:
                assign(dictionary[language], key, source[language])
            coverage[factory_key]['controls'].append(f'{namespace}.{key}')
            counts['boundControls'] += 1
        for key, text in supplementary.items():
            if key in bindings:
                raise ValueError(f'Duplicate supplementary binding: {namespace}.{key}')
            if not text.get('reason'):
                raise ValueError(f'Missing supplementary reason: {namespace}.{key}')
            for language in dictionary:
                assign(dictionary[language], key, text[language])
            counts['supplementaryControls'] += 1
        target = APP / ('common.json' if namespace == 'common' else f'pages/{namespace}.json')
        write(target, dictionary)
    grouped = {}
    for key, entry in coverage.items():
        parts = key.split('.')
        namespace = '.'.join(parts[:2]) if parts[0] == 'project' else parts[0]
        grouped.setdefault(namespace, {})[key] = entry
    for namespace, entries in grouped.items():
        write(DOCS / 'coverage' / f'{namespace}.json', entries)
    write(DOCS / 'coverage.json', {
        'source': read(DOCS / 'source.json'), **counts,
        'representedFactoryKeys': sum(bool(v['controls']) for v in coverage.values()),
        'namespaces': sorted(grouped),
    })
    print(json.dumps({**counts, 'representedFactoryKeys': sum(bool(v['controls']) for v in coverage.values())}))


if __name__ == '__main__':
    main()
