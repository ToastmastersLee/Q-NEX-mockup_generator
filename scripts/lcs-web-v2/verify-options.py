"""Compare bilingual V2 rendered enums with original evidence and reviewed Excel.

Does not operate a browser or device. Intentional customer-version differences
are explicit below; conditional interaction and layout are verified separately.
"""
from pathlib import Path
from html.parser import HTMLParser
import json
import subprocess
import shutil

ROOT = Path(__file__).resolve().parents[2]
DOCS = ROOT / 'docs/lcs-web-v2'


class SelectParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.selects, self.current, self.option = [], None, None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'select':
            self.current = {'disabled': 'disabled' in attrs, 'options': [], 'value': None}
        elif tag == 'option' and self.current is not None:
            self.option = {'text': '', 'hidden': 'hidden' in attrs, 'selected': 'selected' in attrs}

    def handle_data(self, text):
        if self.option is not None:
            self.option['text'] += text

    def handle_endtag(self, tag):
        if tag == 'option' and self.option is not None:
            if not self.option['hidden']:
                self.current['options'].append(self.option['text'])
            if self.option['selected']:
                self.current['value'] = self.option['text']
            self.option = None
        elif tag == 'select':
            self.selects.append(self.current)
            self.current = None


def main():
    catalog = {}
    for path in (DOCS / 'catalog').glob('*.json'):
        catalog.update(json.loads(path.read_text(encoding='utf-8')))
    evidence = json.loads((ROOT / 'docs/lcs-web-audit/device-options.json').read_text(encoding='utf-8'))['pages']
    rendered = subprocess.run([shutil.which('node'), 'scripts/lcs-web-v2/render-options.mjs'],
                              cwd=ROOT, capture_output=True, encoding='utf-8', check=True)
    assert '[i18n missing]' not in rendered.stderr, rendered.stderr
    markup = json.loads(rendered.stdout)
    checks, failures = [], []

    def check(name, actual, expected):
        checks.append(name)
        if actual != expected:
            failures.append({'check': name, 'expected': expected, 'actual': actual})

    for lang, pages_html in markup.items():
        pages = {}
        for name, html in pages_html.items():
            parser = SelectParser()
            parser.feed(html)
            pages[name] = parser.selects

        def translate(raw, scope):
            if scope == 'peripheral' and raw == 'none':
                return 'None' if lang == 'en' else '无'
            if scope == 'trackerdebug' and raw == 'Custom':
                return 'Custom' if lang == 'en' else '自定义'
            if scope == 'guidingstrategy' and raw == 'Default':
                return catalog['project.guidingStrategy.default'][lang]
            # Explicit customer concepts differ from literal device English.
            overrides = {'power': {'Follow Screen': 'project.powerSupply.hdmiInputPowerOn'},
                         'factory': {'Default': 'project.factory.defaultStyle', 'Classic': 'project.factory.classicStyle'}}
            key = overrides.get(scope, {}).get(raw)
            if key and key in catalog:
                return catalog[key][lang]
            matches = [key for key, entry in catalog.items() if entry['original'] == raw]
            for prefix in [scope + '.', 'project.' + scope + '.', 'parameter.', 'subtitle.']:
                preferred = [key for key in matches if key.startswith(prefix)]
                if preferred:
                    matches = preferred
                    break
            if matches and len({catalog[key][lang] for key in matches}) == 1:
                return catalog[matches[0]][lang]
            return raw

        def field(page, index, scope, key, disabled=False, expected=None, skip=0):
            select = pages[page][index]
            expected = evidence[scope][key] if expected is None else expected
            expected = [translate(value, scope) for value in expected]
            check(f'{lang}/{page}/{index}/{key}/options', select['options'][skip:], expected)
            check(f'{lang}/{page}/{index}/disabled', select['disabled'], disabled)

        for index, key in [(0, 'hdmi1Resolution'), (1, 'hdmiContent'), (2, 'hdmi2Resolution'), (3, 'hdmiContent'), (5, 'uvcContent')]:
            field('Output', index, 'output', key, index in [1, 3])
        field('Output', 4, 'output', 'uvcResolution', True, ['Self-adaption'])
        field('OutputDisplay', 0, 'output', 'colorMatrix')
        # Kanit is an existing Excel-backed V2 font, retained intentionally.
        field('Subtitle', 0, 'subtitle', 'font', expected=[*evidence['subtitle']['font'], 'Kanit-Regular'])
        for i, key in enumerate(['size', 'color', 'mode'], 1):
            field('Subtitle', i, 'subtitle', key)
        for i, key in enumerate(['color', 'type']):
            field('OSD', i, 'osd', key)
        for row in range(8):
            for col, key in enumerate(['format', 'filmResolution' if row == 0 else 'otherResolution', 'bitrate', 'filmFps' if row == 0 else 'otherFps', 'codec']):
                field('Record', row * 5 + col, 'record', key, row in [3, 4, 5, 6] and col in [1, 2, 3])
        field('Record', 40, 'record', 'segment')
        field('Record', 41, 'record', 'maximum')
        for row in range(9):
            for col, key in enumerate(['protocol', 'resolution', 'bitrate', 'fps']):
                field('Live', row * 4 + col, 'live', key)
        for index, key in enumerate(['resolution', 'sources', 'resolution', 'callerSecondSources', 'resolution', 'sources', 'split', 'micCount', 'sipResolution', 'sources']):
            field('Interaction', index, 'interaction', key)
        field('IP', 0, 'ip', 'type')
        timezones = json.loads((ROOT / 'src/mockups/lcs-web/device-timezones.json').read_text(encoding='utf-8'))
        check(f'{lang}/System/timezones', pages['System'][0]['options'], timezones)
        for i, key in enumerate(['date', 'time', 'lock', 'languages'], 1):
            field('System', i, 'system', key)
        for row in range(6):
            field('PTZ', row * 2, 'ptz', 'protocol')
            field('PTZ', row * 2 + 1, 'ptz', 'transport')
        field('Storage', 0, 'storage', 'path')
        field('Platform', 0, 'platform', 'nat')
        field('Platform', 1, 'platform', 'transport')
        for row, key in enumerate(['keyboard', 'panel', 'clock', 'power']):
            field('Peripheral', row * 2, 'peripheral', key)
            field('Peripheral', row * 2 + 1, 'peripheral', 'port')
        field('PowerSupply', 0, 'power', 'mode')
        for row in range(2):
            for col, key in enumerate(['protocol', 'transport', 'address']):
                field('Tracker', row * 3 + col, 'tracker', key)
        allowed = [v for v in evidence['guidingstrategy']['source'] if v not in ['Board', 'Board2']]
        field('Guiding Strategy', 0, 'guidingstrategy', 'source', expected=allowed)
        for row in range(8):
            field('Guiding Strategy', row * 2 + 1, 'guidingstrategy', 'priority', row in [4, 5])
            field('Guiding Strategy', row * 2 + 2, 'guidingstrategy', 'source', True, ['Default', *allowed])
        for index, key in [(1, 'teacherModel'), (2, 'port'), (3, 'transport'), (8, 'studentModel'), (9, 'port'), (10, 'transport')]:
            field('TrackerDebug', index, 'trackerdebug', key)
        for index, key in [(4, 'address'), (5, 'baud'), (11, 'address'), (12, 'baud')]:
            field('TrackerDebug', index, 'trackerdebug', key, skip=1)
        for index in [6, 13]:
            expected = evidence['trackerdebug']['sensitivity'] if lang == 'en' else ['灵敏 2', '灵敏 1', '标准', '稳定 1', '稳定 2']
            check(f'{lang}/TrackerDebug/{index}/sensitivity', pages['TrackerDebug'][index]['options'][1:], expected)
        for page, selects in pages.items():
            for i, select in enumerate(selects):
                if not select['disabled'] and select['options']:
                    check(f'{lang}/{page}/{i}/valid-selected-label', select['value'] in select['options'], True)
    report = {'passed': not failures, 'checks': len(checks), 'languages': list(markup),
              'renderedPagesPerLanguage': len(markup['en']), 'failures': failures,
              'limits': 'Initial rendered options and disabled state; no device writes or claim that all firmware branches are covered.'}
    (DOCS / 'validation/option-parity.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return int(bool(failures))


if __name__ == '__main__':
    raise SystemExit(main())
