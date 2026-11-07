#!/usr/bin/env python3
"""Archive complete tracker rows and detail sections; dry-run unless --apply."""
import argparse
import re
from pathlib import Path


def close_items(active, archive, ids, date, reason):
    rows, details = [], []
    for issue in ids:
        row = re.search(r'^\| ' + re.escape(issue) + r' \|.*$', active, re.M)
        detail = re.search(r'^### ' + re.escape(issue) + r' — (.*?)(?=^### |^## |\Z)', active, re.M | re.S)
        if not row or not detail:
            raise ValueError(f'{issue}: missing unique active row or detail')
        if re.search(r'^\| (?:~~)?' + re.escape(issue) + r'(?:~~)? \|', archive, re.M):
            raise ValueError(f'{issue}: already archived')
        cells = [cell.strip() for cell in row[0].strip('|').split('|')]
        if len(cells) != 6:
            raise ValueError(f'{issue}: expected six overview cells')
        cells[4] = 'Done'
        rows.append('| ' + ' | '.join(f'~~{cell}~~' for cell in cells) + ' |')
        section = detail[0].rstrip()
        first, rest = section.split('\n', 1)
        title = first.split(' — ', 1)[1]
        section = f'### {issue} — ~~{title}~~\n' + rest
        section = re.sub(r'(\*\*Status:\*\*\s*)[A-Za-z ]+(?=[.;\n])', r'\1Done', section, count=1)
        section += f'\n\n**Closed:** {date}. {reason}\n'
        details.append(section)
        active = active.replace(row[0] + '\n', '', 1).replace(detail[0], '', 1)
    marker = '|---|---|---|---|---|---|'
    if marker not in archive:
        raise ValueError('Closed overview marker missing')
    archive = archive.replace(marker, marker + '\n' + '\n'.join(rows), 1)
    archive += '\n\n' + '\n\n'.join(details) + '\n'
    return active, archive


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('ids', nargs='+')
    parser.add_argument('--date', required=True)
    parser.add_argument('--reason', required=True)
    parser.add_argument('--root', type=Path, default=Path('.'))
    parser.add_argument('--apply', action='store_true')
    args = parser.parse_args()
    a, b = args.root/'docs/ISSUES.md', args.root/'docs/ISSUES_CLOSED.md'
    active, archive = close_items(a.read_text(), b.read_text(), args.ids, args.date, args.reason)
    if args.apply:
        a.write_text(active)
        b.write_text(archive)
    print(f'{"Archived" if args.apply else "Validated dry-run"}: {", ".join(args.ids)}')
