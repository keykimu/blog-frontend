export interface PublicHobbyResponse {
  id: number;
  name: string;
}

export interface PublicCareerResponse {
  id: number;
  year: string;
  name: string;
}

export interface PublicEventResponse {
  id: number;
  year: string;
  name: string;
}

export interface PublicCertificateResponse {
  id: number;
  year: string;
  name: string;
}

export interface PublicProfileItemsResponse {
  hobbyResponse: PublicHobbyResponse[];
  careerResponse: PublicCareerResponse[];
  eventResponse: PublicEventResponse[];
  certificateResponse: PublicCertificateResponse[];
}
