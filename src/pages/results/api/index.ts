import { instance } from '@/shared/api';

export class ResultApi {
  static get(body: any) {
    return instance.post(`/gift/collect`, body);
  }
}
