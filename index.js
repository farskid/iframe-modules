const devPortalBridge = {
  getOrganization() {
    return "amir-testing-org";
  },
  getLocale() {
    return "en-US";
  },
  version: 1.5
};

const iframe = document.createElement("iframe");
iframe.height = "400px";
iframe.width = "400px";
document.body.append(iframe);

// iframe.contentDocument.onreadystatechange = () => {
//   console.log("Ready state changed");
//   if (iframe.contentDocument.readyState === "complete") {
//     console.log("Ready state complete");
//     iframe.document.DevPortal = devPortalBridge;
//   }
// };

// window.addEventListener("pushUrl", e => {
//   console.log(e.detail);
//   window.history.pushState(null, "", e.detail.url);
// });

function setIframe(src, name) {
  iframe.name = name;
  //   iframe.setAttribute("data-pushUrl", `${devPortalBridge.pushUrl}`);

  iframe.addEventListener("load", function() {
    // only access when loaded
    console.log("iframe load");
    // window.frames[name].DevPortal = devPortalBridge;
    // iframe.contentWindow["DevPortal"] = devPortalBridge;
    // iframe.contentWindow.postMessage("bridge", "*");
    // iframe.contentWindow.postMessage(JSON.stringify(devPortalBridge), src);
    // console.log("replacing DevPortal");
    // iframe.contentWindow.DevPortal = window.DevPortal;
    // iframe.contentWindow.addEventListener("");
    const originalHistory = iframe.contentWindow.history.pushState;
    iframe.contentWindow.history.pushState = function() {
      originalHistory.apply(history, arguments);
    };
    iframe.contentWindow.dispatchEvent(
      new CustomEvent("bridge_ready", { detail: devPortalBridge })
    );
  });
  //   iframeRef.document.onreadystatechange(() => {
  //     // only access when loaded
  //     if (iframeRef.document.readyState === "complete") {
  //       iframeRef.contentWindow["DevPortal"] = devPortalBridge;
  //     }
  //   });

  iframe.src = src;
  //   iframe.contentDocument.onreadystatechange = () => {
  //     console.log("Ready state changed");
  //     if (iframe.contentDocument.readyState === "complete") {
  //       console.log("Ready state complete");
  //       iframe.contentWindow.DevPortal = devPortalBridge;
  //     }
  //   };
}

// iframe.onloadend = () => {
//   const cWindow = iframe.contentWindow;
//   cWindow.DevPortal = devPortalBridge;
// };

document.getElementById("page-1").onclick = () => {
  setIframe("http://localhost:5000/apps/app1/build/index.html", "page1");
};
document.getElementById("page-2").onclick = () => {
  setIframe("http://localhost:5000/page2.html", "page2");
};

// setIframe(iframe, "./page1.html");
