export interface WorkCreateRequest {
  title: string;
  description: string;
  techStack: string;
  file: File | null;
}
