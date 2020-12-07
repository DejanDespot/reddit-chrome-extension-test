/* global chrome */

console.log("This is the content.js script running!");

// eslint-disable-next-line
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "requestUrl") {
    sendResponse(window.location.href);
  }
  //main();
});

function main() {
  console.log("This is the main function in content.js");
}
