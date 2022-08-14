import * as d3 from "d3";
import React from "react";

/*
points:
[
  {
    "x": number
    "y": number
  },
]

data:
{
  "class": points,
  "class2": points,
}

colours:
{
    "class": colour,
    "class2": colour,
}
*/
export default function LineGraph(props) {
  const { data, margin, w, h, title, xLabel, yLabel, colours } = props;
  const animated = props.animated ?? true;
  const parentElement = React.useRef(null);

  const [ xName, yName ] = Object.keys(data[Object.keys(data)[0]][0]);

  React.useEffect(() => {
    parentElement.current.innerHTML = "";

    // set the dimensions and margins of the graph
    const width = w - margin.left - margin.right;
    const height = h - margin.top - margin.bottom;
    // append the svg object to the body of the page
    const svg = d3
      .select(parentElement.current)
      .append("svg")
      .attr(
        "viewBox",
        `0 0 ${width + margin.left + margin.right} ${
          height + margin.top + margin.bottom
        }`
      )
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Add X axis
    const dataX = Object.values(data)
      .flat()
      .map((i) => Object.values(i)[0]);
    const x = d3
      .scaleLinear()
      .domain([Math.min(...dataX), Math.max(...dataX)])
      .range([0, width]);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // Add Y axis
    const dataY = Object.values(data)
      .flat()
      .map((i) => Object.values(i)[1]);
    const y = d3
      .scaleLinear()
      .domain([Math.min(...dataY), Math.max(...dataY)])
      .range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // add gridlines
    svg
      .append("g")
      .style("opacity", "0.15")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickSize(-height).tickFormat(""));
    svg
      .append("g")
      .style("opacity", "0.15")
      .call(d3.axisLeft(y).tickSize(-width).tickFormat(""));

    const group = svg.append("g");

    const numClasses = Object.keys(data).length;
    const xScale2 = d3
      .scaleLinear()
      .domain([0, numClasses - 1])
      .range([0, (numClasses - 1) * 40]);

    const xAxis2 = d3
      .axisLeft(xScale2)
      .ticks(numClasses)
      .tickFormat((d) => Object.keys(colours)[d]);

    group
      .selectAll("rect")
      .data([...Array(numClasses).keys()])
      .enter()
      .append("rect")
      .attr("class", "legend-item")
      .style("fill", (d) => Object.values(colours)[d])
      .attr("width", 30)
      .attr("height", 30)
      .attr("y", (d, i) => i * 40 + 10)
      .attr("x", width + margin.right - 30);

    group
      .append("g")
      .call(xAxis2)
      .attr("transform", `translate(${width + margin.right - 30}, 25)`);

    group._groups[0][0].lastChild.firstChild.style.opacity = "0";

    const lineGenerator = d3
      .line()
      .x((d) => x(d[xName]))
      .y((d) => y(d[yName]));
    

    if (animated) {
    Object.keys(colours).forEach((key) => {
      svg
        .append("path")
        .attr("class", "line")
        .datum(data[key])
        .style("stroke", colours[key])
        .attr("stroke-width", 3)
        .style("fill", "none")
        .attr(
          "d",
          d3
            .line()
            .x((d) => 0)
            .y((d) => height)
        );
    });

    // Animation
    svg
      .selectAll(".line")
      .transition()
      .duration(800)
      .delay(function (d, i) {
        return i * 100;
      })
      .attr("d", lineGenerator);
    
    } else {
      Object.keys(colours).forEach((key) => {
        svg
          .append("path")
          .attr("class", "line")
          .datum(data[key])
          .style("stroke", colours[key])
          .attr("stroke-width", 3)
          .style("fill", "none")
          .attr(
            "d",
            lineGenerator
          );
          });
    }

    // Title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 0 - margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "1.2rem")
      .style("text-decoration", "underline")
      .text(title);

    // Text label for the x axis
    svg
      .append("text")
      .style("font-size", "0.85rem")
      .attr(
        "transform",
        "translate(" + width / 2 + " ," + (height + margin.top + 20) + ")"
      )
      .style("text-anchor", "middle")
      .text(xLabel);

    // Text label for the y axis
    svg
      .append("text")
      .style("font-size", "0.85rem")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(yLabel);
  }, [data, margin, w, h, title, xLabel, yLabel, colours, xName, yName]);

  return <div ref={parentElement}></div>;
}