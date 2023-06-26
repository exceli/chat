<template>
  <div class="container">
    <header>
      <Header />
    </header>
    <main>
       <Main />
    </main>
    <footer>
        <Footer />
    </footer>
  </div>
</template>

<script>
import Header from "./components/header/Header.vue";
import Main from "./components/body/Main.vue";
import Footer from "./components/footer/Footer.vue";

export default {
  components: {
      Header,
      Main,
      Footer,
  }
};
</script>

<style>
.container {
    max-width: 100%;
    margin: auto;
    padding: 0 160px;
}
</style>