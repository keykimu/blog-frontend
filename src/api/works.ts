export interface Work {
  id: number;
  title: string;
  description: string;
  url: string;
  techStack: string;
  createdAt: string;
  updatedAt: string;
}


let works: Work[] = [
  {
    id: 1,
    title: 'ポートフォリオサイト',
    description: 'Vue + TS + Spring Boot + PostgreSQL で作成',
    url: 'https://example.com/image1.png',
    techStack: 'Vue, TypeScript, Spring Boot',
    createdAt: '2025-09-15T00:00:00Z',
    updatedAt: '2025-09-15T00:00:00Z',
  },
  {
    id: 2,
    title: 'Todoアプリ',
    description: 'Vue + TS で作成',
    url: 'https://example.com/image2.png',
    techStack: 'Vue, TypeScript',
    createdAt: '2025-09-10T00:00:00Z',
    updatedAt: '2025-09-12T00:00:00Z',
  },
];

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

export const getWorkById = (id: number): Promise<Work | undefined> => {
  return new Promise((resolve) => setTimeout(() => resolve(works.find((w) => w.id === id)), 300));
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

export const updateWork = (id: number, data: Partial<Work>) => {
  const index = works.findIndex((w) => w.id === id);
  if (index === -1) return Promise.reject('Not found');
  works[index] = { ...works[index], ...data, updatedAt: new Date().toISOString() };
  return Promise.resolve(works[index]);
};

export const deleteWork = (id: number) => {
  works = works.filter((w) => w.id !== id);
  return Promise.resolve();
};
