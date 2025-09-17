<template>
  <div>
    <h2>成果物編集</h2>
    <form @submit.prevent="save">
      <div>
        <label>タイトル</label>
        <input v-model="work.title" type="text" />
      </div>
      <div>
        <label>説明</label>
        <textarea v-model="work.description"></textarea>
      </div>
      <div>
        <label>技術スタック</label>
        <input v-model="work.techStack" placeholder="カンマ区切り" />
      </div>
      <div>
        <label>URL</label>
        <input v-model="work.url" type="text" />
      </div>
      <button type="submit">保存</button>
    </form>
    <div class="preview">
      <label>プレビュー</label>
    </div>
    <pre>{{ work }}</pre>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const workId = route.params.id;

const work = reactive({
  id: workId,
  title: 'モックタイトル',
  description: 'モック説明',
  techStack: 'Vue, TypeScript, Spring Boot',
  url: 'https://example.com',
});

function save() {
  alert('保存処理（モック）: ' + JSON.stringify(work));
}
</script>
