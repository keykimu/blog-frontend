export interface PublicLanguageResponse {
  id: number;
  name: string;
  level: string;
  experience: string;
}

export interface PublicFrameworkResponse {
  id: number;
  name: string;
  level: string;
}

export interface PublicOtherSkillResponse {
  id: number;
  name: string;
  level: string;
}

export interface PublicSkillsResponse {
  languageResponse: PublicLanguageResponse[];
  frameworkResponse: PublicFrameworkResponse[];
  otherSkillResponse: PublicOtherSkillResponse[];
}
