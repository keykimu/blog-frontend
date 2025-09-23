<template>
  <div class="profile">
    <h2>プロフィール編集</h2>

    <!-- 名前・ニックネーム・イントロ・自己紹介 -->
    <section>
      <h3>基本情報</h3>
      <form @submit.prevent="saveBasic" class="form-grid">
        <div class="form-row">
          <label>名前</label>
          <input v-model="profile.name" type="text" />
        </div>
        <div class="form-row">
          <label>ニックネーム</label>
          <input v-model="profile.nickname" type="text" />
        </div>
        <div class="form-row">
          <label>名前（英語）</label>
          <input v-model="profile.nameEn" type="text" />
        </div>
        <div class="form-row">
          <label>一言</label>
          <input v-model="profile.intro" type="text" />
        </div>
        <div class="form-row">
          <label>自己紹介</label>
          <textarea v-model="profile.bio"></textarea>
        </div>
        <div class="form-row">
          <label>メール</label>
          <input v-model="profile.mail" type="email" />
        </div>
        <div class="form-row">
          <label>github</label>
          <input v-model="profile.github" type="text" />
        </div>
      </form>
      <button class="update-basic" type="submit">保存</button>
    </section>

    <hr />

    <!-- CRUD セクション -->
    <section>
      <h3>趣味</h3>
      <div v-for="(__, index) in hobbies" :key="index" class="hobby-content">
        <input v-model="hobbies[index]" class="hobby" />
        <button class="delete-button" @click="removeHobby(index)">削除</button>
      </div>
      <button @click="addHobby">追加</button>
    </section>

    <!-- 経歴 -->
    <section>
      <h3>経歴</h3>
      <div v-for="(career, index) in careers" :key="index" class="career">
        <input v-model="career.year" class="year" placeholder="年" type="text" />
        <input v-model="career.name" class="name" placeholder="経歴名称" type="text" />
        <button class="delete-button" @click="removeCareer(index)">削除</button>
      </div>
      <button @click="addCareer">追加</button>
    </section>

    <!-- イベント -->
    <section>
      <h3>イベント</h3>
      <div v-for="(event, index) in events" :key="index" class="event">
        <input v-model="event.year" class="year" placeholder="年" type="text" />
        <input v-model="event.name" class="name" placeholder="イベント名称" type="text" />
        <button class="delete-button" @click="removeEvent(index)">削除</button>
      </div>
      <button @click="addEvent">追加</button>
    </section>

    <!-- 資格 -->
    <section>
      <h3>資格</h3>
      <div v-for="(cert, index) in certificates" :key="index" class="certificate">
        <input class="year" v-model="cert.year" placeholder="年" type="text" />
        <input class="name" v-model="cert.name" placeholder="資格名称" type="text" />
        <button class="delete-button" @click="removeCertificate(index)">削除</button>
      </div>
      <button @click="addCertificate">追加</button>
    </section>

    <br />
    <button @click="saveAll">全て保存（モック）</button>
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
  mail: 'keykimu1999@gmail.com',
  github: 'https://github.com/keykimu',
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
.form-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .form-row {
    display: flex;
    align-items: center;
    gap: 1rem;

    label {
      width: 6em; /* ← 最大ラベルに合わせて幅固定（例: 名前（英語）） */
      text-align: left;
      font-weight: bold;
    }

    input,
    textarea {
      flex: 1; /* ← 残りスペースを全部使う */
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    textarea {
      resize: vertical;
      min-height: 3rem;
    }
  }
}

.update-basic {
  margin-top: 30px;
}

.profile {
  padding: 2rem;
  section {
    margin-bottom: 20px;
  }
  input,
  textarea {
    width: 70%;
    margin-bottom: 4px;
  }
  button {
    margin-bottom: 4px;
  }
  .hobby-content {
    display: flex;
    padding-bottom: 10px;
    .hobby {
      margin-right: 10px;
    }
  }

  .career,
  .event,
  .certificate {
    display: flex;
    padding-bottom: 10px;
    .year {
      width: 40px;
      margin-right: 10px;
    }
    .name {
      width: 400px;
      margin-right: 10px;
    }
    .year {
      width: 40px;
    }
  }

  @media (max-width: 768px) {
    padding: 0rem;
    padding-top: 3rem;
    padding-right: 2rem;
    padding-bottom: 2rem;

    .delete-button {
      width: 80px;
    }
  }
}
</style>
