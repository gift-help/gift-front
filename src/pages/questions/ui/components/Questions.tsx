import '@telegram-apps/telegram-ui/dist/styles.css';
import React, {useMemo, useState} from 'react';
import {useQuestions} from "../../../../hooks/useQuestions.ts";
import {Badge, Button, Cell, Input, Progress, Text, Textarea} from "@telegram-apps/telegram-ui";
import {observer} from "mobx-react-lite";
import formInfoStore from "../../../../shared/store/store.ts";
import {CustomProgress} from "./CustomProgress.tsx";
import {useTranslation} from "react-i18next";

export const Questions = observer(() => {
    const { getQuestions } = useQuestions();
    const { t } = useTranslation();
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
        console.log('Все ответы из store:', answers);
    };

    const progress = useMemo(() => {
        return (currentStep + 1) / totalSteps;
    }, [currentStep, totalSteps]);

    const currentAnswer = formInfoStore.getAnswer(currentQuestionId);
    const currentLength = currentAnswer.length;

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop :'25px',
                textAlign: 'center',
                gap: '20px',
                height: '100%',
            }}
        >
            <Text size={1} >{t('title_questions')}</Text>

            <div style={{ marginBottom: '20px', width: '100%'}}>
                <Text weight={"2"}>{currentQuestion.title}</Text>
                <div style={{position: 'relative'}}>
                    <Textarea
                        placeholder={currentQuestion.placeholder}
                        value={currentAnswer}
                        onChange={(e) => saveAnswer(e.target.value)}
                        rows={6}
                        maxLength={100}
                    />

                    <Badge style={{
                        position: 'absolute',
                        bottom: '22px',
                        right: '20px',
                        fontSize: '12px',
                        pointerEvents: 'none'
                    }} type={'number'} mode={'secondary'}>
                        {currentLength}/100
                    </Badge>
                </div>
            </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}>
                    <div style={{display: 'flex', gap: '40px', justifyContent: 'space-between'}}>
                        <Button
                            onClick={prevStep}
                            disabled={currentStep === 0}
                            mode="bezeled"
                        >
                            {t('buttons:back')}
                        </Button>

                        <Button
                            onClick={currentStep === totalSteps - 1 ? handleSubmit : nextStep}
                            mode="filled"
                    >
                        {currentStep === totalSteps - 1 ? t('buttons:complete') : t('buttons:next')}
                    </Button>
                </div>
                <CustomProgress value={progress}/>
            </div>

        </div>
    );
});