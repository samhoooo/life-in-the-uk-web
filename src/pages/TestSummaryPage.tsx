import { useEffect, useState } from "react";
import useStyles from "./TestSummaryPage.styles";
import { Grid, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import AbilityRadarChart from "../components/AbilityRadarChart";

const TestSummaryPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [scoreChartData, setScoreChartData] = useState<any>({
    labels: [],
    datasets: [],
  });
  const [abilityChartData, setAbilityChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  const [scoreMap, setScoreMap] = useState<
    Record<string, { correct: number; incorrect: number }>
  >({});
  const [accumulatedScoreMap, setAccumulatedScoreMap] = useState<
    Record<string, { correct: number; incorrect: number }>
  >({});

  useEffect(() => {
    localStorage.getItem("scoreMap") &&
      setScoreMap(JSON.parse(localStorage.getItem("scoreMap")!));
    localStorage.getItem("accumulatedScoreMap") &&
      setAccumulatedScoreMap(
        JSON.parse(localStorage.getItem("accumulatedScoreMap")!)
      );
  }, []);

  useEffect(() => {
    const labels = Object.keys(scoreMap);
    const data = Object.values(scoreMap).map(
      (item) => (item.correct / (item.correct + item.incorrect)) * 100
    );
    setScoreChartData({
      labels,
      datasets: data,
    });
  }, [scoreMap]);

  useEffect(() => {
    const labels = Object.keys(accumulatedScoreMap);
    const data = Object.values(accumulatedScoreMap).map(
      (item) => (item.correct / (item.correct + item.incorrect)) * 100
    );

    console.log({
      ability: {
        labels,
        datasets: data,
      },
    });
    setAbilityChartData({
      labels,
      datasets: data,
    });
  }, [accumulatedScoreMap]);

  const retest = () => {
    navigate("/quiz");
  };

  console.log({
    scoreChartData,
    abilityChartData,
  });

  return (
    <div className={classes.body}>
      <h2>Test Summary</h2>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: "20px" }}
      >
        {scoreChartData.labels.length === 0 ||
        scoreChartData.datasets.length === 0 ||
        abilityChartData.labels.length === 0 ||
        abilityChartData.datasets.length === 0 ? (
          <div>No data</div>
        ) : (
          <>
            <Grid item xs={12} md={6}>
              <AbilityRadarChart
                data={scoreChartData}
                title="Performance of this test"
                backgroundColor="rgba(22, 99, 160, 0.2)"
                borderColor="rgba(22, 99, 160, 1)"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <AbilityRadarChart
                data={abilityChartData}
                title="Cumulative Performance"
                backgroundColor="rgba(255, 99, 132, 0.2)"
                borderColor="rgba(255, 99, 132, 1)"
              />
            </Grid>
          </>
        )}
      </Grid>

      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: "20px" }}
      >
        <Grid item xs={6}>
          <Button variant="outlined" onClick={retest}>
            Practice again
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default TestSummaryPage;
