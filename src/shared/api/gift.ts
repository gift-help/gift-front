import { instance } from './index';

export interface Gift {
  name: string;
  source: string;
  price: number;
  image?: string;
  description?: string;
  url?: string;
}

export interface CollectRequest {
  base: any;
  simpleDescription: string;
  tags?: any;
  answers?: string[];
}

export interface CollectResponse {
  gifts: Gift[];
}

export const giftApi = {
  collect: async (data: CollectRequest): Promise<CollectResponse> => {
    const response = await instance.post<CollectResponse>('/gift/collect', data);
    return response.data;
  },
};
