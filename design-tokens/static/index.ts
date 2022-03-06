import { fontImports, scss, types } from '../utils/generator.values';

const head = document.getElementsByTagName('head')[0];
const app = document.getElementById('app');

const fontsDiv = document.createElement('div');
fontsDiv.innerHTML = fontImports;
var arr = Array.prototype.slice.call(fontsDiv.childNodes);
arr.forEach((node) => {
	head.appendChild(node);
});

app.innerHTML = `
<h1>Design Tokens</h1>
<pre>${scss}${types}</pre>`;
