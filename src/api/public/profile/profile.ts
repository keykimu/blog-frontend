import type { PublicProfileResponse } from "./types";
import app from "./../../axiosInstance"

export const fetchPublicProfile = async (): Promise<PublicProfileResponse> => {
  const response = await app.get<PublicProfileResponse>(`/api/profile`);
  return response.data;
};