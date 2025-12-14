import { makeAutoObservable } from 'mobx';

interface Filters {
  budget: {
    from: string;
    to: string;
  };
  market: string[];
  delivery: string;
}

class FiltersStore {
  filters: Filters = {
    budget: {
      from: '',
      to: '',
    },
    market: [],
    delivery: '',
  };

  constructor() {
    makeAutoObservable(this);
  }

  setBudgetFrom = (value: string) => {
    this.filters.budget.from = value;
  };

  setBudgetTo = (value: string) => {
    this.filters.budget.to = value;
  };

  setMarketplace = (value: string) => {
    if (this.filters?.market?.includes(value)) {
      this.filters.market = this.filters.market.filter((f) => f !== value);
    } else {
      this.filters?.market?.push(value);
    }
  };

  setDelivery = (value: string) => {
    this.filters.delivery = value;
  };

  submitFilters = () => {
    console.log(this.filters);
  };
}

const filtersStore = new FiltersStore();
export default filtersStore;
