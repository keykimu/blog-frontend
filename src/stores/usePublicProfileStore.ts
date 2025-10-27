import { defineStore } from "pinia";
import { ref } from "vue";
import type { PublicProfileResponse } from "../api/public/profile/types";


export const usePublicProfileStore = defineStore('publicProfile', () => {
  const profile = ref<PublicProfileResponse | null>(null);

  const setProfile = (data: PublicProfileResponse) => {
    profile.value = data;
  };

  return { profile, setProfile };
});