import { instance } from './index';

export interface AuthResponse {
  token: string;
  user?: {
    createdAt: string;
    firstName: string;
    id: string;
    languageCode: string | null;
    lastName: string;
    telegramId: number;
    updatedAt: string;
    username: string;
  };
}

export interface AuthRequest {
  initData: string;
}

export const authApi = {
  telegramAuth: async (initData: string): Promise<AuthResponse> => {
    const response = await instance.post<AuthResponse>('/auth/telegram', { initData: initData });
    return response.data;
  },
};
