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
          <td><input v-model.number="lang.level" type="number" /></td>
          <td><input v-model="lang.experience" type="text" /></td>
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
            <td><input v-model.number="fw.level" type="number" /></td>
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
            <td><input v-model.number="other.level" type="number" /></td>
            <td>
              <button @click="removeOther(index)">削除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="addOther">追加</button>
    </section>

    <br />
    <button @click="saveAll">保存（モック）</button>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

// 言語スキル
const languages = reactive([
  { name: 'JavaScript', level: 4, experience: '3年' },
  { name: 'TypeScript', level: 4, experience: '2年' },
]);

// フレームワークスキル
const frameworks = reactive([
  { name: 'Vue', level: 4 },
  { name: 'Spring Boot', level: 3 },
]);

// その他スキル
const others = reactive([
  { name: 'Git', level: 4 },
  { name: 'Docker', level: 3 },
]);

// CRUD 用関数
function addLanguage() {
  languages.push({ name: '', level: 1, experience: '' });
}
function removeLanguage(index: number) {
  languages.splice(index, 1);
}

function addFramework() {
  frameworks.push({ name: '', level: 1 });
}
function removeFramework(index: number) {
  frameworks.splice(index, 1);
}

function addOther() {
  others.push({ name: '', level: 1 });
}
function removeOther(index: number) {
  others.splice(index, 1);
}

function saveAll() {
  alert('保存処理（モック）\n' + JSON.stringify({ languages, frameworks, others }, null, 2));
}
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
