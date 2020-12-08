// components/Popup.js

import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Link,
  CircularProgress
} from "@material-ui/core";
import ReplayIcon from "@material-ui/icons/Replay";
import Highlighter from "react-highlight-words";
const keywordExtractor = require("keyword-extractor");

import * as Parser from "../../node_modules/rss-parser/dist/rss-parser.min";
let parser = new Parser();

const redditLogo =
  "https://logodownload.org/wp-content/uploads/2018/02/reddit-logo-16.png";

const Popup = () => {
  const [isLoading, setLoading] = useState();
  const [articles, setArticles] = useState([]);
  const [commonKeywords, setKeywords] = useState([]);

  const requestInnerText = () => {
    setLoading(true);
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { type: "requestInnerText" },
        async response => {
          analyzeKeywords(response);
          await getRSSFeed();
        }
      );
    });
  };

  const analyzeKeywords = text => {
    const keywords = keywordExtractor.extract(text, {
      language: "english",
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: false
    });

    sortKeywords(keywords);
  };

  const sortKeywords = keywords => {
    let counter = {};
    keywords.forEach(function(word) {
      counter[word] = (counter[word] || 0) + 1;
    });

    const sortedKeywords = keywords.sort((x, y) => {
      return counter[y] - counter[x];
    });

    let uniqueKeywords = [];
    sortedKeywords.forEach(keyword => {
      if (!uniqueKeywords.includes(keyword)) {
        uniqueKeywords = [...uniqueKeywords, keyword];
      }
    });

    const mostCommonKeywords = uniqueKeywords.slice(0, 5);
    setKeywords(mostCommonKeywords);
  };

  const sortArticles = () => {
    let allArticles = [...articles];
    allArticles.forEach((article, articleIndex) => {
      commonKeywords.reverse().forEach((keyword, scoreIndex) => {
        if (article.title.toUpperCase().includes(keyword.toUpperCase())) {
          allArticles[articleIndex].score = scoreIndex + 1;
        }
      });
    });

    allArticles.sort((a, b) => Number(b.score) || 0 - Number(a.score) || 0);
    return allArticles;
  };

  const getRSSFeed = async () => {
    let feed = await parser.parseURL(
      "https://www.reddit.com/r/Coronavirus/.rss"
    );
    const { items } = feed;
    if (items) {
      setArticles(items);
      setLoading(false);
    } else {
      setArticles([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    requestInnerText();
  }, []);
  return (
    <div style={styles.main}>
      <div style={styles.header}>
        <div style={styles.logoSection}>
          <img src={redditLogo} alt="logo" style={styles.logo} />
          <Typography variant="h5" component="h5">
            Reddit RSS Reader
          </Typography>
        </div>
        <ReplayIcon onClick={requestInnerText} />
      </div>
      <div style={styles.container}>
        {isLoading ? (
          <div style={styles.loaderContainer}>
            <CircularProgress />
          </div>
        ) : (
          <>
            {articles.length ? (
              sortArticles().map(article => {
                return (
                  <Card style={styles.card}>
                    <CardContent>
                      <Typography
                        variant="p"
                        component="p"
                        style={styles.title}
                      >
                        <Highlighter
                          highlightStyle={styles.highlighted}
                          searchWords={commonKeywords}
                          autoEscape={true}
                          textToHighlight={article.title}
                        />
                      </Typography>
                      <Link
                        href={article.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Read more
                      </Link>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <Typography variant="p" component="p" style={styles.errorMessage}>
                Wow, such empty ! :(
              </Typography>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  main: {
    width: "300px",
    height: "600px"
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  logoSection: {
    display: "flex",
    alignItems: "center"
  },
  logo: {
    height: "30px",
    marginRight: "12px"
  },
  container: {
    height: "100%",
    paddingBottom: "30px",
    overflow: "scroll"
  },
  loaderContainer: {
    display: "flex",
    height: "80%",
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    margin: "8px 0"
  },
  title: {
    marginBottom: "12px"
  },
  highlighted: {
    background: "#00a3c7",
    color: "#ffffff",
    padding: "1px 4px"
  },
  errorMessage: {
    marginTop: "20px"
  }
};
export default Popup;
