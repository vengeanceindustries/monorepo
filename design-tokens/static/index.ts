import './styles.scss';

import allFontImports from '../utils/generator.fontImports';
import { scss, types } from '../utils/generator.values';

const banners = Object.keys(allFontImports);
const BANNER = banners[0];

// add stylesheet links
if (allFontImports?.[BANNER]) {
	const head = document.getElementsByTagName('head')[0];
	const fontsDiv = document.createElement('div');
	fontsDiv.innerHTML = allFontImports[BANNER];
	var arr = Array.prototype.slice.call(fontsDiv.childNodes);
	arr.forEach((node) => {
		head.appendChild(node);
	});
}

// add output for sanity-check
const app = document.getElementById('app');
app.className = BANNER;

function changeBanner(val: string) {
	app.className = val;
}

const select = `<select id="ChangeBanner">${banners
	.map((banner) => `<option value="${banner}">${banner}</option>`)
	.join('')}</select>`;

app.innerHTML = `
<h1>Design Tokens</h1>
${select}
<input placeholder="test input" />
<svg viewBox="0 0 24 24" height="24" width="24">
	<use xlink:href="#bookmark"></use>
</svg>
<pre>${scss}${types}</pre>
`;

const bannerSelect = document.getElementById('ChangeBanner');
bannerSelect.addEventListener('change', (event) => {
	if ('value' in event.target) {
		changeBanner(event.target['value']);
	}
});
