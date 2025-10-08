<template>
  <div class="top">
    <h2>管理画面トップ</h2>
    <p>成果物件数: {{ works.length }}</p>
    <div class="errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getWorks, type Work, type WorkResponse } from '../../api/works';

const works = ref<Work[]>([]);
const errorMessage = ref<string|null>();
onMounted(async () => {
  const response: WorkResponse = await getWorks();
  if(response.data){
    works.value = response.data;
  }else{
    errorMessage.value = response.error;
  }
});
</script>

<style lang="scss" scoped>
.top {
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 0rem;
    padding-top: 3rem;
    padding-right: 2rem;
    padding-bottom: 2rem;
  }
}
</style>
