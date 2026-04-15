// ==UserScript==
// @name         Bancrow
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Scrape course data from Banner
// @match        https://banregister.unf.edu/StudentRegistrationSsb/ssb/classSearch/classSearch*
// @grant        none
// ==/UserScript==

"use strict";
(() => {
  // src/index.ts
  GM_download({ url: "https://pastebin.com/raw/Pnw9rE2D", name: "txt.xt" });
  console.log("hi");
})();
