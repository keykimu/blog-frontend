import type { WorkCreateRequest } from "./new/types";

export const validateWork = (work: WorkCreateRequest) => {
  if (!work.title?.trim()) return 'タイトルは必須です';
  if (!work.description?.trim()) return '説明は必須です';
  if (work.title.length > 100) return 'タイトルは100文字以内です';
  if (work.description.length > 1000) return '説明は1000文字以内です';
  if (work.url.length > 255 ) return "画像urlは255文字以内です";
  if (work.techStack.length > 255 ) return "タグは255文字以内です";
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