<template>
  <NavigationBar />
  <div class="new-work">
    <h2>成果物作成</h2>
    <form @submit.prevent="create" class="work-form">
      <div class="form-row">
        <label for="title">タイトル<span class="required">*</span></label>
        <input id="title" v-model="work.title" required />
        <small>{{ work.title.length }} / {{ TITLE_MAX }}</small>
      </div>

      <div class="form-row">
        <label for="description">説明<span class="required">*</span></label>
        <textarea id="description" v-model="work.description" required></textarea>
        <small>{{ work.description.length }} / {{ DESCRIPTION_MAX }}</small>
      </div>

      <div class="form-row">
        <label for="imageUrl">画像URL</label>
        <input id="imageUrl" v-model="work.url" placeholder="no_image.png" />
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
import { ref } from 'vue';
import type { WorkCreateRequest } from '../../composables/admin/works/new/types';
import { useNewWork } from '../../composables/admin/works/new/useNewWork';

const TITLE_MAX = 100;
const DESCRIPTION_MAX = 1000;

const work = ref<WorkCreateRequest>({
  title: '',
  description: '',
  url: '',
  techStack: '',
});
const { errorMessage, createWork } = useNewWork();

const create = async () => {
  await createWork(work.value);
};
</script>

<style scoped lang="scss">
.required {
  color: red;
}
.new-work {
  padding: 2rem;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 0rem;
    padding-top: 3rem;
    padding-right: 2rem;
    padding-bottom: 2rem;
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
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
      }

      textarea {
        min-height: 120px;
        resize: vertical;
      }

      small {
        margin-left: auto;
      }
    }

    .form-actions {
      display: flex;
      justify-content: center;

      button {
        padding: 0.5rem 1rem;
        font-size: 1rem;
        background-color: #4caf50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        &:hover {
          background-color: #45a049;
        }
      }
    }
  }
}
</style>
