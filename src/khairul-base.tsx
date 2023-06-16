import React from "react";
import ReactDOM from "react-dom";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import App from "./root.component";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return <span>{err.message}</span>;
  },
});

export const { bootstrap, unmount } = lifecycles;
const rootElement = document.getElementById(
  `${process.env.MFE_APP_TARGET_ROOT}`
);
function MountComponent() {
  return Promise.resolve().then(() => {
    if (rootElement) {
      const root = ReactDOMClient.createRoot(rootElement);
      root.render(<App />);
    }
  });
}
export const mount = rootElement ? MountComponent : lifecycles.mount;
