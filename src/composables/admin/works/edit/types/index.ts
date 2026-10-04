export interface WorkEditRequest {
  id: number;
  title: string;
  description: string;
  techStack: string;
  file: File | null;
}
