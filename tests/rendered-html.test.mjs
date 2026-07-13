import assert from "node:assert/strict";
import { access } from "node:fs/promises";
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

test("renders Dickson Lo's public software CV", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /盧駿軒 Dickson Lo/);
  assert.match(html, /資深產品經理/);
  assert.match(html, /AI Agent 產品開發工作流/);
  assert.match(html, /下載 PDF/);
  assert.match(html, /name="robots" content="noindex, nofollow"/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("ships the downloadable CV and social preview", async () => {
  await Promise.all([
    access(new URL("../public/dickson-lo-software-cv.pdf", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
  ]);
});
