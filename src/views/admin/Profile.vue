<template>
  <div class="profile">
    <h2>プロフィール編集</h2>

    <!-- 名前・ニックネーム・イントロ・自己紹介 -->
    <section>
      <h3>基本情報</h3>
      <form class="form-grid">
        <div class="form-row">
          <label>名前<span class="required">*</span></label>
          <input v-model="profile.name" type="text" />
        </div>
        <div class="form-row">
          <label>ニックネーム<span class="required">*</span></label>
          <input v-model="profile.nickname" type="text" />
        </div>
        <div class="form-row">
          <label>名前（英語）<span class="required">*</span></label>
          <input v-model="profile.nameEn" type="text" />
        </div>
        <div class="form-row">
          <label>一言<span class="required">*</span></label>
          <input v-model="profile.intro" type="text" />
        </div>
        <div class="form-row">
          <label>自己紹介<span class="required">*</span></label>
          <textarea v-model="profile.bio"></textarea>
          <small>{{ profile.bio.length }} / {{ BIO_MAX }}</small>
        </div>
        <div class="form-row">
          <label>メール<span class="required">*</span></label>
          <input v-model="profile.mail" type="email" />
        </div>
        <div class="form-row">
          <label>github<span class="required">*</span></label>
          <input v-model="profile.github" type="text" />
        </div>
      </form>
      <div class="errorMessage">{{ errorMessage }}</div>
      <button class="update-basic" @click="saveBasic">保存</button>
    </section>

    <hr />

    <!-- CRUD セクション -->
    <section>
      <h3>趣味</h3>
      <div v-for="(hobby, index) in hobbies" :key="index" class="hobby-content">
        <span class="required">*</span>
        <input v-model="hobby.name" class="name" placeholder="趣味名称" type="text"/>
        <button class="delete-button" @click="removeHobby(index)">削除</button>
      </div>
      <button @click="addHobby">追加</button>
    </section>

    <!-- 経歴 -->
    <section>
      <h3>経歴</h3>
      <div v-for="(career, index) in careers" :key="index" class="career">
        <span class="required">*</span><input v-model="career.year" class="year" placeholder="年" type="text" />
        <span class="required">*</span><input v-model="career.name" class="name" placeholder="経歴名称" type="text" />
        <button class="delete-button" @click="removeCareer(index)">削除</button>
      </div>
      <button @click="addCareer">追加</button>
    </section>

    <!-- イベント -->
    <section>
      <h3>イベント</h3>
      <div v-for="(event, index) in events" :key="index" class="event">
        <span class="required">*</span><input v-model="event.year" class="year" placeholder="年" type="text" />
        <span class="required">*</span><input v-model="event.name" class="name" placeholder="イベント名称" type="text" />
        <button class="delete-button" @click="removeEvent(index)">削除</button>
      </div>
      <button @click="addEvent">追加</button>
    </section>

    <!-- 資格 -->
    <section>
      <h3>資格</h3>
      <div v-for="(cert, index) in certificates" :key="index" class="certificate">
        <span class="required">*</span><input class="year" v-model="cert.year" placeholder="年" type="text" />
        <span class="required">*</span><input class="name" v-model="cert.name" placeholder="資格名称" type="text" />
        <button class="delete-button" @click="removeCertificate(index)">削除</button>
      </div>
      <button @click="addCertificate">追加</button>
    </section>

    <br />
    <div class="itemErrorMessage">{{ itemErrorMessage }}</div>
    <button @click="handlesaveAllUpdate">保存</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useProfile } from '../../composables/admin/profile/useProfile';
import { useProfileItems } from '../../composables/admin/profile/useProfileItems';
import { useRouter } from 'vue-router';

const BIO_MAX = 500;
const { profile, errorMessage, saveBasic } = useProfile();
const router = useRouter();

const {
  hobbies,
  careers,
  events,
  certificates,
  itemErrorMessage,
  fetchAllProfileItems,
  updateAllProfileItems,
  addHobby,
  removeHobby,
  addCareer,
  removeCareer,
  addEvent,
  removeEvent,
  addCertificate,
  removeCertificate
} = useProfileItems();

onMounted(fetchAllProfileItems);

const handlesaveAllUpdate = async () => {
  const result = await updateAllProfileItems();
  if (result?.success) {
    alert('趣味・経歴・イベント・資格・を保存しました');
    router.push('/admin/top');
  }
};
</script>

<style scoped>
.required {
  color: red;
}
.form-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .form-row {
    display: flex;
    align-items: center;
    gap: 1rem;

    label {
      width: 7em; /* ← 最大ラベルに合わせて幅固定（例: 名前（英語）） */
      text-align: left;
      font-weight: bold;
    }

    input,
    textarea {
      flex: 1; /* ← 残りスペースを全部使う */
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      width: 7em;
    }

    textarea {
      resize: vertical;
      min-height: 3rem;
    }

    small{
      margin-top:auto;
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
    width: 467px;
    margin-bottom: 4px;
  }
  button {
    margin-bottom: 4px;
  }
  .hobby-content {
    display: flex;
    padding-bottom: 10px;
    .name {
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
  }

  @media (max-width: 768px) {
    padding: 0rem;
    padding-top: 3rem;
    padding-right: 2rem;
    padding-bottom: 2rem;

    label{
      font-size: 14px;
    }
    .delete-button {
      width: 80px;
    }
    .career,
    .event,
    .certificate {
      .name{
        width:160px;
      }
    }
  }
}
</style>
