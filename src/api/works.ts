export interface Work {
  id: number;
  title: string;
  description: string;
  url: string;
  techStack: string;
  createdAt: string;
  updatedAt: string;
}

import type { WorkEditRequest } from "../composables/admin/works/edit/types";
import type { WorkCreateRequest } from "../composables/admin/works/new/types";
import api from "./axiosInstance"

export const getWorksAPI = async (): Promise<Work[]> => {
  try {
    const response = await api.get<Work[]>('/api/works');
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('通信に失敗しました');
  }
};

export const getWorkById = async (id: number): Promise<Work> => {
  try {
    const response = await api.get<Work>(`/api/works/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error('取得に失敗しました');
  }
};

export const createWorkAPI = async (createRequest: WorkCreateRequest) => {
  try {
    const request: WorkCreateRequest = {
      title: createRequest.title,
      description: createRequest.description,
      url: createRequest.url,
      techStack: createRequest.techStack,
    };
    const response = await api.post('/api/works', request);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('通信に失敗しました');
  }
};

export const updateWork = async (work: Work) => {
  try {
    const request: WorkEditRequest = {
      id:work.id,
      title: work.title,
      description: work.description,
      techStack: work.techStack,
      url: work.url
    }
    const response = await api.put(`/api/works/${work.id}`, request);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('通信に失敗しました');
  }
};

export const deleteWork = async (id: number): Promise<void> => {
  try {
    await api.delete(`/api/works/${id}`);
  } catch (error: any) {
    console.error('削除に失敗しました:', error);
    throw new Error(
      error.response?.data?.error || '削除に失敗しました'
    );
  }
};
