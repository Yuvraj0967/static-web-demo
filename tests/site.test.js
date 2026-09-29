const fs = require("fs");
const path = require("path");

console.log("Running website build tests...");

const srcDir = path.join(__dirname, "..", "src");
const htmlPath = path.join(srcDir, "index.html");
const cssPath = path.join(srcDir, "style.css");

function fail(message) {
  console.error("[FAILED] " + message);
  process.exit(1);
}

if (!fs.existsSync(htmlPath)) fail("src/index.html is missing");
if (!fs.existsSync(cssPath)) fail("src/style.css is missing");

const html = fs.readFileSync(htmlPath, "utf8");

if (!/<!DOCTYPE html>/i.test(html)) fail("Missing <!DOCTYPE html>");
if (!/<html[^>]*>/i.test(html)) fail("Missing <html> tag");
if (!/<title>[^<]+<\/title>/i.test(html)) fail("Missing or empty <title>");
if (!/<body[^>]*>/i.test(html)) fail("Missing <body> tag");
if (!/<link[^>]+href=["']style\.css["']/i.test(html)) {
  fail("index.html does not link to style.css");
}

console.log("[PASSED] All website static checks passed successfully!");
