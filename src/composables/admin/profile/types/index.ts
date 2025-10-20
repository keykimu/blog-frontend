export interface Profile {
  id: number;
  name: string;
  nickname: string;
  nameEn: string;
  intro: string;
  bio: string;
  mail: string;
  github: string;
  createdAt: string;
  updatedAt: string;
}

export interface Hobby {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Career {
  id: number;
  year: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: number;
  year: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Certificate {
  id: number;
  year: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface HobbyListRequest {
  hobbies: { name: string }[];
}

export interface CareerListRequest {
  careers: { year: string; name: string }[];
}

export interface EventListRequest {
  events: { year: string; name: string }[];
}

export interface CertificateListRequest {
  certificates: { year: string; name: string }[];
}

export interface ProfileItemsRequest {
  hobbyListRequest: HobbyListRequest;
  careerListRequest: CareerListRequest;
  eventListRequest: EventListRequest;
  certificateListRequest: CertificateListRequest;
}

export interface ProfileItemsResponse {
  hobbyResponse: Hobby[];
  careerResponse: Career[];
  eventResponse: Event[];
  certificateResponse: Certificate[];
}
