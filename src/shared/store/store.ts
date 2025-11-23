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