import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return <div>err.message</div>;
  },
});

export const { bootstrap, unmount } = lifecycles;
const rootElement = document.getElementById(
  //@ts-ignore
  `${window.single_container_id}`
);
function MountComponent() {
  return Promise.resolve().then(() => {
    if (rootElement) {
      ReactDOM.render(<Root />, rootElement);
    }
  });
}
export const mount = rootElement ? MountComponent : lifecycles.mount;
