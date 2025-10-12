import { ref } from "vue";
import { deleteWork, getWorksAPI } from "../../../api/works";
import type { Work } from "./types";

export const useWorks = () => {
  const works = ref<Work[]>([]);
  const errorMessage = ref<string | null>(null);

  const fetchWorks = async () => {
    try {
      works.value = await getWorksAPI();
    } catch (err: any) {
      errorMessage.value = err.message;
    }
  }

  const removeWork = async (id: number) => {
    try {
      await deleteWork(id);
    } catch (error: any) {
      errorMessage.value = error.message || '削除に失敗しました';
    }
  };

  return {works, errorMessage,fetchWorks,removeWork}
};