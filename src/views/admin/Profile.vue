<template>
  <div class="profile">
    <h2>プロフィール編集</h2>

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
        <label>アイコン画像<span class="required">*</span></label>
        <input id="url" v-model="profile.imageName" type="text" placeholder="no_image.png" />
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
    <div class="update-button-area">
      <button class="update-button" @click="saveBasic">保存</button>
    </div>
    <hr />

    <!-- CRUD セクション -->
    <section>
      <h3>趣味</h3>
      <div v-for="(hobby, index) in hobbies" :key="index" class="hobby-content">
        <span class="required">*</span>
        <input v-model="hobby.name" class="name" placeholder="趣味名称" type="text" />
        <button class="delete-button" @click="removeHobby(index)">削除</button>
      </div>
      <button class="insert-button" @click="addHobby">追加</button>
    </section>

    <!-- 経歴 -->
    <section>
      <h3>経歴</h3>
      <div v-for="(career, index) in careers" :key="index" class="career">
        <span class="required">*</span
        ><input v-model="career.year" class="year" placeholder="年" type="text" />
        <span class="required">*</span
        ><input v-model="career.name" class="name" placeholder="経歴名称" type="text" />
        <button class="delete-button" @click="removeCareer(index)">削除</button>
      </div>
      <button class="insert-button" @click="addCareer">追加</button>
    </section>

    <!-- イベント -->
    <section>
      <h3>イベント</h3>
      <div v-for="(event, index) in events" :key="index" class="event">
        <span class="required">*</span
        ><input v-model="event.year" class="year" placeholder="年" type="text" />
        <span class="required">*</span
        ><input v-model="event.name" class="name" placeholder="イベント名称" type="text" />
        <button class="delete-button" @click="removeEvent(index)">削除</button>
      </div>
      <button class="insert-button" @click="addEvent">追加</button>
    </section>

    <!-- 資格 -->
    <section>
      <h3>資格</h3>
      <div v-for="(cert, index) in certificates" :key="index" class="certificate">
        <span class="required">*</span
        ><input class="year" v-model="cert.year" placeholder="年" type="text" />
        <span class="required">*</span
        ><input class="name" v-model="cert.name" placeholder="資格名称" type="text" />
        <button class="delete-button" @click="removeCertificate(index)">削除</button>
      </div>
      <button class="insert-button" @click="addCertificate">追加</button>
    </section>

    <br />
    <div class="itemErrorMessage">{{ itemErrorMessage }}</div>
    <div class="update-button-area">
      <button class="update-button" @click="handlesaveAllUpdate">保存</button>
    </div>
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
  removeCertificate,
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

<style lang="scss" scoped>
.required {
  color: red;
}
.form-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;

  .form-row {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    label {
      width: 7em;
      text-align: left;
      font-weight: bold;
    }

    input,
    textarea {
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      width: 100%;
      box-sizing: border-box;
    }

    textarea {
      resize: vertical;
      min-height: 3rem;
    }

    small {
      margin-left: auto;
    }
  }
}

.profile {
  padding: 2rem;
  input,
  textarea {
    width: 467px;
    margin-bottom: 4px;
  }
  button {
    margin-bottom: 4px;
  }

  .update-button {
    padding: 0.5rem 1rem;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;
    &:hover {
      background-color: #2563eb;
    }
  }

  .insert-button {
    padding: 0.5rem 1rem;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;
    &:hover {
      background-color: #45a049;
    }
  }

  .delete-button {
    padding: 0.5rem 1rem;
    background-color: #f63b3b;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;
    &:hover {
      background-color: #bb1010;
    }
  }

  .hobby-content {
    display: flex;
    align-items: center;
  }
  .hobby-content input {
    flex: 1;
    width: 93%;
    box-sizing: border-box;
    margin: 0.5rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  .career,
  .event,
  .certificate {
    display: flex;
    align-items: center;
    gap: 10px;
    padding-bottom: 10px;
  }

  .career .name,
  .event .name,
  .certificate .name {
    flex: 1;
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
  }

  .career .year,
  .event .year,
  .certificate .year {
    width: 4rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  .update-button-area {
    text-align: center;
  }

  @media (max-width: 768px) {
    padding: 0rem;
    padding-top: 3rem;
    padding-right: 2rem;
    padding-bottom: 2rem;

    label {
      font-size: 14px;
    }
    .career,
    .event,
    .certificate {
      .year {
        width: 3rem;
      }
      .name {
        width: 8rem;
      }
    }

    .insert-button {
      padding: 0.25rem 0.5rem;
    }
    .delete-button {
      padding: 0.25rem 0.5rem;
    }
  }
}
</style>
