import { ref } from "vue";
import { useRouter } from "vue-router";
import type { WorkCreateRequest } from "./types";
import { createWorkAPI } from "../../../../api/works";

export const useNewWork = () => {
  const errorMessage = ref<string | null>(null);
  const router = useRouter();

  const createWork = async (request: WorkCreateRequest) => {
    try{
      await createWorkAPI(request);
      router.push('/admin/works');
    }catch(err: any){
      if (err.response?.data?.error) {
        throw new Error(err.response.data.error);
      }
      throw new Error('通信に失敗しました');
    }
  };

  return { errorMessage, createWork };
}