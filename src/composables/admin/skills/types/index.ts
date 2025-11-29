export interface LanguageRequest { name: string; level: string; experience: string; }
export interface FrameworkRequest { name: string; level: string; }
export interface OtherSkillRequest { name: string; level: string; }

export interface LanguageListRequest { languages: LanguageRequest[]; }
export interface FrameworkListRequest { frameworks: FrameworkRequest[]; }
export interface OtherSkillListRequest { otherSkills: OtherSkillRequest[]; }

export interface SkillsRequest {
  languageListRequest: LanguageListRequest;
  frameworkListRequest: FrameworkListRequest;
  otherSkillListRequest: OtherSkillListRequest;
}

export interface LanguageResponse extends LanguageRequest { id: number; createdAt: string; updatedAt: string; }
export interface FrameworkResponse extends FrameworkRequest { id: number; createdAt: string; updatedAt: string; }
export interface OtherSkillResponse extends OtherSkillRequest { id: number; createdAt: string; updatedAt: string; }

export interface SkillsResponse {
  languageResponse: LanguageResponse[];
  frameworkResponse: FrameworkResponse[];
  otherSkillResponse: OtherSkillResponse[];
}