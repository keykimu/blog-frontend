import { ref } from "vue";
import { useRouter } from "vue-router";
import type { WorkCreateRequest } from "./types";
import { createWorkAPI } from "../../../../api/admin/works";
import { validateWork } from "../useValidation";

export const useNewWork = () => {
  const errorMessage = ref<string | null>(null);
  const router = useRouter();

  const createWork = async (request: WorkCreateRequest) => {
    const error = validateWork(request);
    if (error) {
      errorMessage.value = error;
      return;
    }
    try{
      await createWorkAPI(request);
      alert('成果物ページを作成しました');
      router.push('/admin/works');
    }catch(err: any){
      errorMessage.value = err?.message || '通信に失敗しました';
    }
  };

  return { errorMessage, createWork };
}