import { ReactElement } from 'react';
export type AnswerSelectionType = 'single' | 'multiple';
export type QuestionType = 'text' | 'photo';
export interface QuizQuestion {
    question: string;
    questionType: QuestionType;
    questionPic?: string;
    answerSelectionType: AnswerSelectionType;
    answers: string[];
    correctAnswer: string | number[];
    messageForCorrectAnswer?: string;
    messageForIncorrectAnswer?: string;
    explanation?: string;
    point?: string | number;
    segment?: string;
    questionIndex?: number;
}
export interface AppLocale {
    landingHeaderText: string;
    question: string;
    startQuizBtn: string;
    resultFilterAll: string;
    resultFilterCorrect: string;
    resultFilterIncorrect: string;
    resultFilterUnanswered: string;
    nextQuestionBtn: string;
    prevQuestionBtn: string;
    resultPageHeaderText: string;
    resultPagePoint: string;
    pauseScreenDisplay: string;
    timerTimeRemaining: string;
    timerTimeTaken: string;
    pauseScreenPause: string;
    pauseScreenResume: string;
    singleSelectionTagText: string;
    multipleSelectionTagText: string;
    pickNumberOfSelection: string;
    marksOfQuestion: string;
}
export interface Quiz {
    quizTitle: string;
    quizSynopsis?: string;
    nrOfQuestions?: number | string;
    questions: QuizQuestion[];
    appLocale?: Partial<AppLocale>;
    progressBarColor?: string;
}
export interface QuizProps {
    quiz: Quiz;
    shuffle?: boolean;
    shuffleAnswer?: boolean;
    showDefaultResult?: boolean;
    onComplete?: (obj: QuestionSummary) => void;
    customResultPage?: (obj: QuestionSummary) => ReactElement;
    showInstantFeedback?: boolean;
    continueTillCorrect?: boolean;
    revealAnswerOnSubmit?: boolean;
    allowNavigation?: boolean;
    onQuestionSubmit?: (obj: {
        question: QuizQuestion;
        userAnswer: any;
        isCorrect: boolean;
    }) => void;
    disableSynopsis?: boolean;
    timer?: number;
    allowPauseTimer?: boolean;
    enableProgressBar?: boolean;
}
export interface QuestionSummary {
    numberOfQuestions: number;
    numberOfCorrectAnswers: number;
    numberOfIncorrectAnswers: number;
    questions: QuizQuestion[];
    userInput: any[];
    totalPoints: number;
    correctPoints: number;
    timeTaken: number;
}
export interface CoreProps {
    questions: QuizQuestion[];
    appLocale: AppLocale;
    showDefaultResult?: boolean;
    onComplete?: (obj: QuestionSummary) => void;
    customResultPage?: (obj: QuestionSummary) => ReactElement;
    showInstantFeedback?: boolean;
    continueTillCorrect?: boolean;
    revealAnswerOnSubmit?: boolean;
    allowNavigation?: boolean;
    onQuestionSubmit?: (obj: {
        question: QuizQuestion;
        userAnswer: any;
        isCorrect: boolean;
    }) => void;
    timer?: number;
    allowPauseTimer?: boolean;
    enableProgressBar?: boolean;
    progressBarColor?: string;
}
export interface ButtonState {
    [key: number]: {
        disabled?: boolean;
        className?: string;
        selected?: boolean;
    };
}
export interface CheckAnswerParams {
    userInput: any[];
    userAttempt: number;
    currentQuestionIndex: number;
    continueTillCorrect?: boolean;
    showNextQuestionButton: boolean;
    incorrect: number[];
    correct: number[];
    setButtons: React.Dispatch<React.SetStateAction<ButtonState>>;
    setIsCorrect: React.Dispatch<React.SetStateAction<boolean>>;
    setIncorrectAnswer: React.Dispatch<React.SetStateAction<boolean>>;
    setCorrect: React.Dispatch<React.SetStateAction<number[]>>;
    setIncorrect: React.Dispatch<React.SetStateAction<number[]>>;
    setShowNextQuestionButton: React.Dispatch<React.SetStateAction<boolean>>;
    setUserInput: React.Dispatch<React.SetStateAction<any[]>>;
    setUserAttempt: React.Dispatch<React.SetStateAction<number>>;
}
export interface SelectAnswerParams {
    userInput: any[];
    currentQuestionIndex: number;
    setButtons: React.Dispatch<React.SetStateAction<ButtonState>>;
    setShowNextQuestionButton: React.Dispatch<React.SetStateAction<boolean>>;
    incorrect: number[];
    correct: number[];
    setCorrect: React.Dispatch<React.SetStateAction<number[]>>;
    setIncorrect: React.Dispatch<React.SetStateAction<number[]>>;
    setUserInput: React.Dispatch<React.SetStateAction<any[]>>;
}
