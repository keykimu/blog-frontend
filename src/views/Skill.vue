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
          <tr v-for="lang in skills?.languageResponse" :key="lang.id">
            <td>{{ lang.name }}</td>
            <td>{{ lang.level }}</td>
            <td>{{ lang.experience }}</td>
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
          <tr v-for="fw in skills?.frameworkResponse" :key="fw.id">
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
          <tr v-for="tool in skills?.otherSkillResponse" :key="tool.id">
            <td>{{ tool.name }}</td>
            <td>{{ tool.level }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import type { PublicSkillsResponse } from '../api/public/skills/types';
import { fetchPublicSkills } from '../api/public/skills/skills';

const skills = ref<PublicSkillsResponse | null>(null);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    skills.value = await fetchPublicSkills();
  } finally {
    loading.value = false;
  }
});
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
