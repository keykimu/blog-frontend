import { ref } from 'vue';
import type {
  LanguageResponse, FrameworkResponse, OtherSkillResponse, SkillsRequest
} from './types/index';
import { getSkills, updateSkills } from '../../../api/skills';

export const useSkills = () => {
  const languages = ref<LanguageResponse[]>([]);
  const frameworks = ref<FrameworkResponse[]>([]);
  const others = ref<OtherSkillResponse[]>([]);
  const errorMessage = ref<string | null>(null);

  // --- 初期取得 ---
  const fetchAllSkills = async () => {
    try {
      const data = await getSkills();
      languages.value = [...data.languageResponse];
      frameworks.value = [...data.frameworkResponse];
      others.value = [...data.otherSkillResponse];
    } catch (err: any) {
      errorMessage.value = err.message || 'スキル取得に失敗しました';
    }
  };

  // --- 一括更新 ---
  const updateAllSkills = async () => {
    errorMessage.value = null;

    const request: SkillsRequest = {
      languageListRequest: { languages: languages.value.map(({ name, level, experience }) => ({ name, level, experience })) },
      frameworkListRequest: { frameworks: frameworks.value.map(({ name, level }) => ({ name, level })) },
      otherSkillListRequest: { otherSkills: others.value.map(({ name, level }) => ({ name, level })) },
    };

    try {
      await updateSkills(request);
      return { success: true };
    } catch (err: any) {
      errorMessage.value = err.message || '更新中にエラーが発生しました';
      return { success: false, error: errorMessage.value };
    }
  };

  // --- CRUD 操作（ローカル用） ---
  const addLanguage = () => languages.value.push({ id: 1, name: '', level: '', experience: '' } as LanguageResponse);
  const removeLanguage = (index: number) => languages.value.splice(index, 1);

  const addFramework = () => frameworks.value.push({ id: 1, name: '', level: '', createdAt: '', updatedAt: '' } as FrameworkResponse);
  const removeFramework = (index: number) => frameworks.value.splice(index, 1);

  const addOther = () => others.value.push({ id: 1, name: '', level: '', createdAt: '', updatedAt: '' } as OtherSkillResponse);
  const removeOther = (index: number) => others.value.splice(index, 1);

  return {
    languages,
    frameworks,
    others,
    errorMessage,
    fetchAllSkills,
    updateAllSkills,
    addLanguage,
    removeLanguage,
    addFramework,
    removeFramework,
    addOther,
    removeOther,
  };
};
