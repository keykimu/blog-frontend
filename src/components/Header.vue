<template>
  <header class="header">
    <div class="container">
      <button class="hamburger" @click="toggleMenu">
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
      </button>

      <!-- 中央ナビ -->
      <nav :class="{ open: menuOpen }" class="nav">
        <a href="/">トップ</a>
        <a href="/profile">プロフィール</a>
        <a href="/skill">スキル</a>
        <a href="#works">成果物</a>
        <a href="#contact">連絡先</a>
      </nav>

      <!-- 右側：ダークモード切替 -->
      <div class="header-right">
        <button class="dark-toggle" @click="toggleDark">
          {{ isDark ? '🌙' : '☀️' }}
        </button>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const menuOpen = ref(false);
const isDark = ref(true);

const toggleMenu = () => menuOpen.value = !menuOpen.value;

const toggleDark = () => {
  isDark.value = !isDark.value;
  document.body.classList.toggle("dark", isDark.value);
};

// 初期ロードでダークモード
onMounted(() => {
  document.body.classList.add("dark");
});
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  background-color: #333;
  color: white;

  .container {
    display: flex;
    justify-content: space-between; /* 左・中央・右に分ける */
    align-items: center;
    padding: 10px 20px;
    position: relative;
  }

  .nav {
    display: flex;
    gap: 20px;
    justify-content: left;
    flex: 1; /* 真ん中に広げる */
    
    
    a {
      color: white;
      text-decoration: none;
      font-weight: bold;
    }
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .dark-toggle {
    background: none;
    border: 1px solid white;
    border-radius: 5px;
    padding: 5px 10px;
    color: white;
    cursor: pointer;
    font-size: 1.2rem;
  }

  .hamburger {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 25px;
    height: 20px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;

    span {
      display: block;
      height: 3px;
      background: white;
      border-radius: 2px;
      transition: all 0.3s;
    }
  }
}

/* スマホサイズ */
@media (max-width: 768px) {
  .header .container {
    justify-content: space-between; /* 左端:ハンバーガー, 右端:切替 */
  }
  .header .container .nav {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #333;
    width: 200px;
    padding: 10px 0;

    &.open {
      display: flex;
    }

    a {
      padding: 10px 20px;
    }
  }

  .header .container .hamburger {
    display: flex;
  }
}
</style>