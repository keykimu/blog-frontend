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

export interface HobbyCreateItemRequest {
  name: string;
}

export interface CareerCreateItemRequest {
  year: string;
  name: string;
}

export interface EventCreateItemRequest {
  year: string;
  name: string;
}

export interface CertificateCreateItemRequest {
  year: string;
  name: string;
}


export interface HobbyCreateRequest {
  hobbies: HobbyCreateItemRequest[];
}

export interface CareerCreateRequest {
  careers: CareerCreateItemRequest[];
}

export interface EventCreateRequest {
  events: EventCreateItemRequest[];
}

export interface CertificateCreateRequest {
  certificates: CertificateCreateItemRequest[];
}