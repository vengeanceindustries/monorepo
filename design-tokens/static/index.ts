import { scss, types } from '../utils/generator.values';
import allFontImports from '../utils/generator.fontImports';

const BANNER = 'FL';

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
app.innerHTML = `
<h1>Design Tokens</h1>
<svg viewBox="0 0 24 24" height="24" width="24">
	<use xlink:href="#bookmark"></use>
</svg>
<pre>${scss}${types}</pre>
`;
