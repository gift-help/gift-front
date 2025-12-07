import {makeAutoObservable} from "mobx";

interface Filters {
    budget?: {
        from: string,
        to: string,
    },
    market?: string[],
    delivery?: string
}

class FiltersStore {
    filters: Filters = {};


    constructor() {
        makeAutoObservable(this);
        console.log(this.filters)
    }
}

const filtersStore = new FiltersStore();
export default filtersStore;