import { ref, onMounted } from 'vue';
import { getProfile, updateProfile } from '../../../api/profile';
import type { Profile } from './types/indet';

export const useProfile = () => {
  const profile = ref<Profile>({
    id: 1,
    name: '',
    nickname: '',
    nameEn: '',
    intro: '',
    bio: '',
    mail: '',
    github: '',
    createdAt: '',
    updatedAt: '',
  });
  const errorMessage = ref<string | null>(null);

  const fetchProfile = async () => {
    try {
      profile.value = await getProfile();
    } catch (err: any) {
      errorMessage.value = err.message;
    }
  };

  const saveBasic = async () => {
    if (!profile.value) return;
    try {
      await updateProfile(profile.value);
      alert('基本情報を保存しました');
    } catch (err: any) {
      errorMessage.value = err.message;
    }
  };

  onMounted(fetchProfile);

  return { profile, errorMessage, fetchProfile, saveBasic };
};
