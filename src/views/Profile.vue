<template>
  <div class="profile-page">
    <h1>プロフィール</h1>
    <!-- Top部分 -->
    <div class="top">
      <img :src="store.profile?.imageName" alt="プロフィール画像" class="profile-img" />
      <h1 class="name">{{ store.profile?.name }}</h1>
      <p class="intro">{{ store.profile?.intro }}</p>
    </div>

    <!-- 自己紹介 -->
    <section class="about">
      <h2>自己紹介</h2>
      <ul>
        <span class="bio">{{store.profile?.bio}}</span>
      </ul>
    </section>
    <div class="contents">
      <section class="hobbies">
        <h2>趣味</h2>
        <ul>
          <li v-for="hobby in profileItems?.hobbyResponse" :key="hobby.id">{{ hobby.name }}</li>
        </ul>
      </section>

      <!-- 経歴 -->
      <section class="career">
        <h2>経歴</h2>
        <ul>
          <li v-for="career in profileItems?.careerResponse" :key="career.year">
            <span class="career-year">{{ career.year }}</span>
            <span class="career-name">{{ career.name }}</span>
          </li>
        </ul>
      </section>

      <section class="event">
        <h2>イベント</h2>
        <ul>
          <li v-for="event in profileItems?.eventResponse" :key="event.year + event.name">
            <span class="event-year">{{ event.year }}</span>
            <span class="event-name">{{ event.name }}</span>
          </li>
        </ul>
      </section>

      <!-- 資格 -->
      <section class="certifications">
        <h2>資格</h2>
        <ul>
          <li v-for="cert in profileItems?.certificateResponse" :key="cert.year + cert.name">
            <span class="cert-year">{{ cert.year }}</span>
            <span class="cert-name">{{ cert.name }}</span>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { usePublicProfileStore } from '../stores/usePublicProfileStore';
import { fetchProfileItems } from '../api/public/profileItems/profileItems';
import type { PublicProfileItemsResponse } from '../api/public/profileItems/types';

const store = usePublicProfileStore();
const profileItems = ref<PublicProfileItemsResponse>();

onMounted(async ()=>{
  if(!store.profile){
    await store.loadProfile();
  }
  const itemsResponse = await fetchProfileItems();
  profileItems.value = itemsResponse;
});
</script>

<style lang="scss" scoped>
.profile-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  h1 {
    text-align: center;
    margin-bottom: 30px;
  }

  .top {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    .profile-img {
      width: 200px;
      height: 160px;
      border-radius: 50%;
      object-fit: cover;
      object-position: center 10%;
      margin-bottom: 10px;
    }

    .name {
      font-size: 2rem;
      margin-bottom: 5px;
    }

    .intro {
      font-size: 1rem;
    }
  }

  section {
    margin-top: 40px;

    h2 {
      font-size: 1.5rem;
      margin-bottom: 10px;
    }

    ul {
      list-style: disc inside;
      li {
        margin-bottom: 5px;
      }
    }

    .career-year {
      margin-right: 1em;
    }
    
    .event-year{
      margin-right: 1em;
    }

    .cert-year{
      margin-right: 1em;
    }
  }

  .about {
    h2 {
      text-align: center;
    }

    ul {
      list-style: none;
      padding: 20px;
    }

    .bio{
      align-items: center;
    }
  }

  .contents {
    display: flex;
    flex-wrap: wrap; // 画面が狭くなったら縦に折り返す
    justify-content: center; // 横方向中央寄せ
    gap: 40px; // セクション間の余白
  }

  .contents section {
    flex: 1 1 300px; // 最小幅300px、余白があれば伸縮
    max-width: 400px; // 最大幅を設定
    background: hsla(0, 0%, 100%, 0.089); // 任意：背景色
    padding: 20px;
    border-radius: 10px;
  }

  .contents h2 {
    text-align: center; // 見出し中央寄せ
  }

  .contents ul {
    list-style: none;
    padding: 0;
  }

  .contents li {
    margin-bottom: 10px;
  }
}
</style>
