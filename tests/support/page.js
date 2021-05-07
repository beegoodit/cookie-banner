const fs = require("fs");
const { JSDOM } = require("jsdom");
const { ModuleFilenameHelpers } = require("webpack");

const html = fs.readFileSync("./index.html");
const page = new JSDOM(html);

module.exports = page;
