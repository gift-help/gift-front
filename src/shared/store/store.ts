import {makeAutoObservable} from "mobx";

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
    answers: string[] = [];

    constructor() {
        makeAutoObservable(this);
    }
}

const formInfoStore = new FormInfoStore();
export default formInfoStore;