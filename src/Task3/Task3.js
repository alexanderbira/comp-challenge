import React from "react";

import task3Styles from "./Task3.module.css";

import LineGraph from "../LineGraph.js";

export default function Task3() {
  const [U, setU] = React.useState(0);

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

  const pressureAgainstAltitude = [];
  const temperatureAgainstAltitude = [];
  const lapseRateAgainstAltitude = [];
  const boilingPointAgainstAltitude = [];
  const dewPointAgainstAltitude = [];

  //T by default in celsius
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
      -((Md * g) / (R * (T + 273))) * (P - U * (1 - Mv / Md) * Es * T) * deltah;

    P += deltaP;

    const Tboil =
      1 / (1 / (Tstar + 273) - (R / deltaH) * Math.log(P / Pstar)) - 273;

    const Tdew =
      (b * (Math.log(U) + (a * T) / (b + T))) /
      (a - Math.log(U) - (a * T) / (b + T));

    T -= L * deltah;

    pressureAgainstAltitude.push({
      altitude: h,
      pressure: P,
    });

    temperatureAgainstAltitude.push({
      altitude: h,
      temperature: T,
    });

    lapseRateAgainstAltitude.push({
      altitude: h,
      lapseRate: L * 1000,
    });

    boilingPointAgainstAltitude.push({
      altitude: h,
      boilingPoint: Tboil,
    });

    dewPointAgainstAltitude.push({
      altitude: h,
      dewPoint: Tdew,
    });
  }

  const pressureData = {
    troposphere: pressureAgainstAltitude,
  };

  const temperatureData = {
    troposphere: temperatureAgainstAltitude,
  };

  const lapseRateData = {
    troposphere: lapseRateAgainstAltitude,
  };

  const boilingPointData = {
    troposphere: boilingPointAgainstAltitude,
  };

  const dewPointData = {
    troposphere: dewPointAgainstAltitude,
  };

  const layersColours = {
    troposphere: "red",
  };

  return (
    <main>
      <h1>Task 3</h1>
      <p>
        These graphs were created using various models. As these models are only
        accurate up to about an altitude of 11km, their domain of altitudes has
        been restricted to the troposphere. The model predicts that the lapse
        rate tends to a positive constant, meaning that the temperature will
        infinitely and linearly decrease with altitude, decreasing below
        absolute zero.
      </p>
      <p>
        Use the slider at the bottom of the page to vary the relative humidity
        (U) and view its effects on the calculated variables in real-time.
      </p>
      <LineGraph
        data={pressureData}
        margin={{ top: 30, right: 100, bottom: 60, left: 60 }}
        w={700}
        h={200}
        title={"Atmospheric Pressure vs Altitude"}
        colours={layersColours}
        xLabel={"Altitude (m)"}
        yLabel={"Pressure (Pa)"}
        animated={false}
      />
      <LineGraph
        data={temperatureData}
        margin={{ top: 30, right: 100, bottom: 60, left: 60 }}
        w={700}
        h={200}
        title={"Atmospheric Temperature vs Altitude"}
        colours={layersColours}
        xLabel={"Altitude (m)"}
        yLabel={"Temperature (ºC)"}
        animated={false}
      />
      <LineGraph
        data={lapseRateData}
        margin={{ top: 30, right: 100, bottom: 60, left: 60 }}
        w={700}
        h={200}
        title={"Lapse Rate vs Altitude"}
        colours={layersColours}
        xLabel={"Altitude (m)"}
        yLabel={"Lapse Rate (ºK/km)"}
        animated={false}
      />
      <LineGraph
        data={boilingPointData}
        margin={{ top: 30, right: 100, bottom: 60, left: 60 }}
        w={700}
        h={200}
        title={"Boiling Point vs Altitude"}
        colours={layersColours}
        xLabel={"Altitude (m)"}
        yLabel={"Boiling Point (ºC)"}
        animated={false}
      />
      <LineGraph
        data={dewPointData}
        margin={{ top: 30, right: 100, bottom: 60, left: 60 }}
        w={700}
        h={200}
        title={"Dew Point vs Altitude"}
        colours={layersColours}
        xLabel={"Altitude (m)"}
        yLabel={"Dew Point (ºC)"}
        animated={false}
      />
      {/*slider to vary U*/}
      <div className={task3Styles.sliderContainer}>
        <label>Relative Humidity (U)</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.001"
          value={U}
          onChange={(e) => setU(e.target.value)}
          animated={false}
        />
        {U}
      </div>
    </main>
  );
}
