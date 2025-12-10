import { useTranslation } from 'react-i18next';

export interface Question {
    title: string;
    placeholder: string;
}

export interface QuestionsConfig {
    [key: string]: Question;
}

export const useQuestions = () => {
    const { t } = useTranslation('questions');

  const getQuestions = (): QuestionsConfig => {
    const questionIds = [
      'question_1',
      'question_2',
      'question_3',
      'question_4',
      'question_5',
      'question_6',
      'question_7',
      'question_8',
      'question_9',
    ]; // список ID вопросов

        const questions: QuestionsConfig = {};

        questionIds.forEach(questionId => {
            questions[questionId] = {
                title: t(`${questionId}.title`),
                placeholder: t(`${questionId}.placeholder`)
            };
        });

        return questions;
    };

    return { getQuestions };
};