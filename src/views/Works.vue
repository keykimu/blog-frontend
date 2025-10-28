<template>
  <div class="works">
    <h1>成果物一覧</h1>
    <div class="grid">
      <router-link
        v-for="item in paginatedWorks"
        :key="item.id"
        :to="`/works/${item.id}`"
        class="card"
      >
        <img :src="item.url" :alt="item.title" />
        <h2>{{ item.title }}</h2>
        <p>{{ item.createdAt }}</p>
      </router-link>
    </div>

    <!-- ページネーション -->
    <div class="pagination">
      <button @click="prevPage" :disabled="page === 1">前へ</button>
      <span>{{ page }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="page === totalPages">次へ</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { fetchPublicWorks } from '../api/public/work/works';
import type { PublicWorkResponse } from '../api/public/work/types';
import noImage from "@/assets/no_image.png";

const page = ref(1);
const perPage = 8;

const works = ref<PublicWorkResponse[]>([]);
const error = ref<string | null>(null);
const isLoading = ref(true);

const totalPages = computed(()=>Math.ceil(works.value.length / perPage));

const paginatedWorks = computed(() => {
  const start = (page.value - 1) * perPage;
  return works.value.slice(start, start + perPage);
});

const nextPage = () => {
  if (page.value < totalPages.value) page.value++;
};
const prevPage = () => {
  if (page.value > 1) page.value--;
};

const BASE_IMAGE_URL = import.meta.env.VITE_API_BASE_URL + "/uploads/";
onMounted(async () => {
  try {
    works.value = await fetchPublicWorks();

    works.value = works.value.map(work => ({
      ...work,
      url: work.url ? BASE_IMAGE_URL + work.url : noImage,
      createdAt: (()=>{
        const d = new Date(work.createdAt);
        return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${d.getHours()}時${d.getMinutes()}分`;
      })()
    }));
  } catch (err) {
    error.value = "成果物の取得に失敗しました。";
    console.error(err);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style lang="scss" scoped>
.works {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  padding: 20px;

  h1 {
    margin-bottom: 30px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 30px;
    justify-items: center;
  }

  .card {
    width: 100%;
    max-width: 220px;
    background: #dddddd;
    border-radius: 10px;
    overflow: hidden;
    padding: 10px;
    text-align: center;
    transition: transform 0.2s;

    &:hover {
      transform: translateY(-5px);
    }

    img {
      width: 100%;
      height: 150px;
      object-fit: cover;
      border-radius: 8px;
      margin-bottom: 10px;
    }

    h2 {
      font-size: 1.2rem;
      margin: 10px 0 5px;
      color: #555;
    }

    p {
      font-size: 0.9rem;
      color: #555;
    }
  }

  .pagination {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    gap: 20px;

    button {
      padding: 5px 15px;
      cursor: pointer;
      border: 1px solid #333;
      background: #dddddd;
      border-radius: 5px;

      &:disabled {
        opacity: 0.5;
        cursor: default;
      }
    }
  }
}

/* スマホ対応 */
@media (max-width: 768px) {
  .works .grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  .card {
    max-width: 150px;

    img {
      height: 120px;
    }

    h2 {
      font-size: 1rem;
    }

    p {
      font-size: 0.8rem;
    }
  }
}
</style>
