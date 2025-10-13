import api from '../api/axiosInstance';
import type {
  Career,
  Hobby,
  Profile,
  Event,
  Certificate,
  HobbyCreateRequest,
  CareerCreateRequest,
  EventCreateRequest,
  CertificateCreateRequest,
} from '../composables/admin/profile/types/indet';

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


export const getHobbies = async (): Promise<Hobby[]> => {
  try {
    const response = await api.get<Hobby[]>('/api/hobby');
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.error || '趣味取得に失敗しました');
  }
};

export const updateHobby = async (request: HobbyCreateRequest): Promise<Hobby[]> => {
  try {
    const response = await api.post(`/api/hobby`, request);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.error || '趣味更新に失敗しました');
  }
};

export const getCareers = async (): Promise<Career[]> => {
  try {
    const response = await api.get<Career[]>('/api/careers');
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.error || '経歴取得に失敗しました');
  }
};

export const updateCareer = async (request: CareerCreateRequest): Promise<Career[]> => {
  try {
    const response = await api.post(`/api/careers`, request);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.error || '経歴更新に失敗しました');
  }
};

export const getEvents = async (): Promise<Event[]> => {
  try {
    const response = await api.get<Event[]>('/api/events');
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.error || 'イベント取得に失敗しました');
  }
};

export const updateEvent = async (request: EventCreateRequest): Promise<Event[]> => {
  try {
    const response = await api.post(`/api/events`, request);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.error || 'イベント更新に失敗しました');
  }
};

export const getCertificates = async (): Promise<Certificate[]> => {
  try {
    const response = await api.get<Certificate[]>('/api/certificates');
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.error || '資格取得に失敗しました');
  }
};

export const updateCertificate = async (request: CertificateCreateRequest): Promise<Certificate[]> => {
  try {
    const response = await api.post(`/api/certificates`, request);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.error || '資格更新に失敗しました');
  }
};
