import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("redirects the public URL directly to the software CV", async () => {
  const response = await render();
  assert.equal(response.status, 307);
  assert.equal(response.headers.get("location"), "http://localhost/software-cv");
});

test("ships the downloadable CV and social preview", async () => {
  const cvUrl = new URL("../public/software-cv.html", import.meta.url);
  const cv = await readFile(cvUrl, "utf8");

  assert.match(cv, /Dickson Lo/);
  assert.match(cv, /Download PDF/);
  assert.match(cv, /dickson-cex-ai-landing-page/);
  await Promise.all([
    access(cvUrl),
    access(new URL("../public/dickson-lo-software-cv.pdf", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
  ]);
});

test("ships a Traditional Chinese CV at /zh/", async () => {
  const zhUrl = new URL("../public/zh/index.html", import.meta.url);
  const zh = await readFile(zhUrl, "utf8");

  assert.match(zh, /lang="zh-Hant"/);
  assert.match(zh, /軟體產品履歷/);
  assert.match(zh, /產品經理至產品部主管/);
  assert.doesNotMatch(zh, /產品經理至產品負責人/);
  assert.match(zh, /href="\.\.\/"[^>]*>English<\/a>/);
  assert.doesNotMatch(zh, /<a href="https:\/\/[^\"]+">/);
  await Promise.all([
    access(zhUrl),
    access(new URL("../public/zh/dickson-lo-software-cv.pdf", import.meta.url)),
  ]);
});
