import React, { useCallback } from "react";
import MultipleChoiceCard from "../components/MultipleChoiceCard";
import { Button, Grid } from "@material-ui/core";
import useStyles from "./QuizPage.styles";
import { useNavigate } from "react-router-dom";
import useQuestion from "../hooks/useQuestion";
import useScore from "../hooks/useScore";

const QuizPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const {
    question,
    nextQuestion,
    totalQuestions,
    currentIndex,
    makeAnswer,
    score,
  } = useQuestion();
  const { clearScoreMap } = useScore();
  const [isAnswered, setIsAnswered] = React.useState<boolean>(false);

  const endQuiz = useCallback(() => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure you want to end the quiz?")) {
      clearScoreMap();
      navigate("/");
    }
  }, [clearScoreMap, navigate]);

  const completeQuiz = useCallback(() => {
    navigate("/test-summary");
  }, [navigate]);

  const handleNextQuestion = useCallback(async () => {
    // reset answer state
    setIsAnswered(false);
    if (!nextQuestion()) {
      completeQuiz();
    }
  }, [completeQuiz, nextQuestion]);
  if (!question) return <div style={{ textAlign: "center" }}>Loading...</div>;

  return (
    <div>
      <MultipleChoiceCard
        question={question}
        totalQuestions={totalQuestions}
        currentIndex={currentIndex}
        makeAnswer={makeAnswer}
        setIsAnswered={setIsAnswered}
        isAnswered={isAnswered}
        score={score}
      />
      <div className={classes.toolbar}>
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          {isAnswered && (
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNextQuestion}
              >
                Next Question
              </Button>
            </Grid>
          )}
          <Grid item xs={6}>
            <Button variant="outlined" onClick={endQuiz}>
              End Quiz
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default QuizPage;
