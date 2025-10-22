import type { Profile } from "./types";

export const validateProfile = (profile: Profile): string | null => {
  const checkRequired = (value: string | undefined, fieldName: string) => {
    if (!value?.trim()) return `${fieldName} は必須です`;
    return null;
  };

  const checkLength = (value: string | undefined, max: number, fieldName: string) => {
    if (value && value.length > max) return `${fieldName} は${max}文字以内で入力してください`;
    return null;
  };

  // 名前関連
  let err = checkRequired(profile.name, '名前') || checkLength(profile.name, 255, '名前');
  if (err) return err;

  err = checkRequired(profile.nickname, 'ニックネーム') || checkLength(profile.nickname, 255, 'ニックネーム');
  if (err) return err;

  err = checkRequired(profile.nameEn, '英語名') || checkLength(profile.nameEn, 255, '英語名');
  if (err) return err;

  // 一言
  err = checkRequired(profile.intro, '一言') || checkLength(profile.intro, 255, '一言');
  if (err) return err;

  // 自己紹介
  err = checkRequired(profile.bio, '自己紹介') || checkLength(profile.bio, 500, '自己紹介');
  if (err) return err;

  // メール
  err = checkRequired(profile.mail, 'メール') || checkLength(profile.mail, 255, 'メール');
  if (err) return err;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(profile.mail)) return 'メールの形式が正しくありません';

  // GitHub
  err = checkRequired(profile.github, 'GitHub') || checkLength(profile.github, 255, 'GitHub');
  if (err) return err;
  const githubRegex = /^[a-zA-Z0-9_-]+$/;
  if (!githubRegex.test(profile.github)) return 'GitHubは半角英数字、ハイフン、アンダースコアのみ使用可能です';

  return null;
};
