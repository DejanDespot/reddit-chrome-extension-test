/* global chrome */

setTimeout(() => {
  console.log("This is the content.js script running!");

}, 5000)

// eslint-disable-next-line
chrome.runtime.onMessage.addEventListener((request, sender, callback) => {
  main();
});

function main() {
  console.log("This is the main function in content.js");
}

import React from 'react'

const domReaderContext = React.createContext({
  domQueryResult: []
})

//export default domReaderContext

// components/Foreground.js

// import React from "react";
// const Foreground = () => {
//   return (
//     <div style={styles.main}>
//       <h1>Chrome Ext - Foreground</h1>
//     </div>
//   );
// };
// const styles = {
//   main: {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     zIndex: "1000",
//     fontSize: "80px",
//     pointerEvents: "none",
//   },
// };
//
// export default Foreground;
