import React from "react";
import UKFlagImage from "../images/uk-flag.png";
import Button from "@material-ui/core/Button";
import useStyles from "./HomePage.styles";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate("/quiz");
  };

  return (
    <div className={classes.body}>
      <h2>Welcome to Life in the UK test!</h2>
      <img className={classes.quizImage} src={UKFlagImage} alt="UK" />
      <div className={classes.start}>
        <Button
          className={classes.startButton}
          variant="contained"
          color="primary"
          onClick={startQuiz}
        >
          Start!
        </Button>
      </div>
    </div>
  );
};

export default Home;
