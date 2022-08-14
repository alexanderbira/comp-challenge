import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import appStyles from "./App.module.css";
import atmosphere from "./assets/atmosphere.png";
import Navbar from "./Navbar/Navbar.js";

const Home = lazy(() => import("./Home/Home.js"));
const Task1 = lazy(() => import("./Task1/Task1.js"));
const Task2 = lazy(() => import("./Task2/Task2.js"));
const Task3 = lazy(() => import("./Task3/Task3.js"));
const Extension = lazy(() => import("./Extension/Extension.js"));

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexFlow: "column nowrap",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
          <Suspense
            fallback={
              <div className={appStyles.loadingDiv}>
                <h1>Loading...</h1>
                <img src={atmosphere} alt="logo" className={appStyles.appLogo} />
              </div>
            }
          >
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/task1" element={<Task1 />} />
              <Route path="/task2" element={<Task2 />} />
              <Route path="/task3" element={<Task3 />} />
              <Route path="/extension" element={<Extension />} />
              <Route
                path="*"
                element={
                  <div
                    style={{
                      width: "100vw",
                      display: "flex",
                      flexFlow: "column nowrap",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexFlow: "column nowrap",
                        justifyContent: "space-around",
                        alignItems: "center",
                        maxWidth: "min(90vw, 500px)",
                        marginTop: 100,
                      }}
                    >
                      <h1>Error 404: Page not found</h1>
                      <p>
                        The requested resource was not found. You might have
                        typed in the URL incorrectly, or the page you are
                        looking for no longer exists.
                      </p>
                    </div>
                  </div>
                }
              />
            </Routes>
          </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
