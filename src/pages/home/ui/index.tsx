import {useEffect} from "react";
import {HomeApi} from "../api";

export const HomePage = () => {

    const getData = async () => {
        const response = await HomeApi.get()
        console.log(response)
    }
    useEffect(() => {
        getData()
    }, []);
    return(
        <p>главная стр v1</p>
    )
}
