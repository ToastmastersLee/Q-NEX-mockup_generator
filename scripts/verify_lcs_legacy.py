"""Read-only audit of original LCS Web options against 2026-10-29 device evidence.

Uses React server rendering, not a browser or device connection. It validates
initial native selects and V2 preservation; browser interaction/layout remains
a separate manual CUA check. No dependency installation or baseline rewriting.
"""
from pathlib import Path
from html.parser import HTMLParser
import hashlib
import json
import shutil
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
AUDIT = ROOT / 'docs/lcs-web-audit'


class SelectParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.selects = []
        self.current = None
        self.option = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'select':
            self.current = {'disabled': 'disabled' in attrs, 'options': [], 'value': None}
        elif tag == 'option' and self.current is not None:
            self.option = {'label': '', 'selected': 'selected' in attrs, 'hidden': 'hidden' in attrs}

    def handle_data(self, data):
        if self.option is not None:
            self.option['label'] += data

    def handle_endtag(self, tag):
        if tag == 'option' and self.option is not None:
            if not self.option['hidden']:
                self.current['options'].append(self.option['label'])
            if self.option['selected']:
                self.current['value'] = self.option['label']
            self.option = None
        elif tag == 'select' and self.current is not None:
            self.selects.append(self.current)
            self.current = None


def main():
    failures = []
    checks = []

    def check(name, actual, expected):
        checks.append(name)
        if actual != expected:
            failures.append({'check': name, 'expected': expected, 'actual': actual})

    baseline = json.loads((AUDIT / 'v2-baseline.json').read_text(encoding='utf-8'))
    roots = ['src/mockups/lcs-web-v2', 'docs/lcs-web-v2', 'previews/lcs-web-v2', 'dist/lcs-web-v2']
    current_paths = {p.relative_to(ROOT).as_posix() for folder in roots for p in (ROOT / folder).rglob('*') if p.is_file()}
    current_paths.add('vite.lcs-web-v2.config.js')
    check('V2 file set', sorted(current_paths), sorted(baseline))
    for rel, digest in baseline.items():
        p = ROOT / rel
        check(f'V2 SHA256 {rel}', hashlib.sha256(p.read_bytes()).hexdigest() if p.is_file() else None, digest)

    node = shutil.which('node')
    if node is None:
        raise RuntimeError('Node is required; use the existing project runtime.')
    rendered = subprocess.run([node, 'scripts/render_lcs_legacy.mjs'], cwd=ROOT,
                              capture_output=True, encoding='utf-8', check=True)
    html = json.loads(rendered.stdout.lstrip('\ufeff'))
    pages = {}
    for name, markup in html.items():
        parser = SelectParser()
        parser.feed(markup)
        pages[name] = parser.selects

    evidence = json.loads((AUDIT / 'device-options.json').read_text(encoding='utf-8'))['pages']

    def field(page, index, source, key, *, disabled=False, value=None):
        label = f'{page}[{index}] {key}'
        select = pages[page][index]
        check(label + ' options/order/text', select['options'], evidence[source][key])
        check(label + ' disabled', select['disabled'], disabled)
        if value is not None:
            check(label + ' current', select['value'], value)

    check('Output select count', len(pages['Output']), 6)
    field('Output', 0, 'output', 'hdmi1Resolution', value='4K@30')
    field('Output', 1, 'output', 'hdmiContent', disabled=True, value='Compositing')
    field('Output', 2, 'output', 'hdmi2Resolution', value='1080P60')
    field('Output', 3, 'output', 'hdmiContent', disabled=True, value='Local Director')
    # Native select representation of the disabled real-device empty option list.
    check('UVC resolution display', pages['Output'][4], {'disabled': True, 'options': ['Self-adaption'], 'value': 'Self-adaption'})
    field('Output', 5, 'output', 'uvcContent', value='Film')
    field('OutputDisplay', 0, 'output', 'colorMatrix', value='BT601FULL_TO_BT601FULL')
    for i, (key, value) in enumerate(zip(['font', 'size', 'color', 'mode'], ['Arial', '12', 'Black', 'Fixed Mode'])):
        field('Subtitle', i, 'subtitle', key, value=value)
    for i, key in enumerate(['color', 'type']):
        field('OSD', i, 'osd', key)
    check('Record select count', len(pages['Record']), 42)
    for row in range(8):
        for col, key in enumerate(['format', 'filmResolution' if row == 0 else 'otherResolution', 'bitrate', 'filmFps' if row == 0 else 'otherFps', 'codec']):
            field('Record', row * 5 + col, 'record', key, disabled=row in [3, 4, 5, 6] and col in [1, 2, 3])
    field('Record', 40, 'record', 'segment', value='No segment')
    field('Record', 41, 'record', 'maximum', value='4hours')
    check('Live select count', len(pages['Live']), 36)
    for row in range(9):
        for col, key in enumerate(['protocol', 'resolution', 'bitrate', 'fps']):
            field('Live', row * 4 + col, 'live', key)
    check('Live Film1 current protocol', pages['Live'][0]['value'], 'RTMP Push')
    for i in [0, 2, 4]:
        field('Interaction', i, 'interaction', 'resolution')
    field('Interaction', 1, 'interaction', 'sources')
    field('Interaction', 3, 'interaction', 'callerSecondSources')
    field('Interaction', 5, 'interaction', 'sources')
    field('Interaction', 6, 'interaction', 'split')
    field('Interaction', 7, 'interaction', 'micCount')
    field('Interaction', 8, 'interaction', 'sipResolution')
    field('Interaction', 9, 'interaction', 'sources')
    for i, value in enumerate(['FUD', 'Computer', 'FUD', 'Teacher', 'FUD', 'Student', 'Nine Screens', '0', 'FUD', 'Film']):
        check(f'Interaction[{i}] current', pages['Interaction'][i]['value'], value)
    field('IP', 0, 'ip', 'type', value='Wired Network')
    timezones = json.loads((ROOT / 'src/mockups/lcs-web/device-timezones.json').read_text(encoding='utf-8'))
    check('System timezone count', len(timezones), evidence['system']['timezoneCount'])
    check('System timezone ordered render', pages['System'][0]['options'], timezones)
    for i, key in enumerate(['date', 'time', 'lock', 'languages'], start=1):
        field('System', i, 'system', key)
    for row in range(6):
        field('PTZ', row * 2, 'ptz', 'protocol', value='Visca')
        field('PTZ', row * 2 + 1, 'ptz', 'transport', value='UDP')
    field('Storage', 0, 'storage', 'path', value='Local Path')
    field('Platform', 0, 'platform', 'nat')
    field('Platform', 1, 'platform', 'transport')
    for row, key in enumerate(['keyboard', 'panel', 'clock', 'power']):
        field('Peripheral', row * 2, 'peripheral', key)
        field('Peripheral', row * 2 + 1, 'peripheral', 'port')
    field('PowerSupply', 0, 'power', 'mode', value='Normal Boot')
    field('Factory', 0, 'factory', 'style', value='Default')
    for row in range(2):
        for col, key in enumerate(['protocol', 'transport', 'address']):
            field('Tracker', row * 3 + col, 'tracker', key)
    field('Guiding Strategy', 0, 'guidingstrategy', 'source', value='Teacher')
    for row in range(8):
        field('Guiding Strategy', 1 + row * 2, 'guidingstrategy', 'priority', disabled=row in [4, 5])
        check(f'Guiding Strategy intermediate[{row}] options', pages['Guiding Strategy'][2 + row * 2]['options'], ['Default', *evidence['guidingstrategy']['source']])
        check(f'Guiding Strategy intermediate[{row}] disabled', pages['Guiding Strategy'][2 + row * 2]['disabled'], True)
    for i, key in [(1, 'teacherModel'), (2, 'port'), (3, 'transport'), (8, 'studentModel'), (9, 'port'), (10, 'transport'), (15, 'port'), (16, 'transport')]:
        field('TrackerDebug', i, 'trackerdebug', key)
    for i, key in [(4, 'address'), (5, 'baud'), (6, 'sensitivity'), (11, 'address'), (12, 'baud'), (13, 'sensitivity'), (17, 'address'), (18, 'baud')]:
        # Local placeholder is a display prompt, excluded from hardware enum.
        actual = pages['TrackerDebug'][i]['options'][1:]
        check(f'TrackerDebug[{i}] {key}', actual, evidence['trackerdebug'][key])

    result = {'passed': not failures, 'checks': len(checks), 'v2Files': len(baseline),
              'renderedPagesAndDialogs': len(pages), 'failures': failures,
              'limits': 'Initial English native selects only; no device, conditional UI, custom dropdown or visual equivalence assertion.'}
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0 if not failures else 1


if __name__ == '__main__':
    sys.exit(main())
