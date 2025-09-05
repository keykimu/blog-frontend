<template>
  <div class="home">
    <div class="profile">
      <div class="icon-nickname">
        <router-link to="/profile" class="logo">
          <img :src="profileImage" alt="プロフィール画像" class="profile-img"/>
        </router-link>

        <span class="nickname">{{ nickname }}</span>
      </div>
      <span class="realname">{{ realname }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import profileImage from '../assets/akagi.png';
import { ref } from 'vue';

const nickname = ref("kimu");
const realname = ref("Yuki Kimura");
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 180px); 
}

.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.icon-nickname {
  display: flex;
  align-items: center;
}

.profile-img {
  width: 200px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center 10%; 
}

.nickname {
  font-size: 2.5rem;
  font-weight: bold;
}

.realname {
  font-size: 3.0rem;
  color: #555;
  font-weight: bold;
}
</style>
