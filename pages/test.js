import remark from "remark";
import gfm from "remark-gfm";
import reactRenderer from "remark-react";
import sanitizeGhSchema from "hast-util-sanitize/lib/github.json";

import CodeMirror from "codemirror";
import "codemirror/mode/meta";
import "codemirror/addon/runmode/runmode";
import "codemirror/mode/javascript/javascript";
import highlighter from "remark-react-codemirror";

const schema = Object.assign({}, githubSchema, {
  attributes: Object.assign({}, githubSchema.attributes, {
    code: [...(githubSchema.attributes.code || []), "className"],
  }),
});

remark()
  .use(gfm)
  .use(reactRenderer, {
    sanitize: schema,
    remarkReactComponents: {
      code: highlighter(CodeMirror, { theme: "solarized" }),
    },
  })
  .processSync(readme).result;