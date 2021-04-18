import React, { useEffect, useState } from "react";
import "./App.css";
import data from "./data.csv";
import ReactECharts from "echarts-for-react";

const getData = async () => {
  const res = await fetch(data); //using fetch() which returns a promise
  /* getting the data from csv file --start */
  const reader = res.body.getReader();
  const result = await reader.read();
  const decoder = new TextDecoder("utf-8");
  const csv = decoder.decode(result.value);
  /* getting the data from csv file --end */
  const table = csv.split("\n").slice(1); //splitting data on basis of new line & deleting the first row i.e labels

  const temparray = []; //declare an array

  table.forEach((row) => {
    //iterating on data to get required attributes
    let temp2 = [];
    const cols = row.split(",");
    const intensity = cols[10]; //on x-axis
    const hue = cols[11]; //on y-axis

    temp2.push(intensity, hue);
    temparray.push(temp2); //creating array of arrays here
  });

  return temparray;
};
function App() {
  const [data, setData] = useState([[]]); //making a state variable to store the data to be plotted

  //useEffect to get the data from the csv and convert it to a proper data type arrayofarray
  useEffect(() => {
    getData().then((resp) => {
      setData(resp);
    });
  }, []);

  //options for scatter graph
  const optionsScatter = {
    xAxis: {
      name: "Color Intensity",
      type: "value",
    },
    yAxis: {
      name: "hue",
      type: "value",
    },
    series: [
      {
        data: data,
        type: "scatter",
        smooth: true,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };

  //options for bar graph
  const optionsBar = {
    xAxis: {
      name: "Color Intensity",
      type: "value",
    },
    yAxis: {
      name: "hue",
      type: "value",
    },
    series: [
      {
        data: data,
        type: "bar",
        smooth: true,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };
  return (
    <div className="container">
      <ReactECharts option={optionsScatter} />
      <ReactECharts option={optionsBar} />
    </div>
  );
}

export default App;
