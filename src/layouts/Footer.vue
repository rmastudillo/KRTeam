<script lang="ts" setup>
import { ref, type Ref } from "vue";

const themeToggler: Ref<boolean> = ref(false);
const docElm = document.documentElement;

const changeTheme = (e: Event) => {
  e.preventDefault();

  themeToggler.value = !themeToggler.value;
  docElm.dataset.bsTheme = themeToggler.value ? "dark" : "light";
};
</script>
<template>
  <div class="footer">
    <div class="flex flex-row flex-nowrap gap-3">
      <span>Home</span>
      <span>About us</span>
      <span>Contact</span>
    </div>
    <span>© 2023 All Rights Reserved. Created by KRTeam</span>
  </div>
</template>
<style>
.footer{
  background: black;
  height: 10rem;
  width: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  text-align: start;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
</style>


