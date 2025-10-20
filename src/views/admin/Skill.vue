<template>
  <div class="skill">
    <h2>スキル管理</h2>

    <!-- 言語 -->
    <section>
      <h3>言語</h3>
      <table border="1">
        <thead>
          <tr>
            <th>項目</th>
            <th>レベル</th>
            <th>経験歴</th>
            <th>操作</th>
          </tr>
        </thead>
        <tr v-for="(lang, index) in languages" :key="index">
          <td><input v-model="lang.name" /></td>
          <td><input v-model.number="lang.level" /></td>
          <td><input v-model="lang.experience" /></td>
          <td>
            <button @click="removeLanguage(index)">削除</button>
          </td>
        </tr>
      </table>
      <button @click="addLanguage">追加</button>
    </section>

    <!-- フレームワーク -->
    <section>
      <h3>フレームワーク</h3>
      <table border="1">
        <thead>
          <tr>
            <th>項目</th>
            <th>レベル</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(fw, index) in frameworks" :key="index">
            <td><input v-model="fw.name" /></td>
            <td><input v-model="fw.level" /></td>
            <td>
              <button @click="removeFramework(index)">削除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="addFramework">追加</button>
    </section>

    <!-- その他 -->
    <section>
      <h3>その他</h3>
      <table border="1">
        <thead>
          <tr>
            <th>項目</th>
            <th>レベル</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(other, index) in others" :key="index">
            <td><input v-model="other.name" /></td>
            <td><input v-model="other.level" /></td>
            <td>
              <button @click="removeOther(index)">削除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="addOther">追加</button>
    </section>

    <br />
    <div class="itemErrorMessage">{{ errorMessage }}</div>
    <button @click="handleSaveAll">保存</button>
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
  removeOther
} = useSkills();

onMounted(fetchAllSkills);

const handleSaveAll = async () => {
  const result = await updateAllSkills();
  if (result.success) {
    alert('スキルを保存しました');
    router.push('/admin/top');
  }
};
</script>

<style scoped>
.skill {
  padding: 2rem;
  .table {
    margin-bottom: 8px;
    width: 100%;
    border-collapse: collapse;
  }
  th,
  td {
    padding: 4px 8px;
    text-align: left;
  }
  input {
    width: 100%;
  }
  section {
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    padding: 0rem;
    padding-top: 3rem;
    padding-right: 2rem;
    padding-bottom: 2rem;
  }
}
</style>
