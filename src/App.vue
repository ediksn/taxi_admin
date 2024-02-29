<template lang="pug">
  v-app
    Menu(v-if='sesion._id')
    v-content
      .container
        router-view

</template>

<script>
import Menu from "./components/menu.vue";
export default {
  name: "App",
  components: { Menu },
  sesion: [],
  created() {
    this.sesion = this.$store.state.usuario;
    // if (this.$route.meta.isPublic === false && !this.$store.state.tokenappolo) {
    //   window.location.href = "/";
    // }
    // if (this.$route.meta.isLog === true && this.$store.state.tokenappolo) {
    //   window.location.href = "/dashboard";
    // }
    // console.log(this.$cookies.get("token"));
    // if (!this.$cookies.get("token") && this.$store.state.tokenappolo) {
    //   this.$swal
    //     .fire({
    //       title: "Oops...",
    //       text: "Sesión vencida, por favor inicie sesión nuevamente.",
    //       type: "error",
    //       confirmButtonText: "Ok"
    //     })
    //     .then(res => {
    //       this.$store.dispatch("logout");
    //       this.logout();
    //     });
    // }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$cookies.set("token", [], "5D", "");
      window.location.href = "/";
    }
  }
};
</script>
<style lang="sass">
@import '@/styles/index.scss';
</style>
