import * as React from "react";
import { BridgeContext } from "./App";

export function DeepChild() {
  const bridge = React.useContext(BridgeContext);
  return (
    <button
      onClick={() => {
        bridge.pushUrl("/page1");
      }}
    >
      Click me to add <code>/page1</code> to parent url
    </button>
  );
}
