import { chromium } from "playwright";

const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 1280, height: 1600 } });
await page.goto("http://127.0.0.1:8080/?pdf=1", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(2500);

await page.evaluate(() => {
  document.querySelectorAll(".no-print").forEach((el) => el.remove());
  document.querySelectorAll(".print-only").forEach((el) => {
    el.style.setProperty("display", "block", "important");
  });
  document.body.innerHTML = document.body.innerHTML;
});

await page.pdf({
  path: "/workspace/public/mn-pi-atlas.pdf",
  format: "A4",
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: "12mm", bottom: "14mm", left: "12mm", right: "12mm" },
});
await browser.close();
console.log("wrote public/mn-pi-atlas.pdf");
