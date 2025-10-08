export interface Work {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkResponse {
  data: Work[] | null;
  error: string | null;
}

let works: Work[] = [
  {
    id: 1,
    title: 'ポートフォリオサイト',
    description: 'Vue + TS + Spring Boot + PostgreSQL で作成',
    imageUrl: 'https://example.com/image1.png',
    techStack: ['Vue', 'TypeScript', 'Spring Boot'],
    url: 'https://portfolio.example.com',
    createdAt: '2025-09-15T00:00:00Z',
    updatedAt: '2025-09-15T00:00:00Z',
  },
  {
    id: 2,
    title: 'Todoアプリ',
    description: 'Vue + TS で作成',
    imageUrl: 'https://example.com/image2.png',
    techStack: ['Vue', 'TypeScript'],
    url: 'https://todo.example.com',
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

export const createWork = (work: Omit<Work, 'id' | 'createdAt' | 'updatedAt'>) => {
  const newWork: Work = {
    id: works.length + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...work,
  };
  works.push(newWork);
  return Promise.resolve(newWork);
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
