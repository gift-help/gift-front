import {makeAutoObservable} from "mobx";

interface Answers {
    [key: string]: string;
}

class FormInfoStore {
    gender: string = '';
    age: number = 0;
    occasion: string = '';
    customOccasion: string = '';
    formats: string[] = [];
    relationLevel: string = '';
    budgetRange: string = '';
    customBudget: string = '';
    simpleDescription: string = '';
    tags: object = {};
    answers: Answers = {};

    constructor() {
        makeAutoObservable(this);
    }

    // Сохранить ответ на вопрос
    saveAnswer = (questionId: string, answer: string) => {
        this.answers[questionId] = answer;
    };

    // Получить ответ на конкретный вопрос
    getAnswer = (questionId: string): string => {
        return this.answers[questionId] || '';
    };

    // Очистить все ответы
    clearAnswers = () => {
        this.answers = {};
    };

    // Получить количество отвеченных вопросов
    getAnsweredCount = (): number => {
        return Object.values(this.answers).filter(answer =>
            answer && answer.trim() !== ''
        ).length;
    };

    // Проверить, отвечен ли вопрос
    isQuestionAnswered = (questionId: string): boolean => {
        return !!this.answers[questionId] && this.answers[questionId].trim() !== '';
    };

    addTag = (tag: string, item: string) => {
        if (!this.tags[tag]) {
            this.tags[tag] = [];
        }

        if (!this.tags[tag].includes(item)) {
            this.tags[tag].push(item);
        } else {
            this.tags[tag] = this.tags[tag].filter(t => t !== item)
        }

        console.log(this.tags);
    };
}

const formInfoStore = new FormInfoStore();
export default formInfoStore;