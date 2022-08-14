import React from "react";
import LineGraph from "../LineGraph.js";
import { MathComponent } from "mathjax-react";

export default function Task2() {
  const R = 8.314;
  const M = 0.02896;
  const g = 9.81;

  const T0 = 273 + 15;
  const P0 = 101_325;

  const lapseRateData = [
    [0, -6.5],
    [11, 0],
    [20, 1],
    [32, 2.8],
    [47, 0],
    [51, -2.8],
    [71, -2],
    [85, 0],
  ].map((i) => [i[0] * 1000, i[1] / 1000]); //convert to metres

  const isothermal = (p0, t0, h, h0) =>
    p0 * Math.E ** ((-(M * g) / (R * t0)) * (h - h0));

  const lapsed = (p0, l, h, h0, t0) =>
    p0 * (1 - (l * (h - h0)) / t0) ** ((M * g) / (l * R));

  const startTemps = [T0];
  const startPressures = [P0];

  const pressureAgainstAltitude = [];

  const interval = 1000; //metres, must be a factor of 1000
  const layerStarts = lapseRateData.map((i) => i[0]); //the starting altitude for each layer (m)
  for (let h = 0; h <= 85_000; h += interval) {
    //define the lapse rate index
    //only use the next lapse rate if h is greater than the starting altitude for that lapse rate
    const lapseRateIndex =
      layerStarts.findIndex((i) => h > i) === -1
        ? 0
        : layerStarts.findIndex((i) => h > i);
    const l = lapseRateData[lapseRateIndex][1];
    const h0 = lapseRateData[lapseRateIndex][0];
    const t0 = startTemps[lapseRateIndex];
    const p0 = startPressures[lapseRateIndex];

    //use the pressure-getting functions and append the next pressure-altitude point
    let pressure;
    if (l === 0) {
      pressure = isothermal(p0, t0, h, h0);
    } else {
      pressure = lapsed(p0, l, h, h0, t0);
    }
    pressureAgainstAltitude.push({
      altitude: h,
      pressure,
    });

    //if h is in layerStarts, add the current pressure as the next start pressure of layerStarts[index + 1]
    //T = t0 - L( h - h0 ) and add it to start temps, only do this if h is in layerStarts
    if (layerStarts.findIndex((i) => h > i) !== -1) {
      const t = t0 - l * (h - h0);
      startTemps.push(t);
      startPressures.push(pressure);
    }
  }

  const layersData = {
    troposphere: pressureAgainstAltitude.filter((d) => d.altitude <= 11000),
    tropopause: pressureAgainstAltitude.filter(
      (d) => d.altitude >= 11000 && d.altitude <= 20000
    ),
    stratosphere: pressureAgainstAltitude.filter(
      (d) => d.altitude >= 20000 && d.altitude <= 47000
    ),
    stratopause: pressureAgainstAltitude.filter(
      (d) => d.altitude >= 47000 && d.altitude <= 51000
    ),
    mesosphere: pressureAgainstAltitude.filter((d) => d.altitude >= 51000),
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
      <h1>Task 2</h1>
      <p>
        The graph below was created using an iterative method with a 1km
        interval. It was assumed that the atmosphere is an ideal gas, the air is
        dry, gravity is constant, and the lapse rate between layers of the
        atmosphere is constant.
      </p>
      <LineGraph
        data={layersData}
        margin={{ top: 30, right: 100, bottom: 60, left: 60 }}
        w={500}
        h={300}
        title={"Atmospheric Pressure vs Altitude"}
        colours={layersColours}
        xLabel={"Altitude (m)"}
        yLabel={"Pressure (Pa)"}
      />

      <h2 style={{ textAlign: "center" }}>Method</h2>
      <p>
        L ≠ 0:
        <br />
        <MathComponent
          tex={String.raw`P = P_0\Biggl(1-\frac{L(h-h_0)}{T_0}\Biggr)^{\frac{Mg}{LR}}`}
        />
      </p>
      <p>
        L = 0:
        <br />
        <MathComponent tex={String.raw`P = P_0e^{-\frac{Mg}{RT_0}(h-h_0)}`} />
      </p>
    </main>
  );
}
