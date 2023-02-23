import glob from "glob";
import fs from "fs";

// use this comment syntax to include markdown partials between the include and end tags
// <!-- INCLUDE partials/section.md -->
// <!-- END -->

const includeRegex = /(\<\!\-\- INCLUDE (.*.md) -->)(.|\n)*(<!-- END -->)/g;
const warning = "<!-- WARNING: copied from the included markdown path. Do not edit directly. -->";

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_function_as_the_replacement
function replacer(_, includeTag, markdownFile, __, endTag) {
  const content = fs.readFileSync(markdownFile, 'utf8');
  const result = `${includeTag}\n${warning}\n${content}\n${warning}\n${endTag}`;
  return result;
}

function modifyFile(path) {
  let file = fs.readFileSync(path, 'utf8');
  file = file.replace(includeRegex, replacer);
  fs.writeFileSync(path, file);
}

glob("!(node_modules)/**/*.md", {}, (_, paths) => paths.forEach(modifyFile));
