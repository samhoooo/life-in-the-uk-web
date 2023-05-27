import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    maxWidth: 500,
    margin: "auto",
    marginTop: 20,
  },
  question: {
    marginBottom: 20,
  },
  answerButton: {
    marginBottom: 10,
    width: "100%",
  },
  answerRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  answer: {
    marginTop: 40,
    textAlign: "center",
  },
  progress: {
    marginTop: 20,
    textAlign: "center",
  },
  correctAnswerButton: {
    backgroundColor: "#4caf50",
    color: "white!important",
  },
  incorrectAnswerButton: {
    backgroundColor: "#f44336",
    color: "white!important",
  },
  scoreBoard: {
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  category: {
    color: "#888",
    textAlign: "center",
  },
});

export default useStyles;
