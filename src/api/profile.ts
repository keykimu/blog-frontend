import api from '../api/axiosInstance';
import type {
  Profile,
  ProfileItemsRequest,
  ProfileItemsResponse
} from '../composables/admin/profile/types';

export const getProfile = async (): Promise<Profile> => {
  try {
    const response = await api.get<Profile>('/api/admin/profile');
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.error || 'プロフィールの取得に失敗しました');
  }
};

export const updateProfile = async (profile: Profile): Promise<void> => {
  try {
    await api.put(`/api/admin/profile/${profile.id}`, profile);
  } catch (err: any) {
    throw new Error(err.response?.data?.error || 'プロフィールの更新に失敗しました');
  }
};


export const updateProfileItems = async (request: ProfileItemsRequest) => {
  try {
    const response = await api.post('/api/admin/profile-items', request);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.error || 'プロフィール項目の更新に失敗しました');
  }
};

export const getProfileItems = async (): Promise<ProfileItemsResponse> => {
  try {
    const response = await api.get('/api/admin/profile-items');
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.error || 'プロフィール項目の取得に失敗しました');
  }
};