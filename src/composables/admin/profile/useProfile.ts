import { ref, onMounted } from 'vue';
import { getProfile, updateProfile } from '../../../api/profile';
import type { Profile } from './types';
import { useRouter } from 'vue-router';
import { validateProfile } from './useValidation';

export const useProfile = () => {
  const router = useRouter();
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
    const error = validateProfile(profile.value);
    if (error) {
      errorMessage.value = error;
      return;
    }
    try {
      await updateProfile(profile.value);
      alert('基本情報を保存しました');
      router.push('/admin/top');
    } catch (err: any) {
      errorMessage.value = err?.message || '通信に失敗しました';
    }
  };

  onMounted(fetchProfile);

  return { profile, errorMessage, fetchProfile, saveBasic };
};
