import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getWorkById, updateWork } from '../../../../api/works';
import type { Work } from '../types';

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

  // 成果物を取得
  const fetchWork = async () => {
    try {
      const id = Number(route.params.id);
      work.value = await getWorkById(id);
    } catch (error: any) {
      errorMessage.value = error.message || '取得に失敗しました';
    }
  };

  // 成果物を更新
  const update = async () => {
    if (!work.value) return;
    try {
      const response = await updateWork(work.value);
      if (response) {
        router.push('/admin/works');
      } else {
        errorMessage.value = response.error;
      }
    } catch (error: any) {
      errorMessage.value = '更新に失敗しました';
    }
  };

  onMounted(fetchWork);

  return {
    work,
    errorMessage,
    fetchWork,
    update,
  };
};
