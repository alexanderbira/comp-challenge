import React from "react";

import extensionStyles from "./Extension.module.css";

import LineGraph from "../LineGraph";
import { MathComponent } from "mathjax-react";

const planetData = {
  venus: {
    atmosphere: {
      CO2: 0.96,
      N2: 0.04,
    },
    g: 8.87,
    T0: 460,
    P0: 9_200_000,
  },
  mars: {
    atmosphere: {
      CO2: 0.95,
      N2: 0.027,
      Ar: 0.023,
    },
    g: 3.711,
    T0: -55,
    P0: 636,
  },
  custom: {
    atmosphere: {
      CO2: 0.95,
      N2: 0.027,
      Ar: 0.023,
    },
    g: 3.711,
    T0: -55,
    P0: 636,
  },
};

export default function Extension() {
  const [planet, setPlanet] = React.useState("mars");

  const SHCs = {
    CO2: 0.844,
    N2: 1.04,
    O2: 0.919,
    Ar: 0.52,
    H2: 14.32,
    He: 5.19,
  };

  const molarMass = {
    CO2: 44.01,
    N2: 28.01,
    O2: 31.99,
    Ar: 39.95,
    H2: 2.016,
    He: 4.003,
  };

  //params should add to 1, SHC of mixuture will be returned
  function getSHC({ CO2 = 0, N2 = 0, O2 = 0, Ar = 0, H2 = 0, He = 0 }) {
    return (
      SHCs["CO2"] * CO2 +
      SHCs["N2"] * N2 +
      SHCs["O2"] * O2 +
      SHCs["Ar"] * Ar +
      SHCs["H2"] * H2 +
      SHCs["He"] * He
    );
  }

  function getMolarMass({ CO2 = 0, N2 = 0, O2 = 0, Ar = 0, H2 = 0, He = 0 }) {
    return (
      molarMass["CO2"] * CO2 +
      molarMass["N2"] * N2 +
      molarMass["O2"] * O2 +
      molarMass["Ar"] * Ar +
      molarMass["H2"] * H2 +
      molarMass["He"] * He
    );
  }

  const [atmosphere, setAtmosphere] = React.useState(
    planetData["mars"].atmosphere
  );
  const [T0, setT0] = React.useState(planetData["mars"].T0);
  const [g, setG] = React.useState(planetData["mars"].g);
  const [P0, setP0] = React.useState(planetData["mars"].P0);

  React.useEffect(() => {
    if (planet === "custom") {
      setAtmosphere(planetData[planet].atmosphere);
    } else {
      setAtmosphere(planetData[planet].atmosphere);
    }
    setT0(planetData[planet].T0);
    setG(planetData[planet].g);
    setP0(planetData[planet].P0);
  }, [planet]);

  React.useEffect(() => {
    if (planet === "custom") {
      planetData.custom.atmosphere = atmosphere;
      planetData.custom.T0 = T0;
      planetData.custom.g = g;
      planetData.custom.P0 = P0;
    }
  }, [atmosphere, T0, g, P0, planet]);

  const R = 8.314;
  const Cp = getSHC(planetData[planet].atmosphere);
  const L = g / Cp; //km

  const lapsed = (h) =>
    P0 *
    (1 - (L * h) / (T0 + 273)) **
      ((getMolarMass(planetData[planet].atmosphere) * g) / (L * R));

  const pressureAgainstAltitude = [];
  const temperatureAgainstAltitude = [];

  const interval = 500; //metres
  let T = T0;
  let P = P0;
  for (let h = 0; h <= 20000; h += interval) {
    P = lapsed(h / 1000);
    T -= (L * interval) / 1000;

    pressureAgainstAltitude.push({
      altitude: h,
      pressure: P,
    });
    temperatureAgainstAltitude.push({
      altitude: h,
      temperature: T,
    });
  }

  function handleAtmosphereChange(e) {
    const { name, value } = e.target;
    setAtmosphere({ ...atmosphere, [name]: value });
  }

  return (
    <main>
      <h1>Extension - Planets</h1>
      <p>
        I thought it might be interesting to apply the methods I learned in the
        tasks to different planets. I only included mars and venus as they are
        the only non-earth rocky planets with a somewhat stable surface
        temperature.
      </p>
      <p>
        I've also added an option to create a planet with a custom atmospheric
        composition, gravitational acceleration, surface temperature, and
        surface pressure.
      </p>

      <div className={extensionStyles.planetSelect}>
        <select
          value={planet}
          onChangeCapture={(e) => setPlanet(e.target.value)}
        >
          <option value="venus">Venus</option>
          <option value="mars">Mars</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      {planet === "custom" && (
        <div className={extensionStyles.custom}>
          <h2>Design your own planet</h2>

          <table className={extensionStyles.table}>
            <tr>
              <td colSpan={2}>
                <b>Atmosphere composition (fractional):</b>
              </td>
            </tr>
            {Object.keys(SHCs).map((i) => (
              <tr>
                <td>
                  <label htmlFor={i}>{i}</label>
                </td>
                <td>
                  <input
                    type="text"
                    name={i}
                    id={i}
                    key={i}
                    value={atmosphere[i] || ""}
                    onChange={handleAtmosphereChange}
                  />
                </td>
              </tr>
            ))}
            <br />
            <tr>
              <td colSpan={2}>
                <b>Surface constants:</b>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="T0">
                  T<sub>0</sub> (ºC)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  name="T0"
                  id="T0"
                  value={T0}
                  onChange={(e) => setT0(Number(e.target.value))}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="g">
                  g (ms<sup>-2</sup>)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  name="g"
                  id="g"
                  value={g}
                  onChange={(e) => setG(Number(e.target.value))}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="P0">
                  P<sub>0</sub> (Pa)
                </label>
              </td>
              <td>
                <input
                  type="text"
                  name="P0"
                  id="P0"
                  value={P0}
                  onChange={(e) => setP0(Number(e.target.value))}
                />
              </td>
            </tr>
          </table>
        </div>
      )}

      <LineGraph
        data={pressureAgainstAltitude}
        margin={{ top: 30, right: 100, bottom: 60, left: 80 }}
        w={500}
        h={300}
        title={"Atmospheric Pressure vs Altitude"}
        animated={false}
        legend={false}
        xLabel={"Altitude (m)"}
        yLabel={"Pressure (Pa)"}
      />
      <LineGraph
        data={temperatureAgainstAltitude}
        margin={{ top: 30, right: 100, bottom: 60, left: 60 }}
        w={500}
        h={300}
        title={"Temperature vs Altitude"}
        animated={false}
        legend={false}
        xLabel={"Altitude (m)"}
        yLabel={"Temperature (ºC)"}
      />

      <section>
        <h2 style={{ textAlign: "center" }}>Method</h2>
        <p>
          <code>
            <i>
              C<sub>p</sub>
            </i>
          </code>{" "}
          is calculated using a weighted average of the SHCs at constant
          pressure of the atmosphere's component gasses.
        </p>
        <p>
          <code>
            <i>M</i>
          </code>{" "}
          is calculated using a weighted average of the molar masses of the
          atmosphere's component gasses.
        </p>
        <p>The adiabatic lapse rate is assumed to be constant and equal to:</p>
        <MathComponent tex={String.raw`L = \frac{g}{C_p}`} />
        <p>
          In each iteration, the altitude is increased by a constant amount, and
          the new pressure is calculated using:
        </p>
        <MathComponent
          tex={String.raw`P = P_0\Biggl(1-\frac{L(h-h_0)}{T_0}\Biggr)^{\frac{Mg}{LR}}`}
        />
      </section>
    </main>
  );
}
