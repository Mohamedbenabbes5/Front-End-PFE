import React from "react";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const PieChartBox = ({ charttype ,spallCount,crackCount,dangerCounts}) => {
  // Définir les données en fonction de la charttype passée
  const data = charttype === "danger" ? [
    { name: "Faible", value: dangerCounts.Low, color:"#fff200"},
    { name: "Moyen", value: dangerCounts.Medium, color: "#d68101" },
    { name: "Élevé", value: dangerCounts.High, color: "#ff0000" }
  ] : charttype === "type" ? [
    { name: "Crack", value: crackCount, color: "#0088FE" },
    { name: "Spall", value: spallCount, color: "#00C49F" }
  ] : [];

  return (
    <div className="pieChartBox">
      <h5>{charttype === "danger"?"severities of damages":"categories of damages"}</h5>
      <div className="chart">
        <ResponsiveContainer  height={200}>
          <PieChart>
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
            />
            <Pie
              data={data}
              innerRadius={"70%"}
              outerRadius={"90%"}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="options">
        {data.map((item) => (
          <div className="option" key={item.name}>
            <div className="title">
              <div className="dot" style={{ backgroundColor: item.color }} />
              <span>{item.name}</span>
            </div>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartBox;
