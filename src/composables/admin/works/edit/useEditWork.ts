import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getWorkById, updateWork } from '../../../../api/admin/works';
import type { Work } from '../types';
import { validateWork } from '../useValidation';

export const useEditWork = () => {
  const route = useRoute();
  const router = useRouter();

  const work = ref<Work>({
    id: 0,
    title: '',
    description: '',
    techStack: '',
    url: '',
    createdAt: '',
    updatedAt: ''
  });
  const errorMessage = ref<string | null>(null);
  const imageFile = ref<File | null>(null);

  // 成果物を取得
  const fetchWork = async () => {
    try {
      const id = Number(route.params.id);
      work.value = await getWorkById(id);
    } catch (err: any) {
      errorMessage.value = err?.message || '通信に失敗しました';
    }
  };

  // 成果物を更新
  const update = async () => {
    if (!work.value) return;
    const error = validateWork({ ...work.value, file: imageFile.value });
    if (error) {
      errorMessage.value = error;
      return;
    }
    try {
      const response = await updateWork(work.value, imageFile.value);
      if (response) {
        alert(`成果物ページ${work.value.title}を更新しました`);
        router.push('/admin/works');
      } else {
        errorMessage.value = response.error;
      }
    } catch (err: any) {
      errorMessage.value = err?.message || '通信に失敗しました';
    }
  };

  onMounted(fetchWork);

  return {
    work,
    errorMessage,
    imageFile,
    fetchWork,
    update,
  };
};
