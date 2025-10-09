export interface Work {
  id: number;
  title: string;
  description: string;
  url: string;
  techStack: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkResponse {
  data: Work | null;
  error: string | null;
}

export interface WorkCreateRequest {
  title: string;
  description: string;
  url: string;
  techStack: string;
}

export interface WorkCreateResponse {
  data: Work | null;
  error: string | null;
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

import api from "./axiosInstance"

export const getWorks = async (): Promise<WorkResponse> => {
  try {
    const response = await api.get('/api/works');
    return { data: response.data, error: null };
  } catch (err: any) {
    if(err.response){
      return { data: null, error: err.response?.data?.error };
    }
    return { data: null, error: '通信に失敗しました' };
  }
};
export const getWorkById = (id: number): Promise<Work | undefined> => {
  return new Promise((resolve) => setTimeout(() => resolve(works.find((w) => w.id === id)), 300));
};

export const createWork = async (work: Omit<Work, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const request: WorkCreateRequest = {
      title: work.title,
      description: work.description,
      url: work.url,
      techStack: work.techStack,
    };
    const response = await api.post('/api/works', request);
    return { data: response.data, error: null };
  } catch (error: any) {
    if(error.response){
      return { data: null, error: error.response?.data?.error };
    }
    return { data: null, error: '通信に失敗しました' };
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
