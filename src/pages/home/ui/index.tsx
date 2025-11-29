import {Button} from "@telegram-apps/telegram-ui";
import {useNavigate} from "react-router-dom";

export const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Button onClick={() => navigate('/questions')}>
                к категориям
            </Button>
        </div>
)
}
