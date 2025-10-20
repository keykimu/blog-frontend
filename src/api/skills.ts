import api  from './axiosInstance'; // 既存の api インスタンス
import type { SkillsRequest, SkillsResponse } from '../composables/admin/skills/types';

export const getSkills = async (): Promise<SkillsResponse> => {
  try {
    const response = await api.get<SkillsResponse>('/api/admin/skills');
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.error || 'スキル取得に失敗しました');
  }
};

export const updateSkills = async (request: SkillsRequest): Promise<SkillsResponse> => {
  try {
    const response = await api.post<SkillsResponse>('/api/admin/skills', request);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.error || 'スキル更新に失敗しました');
  }
};
