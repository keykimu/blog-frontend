<template>
  <div class="skill">
    <h2>スキル管理</h2>

    <section>
      <h3>言語</h3>
      <table class="language-table">
        <thead>
          <tr>
            <th class="name">項目<span class="required">*</span></th>
            <th class="level">レベル</th>
            <th class="experience">経験歴</th>
            <th class="delete">操作</th>
          </tr>
        </thead>
        <tr v-for="(lang, index) in languages" :key="index">
          <td><input v-model="lang.name" /></td>
          <td><input v-model.number="lang.level" /></td>
          <td><input v-model="lang.experience" /></td>
          <td>
            <button class="delete-button" @click="removeLanguage(index)">削除</button>
          </td>
        </tr>
      </table>
      <button class="insert-button" @click="addLanguage">追加</button>
    </section>

    <section>
      <h3>フレームワーク</h3>
      <table class="framework-table">
        <thead>
          <tr>
            <th class="name">項目<span class="required">*</span></th>
            <th class="level">レベル</th>
            <th class="delete">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(fw, index) in frameworks" :key="index">
            <td><input v-model="fw.name" /></td>
            <td><input v-model="fw.level" /></td>
            <td>
              <button class="delete-button" @click="removeFramework(index)">削除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button class="insert-button" @click="addFramework">追加</button>
    </section>

    <section>
      <h3>その他</h3>
      <table class="other-table">
        <thead>
          <tr>
            <th class="name">項目<span class="required">*</span></th>
            <th class="level">レベル</th>
            <th class="delete">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(other, index) in others" :key="index">
            <td><input v-model="other.name" /></td>
            <td><input v-model="other.level" /></td>
            <td>
              <button class="delete-button" @click="removeOther(index)">削除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button class="insert-button" @click="addOther">追加</button>
    </section>

    <div class="itemErrorMessage">{{ errorMessage }}</div>
    <div class="update-button-area">
      <button class="update-button" @click="handleSaveAll">保存</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useSkills } from '../../composables/admin/skills/useSkills';
import { useRouter } from 'vue-router';

const router = useRouter();
const {
  languages,
  frameworks,
  others,
  errorMessage,
  fetchAllSkills,
  updateAllSkills,
  addLanguage,
  removeLanguage,
  addFramework,
  removeFramework,
  addOther,
  removeOther,
} = useSkills();

onMounted(fetchAllSkills);

const handleSaveAll = async () => {
  const result = await updateAllSkills();
  if (result?.success) {
    alert('スキルを保存しました');
    router.push('/admin/top');
  }
};
</script>

<style lang="scss" scoped>
.required {
  color: red;
}
.skill {
  padding: 2rem;

  table {
    margin-bottom: 8px;
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 4px 8px;
    border: 1px solid #ccc;
    text-align: center;
  }

  th {
    background-color: #2f364bb7;
  }

  .name {
    width: 300px;
  }

  .level {
    width: 600px;
  }

  .experience {
    width: 70px;
  }

  .delete {
    width: 40px;
  }

  input {
    width: 95%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
  }

  section {
    margin-bottom: 20px;
  }

  .update-button-area {
    text-align: center;
    .update-button {
      padding: 0.5rem 1rem;
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

  .insert-button {
    padding: 0.5rem 1rem;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;
    &:hover {
      background-color: #45a049;
    }
  }

  .delete-button {
    padding: 0.5rem 1rem;
    background-color: #f63b3b;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;
    &:hover {
      background-color: #bb1010;
    }
  }

  @media (max-width: 768px) {
    padding: 0rem;
    padding-top: 3rem;
    padding-right: 2rem;
    padding-bottom: 2rem;

    table,
    thead,
    tbody,
    tr,
    th,
    td {
      display: block;
    }

    thead {
      display: none;
    }

    tr {
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
    }

    td {
      display: flex;
      justify-content: space-between;
      padding: 0.3rem 0;
    }

    td input {
      flex: 1;
      margin-left: 0.5rem;
    }
    /* --- 言語テーブル（4列） --- */
    .language-table td:nth-child(1)::before {
      content: '項目';
    }
    .language-table td:nth-child(2)::before {
      content: 'レベル';
    }
    .language-table td:nth-child(3)::before {
      content: '経験歴';
    }
    .language-table td:nth-child(4)::before {
      content: '操作';
    }

    /* --- フレームワーク／その他テーブル（3列） --- */
    .framework-table td:nth-child(1)::before,
    .other-table td:nth-child(1)::before {
      content: '項目';
    }
    .framework-table td:nth-child(2)::before,
    .other-table td:nth-child(2)::before {
      content: 'レベル';
    }
    .framework-table td:nth-child(3)::before,
    .other-table td:nth-child(3)::before {
      content: '操作';
    }
    td::before {
      font-weight: bold;
      flex: 0 0 20%;
      background-color: #2f364bb7;
    }

    input,
    .delete-button {
      margin-right: 0.5rem;
    }
  }
}
</style>
