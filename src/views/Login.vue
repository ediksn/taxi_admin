<template lang="pug">
  v-container(grid-list-xl, text-xs-center)
    v-layout(row, wrap)
      v-flex(xs6, offset-xs3, style='height:170px')
        v-img.my-3(:src="require('../assets/logo2.png')", contain='', height='200')
      v-flex(xs6, offset-xs3)
        h1 Inicio de Sesión
        v-form(enctype="multipart/form-data")
          v-text-field(id="username"
            v-model="form.email"
            prepend-icon="chevron_right",
            required
            label="Usuario:")

          v-text-field.input-group--focused(:append-icon="show3 ? 'visibility' : 'visibility_off'", 
            :type="show3 ? 'text' : 'password'", 
            label='Contraseña:', 
            required
            prepend-icon="chevron_right",
            v-model="form.password" 
            @click:append='show3 = !show3')

          v-spacer
          v-btn(color='blue darken-1', flat, @click.native='login') Entrar
</template>

<script>
import Api from "@/services/methods";
export default {
  name: "mLogin",
  data: () => ({
    show3: false,
    form: {
      id: 1,
      token: "a82kddn282020",
      email: null,
      password: null
    }
  }),
  created() {
    if (this.$store.state.isUserLoggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    login() {
      Api.post("usuario/login", this.form)
        .then(res => {
          if (res.data.status == "Success") {
            this.$store.dispatch("login", res.data);
            this.$cookies.set("token", res.data.token, "5D", "");
            window.location.href = "/home";
          } else {
            this.$swal.fire(
              "Oops...",
              "Error encontrado, usuario o contraseña incorrecta.",
              "error"
            );
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
