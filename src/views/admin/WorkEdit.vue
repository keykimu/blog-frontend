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
        <label for="url">画像URL</label>
        <input id="url" v-model="work.url" type="text" placeholder="no_image.png"/>
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

    <div class="preview">
      <label>プレビュー</label>
      <pre>{{ work }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditWork } from '../../composables/admin/works/edit/useEditWork';

const TITLE_MAX = 100;
const DESCRIPTION_MAX = 1000;

const { work, errorMessage, update } = useEditWork();
</script>

<style lang="scss" scoped>
.required {
  color: red;
}
.work-edit {
  padding: 2rem;
  max-width: 700px;
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
        padding: 0.75rem;
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
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        background-color: #3b82f6;
        color: white;
        border: none;
        border-radius: 6px;
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
  }

  .preview {
    margin-top: 2rem;

    label {
      font-weight: bold;
      display: block;
      margin-bottom: 0.5rem;
    }

    pre {
      background-color: #f3f4f6;
      padding: 1rem;
      border-radius: 6px;
      overflow-x: auto;
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
