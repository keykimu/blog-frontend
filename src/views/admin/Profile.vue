<template>
  <div>
    <h2>プロフィール編集</h2>

    <!-- 名前・ニックネーム・イントロ・自己紹介 -->
    <section>
      <h3>基本情報</h3>
      <form @submit.prevent="saveBasic">
        <div>
          <label>名前</label>
          <input v-model="profile.name" type="text" />
        </div>
        <div>
          <label>ニックネーム</label>
          <input v-model="profile.nickname" type="text" />
        </div>
        <div>
          <label>名前（英語）</label>
          <input v-model="profile.nameEn" type="text" />
        </div>
        <div>
          <label>イントロ（一言）</label>
          <input v-model="profile.intro" type="text" />
        </div>
        <div>
          <label>自己紹介</label>
          <textarea v-model="profile.bio"></textarea>
        </div>
        <button type="submit">保存</button>
      </form>
    </section>

    <hr />

    <!-- CRUD セクション -->
    <section>
      <h3>趣味</h3>
      <ul>
        <li v-for="(__, index) in hobbies" :key="index">
          <input v-model="hobbies[index]" />
          <button @click="removeHobby(index)">削除</button>
        </li>
      </ul>
      <button @click="addHobby">追加</button>
    </section>

    <!-- 経歴 -->
    <section>
      <h3>経歴</h3>
      <ul>
        <li v-for="(career, index) in careers" :key="index">
          <input v-model="career.year" placeholder="年" type="text" />
          <input v-model="career.name" placeholder="経歴名称" type="text" />
          <button @click="removeCareer(index)">削除</button>
        </li>
      </ul>
      <button @click="addCareer">追加</button>
    </section>

    <!-- イベント -->
    <section>
      <h3>イベント</h3>
      <ul>
        <li v-for="(event, index) in events" :key="index">
          <input v-model="event.year" placeholder="年" type="text" />
          <input v-model="event.name" placeholder="イベント名称" type="text" />
          <button @click="removeEvent(index)">削除</button>
        </li>
      </ul>
      <button @click="addEvent">追加</button>
    </section>

    <!-- 資格 -->
    <section>
      <h3>資格</h3>
      <ul>
        <li v-for="(cert, index) in certificates" :key="index">
          <input v-model="cert.year" placeholder="年" type="text" />
          <input v-model="cert.name" placeholder="資格名称" type="text" />
          <button @click="removeCertificate(index)">削除</button>
        </li>
      </ul>
      <button @click="addCertificate">追加</button>
    </section>

    <br />
    <button @click="saveAll">すべて保存（モック）</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// RU 部分（基本情報）
const profile = ref({
  name: '山田 太郎',
  nickname: 'やまだ',
  nameEn: 'Taro Yamada',
  intro: 'フルスタックエンジニア',
  bio: 'Vue / TypeScript / Spring Boot を中心に開発しています',
});

// CRUD 部分
const hobbies = ref(['読書', 'ゲーム']);
type YearName = { year: string; name: string };

const careers = ref<YearName[]>([
  { year: '2020', name: '会社A 入社' },
  { year: '2022', name: '会社B 入社' },
]);

const events = ref<YearName[]>([
  { year: '2021', name: 'ハッカソン参加' },
  { year: '2022', name: '勉強会登壇' },
]);

const certificates = ref<YearName[]>([
  { year: '2019', name: '基本情報技術者' },
  { year: '2023', name: 'AWS認定ソリューションアーキテクト' },
]);

function addHobby() {
  hobbies.value.push('');
}
function removeHobby(i: number) {
  hobbies.value.splice(i, 1);
}

function addCareer() {
  careers.value.push({ year: '', name: '' });
}
function removeCareer(i: number) {
  careers.value.splice(i, 1);
}

function addEvent() {
  events.value.push({ year: '', name: '' });
}
function removeEvent(i: number) {
  events.value.splice(i, 1);
}

function addCertificate() {
  certificates.value.push({ year: '', name: '' });
}
function removeCertificate(i: number) {
  certificates.value.splice(i, 1);
}

// 保存処理（モック）
function saveBasic() {
  alert('基本情報保存（モック）: ' + JSON.stringify(profile.value));
}
function saveAll() {
  const data = {
    profile: { ...profile.value },
    hobbies: [...hobbies.value],
    careers: careers.value.map((c) => ({ ...c })),
    events: events.value.map((e) => ({ ...e })),
    certificates: certificates.value.map((c) => ({ ...c })),
  };
  alert('すべて保存（モック）: ' + JSON.stringify(data, null, 2));
}
</script>

<style scoped>
section {
  margin-bottom: 20px;
}
input,
textarea {
  width: 100%;
  margin-bottom: 4px;
}
button {
  margin-top: 4px;
  margin-right: 4px;
}
</style>
