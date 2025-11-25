import '@telegram-apps/telegram-ui/dist/styles.css';
import React, {useMemo, useState} from 'react';
import {useQuestions} from "../../../../hooks/useQuestions.ts";
import {Button, Cell, Input, Progress, Text, Textarea} from "@telegram-apps/telegram-ui";
import {observer} from "mobx-react-lite";
import formInfoStore from "../../../../shared/store/store.ts";
import {CustomProgress} from "./CustomProgress.tsx";

export const Questions = observer(() => {
    const { getQuestions } = useQuestions();
    const {answers} = formInfoStore;

    const [currentStep, setCurrentStep] = useState<number>(0);
    const [visitedSteps, setVisitedSteps] = useState<Set<number>>(new Set([0]));

    const questions = getQuestions();
    const questionIds = Object.keys(questions);
    const currentQuestionId = questionIds[currentStep];
    const currentQuestion = questions[currentQuestionId];
    const totalSteps = questionIds.length;

    const nextStep = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(prev => prev + 1);
            setVisitedSteps(prev => new Set([...prev, currentStep + 1]));
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const saveAnswer = (answer: string) => {
        formInfoStore.saveAnswer(currentQuestionId, answer);
    };

    const handleSubmit = () => {
        console.log('Все ответы из store:', formInfoStore.answers);
    };

    const progress = useMemo(() => {
        return (currentStep + 1) / totalSteps;
    }, [currentStep, totalSteps]);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                maxWidth: '500px',
                margin: '0 auto',
                textAlign: 'center',
                gap: '20px',

            }}
        >
            <Text size={1} weight={"2"}>Ответь на несколько вопросов, чтобы мы могли лучше понять человека, для которого ищем подарок</Text>

            <div style={{ marginBottom: '20px' }}>
                <Text>{currentQuestion.title}</Text>
                <Textarea
                    placeholder={currentQuestion.placeholder}
                    value={answers[currentQuestionId] || ''}
                    onChange={(e) => saveAnswer(e.target.value)}
                    rows={6}
                    maxLength={100}
                    style={{ width: '100%' }}
                />
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
                <Button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    mode="bezeled"
                >
                    Назад
                </Button>

                <Button
                    onClick={currentStep === totalSteps - 1 ? handleSubmit : nextStep}
                    mode="filled"
                >
                    {currentStep === totalSteps - 1 ? 'Завершить' : 'Далее'}
                </Button>
            </div>
            <CustomProgress value={progress} />
        </div>
    );
});