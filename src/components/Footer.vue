<template>
  <footer class="footer">&copy; {{ year }} Yuki Kimura. All rights reserved</footer>
</template>

<script lang="ts" setup>
const year = new Date().getFullYear();
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  text-align: center;
  padding: 40px 0 0;
  color: #aaa;
  margin-top: 30px;
  margin-bottom: 20px;
}
</style>
