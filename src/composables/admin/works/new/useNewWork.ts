import { ref } from "vue";
import { useRouter } from "vue-router";
import type { WorkCreateRequest } from "./types";
import { createWorkAPI } from "../../../../api/works";

export const useNewWork = () => {
  const errorMessage = ref<string | null>(null);
  const router = useRouter();

  const validateWork = (work: WorkCreateRequest) => {
    if (!work.title?.trim()) return 'タイトルは必須です';
    if (!work.description?.trim()) return '説明は必須です';
    if (work.title.length > 100) return 'タイトルは100文字以内です';
    if (work.description.length > 1000) return '説明は1000文字以内です';
    if (work.techStack) {
      const stack = work.techStack.trim();
    
      // 最初・最後のカンマチェック
      if (stack.startsWith(',') || stack.endsWith(',')) {
        return 'タグの最初と最後にカンマは置けません';
      }
      
      const tags = work.techStack.split(',').map(t => t.trim()).filter(t => t);
      if (tags.some(t => t.length > 30)) return 'タグは1つにつき30文字以内にしてください';
    }
    
    return null;
  };

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