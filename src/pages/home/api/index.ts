import {instance} from "../../../shared/api";


export class HomeApi {
    static async post(data: { initData: string }) {
        const res = await instance.post(`/auth/telegram`, data);
        return res.data;
    }
}
