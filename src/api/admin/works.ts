
import type { WorkEditRequest } from "../../composables/admin/works/edit/types";
import type { WorkCreateRequest } from "../../composables/admin/works/new/types";
import type { Work } from "../../composables/admin/works/types";
import api from "../axiosInstance"

export const getWorksAPI = async (): Promise<Work[]> => {
  try {
    const response = await api.get<Work[]>('/api/admin/works');
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('通信に失敗しました');
  }
};

export const getWorkById = async (id: number): Promise<Work> => {
  try {
    const response = await api.get<Work>(`/api/admin/works/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('通信に失敗しました');
  }
};

export const createWorkAPI = async (createRequest: WorkCreateRequest) => {
  try {
    const request = toWorkFormData(createRequest);
    const response = await api.post('/api/admin/works', request);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('通信に失敗しました');
  }
};

export const updateWork = async (work: Work, file: File | null) => {
  try {
    const request: WorkEditRequest = {
      id:work.id,
      title: work.title,
      description: work.description,
      techStack: work.techStack,
      file,
    }
    const response = await api.put(`/api/admin/works/${work.id}`, toWorkFormData(request));
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('通信に失敗しました');
  }
};

const toWorkFormData = (request: WorkCreateRequest | WorkEditRequest): FormData => {
  const formData = new FormData();
  formData.append('title', request.title);
  formData.append('description', request.description);
  formData.append('techStack', request.techStack || '');
  if (request.file) formData.append('file', request.file);
  return formData;
};

export const deleteWork = async (id: number): Promise<void> => {
  try {
    await api.delete(`/api/admin/works/${id}`);
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('通信に失敗しました');
  }
};
