<template>
  <div class="container">
    <header>
      <Header />
    </header>
    <main>
      <ChatMain />
    </main>
    <footer>
      <Footer />
      </footer>
  </div>
</template>

<script>
import Header from "./components/header/Header.vue";
import ChatMain from "./components/body/ChatMain.vue";
import Footer from "./components/footer/Footer.vue";

export default {
  components: {
      Header,
      ChatMain,
      Footer,
  }
};
</script>

<style>

</style>