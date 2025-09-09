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
  works.find(w => w.id.toString() === id) || {
    title: 'Not Found',
    date: '',
    description: '',
    image: ''
  }
);

const renderedContent = computed(() => marked.parse(work.value.description));
</script>

<style scoped lang="scss">
.work-detail {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  padding: 40px 20px;

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
      height: auto;      // 縦横比を維持
      border-radius: 10px;
      object-fit: cover; // 画像が枠に収まるように調整
    }
  }

  .content {
    line-height: 1.6;
    font-size: 1rem;

    h2, h3, h4 {
      margin-top: 20px;
    }

    img {
      max-width: 100%;
      height: auto;
      border-radius: 10px;
      margin: 10px 0;
    }

    pre {
      background: #f5f5f5;
      padding: 10px;
      overflow-x: auto;
      border-radius: 5px;
    }
  }
}

.work-detail {
  max-width: 800px;
  margin: 50px auto;
  padding: 0 20px;

  .date {
    color: #777;
    margin-bottom: 20px;
  }

  .images {
    flex-wrap: wrap;       // 複数画像を折り返す
    gap: 20px;             // 画像間の隙間
    margin-bottom: 20px;

    img {
      flex: 1 1 300px;     // 最小幅300px、余白に応じて伸縮
      max-width: 400px;
      max-height: 300px;   // 縦に大きくなりすぎないよう制限
      height: auto;
      border-radius: 10px;
      object-fit: cover;   // 枠に収まるよう調整
    }
  }

  .content {
    line-height: 1.6;
    font-size: 1rem;

    h2, h3, h4 {
      margin-top: 20px;
    }

    img {
      max-width: 100%;
      max-height: 400px;
      height: auto;
      border-radius: 10px;
      object-fit: cover;
      margin-bottom: 20px;
    }

    pre {
      background: #f5f5f5;
      padding: 10px;
      overflow-x: auto;
    }
  }
}

/* スマホ対応 */
@media (max-width: 768px) {
  .work-detail {
    .images {
      img {
        flex: 1 1 100%;  // 幅100%にして縦に並べる
        max-height: 250px;
      }
    }

    .content img {
      max-height: 250px;
    }
  }
}
</style>