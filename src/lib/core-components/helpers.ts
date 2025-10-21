import snarkdown from 'snarkdown';
import dompurify from 'dompurify';
import { CheckAnswerParams, SelectAnswerParams, AnswerSelectionType } from '../types';

export const rawMarkup = (data: string) => {
  const sanitizer = dompurify.sanitize;
  return { __html: snarkdown(sanitizer(data)) };
};

export const checkAnswer = (
  index: number,
  correctAnswer: string | number[],
  answerSelectionType: AnswerSelectionType,
  answers: string[],
  params: CheckAnswerParams
) => {
  const {
    userInput,
    userAttempt,
    currentQuestionIndex,
    continueTillCorrect,
    showNextQuestionButton,
    incorrect,
    correct,
    setButtons,
    setIsCorrect,
    setIncorrectAnswer,
    setCorrect,
    setIncorrect,
    setShowNextQuestionButton,
    setUserInput,
    setUserAttempt,
  } = params;

  const indexStr = `${index}`;
  const disabledAll = Object.keys(answers).map(() => ({ disabled: true }));
  const userInputCopy = [...userInput];
  
  if (answerSelectionType === 'single') {
    if (userInputCopy[currentQuestionIndex] === undefined) {
      userInputCopy[currentQuestionIndex] = index;
    }

    if (indexStr === correctAnswer) {
      if (incorrect.indexOf(currentQuestionIndex) < 0 && correct.indexOf(currentQuestionIndex) < 0) {
        correct.push(currentQuestionIndex);
      }

      setButtons((prevState) => ({
        ...prevState,
        ...disabledAll,
        [index - 1]: {
          className: (indexStr === correctAnswer) ? 'correct' : 'incorrect',
        },
      }));

      setIsCorrect(true);
      setIncorrectAnswer(false);
      setCorrect(correct);
      setShowNextQuestionButton(true);
    } else {
      if (correct.indexOf(currentQuestionIndex) < 0 && incorrect.indexOf(currentQuestionIndex) < 0) {
        incorrect.push(currentQuestionIndex);
      }

      if (continueTillCorrect) {
        setButtons((prevState) => (
          {

            ...prevState,
            [index - 1]: {
              disabled: !prevState[index - 1],
            },
          }
        ));
      } else {
        setButtons((prevState) => (
          {

            ...prevState,
            ...disabledAll,
            [index - 1]: {
              className: (indexStr === correctAnswer) ? 'correct' : 'incorrect',
            },
          }
        ));

        setShowNextQuestionButton(true);
      }

      setIncorrectAnswer(true);
      setIsCorrect(false);
      setIncorrect(incorrect);
    }
  } else {
    const maxNumberOfMultipleSelection = (correctAnswer as number[]).length;

    if (userInputCopy[currentQuestionIndex] === undefined) {
      userInputCopy[currentQuestionIndex] = [];
    }

    if (userInputCopy[currentQuestionIndex].length < maxNumberOfMultipleSelection) {
      userInputCopy[currentQuestionIndex].push(index);

      if (userInputCopy[currentQuestionIndex].length <= maxNumberOfMultipleSelection) {
        setButtons((prevState) => ({
          ...prevState,
          [index - 1]: {
            disabled: !prevState[index - 1],
            className: ((correctAnswer as number[]).includes(index)) ? 'correct' : 'incorrect',
          },
        }));
      }
    }

    if (maxNumberOfMultipleSelection === userAttempt) {
      let cnt = 0;
      for (let i = 0; i < (correctAnswer as number[]).length; i += 1) {
        if (userInputCopy[currentQuestionIndex].includes((correctAnswer as number[])[i])) {
          cnt += 1;
        }
      }

      if (cnt === maxNumberOfMultipleSelection) {
        correct.push(currentQuestionIndex);

        setIsCorrect(true);
        setIncorrectAnswer(false);
        setCorrect(correct);
        setShowNextQuestionButton(true);
        setUserAttempt(1);
      } else {
        incorrect.push(currentQuestionIndex);

        setIncorrectAnswer(true);
        setIsCorrect(false);
        setIncorrect(incorrect);
        setShowNextQuestionButton(true);
        setUserAttempt(1);
      }
    } else if (!showNextQuestionButton) {
      setUserAttempt(userAttempt + 1);
    }
  }
  setUserInput(userInputCopy);
};

export const selectAnswer = (
  index: number,
  correctAnswer: string | number[],
  answerSelectionType: AnswerSelectionType,
  answers: string[],
  params: SelectAnswerParams
) => {
  const {
    userInput,
    currentQuestionIndex,
    setButtons,
    setShowNextQuestionButton,
    incorrect,
    correct,
    setCorrect,
    setIncorrect,
    setUserInput,
  } = params;

  const selectedButtons = Object.keys(answers).map(() => ({ selected: false }));
  const userInputCopy = [...userInput];
  
  if (answerSelectionType === 'single') {
    let correctAnswerNum = Number(correctAnswer);
    userInputCopy[currentQuestionIndex] = index;

    if (index === correctAnswerNum) {
      if (correct.indexOf(currentQuestionIndex) < 0) {
        correct.push(currentQuestionIndex);
      }
      if (incorrect.indexOf(currentQuestionIndex) >= 0) {
        incorrect.splice(incorrect.indexOf(currentQuestionIndex), 1);
      }
    } else {
      if (incorrect.indexOf(currentQuestionIndex) < 0) {
        incorrect.push(currentQuestionIndex);
      }
      if (correct.indexOf(currentQuestionIndex) >= 0) {
        correct.splice(correct.indexOf(currentQuestionIndex), 1);
      }
    }
    setCorrect(correct);
    setIncorrect(incorrect);

    setButtons((prevState) => ({
      ...prevState,
      ...selectedButtons,
      [index - 1]: {
        className: 'selected',
      },
    }));

    setShowNextQuestionButton(true);
  } else {
    if (userInputCopy[currentQuestionIndex] === undefined) {
      userInputCopy[currentQuestionIndex] = [];
    }
    if (userInputCopy[currentQuestionIndex].includes(index)) {
      userInputCopy[currentQuestionIndex].splice(userInputCopy[currentQuestionIndex].indexOf(index), 1);
    } else {
      userInputCopy[currentQuestionIndex].push(index);
    }

    if (userInputCopy[currentQuestionIndex].length === (correctAnswer as number[]).length) {
      let exactMatch = true;
      // eslint-disable-next-line no-restricted-syntax
      for (const input of userInput[currentQuestionIndex]) {
        if (!(correctAnswer as number[]).includes(input)) {
          exactMatch = false;
          if (incorrect.indexOf(currentQuestionIndex) < 0) {
            incorrect.push(currentQuestionIndex);
          }
          if (correct.indexOf(currentQuestionIndex) >= 0) {
            correct.splice(correct.indexOf(currentQuestionIndex), 1);
          }
          break;
        }
      }
      if (exactMatch) {
        if (correct.indexOf(currentQuestionIndex) < 0) {
          correct.push(currentQuestionIndex);
        }
        if (incorrect.indexOf(currentQuestionIndex) >= 0) {
          incorrect.splice(incorrect.indexOf(currentQuestionIndex), 1);
        }
      }
    } else {
      if (incorrect.indexOf(currentQuestionIndex) < 0) {
        incorrect.push(currentQuestionIndex);
      }
      if (correct.indexOf(currentQuestionIndex) >= 0) {
        correct.splice(correct.indexOf(currentQuestionIndex), 1);
      }
    }
    setCorrect(correct);
    setIncorrect(incorrect);
    setButtons((prevState) => ({
      ...prevState,
      [index - 1]: {
        className: userInputCopy[currentQuestionIndex].includes(index) ? 'selected' : undefined,
      },
    }));

    if (userInputCopy[currentQuestionIndex].length > 0) {
      setShowNextQuestionButton(true);
    }
  }
  setUserInput(userInputCopy);
};
