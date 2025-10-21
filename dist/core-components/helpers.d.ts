import { CheckAnswerParams, SelectAnswerParams, AnswerSelectionType } from '../types';
export declare const rawMarkup: (data: string) => {
    __html: string;
};
export declare const checkAnswer: (index: number, correctAnswer: string | number[], answerSelectionType: AnswerSelectionType, answers: string[], params: CheckAnswerParams) => void;
export declare const selectAnswer: (index: number, correctAnswer: string | number[], answerSelectionType: AnswerSelectionType, answers: string[], params: SelectAnswerParams) => void;
