<template>
  <div class="home">
    <div class="profile">
      <div class="icon-nickname">
        <router-link to="/profile" class="logo">
          <img :src="store.profile?.imageName" alt="プロフィール画像" class="profile-img" />
        </router-link>

        <span class="nickname">{{ store.profile?.nickname }}</span>
      </div>
      <span class="realname">{{ store.profile?.name }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePublicProfileStore } from '../stores/usePublicProfileStore';
import { onMounted } from 'vue';

const store = usePublicProfileStore();

onMounted(async ()=>{
  await store.loadProfile();
});
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
  font-size: 3rem;
  color: #555;
  font-weight: bold;
}
</style>
