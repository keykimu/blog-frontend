import type { PublicWorkResponse } from './types';
import app from '../../axiosInstance';

export const fetchPublicWorks = async (): Promise<PublicWorkResponse[]> => {
  const response = await app.get<PublicWorkResponse[]>('/api/works');
  return response.data;
};
