<template>
  <div class="work-detail">
    <h1>{{ work.title }}</h1>
    <p class="date">{{ work.date }}</p>
    <div class="images">
      <img :src="work.image" :alt="work.title" />
    </div>
    <div class="content" v-html="renderedContent"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { works } from '../data/works';
import { marked } from 'marked';

const route = useRoute();
const id = route.params.id as string;

const work = ref(
  works.find((w) => w.id.toString() === id) || {
    title: 'Not Found',
    date: '',
    description: '',
    image: '',
  },
);

const renderedContent = computed(() => marked.parse(work.value.description));
</script>

<style scoped lang="scss">
.work-detail {
  max-width: 800px;
  margin: 50px auto;
  text-align: center;
  padding: 0 20px;

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
