import React from "react";
import LineGraph from "../LineGraph.js";

import task1Styles from "./Task1.module.css";

export default function Task1() {
  const lapseRateData = [
    [0, -6.5],
    [11, 0],
    [20, 1],
    [32, 2.8],
    [47, 0],
    [51, -2.8],
    [71, -2],
    [85, 0],
    [null, null],
  ];

  const data = [];
  let temperature = 0 + 15;

  for (let i = 0; i < lapseRateData.length - 1; i++) {
    data.push({
      altitude: lapseRateData[i][0],
      temperature,
    });

    temperature +=
      lapseRateData[i][1] * (lapseRateData[i + 1][0] - lapseRateData[i][0]);
  }

  const layersData = {
    troposphere: data.filter((d) => d.altitude <= 11),
    tropopause: data.filter((d) => d.altitude >= 11 && d.altitude <= 20),
    stratosphere: data.filter((d) => d.altitude >= 20 && d.altitude <= 47),
    stratopause: data.filter((d) => d.altitude >= 47 && d.altitude <= 51),
    mesosphere: data.filter((d) => d.altitude >= 51),
  };

  const layersColours = {
    troposphere: "red",
    tropopause: "orange",
    stratosphere: "green",
    stratopause: "blue",
    mesosphere: "purple",
  };

  return (
    <main>
      <h1>Task 1</h1>
      <p>
        This graph was generated using constant lapse rates for each layer of
        the atmosphere, shown at the bottom of the page.
      </p>
      <LineGraph
        data={layersData}
        margin={{ top: 30, right: 100, bottom: 60, left: 60 }}
        w={500}
        h={300}
        title={"Atmospheric Temperature vs Altitude"}
        colours={layersColours}
        xLabel={"Altitude (km)"}
        yLabel={"Temperature (°C)"}
      />
      <table className={task1Styles.tg}>
        <caption>
          <h2>Layers in the ISA Standard Atmosphere 1976</h2>
        </caption>
        <thead>
          <tr>
            <th className={task1Styles.tg}>Level</th>
            <th className={task1Styles.tg}>
              Base <i>h</i> (km)
            </th>
            <th className={task1Styles.tg}>
              Lapse rate <i>L</i> (K/km)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={task1Styles.tg}>Troposphere</td>
            <td className={task1Styles.tg}>0.0</td>
            <td className={task1Styles.tg}>-6.5</td>
          </tr>
          <tr>
            <td className={task1Styles.tg}>Tropopause</td>
            <td className={task1Styles.tg}>11.0</td>
            <td className={task1Styles.tg}>0.0</td>
          </tr>
          <tr>
            <td className={task1Styles.tg}>Stratosphere</td>
            <td className={task1Styles.tg}>20.0</td>
            <td className={task1Styles.tg}>1.0</td>
          </tr>
          <tr>
            <td className={task1Styles.tg}>Stratosphere</td>
            <td className={task1Styles.tg}>32.0</td>
            <td className={task1Styles.tg}>2.8</td>
          </tr>
          <tr>
            <td className={task1Styles.tg}>Stratopause</td>
            <td className={task1Styles.tg}>47.0</td>
            <td className={task1Styles.tg}>0.0</td>
          </tr>
          <tr>
            <td className={task1Styles.tg}>Mesosphere</td>
            <td className={task1Styles.tg}>51.0</td>
            <td className={task1Styles.tg}>-2.8</td>
          </tr>
          <tr>
            <td className={task1Styles.tg}>Mesosphere</td>
            <td className={task1Styles.tg}>71.0</td>
            <td className={task1Styles.tg}>-2.0</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
