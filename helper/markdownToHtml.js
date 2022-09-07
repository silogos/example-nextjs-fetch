const md = require("markdown-it")();
const prism = require("markdown-it-prism");
md.use(prism);

export default function markdownToHtml(markdown) {
  return md.render(markdown);
}
