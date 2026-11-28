const runningDog = '<path d="m10 16 4-5 6 1 3-3 2 1-1 3 4 1v2l-4 1-3 3-5-1-3 4h-3l3-5-3-1-3 3H4l4-5z"/>';
const dogFace =
  '<path d="M10 12 7 8l1-3 5 3a8 8 0 0 1 6 0l5-3 1 3-3 4 1 4a7 7 0 0 1-14 0z"/><path fill="var(--kennel-icon-detail,#eef0e1)" d="M12 13a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 1 0 0-2.4m8 0a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 1 0 0-2.4m-6 4h4l-2 2z"/>';
const icons = {
  speed:
    runningDog +
    '<path d="M3 10h7M1 14h6M2 24h5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  agility:
    '<g transform="translate(2,-3) scale(.86)">' +
    runningDog +
    '</g><path d="M27 19c1 5-4 9-11 9s-12-3-12-6c0-1 1-2 3-3m9 5-4 4 4 3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  influence:
    '<g transform="translate(4,4) scale(.75)">' +
    dogFace +
    '</g><path d="M5 9a10 10 0 0 0 0 14m22-14a10 10 0 0 1 0 14M2 6a15 15 0 0 0 0 20M30 6a15 15 0 0 1 0 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
  bark: '<path d="M4 24v-7l3-5-1-5 5 3 5-1 3 4 5 1v3l-6 1 4 3-3 2-5-2-3 6H5z"/><circle cx="15.5" cy="13.5" r="1" fill="var(--kennel-icon-detail,#eef0e1)"/><path d="m24 11 4-4m-1 8 4-1m-4 5 4 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  paw: '<ellipse cx="7" cy="13" rx="3.2" ry="4.2" transform="rotate(-24 7 13)"/><ellipse cx="13" cy="8" rx="3.2" ry="4.4" transform="rotate(-8 13 8)"/><ellipse cx="20" cy="8" rx="3.2" ry="4.4" transform="rotate(8 20 8)"/><ellipse cx="26" cy="13" rx="3.2" ry="4.2" transform="rotate(24 26 13)"/><path d="M8 24c0-3 5-9 8-9s9 6 9 9c0 3-3 5-5 4l-4-1-4 1c-2 1-4-1-4-4z"/>',
  lock: '<path d="M9 14v-4a7 7 0 0 1 14 0v4h2v15H7V14zm3 0h8v-4a4 4 0 0 0-8 0zm3 5v6h2v-6z" fill-rule="evenodd"/>',
  add: '<path d="M14 5h4v9h9v4h-9v9h-4v-9H5v-4h9z"/>',
};

export function kennelIcon(doc, name, className = '') {
  if (name === 'bone') {
    const bone = doc.createElement('span');
    bone.className = `currency-bone ${className}`.trim();
    bone.setAttribute('aria-hidden', 'true');
    return bone;
  }
  const svg = doc.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 32 32');
  svg.setAttribute('class', className);
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('fill', 'currentColor');
  svg.innerHTML = icons[name];
  return svg;
}
