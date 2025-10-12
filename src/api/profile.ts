import api from '../api/axiosInstance';
import type { Profile } from '../composables/admin/profile/types/indet';

export const getProfile = async (): Promise<Profile> => {
  try {
    const response = await api.get<Profile>('/api/profile');
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.error || 'プロフィールの取得に失敗しました');
  }
};

export const updateProfile = async (profile: Profile): Promise<void> => {
  try {
    await api.put(`/api/profile/${profile.id}`, profile);
  } catch (err: any) {
    throw new Error(err.response?.data?.error || 'プロフィールの更新に失敗しました');
  }
};
