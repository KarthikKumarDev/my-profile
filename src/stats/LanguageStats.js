import { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import {values} from "lodash/object";

import "./GitHubStats.scss";

const LanguageStats = (props) => {
  const [graphData, setGraphData] = useState(null);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: false,
        text: 'Bar Chart',
      },
    },
  };
  useEffect(() => {
    const labels = [...Object.keys(props.stats)]
    const data = {
      labels: labels,
      datasets: [
        {
          label: "# by Languages",
          data: values(props.stats),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
          borderWidth: 1,
        },
      ],
    };

    setGraphData(data);
  }, [props.stats]);

  return <>{graphData && <Bar options={options} data={graphData} />}</>;
};

export default LanguageStats;
