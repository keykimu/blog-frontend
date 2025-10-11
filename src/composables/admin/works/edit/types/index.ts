export interface Work {
  id: number;
  title: string;
  description: string;
  url: string;
  techStack: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkEditRequest {
  id: number;
  title: string;
  description: string;
  url: string;
  techStack: string;
}
