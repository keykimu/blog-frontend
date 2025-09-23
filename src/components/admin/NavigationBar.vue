<template>
  <!-- ハンバーガー（モバイルのみ） -->
  <button class="hamburger" @click="toggleMenu">
    <span :class="{ open: menuOpen }"></span>
    <span :class="{ open: menuOpen }"></span>
    <span :class="{ open: menuOpen }"></span>
  </button>

  <!-- ナビゲーション -->
  <nav class="admin-nav" :class="{ open: menuOpen }">
    <router-link to="/admin/top" @click="menuOpen = false">トップ</router-link>
    <router-link to="/admin/works" @click="menuOpen = false">成果物一覧</router-link>
    <router-link to="/admin/skill" @click="menuOpen = false">スキル管理</router-link>
    <router-link to="/admin/profile" @click="menuOpen = false">プロフィール</router-link>
    <button class="logout-btn" @click="logout">ログアウト</button>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const menuOpen = ref(false);
const toggleMenu = () => (menuOpen.value = !menuOpen.value);
const closeMenu = () => (menuOpen.value = false);

const logout = () => {
  localStorage.removeItem('adminToken');
  router.push('/admin');
  closeMenu();
};
</script>

<style lang="scss" scoped>
/* ハンバーガー */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 25px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 1rem;

  span {
    display: block;
    height: 4px;
    width: 100%;
    background-color: white;
    border-radius: 2px;
    transition: all 0.3s;
  }
}

/* ナビゲーション共通 */
.admin-nav {
  background-color: #333;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  min-width: 150px;

  a {
    color: white;
    text-decoration: none;
    padding: 0.5rem 0;

    &.router-link-active {
      font-weight: bold;
      border-left: 4px solid white;
      padding-left: 0.5rem;
    }
  }

  .logout-btn {
    margin-top: 500px;
    background: #e74c3c;
    border: none;
    color: white;
    padding: 0.5rem 1rem;
    cursor: pointer;

    &:hover {
      background: #c0392b;
    }
  }
}

/* === モバイル用 === */
@media (max-width: 768px) {
  .admin-nav {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 60px; /* ハンバーガーの下 */
    left: 0;
    width: 150px;
    height: 300px;
    border-radius: 0 0 8px 0;

    &.open {
      display: flex;
    }

    .logout-btn {
      margin-top: 100px;
    }
  }

  .hamburger {
    display: flex;
  }
}
</style>
