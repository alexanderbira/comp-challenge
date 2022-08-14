import React from "react";

import Plotly from "plotly.js/dist/plotly";
import * as d3 from "d3";

import extensionStyles from "./Extension.module.css";

export default function Extension() {
  const [varToPlot, setVarToPlot] = React.useState("P");

  const axesLabels = {
    P: "Pressure (hPa)",
    T: "Temperature (C)",
    L: "Lapse rate (ºK/m)",
    Tboil: "Boiling Point (ºC)",
    Tdew: "Dew Point (ºC)",
  };

  const T0 = 15;
  const Tstar = 100;
  const P0 = 1013.25;
  const Pstar = P0;
  const Md = 0.02896;
  const Mv = 0.01802;
  const R = 8.314;
  const g = 9.8076;
  const deltaHv = 2_501_000;
  const cpd = 1003.5;
  const Rsd = 287;
  const Rsw = 461.5;
  const a = 17.625;
  const b = 243.04;
  const deltaH = 45.07 * 1000;

  let zData = [];

  React.useEffect(() => {
    zData = [];

    for (let U = 0; U <= 1; U += 0.01) {
      //T by default in celsius
      const pressures = [];

      const deltah = 100;
      let L;
      let T = T0;
      let P = P0;
      for (let h = deltah; h <= 11000; h += deltah) {
        const Es = 6.1121 * Math.exp((18.678 - T / 234.5) * (T / (T + 257.14)));

        const r = (Rsd / Rsw) * ((U * Es) / (P - U * Es));

        L =
          g *
          ((1 + (r * deltaHv) / (Rsd * (T + 273))) /
            (cpd + (deltaHv ** 2 * r) / (Rsw * (T + 273) ** 2)));

        const deltaP =
          -((Md * g) / (R * (T + 273))) *
          (P - U * (1 - Mv / Md) * Es * T) *
          deltah;

        P += deltaP;

        const Tboil =
          1 / (1 / (Tstar + 273) - (R / deltaH) * Math.log(P / Pstar)) - 273;

        const Tdew =
          (b * (Math.log(U) + (a * T) / (b + T))) /
          (a - Math.log(U) - (a * T) / (b + T));

        T -= L * deltah;

        switch (varToPlot) {
          case "P":
            pressures.push(P);
            break;
          case "T":
            pressures.push(T);
            break;
          case "L":
            pressures.push(L * 1000);
            break;
          case "Tboil":
            pressures.push(Tboil);
            break;
          case "Tdew":
            pressures.push(Tdew);
            break;
          default:
            pressures.push(P);
            break;
        }
      }
      zData.push(pressures);
    }
  }, [varToPlot]);

  React.useEffect(() => {
    const x = Array(zData.length)
      .fill(0)
      .map((_, i) => i * 0.01);

    const y = Array(zData[0].length)
      .fill(0)
      .map((_, i) => i * 100);

    // fill in 'text' array for hover
    var text = x.map((xi, i) =>
      y.map(
        (yi, j) =>
          `Relative Humidity: ${d3.format(".2f")(xi)}<br>Altitude (m): ${yi}<br>${
            axesLabels[varToPlot]
          }: ${d3.format(".4f")(zData[i][j])}`
      )
    );

    const data = [
      {
        z: zData,
        x: y,
        y: x,
        type: "surface",
        text: text,
        hoverinfo: "text",
        showlegend: false,
      },
    ];

    const layout = {
      title: `${axesLabels[varToPlot]} against Altitude and Relative Humidity`,
      font: {
        size: 9,
      },
      autosize: true,
      width: 400,
      height: 400,
      margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 100,
        pad: 0,
      },
      scene: {
        yaxis: {
          title: "Relative Humidity",
          titlefont: {
            size: 10,
            color: "#7f7f7f",
          },
        },
        xaxis: {
          title: "Altitude (m)",
          titlefont: {
            size: 10,
            color: "#7f7f7f",
          },
        },
        zaxis: {
          title: axesLabels[varToPlot],
          titlefont: {
            size: 10,
            color: "#7f7f7f",
          },
        },
      },
    };
    Plotly.newPlot("myDiv", data, layout);
  }, [varToPlot]);

  return (
    <main>
      <h1>Extension - 3D Graph</h1>
      <p>
        As the different variables being calculated in task 3 (pressure,
        temperature...) are affected by both relative humidity and altitude, I
        thought a 3d surface would be a nice way visualisation.
      </p>
      <p>
        The graph is interactive - you can rotate it by dragging with the cursor
        and resize it by scrolling. You can also change the variable to plot
        with the dropdown menu below.
      </p>

      <select
        value={varToPlot}
        onChangeCapture={(e) => setVarToPlot(e.target.value)}
      >
        <option value="P">Pressure</option>
        <option value="T">Temperature</option>
        <option value="L">Lapse Rate</option>
        <option value="Tboil">Boiling Point</option>
        <option value="Tdew">Dew Point</option>
      </select>

      <div id="myDiv" style={{marginBottom: "3rem"}}></div>
    </main>
  );
}
