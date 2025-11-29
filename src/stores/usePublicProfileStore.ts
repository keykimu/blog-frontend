import { defineStore } from "pinia";
import { ref } from "vue";
import type { PublicProfileResponse } from "../api/public/profile/types";
import { fetchPublicProfile } from "../api/public/profile/profile";


export const usePublicProfileStore = defineStore('publicProfile', () => {
  const profile = ref<PublicProfileResponse | null>(null);

  const loadProfile = async () => {
    profile.value = await fetchPublicProfile();
  };

  return { profile, loadProfile };
});