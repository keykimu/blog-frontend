import type { ProfileItemsRequest } from "./types";

export const validateProfileItems = (items: ProfileItemsRequest): string | null => {
  const checkRequired = (value: string | undefined, fieldName: string) => {
    if (!value?.trim()) return `${fieldName} は必須です`;
    return null;
  };

  const checkLength = (value: string | undefined, max: number, fieldName: string) => {
    if (value && value.length > max) return `${fieldName} は${max}文字以内で入力してください`;
    return null;
  };

  // hobbies
  for (const [i, hobby] of (items.hobbyListRequest.hobbies || []).entries()) {
    let err = checkRequired(hobby.name, `趣味 #${i + 1} 名称`) || checkLength(hobby.name, 255, `趣味 #${i + 1} 名称`);
    if (err) return err;
  }

  // careers
  for (const [i, career] of (items.careerListRequest.careers || []).entries()) {
    let err = checkRequired(career.year, `経歴 #${i + 1} 年`) || checkLength(career.year, 255, `経歴 #${i + 1} 年`);
    if (err) return err;
    err = checkRequired(career.name, `経歴 #${i + 1} 名称`) || checkLength(career.name, 255, `経歴 #${i + 1} 名称`);
    if (err) return err;
  }

  // events
  for (const [i, event] of (items.eventListRequest.events || []).entries()) {
    let err = checkRequired(event.year, `イベント #${i + 1} 年`) || checkLength(event.year, 255, `イベント #${i + 1} 年`);
    if (err) return err;
    err = checkRequired(event.name, `イベント #${i + 1} 名称`) || checkLength(event.name, 255, `イベント #${i + 1} 名称`);
    if (err) return err;
  }

  // certificates
  for (const [i, cert] of (items.certificateListRequest.certificates || []).entries()) {
    let err = checkRequired(cert.year, `資格 #${i + 1} 年`) || checkLength(cert.year, 255, `資格 #${i + 1} 年`);
    if (err) return err;
    err = checkRequired(cert.name, `資格 #${i + 1} 名称`) || checkLength(cert.name, 255, `資格 #${i + 1} 名称`);
    if (err) return err;
  }

  return null;
};
