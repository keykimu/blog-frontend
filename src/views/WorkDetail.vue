<template>
  <div v-if="work" class="work-detail">
    <h1>成果物</h1>
    <h2>{{ work.title }}</h2>
    <p class="date">作成日付 {{ work.createdAt }}</p>
    <div class="images">
      <img :src="work.url" :alt="work.title" />
    </div>
    <div class="content" v-html="formattedDescription"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { fetchPublicWorkById } from '../api/public/work/works';
import { usePublicWorksStore } from '../stores/usePublicWorksStore';
import type { PublicWorkResponse } from '../api/public/work/types';

const store = usePublicWorksStore();
const route = useRoute();

const work = ref<PublicWorkResponse | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);

const BASE_IMAGE_URL = import.meta.env.VITE_API_BASE_URL + "/uploads/";

onMounted(async () => {
  try {
    const id = Number(route.params.id);

    // ストアに選択済みデータがある場合は再取得しない
    if (store.selectedWork && store.selectedWork.id === id) {
      work.value = store.selectedWork;
    } else {
      const response = await fetchPublicWorkById(id);
      const d = new Date(response.createdAt);

      work.value = {
        ...response,
        url: BASE_IMAGE_URL + response.url,
        createdAt: `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${d.getHours()}時${d.getMinutes()}分`,
      };
    }
  } catch (err) {
    console.error(err);
    error.value = "成果物の詳細を取得できませんでした。";
  } finally {
    isLoading.value = false;
  }
});

const formattedDescription = computed(() =>
  work.value
    ? work.value.description.replace(/\n/g, "<br>")
    : ""
);
</script>

<style scoped lang="scss">
.work-detail {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  padding: 20px;

  .date {
    color: #777;
    margin-bottom: 20px;
  }

  .images {
    margin-bottom: 20px;
    text-align: center;

    img {
      max-width: 100%;
      max-height: 200px; // 最大高さを指定
      height: auto; // 縦横比を維持
      border-radius: 10px;
      object-fit: cover; // 画像が枠に収まるように調整
    }
  }
  .content{
    padding:20px;
    border-radius: 15px;
    background-color: #a7a7a78c;;
  }
}

/* スマホ対応 */
@media (max-width: 768px) {
  .work-detail {
    .images {
      img {
        max-height: 250px;
        max-width: 270px;
      }
    }
  }
}
</style>
