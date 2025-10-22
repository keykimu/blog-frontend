import type { SkillsRequest } from "./types";

export const validateSkill = (SkillsRequest: SkillsRequest) => {
  const checkLength = (value: string | undefined, fieldName: string, required = true) => {
    if (required && !value?.trim()) return `${fieldName} は必須です`;
    if (value && value.length > 255) return `${fieldName} は255文字以内で入力してください`;
    return null;
  };

  // Language
  for (const lang of SkillsRequest.languageListRequest.languages || []) {
    let err = checkLength(lang.name, '言語名', true);
    if (err) return err;

    err = checkLength(lang.level, '言語レベル', false);
    if (err) return err;

    err = checkLength(lang.experience, '言語経験', false);
    if (err) return err;
  }

  // Framework
  for (const fw of SkillsRequest.frameworkListRequest.frameworks || []) {
    let err = checkLength(fw.name, 'フレームワーク名', true);
    if (err) return err;

    err = checkLength(fw.level, 'フレームワークレベル', false);
    if (err) return err;
  }

  // OtherSkill
  for (const os of SkillsRequest.otherSkillListRequest.otherSkills || []) {
    let err = checkLength(os.name, 'その他スキル名', true);
    if (err) return err;

    err = checkLength(os.level, 'その他スキルレベル', false);
    if (err) return err;
  }

  return null;
};