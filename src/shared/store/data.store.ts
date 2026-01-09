import { makeAutoObservable } from 'mobx';

interface Answers {
  [key: string]: string;
}

class FormInfoStore {
  isBaseInfoComplete = false; // Signal for the UI to navigate to the next page
  description = '';

  gender: string = '';
  age: number | '' = '';
  occasion: string = '';
  customOccasion: string = '';
  formats: string[] = [];
  relationLevel: string = '';
  budgetRange: string = '';
  customBudget: string = '';
  simpleDescription: string = '';
  tags: any = {};
  answers: Answers = {};

  reset = () => {
    this.isBaseInfoComplete = false;
    this.gender = '';
    this.age = '';
    this.occasion = '';
    this.customOccasion = '';
    this.formats = [];
    this.relationLevel = '';
    this.budgetRange = '';
    this.customBudget = '';
    this.simpleDescription = '';
    this.description = '';
    this.tags = {};
    this.answers = {};
  };

  constructor() {
    makeAutoObservable(this);
  }

  setGender = (value: string) => {
    this.gender = value;
  };

  setAge = (value: string) => {
    let cleanValue = value.replace(/\D/g, ''); // Remove non-digit characters
    if (cleanValue === '') {
      this.age = '';
      return;
    }
    if (cleanValue.length > 1 && cleanValue.startsWith('0')) {
      cleanValue = cleanValue.replace(/^0+/, '');
    }
    if (cleanValue.length > 3) {
      return;
    }
    let num = parseInt(cleanValue, 10);
    if (isNaN(num)) {
      return;
    }
    if (num > 100) {
      num = 100; // Cap at 100
    }
    this.age = num;
  };

  setOccasion = (value: string) => {
    this.occasion = value;
    // If switching away from 'OTHER', clear the custom input
    if (value !== 'OTHER') {
      this.customOccasion = '';
    }
  };

  setCustomOccasion = (value: string) => {
    if (value.length > 30) {
      return;
    }
    this.customOccasion = value;
  };

  toggleFormat = (value: string) => {
    if (this.formats.includes(value)) {
      this.formats = this.formats.filter((f) => f !== value);
    } else {
      this.formats.push(value);
    }
  };

  setRelationLevel = (value: string) => {
    this.relationLevel = value;
  };

  // Submit Logic
  submitBaseInfo = () => {
    if (this.canProceed) {
      this.isBaseInfoComplete = true; // Triggers navigation in the UI
    }
  };

  get nextRoute() {
    const rawValue = (this.relationLevel || '').toUpperCase();

    const levelMap: Record<string, number> = {
      // High Knowledge (>= 4) -> Description
      EXCELLENT: 5,
      GOOD: 4,

      // Low Knowledge (< 4) -> Interests
      NORMAL: 3,
      POOR: 2,
      VERY_POOR: 1,
      UNKNOWN: 0,
    };

    // Default to 0 (Interests) if something goes wrong
    const score = levelMap[rawValue] || 0;
    return score >= 4 ? '/description' : '/questions';
  }

  // Validation Logic
  get canProceed() {
    // 1. Gender & Age
    const hasGender = this.gender !== '';
    const hasAge = this.age !== '' && !isNaN(Number(this.age));

    // 2. Occasion (Handle "Other" case)
    let hasOccasion = false;
    if (this.occasion) {
      if (this.occasion === 'OTHER') {
        hasOccasion = !!this.customOccasion.trim();
      } else {
        hasOccasion = true;
      }
    }

    // 3. Formats (At least one) & Relation
    const hasFormats = this.formats.length > 0;
    const hasRelation = this.relationLevel !== '';

    // All conditions must be true to enable the button
    return hasGender && hasAge && hasOccasion && hasFormats && hasRelation;
  }

  // Description
  setDescription = (value: string) => {
    if (value.length > 350) return;
    this.description = value;
  };

  get canSubmitDescription() {
    return this.description.trim().length > 0;
  }

  submitDescription = () => {
    console.log('Submitting description:', this.description);
  };

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
    return Object.values(this.answers).filter((answer) => answer && answer.trim() !== '').length;
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
      this.tags[tag] = this.tags[tag].filter((t: any) => t !== item);
    }

    console.log(this.tags);
  };
}

const formInfoStore = new FormInfoStore();
export default formInfoStore;
