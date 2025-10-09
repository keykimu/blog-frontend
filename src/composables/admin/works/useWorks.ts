import { ref } from "vue";
import { getWorksAPI, type Work } from "../../../api/works";

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

  return {works, errorMessage,fetchWorks}
};