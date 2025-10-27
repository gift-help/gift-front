import {instance} from "../../../shared/api";


export class HomeApi {
    static get() {
        return instance.get(`/temporary/generate-gifts`);
    }
}