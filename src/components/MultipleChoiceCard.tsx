import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import DoneIcon from "@mui/icons-material/Done";
import useStyles from "./MultipleChoiceCard.styles";
import { Question } from "../hooks/useQuestion";

interface Props {
  question: Question;
  totalQuestions: number;
  currentIndex: number;
  makeAnswer: (answer: string) => boolean;
  setIsAnswered: (answer: boolean) => void;
  isAnswered: boolean;
  score: number;
}

const MultipleChoiceCard = (props: Props) => {
  const {
    question,
    totalQuestions,
    setIsAnswered,
    isAnswered,
    makeAnswer,
    currentIndex,
    score,
  } = props;
  const classes = useStyles();
  const [answer, setAnswer] = React.useState<string>("");

  const handleAnswer = (answer: string) => {
    setIsAnswered(true);
    makeAnswer(answer);
    setAnswer(answer);
  };

  console.log({ question });

  return (
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.question}>
          <h2>{question.questionText}</h2>
          <div className={classes.category}>{question.category}</div>
        </div>
        <div className={classes.answer}>
          {question.answers.map((choice) => (
            <Button
              variant="outlined"
              color="secondary"
              className={classes.answerButton}
              onClick={() => handleAnswer(choice)}
              disabled={isAnswered}
              key={choice}
              classes={(() => {
                if (isAnswered && choice === question.correctAnswer)
                  return {
                    disabled: classes.correctAnswerButton,
                  };
                else if (
                  isAnswered &&
                  choice === answer &&
                  choice !== question.correctAnswer
                )
                  return {
                    disabled: classes.incorrectAnswerButton,
                  };
                return {};
              })()}
            >
              {choice}
            </Button>
          ))}
        </div>
        <div className={classes.progress}>
          Question {currentIndex + 1} of {totalQuestions}
        </div>
        <div className={classes.scoreBoard}>
          <DoneIcon color="primary" style={{ marginRight: "4px" }} />
          {score}
        </div>
      </CardContent>
    </Card>
  );
};

export default MultipleChoiceCard;
