import { CardContent, Card } from "@material-ui/core";
import useStyles from "./AbilityRadarChart.styles";
import { Radar } from "react-chartjs-2";
import { Chart, registerables, RadialLinearScale } from "chart.js";

Chart.register(...registerables, RadialLinearScale);

interface Props {
  data: {
    labels: string[];
    datasets: number[];
  };
  title: string;
  backgroundColor: string;
  borderColor: string;
}

const AbilityRadarChart = (props: Props) => {
  const { data, title, backgroundColor, borderColor } = props;
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <h3>{title}</h3>
        <Radar
          data={{
            labels: data.labels,
            datasets: [
              {
                label: "% of Correctness",
                data: data.datasets,
                backgroundColor,
                borderColor,
                borderWidth: 1,
              },
            ],
          }}
          options={{
            scales: {
              r: {
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

export default AbilityRadarChart;
