<template>
  <div class="home">
    <header-page />
    <router-view />
    <footer-page />
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { onMounted } from 'vue';
import HeaderPage from '../common/Header.vue';
import FooterPage from '../common/Footer.vue';
import { parseJWT, getDetailsFromLocalStorage } from '@/utils/helper';

export default {
  name: 'HomePage',
  components: {
    HeaderPage,
    FooterPage
  },
  setup() {
    const store = new useStore();
    onMounted(() => {
      const userDetails = parseJWT(getDetailsFromLocalStorage('access-token'));
      store.commit('SET_USER_DETAILS', userDetails);
    })
  }
}
</script>
<style lang="scss" scoped>
.home {
  position: relative;
  width: 100%;
  height: 100vh;
}
</style>
