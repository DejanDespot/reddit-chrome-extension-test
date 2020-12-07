console.log("Background is runningggg");

let persistentURL = "";
let articles = [];

chrome.runtime.onMessage.addListener(request => {
  console.log("REQ", request);
  if (request.type === "persistUrl") {
    if (request.data !== persistentURL) {
      persistentURL = request.data;
      console.log("url", persistentURL);
    }
  }
});

chrome.runtime.onMessage.addListener(request => {
  console.log("REQ", request);
  if (request.type === "persistArticles") {
    articles = request.data;
  }
});
