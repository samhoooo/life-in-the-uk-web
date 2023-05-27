import { useEffect, useState } from "react";
import useStyles from "./ResultPage.styles";
import { Grid } from "@material-ui/core";
import AbilityRadarChart from "../components/AbilityRadarChart";

const ResultPage = () => {
  const classes = useStyles();
  const [abilityChartData, setAbilityChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  const [accumulatedScoreMap, setAccumulatedScoreMap] = useState<
    Record<string, { correct: number; incorrect: number }>
  >({});

  useEffect(() => {
    localStorage.getItem("accumulatedScoreMap") &&
      setAccumulatedScoreMap(
        JSON.parse(localStorage.getItem("accumulatedScoreMap")!)
      );
  }, []);

  useEffect(() => {
    const labels = Object.keys(accumulatedScoreMap);
    const data = Object.values(accumulatedScoreMap).map(
      (item) => (item.correct / (item.correct + item.incorrect)) * 100
    );
    setAbilityChartData({
      labels,
      datasets: data,
    });
  }, [accumulatedScoreMap]);

  console.log({
    abilityChartData,
  });

  return (
    <div className={classes.body}>
      <h2>Results</h2>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: "20px" }}
      >
        <Grid item xs={12} md={6}>
          {abilityChartData.labels.length === 0 ||
          abilityChartData.datasets.length === 0 ? (
            <div>No data</div>
          ) : (
            <AbilityRadarChart
              data={abilityChartData}
              title="Cumulative Performance"
              backgroundColor="rgba(255, 99, 132, 0.2)"
              borderColor="rgba(255, 99, 132, 1)"
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default ResultPage;
