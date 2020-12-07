// components/Popup.js

import React, { useEffect, useState } from "react";
let Parser = require("../../node_modules/rss-parser/dist/rss-parser.min");
let parser = new Parser();

const Popup = () => {
  const [articles, setArticles] = useState([]);
  const persistUrl = url => {
    chrome.runtime.sendMessage({ type: "persistUrl", data: url });
  };

  const requireCurrentUrl = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, { type: "requestUrl" }, response => {
        persistUrl(response);
      });
    });
  };

  const persistArticles = articles => {
    chrome.runtime.sendMessage({ type: "persistArticles", data: articles });
  };

  const requestArticles = articles => {
    chrome.runtime.sendMessage({ type: "requestArticles" }, articles => {});
  };

  useEffect(() => {
    requireCurrentUrl();
    const test = async () => {
      let feed = await parser.parseURL("https://www.reddit.com/.rss");
      const { items } = feed;
      if (items) {
        persistArticles(items);
        setArticles(items);
      }
    };
    test();
  }, []);
  return (
    <div style={styles.main}>
      <h1>Chrome Ext - Popup</h1>
      <div>
        {articles.map(article => {
          return <div style={{ marginBottom: 4 }}>{article.title}</div>;
        })}
      </div>
    </div>
  );
};

const styles = {
  main: {
    width: "300px",
    height: "600px"
  }
};
export default Popup;
