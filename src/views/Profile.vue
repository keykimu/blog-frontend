<template>
  <div class="profile-page">
    <!-- Top部分 -->
    <div class="top">
      <img :src="profileImage" alt="プロフィール画像" class="profile-img" />
      <h1 class="name">{{ name }}</h1>
      <p class="intro">{{ intro }}</p>
    </div>

    <!-- 自己紹介 -->
    <section class="about">
      <h2>自己紹介</h2>
      <ul>
      {{ about }}
      </ul>
    </section>
    <div class="contents">
      <section class="hobbies">
        <h2>趣味</h2>
        <ul>
          <li v-for="(hobby, i) in hobbies" :key="i">{{ hobby }}</li>
        </ul>
      </section>

      <!-- 経歴 -->
      <section class="career">
        <h2>経歴</h2>
        <ul>
          <li v-for="item in career" :key="item.year">
            <strong>{{ item.year }}</strong>  {{ item.detail }}
          </li>
        </ul>
      </section>

      <section class="event">
        <h2>イベント</h2>
        <ul>
          <li v-for="eventInfo in event" :key="eventInfo.year + eventInfo.name">
            <strong>{{ eventInfo.year }}</strong>  {{ eventInfo.name }}
          </li>
        </ul>
      </section>

      <!-- 資格 -->
      <section class="certifications">
        <h2>資格</h2>
        <ul>
          <li v-for="cert in certifications" :key="cert.year + cert.name">
            <strong>{{ cert.year }}</strong>  {{ cert.name }}
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import profileImage from '../assets/akagi.png';

const name = ref('木村勇紀');
const intro = ref('SEになった気でいるエンジニア');

const about = ref(
  `東京のIT企業に勤めています。
  Javaを中心としてバックエンドを開発してきましたが、最近はVue、TypeScriptを使用して開発しています。
  詳しいスキルや経験はヘッダーのスキルを見てください。
  ポートフォリオ兼、今後制作するであろう成果物をまとめたり技術記事を書くために制作しました。
  `
);

const hobbies = ref([
  'アニメ・ゲーム（Key）', 
  'ライブ参戦（水樹奈々）',
  'ボードゲーム（麻雀・将棋・花札）',
  'お酒（特に日本酒）'
]);
const career = ref([
  { year: '2018', detail: '商業高校　卒業' },
  { year: '2022', detail: '専門学校　卒業' },
  { year: '2022', detail: '株式会社 アドバンスト・ソフト　入社' },
]);

const event = ref([
  { year: '', name: '' },
]);

const certifications = ref([
  { year: '2017', name: '経済産業省　ITパスポート試験' },
  { year: '2019', name: '経済産業省　基本情報技術者試験' },
  { year: '2020', name: '経済産業省　応用情報技術者試験' },
  { year: '2021', name: '普通自動車第一種運転免許' },
  { year: '2022', name: 'Oracle Java Silver（Java SE 11 Programmer I）' },
]);
</script>

<style lang="scss" scoped>
.profile-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

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
      font-size: 1.2rem;
      color: #555;
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
  }

  .about{
    flex: 1 1 600px;       // 最小幅300px、余白があれば伸縮
    max-width: 800px;      // 最大幅を設定
    background: hsla(0, 0%, 100%, 0.089);   // 任意：背景色
    padding: 10px;
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;       // 画面が狭くなったら縦に折り返す
    justify-content: center; // 横方向中央寄せ
  }

  .contents {
    display: flex;
    flex-wrap: wrap;       // 画面が狭くなったら縦に折り返す
    justify-content: center; // 横方向中央寄せ
    gap: 40px;             // セクション間の余白
    padding: 20px;
  }

  .contents section {
    flex: 1 1 300px;       // 最小幅300px、余白があれば伸縮
    max-width: 400px;      // 最大幅を設定
    background: hsla(0, 0%, 100%, 0.089);   // 任意：背景色
    padding: 20px;
    border-radius: 10px;
  }

  .contents h2 {
    text-align: center;    // 見出し中央寄せ
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
