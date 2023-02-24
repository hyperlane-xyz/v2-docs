import glob from "glob";
import fs from "fs";

// use this comment syntax to include markdown partials between the include and end tags
// <!-- INCLUDE path-to-partial.md -->
// <!-- END -->

const includeRegex = /(\<\!\-\- INCLUDE (.*) -->)(.|\n)*?(<!-- END -->)/g;
const warning =
  "<!-- WARNING: copied from the included file path. Do not edit directly. -->";

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_function_as_the_replacement
function replacer(path) {
  return (_, includeTag, file, __, endTag) => {
    console.log(`${path} << ${file}`)
    const body = fs.readFileSync(file, "utf8");
    let content;
    if (file.endsWith(".md")) {
      content = body;
    } else if (file.endsWith(".sol")) {
      content = `\`\`\`solidity\n${body}\n\`\`\``;
    }
    return [includeTag, warning, content, warning, endTag].join("\n");
  };
}

function modifyFile(path) {
  let file = fs.readFileSync(path, "utf8");
  file = file.replace(includeRegex, replacer(path));
  fs.writeFileSync(path, file);
}

glob("**/*.md", {}, (_, paths) =>
  paths
    .filter((path) => !path.startsWith("node_modules"))
    .forEach((path) => modifyFile(path))
);
