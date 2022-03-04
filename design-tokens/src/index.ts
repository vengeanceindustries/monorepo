import { scss, types } from '../utils/generator.values';

const app = document.getElementById('app');

app.innerHTML = `
<h1>Design Tokens</h1>
<pre>${scss}${types}</pre>`;
