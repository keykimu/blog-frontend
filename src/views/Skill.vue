<template>
  <div class="skills">
    <h1>スキル</h1>

    <!-- 言語 -->
    <section>
      <h2>言語</h2>
      <table>
        <thead>
          <tr>
            <th>項目</th>
            <th>レベル</th>
            <th>経験歴</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="lang in languages" :key="lang.name">
            <td>{{ lang.name }}</td>
            <td>{{ lang.level }}</td>
            <td>{{ lang.year }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- フレームワーク -->
    <section>
      <h2>フレームワーク</h2>
      <table>
        <thead>
          <tr>
            <th>項目</th>
            <th>レベル</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="fw in frameworks" :key="fw.name">
            <td>{{ fw.name }}</td>
            <td>{{ fw.level }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- その他 -->
    <section>
      <h2>その他</h2>
      <table>
        <thead>
          <tr>
            <th>項目</th>
            <th>レベル</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tool in others" :key="tool.name">
            <td>{{ tool.name }}</td>
            <td>{{ tool.level }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// 言語
const languages = ref([
  { name: 'Java', level: '実務経験あり(Java Silver取得できる程度)', year: '実務4年' },
  { name: 'JavaScript', level: '実務経験あり', year: '実務2年' },
  { name: 'TypeScript', level: '型を意識して書ける', year: '実務1年' },
  { name: 'Python', level: '基本構文は書ける', year: '実務1年' },
  { name: 'C#', level: '簡単なデスクトップアプリを作成した', year: '趣味' },
  { name: 'VB', level: '簡単なデスクトップアプリを作成した', year: '趣味' },
  { name: 'C', level: 'ポインタで挫折', year: '趣味' },
  { name: 'Go', level: 'Hello Worldした程度', year: '趣味' },
  { name: 'Rust', level: 'Hello Worldした程度', year: '趣味' },
]);

// フレームワーク
const frameworks = ref([
  { name: 'Spring Boot', level: 'API,Spring MVCでの実務経験あり' },
  { name: 'Vue.js', level: 'コンポーネントを意識して開発できる' },
]);

// その他
const others = ref([
  { name: 'PostgreSQL', level: '実務経験あり' },
  { name: 'Docker', level: '実務経験あり' },
  { name: 'AWS (EC2)', level: '社内用サイトをデプロイした' },
]);
</script>

<style lang="scss" scoped>
.skills {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

section {
  margin-bottom: 40px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th,
td {
  border: 1px solid #ccc;
  padding: 8px 12px;
  text-align: left;
}

th {
  background-color: #a7a7a7dd;
}
</style>
