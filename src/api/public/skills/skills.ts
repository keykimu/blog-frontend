import type { PublicSkillsResponse } from './types';
import app from '../../axiosInstance';

export const fetchPublicSkills = async (): Promise<PublicSkillsResponse> => {
  const response = await app.get<PublicSkillsResponse>(`/api/skills`);
  return response.data;
};
