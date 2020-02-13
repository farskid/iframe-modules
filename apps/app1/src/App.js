import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { DeepChild } from "./DeepChild";

export const BridgeContext = React.createContext(undefined);

function App() {
  const [bridge, setBridge] = React.useState(undefined);
  React.useEffect(() => {
    const handleBridge = e => {
      setBridge(e.detail);
    };
    window.addEventListener("bridge_ready", handleBridge);
    return () => {
      window.removeEventListener("bridge_ready", handleBridge);
    };
  }, []);

  console.log("bridge is now available");

  return !bridge ? (
    <h1>Waiting for bridge... (intentional delay)</h1>
  ) : (
    <BridgeContext.Provider value={bridge}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h3>create react app</h3>
          <pre>initialized by bridge v{bridge.version}</pre>
          <DeepChild />
        </header>
      </div>
    </BridgeContext.Provider>
  );
}

export default App;
