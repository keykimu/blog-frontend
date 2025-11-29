import type { PublicWorkResponse } from './types';
import app from '../../axiosInstance';

export const fetchPublicWorks = async (): Promise<PublicWorkResponse[]> => {
  const response = await app.get<PublicWorkResponse[]>('/api/works');
  return response.data;
};

export const fetchPublicWorkById = async (id: number): Promise<PublicWorkResponse> => {
  const response = await app.get<PublicWorkResponse>(`/api/works/${id}`);
  return response.data;
};
