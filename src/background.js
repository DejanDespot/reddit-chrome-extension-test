/* global chrome */

console.log("Background is running");

function buttonClicked(tab) {
  console.log(tab);
  chrome.tabs.sendMessage(tab.id, { message: "load" });

  const api_url = "https://www.reddit.com/r/Coronavirus/.rss";

  // first attempt
  const getData = async () => {
    const response = await fetch(api_url);
    const data = await response.text();

    // console.log(data);

    let parser = new DOMParser();
    let xml = parser.parseFromString(data, "application/xml");

    console.log(xml);
  };

  getData();
}

chrome.browserAction.onClicked.addListener(buttonClicked);
