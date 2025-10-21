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
      errorMessage.value = err?.message || '通信に失敗しました';
    }
  }

  const removeWork = async (id: number) => {
    try {
      await deleteWork(id);
    } catch (err: any) {
      errorMessage.value = err?.message || '通信に失敗しました';
    }
  };

  return {works, errorMessage,fetchWorks,removeWork}
};