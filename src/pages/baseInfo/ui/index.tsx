import {Button} from "@telegram-apps/telegram-ui";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const BaseInfoPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div>
            <p>тут будут базовые вопросы от абди</p>
            <Button
                size="m"
                mode={'filled'}
                onClick={() => navigate('/questions')}
            >
                {t('buttons:next')}
            </Button>
        </div>

    );
}