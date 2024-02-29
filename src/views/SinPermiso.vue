<template lang="pug">
div(style="margin-top: -24px;margin-left: -15px;margin-right: -15px;")
  #Permisos
    v-layout(align-start='', justify-start='', row='', fill-height='')
      v-flex(xs12)
        v-card(color='', style="border-radius:5px;background-color: #e84646;")
            v-card-title.justify-center
              img(src='../assets/logo.png', with='60' ,height='60')
        v-card(color='', style="border-radius:5px;background-color: #d6d6d6")
            v-card-title(style="padding: 7px;").justify-center
                span.black--text  Administración de Permisos
        v-container
            v-flex(xs12)
                v-layout(align-center='', justify-center='', row='', wrap, fill-height='')
                    v-flex(xs12)
                        v-layout(align-start='', justify-center='', row='', wrap, fill-height='')
                            i(style='margin-top: 33px;margin-right: 10px;').material-icons
                                | error
                            h2 INGRESO NO PERMITIDO
                    v-flex(xs12)
                        v-layout(align-start='', justify-center='', row='', fill-height='')
                            h3 Estimado usuario, no posee los permisos suficientes para ingresar en esta área.
</template>

<script>
export default {
  name: "mSinPermiso",
  data: () => ({}),
  created() {
    this.initialize();
  },
  methods: {
    initialize() {}
  }
};
</script>
