import { CardContent, Card } from "@material-ui/core";
import useStyles from "./AbilityRadarChart.styles";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface Props {
  data: {
    labels: string[];
    datasets: number[];
  };
}

const ScoreBarChart = (props: Props) => {
  const { data } = props;
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <h3>Performance of this Quiz</h3>
        <Bar
          data={{
            labels: data.labels,
            datasets: [
              {
                label: "% of Correctness",
                data: data.datasets,
                backgroundColor: "rgba(75, 192, 192, 0.2)", // Customize the bar color
                borderColor: "rgba(75, 192, 192, 1)", // Customize the bar border color
                borderWidth: 1, // Customize the bar border width
              },
            ],
          }}
          options={{
            indexAxis: "y",
            scales: {
              x: {
                beginAtZero: true,
                ticks: {
                  stepSize: 20,
                },
              },
            },
          }}
        />
      </CardContent>
    </Card>
  );
};

export default ScoreBarChart;
