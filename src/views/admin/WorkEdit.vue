<template>
  <div class="work-edit">
    <h2>成果物編集</h2>
    <form @submit.prevent="update" class="work-form">
      <div class="form-row">
        <label for="title">タイトル<span class="required">*</span></label>
        <input id="title" v-model="work.title" type="text" />
        <small>{{ work.title.length }} / {{ TITLE_MAX }}</small>
      </div>

      <div class="form-row">
        <label for="description">説明<span class="required">*</span></label>
        <textarea id="description" v-model="work.description"></textarea>
        <small>{{ work.description.length }} / {{ DESCRIPTION_MAX }}</small>
      </div>

      <div class="form-row">
        <label for="imageFile">成果物画像</label>
        <input id="imageFile" type="file" accept="image/*" @change="selectImage" />
        <small>変更しない場合は現在の画像が保持されます（1MB以下）</small>
        <img v-if="previewUrl" :src="previewUrl" alt="成果物画像のプレビュー" class="image-preview" />
      </div>

      <div class="form-row">
        <label for="techStack">タグ（,区切り）</label>
        <input id="techStack" v-model="work.techStack" placeholder="Vue, TypeScript, Spring Boot" />
      </div>

      <div v-if="errorMessage" class="error">
        {{ errorMessage }}
      </div>

      <div class="form-actions">
        <button type="submit">保存</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useEditWork } from '../../composables/admin/works/edit/useEditWork';
import { resolveStorageUrl } from '../../utils/storageUrl';

const TITLE_MAX = 100;
const DESCRIPTION_MAX = 1000;

const { work, imageFile, errorMessage, update } = useEditWork();
const selectedPreviewUrl = ref('');
const previewUrl = computed(() => selectedPreviewUrl.value || resolveStorageUrl(work.value.url));

const selectImage = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0] ?? null;
  imageFile.value = file;
  if (selectedPreviewUrl.value) URL.revokeObjectURL(selectedPreviewUrl.value);
  selectedPreviewUrl.value = file ? URL.createObjectURL(file) : '';
};
</script>

<style lang="scss" scoped>
.required {
  color: red;
}
.work-edit {
  padding: 2rem;
  margin: 0 auto;
  @media (max-width: 768px) {
    padding: 0rem;
    padding-top: 3rem;
    padding-right: 2rem;
    padding-bottom: 2rem;
  }

  h2 {
    margin-bottom: 1.5rem;
  }

  .work-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .form-row {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      label {
        font-weight: bold;
      }

      input,
      textarea {
        padding: 0.5rem;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 6px;
        width: 100%;
        box-sizing: border-box;
      }

      textarea {
        min-height: 120px;
        resize: vertical;
      }
    }

    .form-actions {
      display: flex;
      justify-content: center;

      button {
        padding: 0.5rem 1rem;
        background-color: #3b82f6;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
          background-color: #2563eb;
        }
      }
    }
    small {
      margin-left: auto;
    }
    .image-preview {
      max-width: 320px;
      max-height: 220px;
      object-fit: contain;
      border-radius: 8px;
    }
  }

  @media (max-width: 768px) {
    padding: 0rem;
    padding-top: 3rem;
    padding-right: 2rem;
    padding-bottom: 2rem;
  }
}
</style>
