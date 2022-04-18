import fs from "fs";

const args = process.argv.slice(2);
if (args.length === 0) {
  throw new Error("Expected path to JSON file");
}
const mdFilePath = args[0];

console.log("Reading markdown file");
const mdRaw = fs.readFileSync(mdFilePath, { encoding: "utf-8" });
const mdEncoded = encodeURI(mdRaw);

console.log(`
Encoded markdown file contents:
====================================
${mdEncoded}
====================================
`);
