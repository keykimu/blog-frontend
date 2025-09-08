<template>
  <div class="works">
    <h1>成果物一覧</h1>
    <div class="grid">
      <div class="card" v-for="item in paginatedWorks" :key="item.id">
        <img :src="item.image" :alt="item.title" />
        <h2>{{ item.title }}</h2>
        <p>{{ item.date }}</p>
      </div>
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
import { ref, computed } from 'vue';
import NoImage from '../assets/no_image.png';

interface Work {
  id: number;
  title: string;
  date: string;
  image: string;
}

// ダミーデータ10件
const works: Work[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `成果物 ${i + 1}`,
  date: `2025-0${(i % 9) + 1}-01`,
  image: NoImage, // 仮画像
}));

const page = ref(1);
const perPage = 8;
const totalPages = Math.ceil(works.length / perPage);

const paginatedWorks = computed(() => {
  const start = (page.value - 1) * perPage;
  return works.slice(start, start + perPage);
});

const nextPage = () => {
  if (page.value < totalPages) page.value++;
};
const prevPage = () => {
  if (page.value > 1) page.value--;
};
</script>

<style lang="scss" scoped>
.works {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  padding: 40px 20px;

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
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
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
