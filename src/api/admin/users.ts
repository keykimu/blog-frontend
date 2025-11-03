import type { Users } from "../../composables/admin/users/types";
import api from "../axiosInstance"

export const getUsersAPI = async (): Promise<Users[]> => {
  try {
    const response = await api.get<Users[]>('/api/admin/auth/users');
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('通信に失敗しました');
  }
};