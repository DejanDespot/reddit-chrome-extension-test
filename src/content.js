/* global chrome */

console.log("This is the content.js script running!");

// eslint-disable-next-line
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "requestInnerText") {
    let words = document.body.innerText;
    sendResponse(words);
  }
});

function main() {
  console.log("This is the main function in content.js");
}
