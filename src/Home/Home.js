import React from "react";

import homeStyles from "./Home.module.css";

export default function Home() {
  return (
    <main className={homeStyles.main}>
      <h1>Home</h1>
      <p>
        This is Alexander Biraben-Renard's submission for the BPhO Computational
        Challenge.
      </p>
      <p>
        Please use the navigation bar above to navigate to the different tasks.
      </p>

      <h2>About this website</h2>
      <p>
        This website was created using the JavaScript front-end framework React.
        It is a progressive web application, meaning that it is able to cache
        resources and is installable on certain browsers and devices.
      </p>
      <p>
        The graphs for the three tasks are generated using the{" "}
        <a href="https://d3js.org/" target="_blank" rel="noreferrer">
          D3 library
        </a>
        , embedded in a custom React component. The extension task uses{" "}
        <a
          href="https://plotly.com/javascript/"
          target="_blank"
          rel="noreferrer"
        >
          Plotly JS
        </a>
      </p>
      <p>
        The (messy) source code for this website is available on Github at <a href="https://github.com/alexanderbira/Comp-Challenge" target="_blank" rel="noreferrer">https://github.com/alexanderbira/Comp-Challenge</a>
      </p>

      <h2>Privacy</h2>
      <p>
        This website does not collect any data.
      </p>
    </main>
  );
}
