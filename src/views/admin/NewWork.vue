<template>
  <NavigationBar />
  <div class="new-work">
    <h2>{{ isEdit ? '編集' : '成果物作成' }}</h2>
    <form @submit.prevent="save">
      <div>
        <label>タイトル</label>
        <input v-model="work.title" required />
      </div>
      <div>
        <label>説明</label>
        <textarea v-model="work.description" required></textarea>
      </div>
      <div>
        <label>画像URL</label>
        <input v-model="work.imageUrl" />
      </div>
      <div>
        <label>技術スタック（カンマ区切り）</label>
        <input v-model="techStackStr" />
      </div>
      <button type="submit">保存</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getWorkById, createWork, updateWork, type Work } from '../../api/works';

const route = useRoute();
const router = useRouter();

const isEdit = ref(false);
const work = ref<Omit<Work, 'id' | 'createdAt' | 'updatedAt'>>({
  title: '',
  description: '',
  imageUrl: '',
  techStack: [],
  url: '',
});

const techStackStr = computed({
  get: () => work.value.techStack.join(', '),
  set: (val: string) => (work.value.techStack = val.split(',').map((s) => s.trim())),
});

onMounted(async () => {
  const id = route.params.id as string | undefined;
  if (id) {
    const existing = await getWorkById(Number(id));
    if (existing) {
      work.value = { ...existing };
      isEdit.value = true;
    }
  }
});

const save = async () => {
  if (isEdit.value && route.params.id) {
    await updateWork(Number(route.params.id), work.value as Work);
  } else {
    await createWork(work.value as Work);
  }
  router.push('/admin/works');
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
form div {
  margin-bottom: 1rem;
}
</style>
