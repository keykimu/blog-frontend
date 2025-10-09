<template>
  <NavigationBar />
  <div class="new-work">
    <h2>成果物作成</h2>
    <div class="errorMessage">
      {{ errorMessage }}
    </div>
    <form @submit.prevent="create">
      <div class="form-row">
        <label for="title">タイトル</label>
        <input id="title" v-model="work.title" required />
      </div>
      <div class="form-row">
        <label for="description">説明</label>
        <textarea id="description" v-model="work.description" required></textarea>
      </div>
      <div class="form-row">
        <label for="imageUrl">画像URL</label>
        <input id="imageUrl" v-model="work.url" />
      </div>
      <div class="form-row">
        <label for="techStack">技術スタック（カンマ区切り）</label>
        <input id="techStack" v-model="work.techStack" />
      </div>
      <button type="submit">保存</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getWorkById, createWork, type Work, type WorkResponse } from '../../api/works';

const route = useRoute();
const router = useRouter();

const work = ref<Omit<Work, 'id' | 'createdAt' | 'updatedAt'>>({
  title: '',
  description: '',
  url: '',
  techStack: ''
});
const errorMessage = ref<string|null>();

onMounted(async () => {
  const id = route.params.id as string | undefined;
  if (id) {
    const existing = await getWorkById(Number(id));
    if (existing) {
      work.value = { ...existing };
    }
  }
});

const create = async () => {
  const response: WorkResponse = await createWork(work.value);
  if(response.data){
    router.push('/admin/works');
  }else{
    errorMessage.value = response.error;
  }
};
</script>

<style scoped>
.new-work {
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 0rem;
    padding-top: 3rem;
    padding-right: 2rem;
    padding-bottom: 2rem;
  }
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem; /* 各フォーム行の間隔 */
}

.form-row {
  display: flex;
  align-items: center;
  gap: 1rem; /* ラベルと入力欄の間のスペース */
}

label {
  width: 150px; /* ラベル幅を固定して列を揃える */
  font-weight: 500;
}

input,
textarea {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea {
  min-height: 120px;
  min-width: 170px;
  resize: vertical;
}

button {
  align-self: center;
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
