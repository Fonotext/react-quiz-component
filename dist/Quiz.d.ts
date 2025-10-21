import React from 'react';
import './styles.css';
import { QuizProps } from './types';
declare function Quiz({ quiz, shuffle, shuffleAnswer, showDefaultResult, onComplete, customResultPage, showInstantFeedback, continueTillCorrect, revealAnswerOnSubmit, allowNavigation, onQuestionSubmit, disableSynopsis, timer, allowPauseTimer, enableProgressBar, }: QuizProps): React.JSX.Element;
export default Quiz;
