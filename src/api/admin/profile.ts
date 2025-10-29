import type { Profile, ProfileItemsRequest, ProfileItemsResponse } from '../../composables/admin/profile/types';
import api from './../axiosInstance';

export const getProfile = async (): Promise<Profile> => {
  try {
    const response = await api.get<Profile>('/api/admin/profile');
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('通信に失敗しました');
  }
};

export const updateProfile = async (profile: Profile): Promise<void> => {
  try {
    await api.put(`/api/admin/profile/${profile.id}`, profile);
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('通信に失敗しました');
  }
};


export const updateProfileItems = async (request: ProfileItemsRequest) => {
  try {
    const response = await api.post('/api/admin/profile-items', request);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('通信に失敗しました');
  }
};

export const getProfileItems = async (): Promise<ProfileItemsResponse> => {
  try {
    const response = await api.get('/api/admin/profile-items');
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('通信に失敗しました');
  }
};