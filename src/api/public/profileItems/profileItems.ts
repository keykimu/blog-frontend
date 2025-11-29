import type { ProfileItemsResponse } from "../../../composables/admin/profile/types";
import app from "./../../axiosInstance";

export const fetchProfileItems = async (): Promise<ProfileItemsResponse> => {
  const response = await app.get<ProfileItemsResponse>(`/api/profile-items`);
  return response.data;
};