import { useCallback, useEffect, useState } from "react";
import { getRandomElementsPerCategory } from "../utils/array";
import useScore from "./useScore";

export type Question = {
  questionText: string;
  answers: string[];
  correctAnswer: string;
  category: string;
  id: string;
};

const fetchCategories = async () => {
  return await fetch("/questions/categories.json")
    .then((response) => response.json())
    .then((result: { category: string[] }) => {
      return result.category;
    });
};

const fetchQuestions = async () => {
  const weighting: { [category: string]: number } = {};
  const categories = await fetchCategories();
  const accumulatedScoreMapStr = localStorage.getItem("accumulatedScoreMap");
  if (accumulatedScoreMapStr) {
    const accumulatedScoreMap = JSON.parse(accumulatedScoreMapStr);
    for (let key in accumulatedScoreMap) {
      weighting[key] =
        accumulatedScoreMap[key].incorrect /
        (accumulatedScoreMap[key].correct + accumulatedScoreMap[key].incorrect);
    }
  } else {
    categories.forEach((category) => {
      weighting[category] = 1;
    });
  }

  let incorrectQuestionIds: string[] = [];
  const incorrectQuestionIdsStr = localStorage.getItem("incorrectQuestionIds");
  if (incorrectQuestionIdsStr) {
    incorrectQuestionIds = JSON.parse(incorrectQuestionIdsStr);
  }

  return await fetch("/questions/life-in-the-uk.json")
    .then((response) => response.json())
    .then((questions) => {
      const incorrectQuestions: Question[] = questions
        .filter((question: Question) =>
          incorrectQuestionIds.includes(question.id)
        )
        .map((question: Question) => {
          return {
            questionText: question.questionText,
            answers: question.answers?.slice().sort(() => Math.random() - 0.5),
            correctAnswer: question.correctAnswer,
            category: question.category,
            id: question.id,
          };
        });
      return [
        ...incorrectQuestions,
        ...getRandomElementsPerCategory(questions, weighting).map((result) => {
          return {
            questionText: result.questionText,
            answers: result.answers?.slice().sort(() => Math.random() - 0.5),
            correctAnswer: result.correctAnswer,
            category: result.category,
            id: result.id,
          };
        }),
      ];
    });
};

const useQuestion = () => {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { totalScore, increment, decrement, saveQuizResult } = useScore();

  useEffect(() => {
    fetchQuestions().then((result) => {
      console.log(result);
      setQuestions(result);
    });
  }, []);

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex >= (questions?.length || 0) - 1) {
      saveQuizResult();
      return false;
    }
    setCurrentQuestionIndex((prev) => prev + 1);
    return true;
  }, [currentQuestionIndex, questions?.length, saveQuizResult]);

  const makeAnswer = (answer: string) => {
    if (!questions) return false;

    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.correctAnswer === answer) {
      increment(currentQuestion);
      return true;
    }
    decrement(currentQuestion);
    return false;
  };

  console.log({ questions });

  return {
    question: !questions ? null : questions[currentQuestionIndex],
    nextQuestion,
    makeAnswer,
    totalQuestions: questions?.length || 0,
    currentIndex: currentQuestionIndex,
    score: totalScore,
  };
};

export default useQuestion;
