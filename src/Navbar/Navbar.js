import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

import atmosphere from "../assets/atmosphere.png";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">
        <img src={atmosphere} alt="logo" />
        <span>A Standard Atmosphere</span>
      </Link>

      <div>
        <Link to="/task1">
          <span>Task 1</span>
        </Link>
        <Link to="/task2">
          <span>Task 2</span>
        </Link>
        <Link to="/task3">
          <span>Task 3</span>
        </Link>
        <Link to="/extension">
          <span>Extension</span>
        </Link>
      </div>
    </nav>
  );
}
