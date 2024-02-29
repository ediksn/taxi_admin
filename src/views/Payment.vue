<template lang="pug">
div(style="margin-top: -24px;margin-left: -15px;margin-right: -15px;")
  #Payment
    v-layout(align-start='', justify-start='', row='', fill-height='')
      v-flex(xs12)
        v-card(color='', style="border-radius:5px;background-color: #e84646;")
            v-card-title.justify-center
              img(src='../assets/logo.png', with='60' ,height='60')
                //- span.black--text  Appolo
        v-card(color='', style="border-radius:5px;background-color: #d6d6d6")
            v-card-title(style="padding: 7px;").justify-center
                span.black--text  Administración de Pagos
        //- v-btn.mb-2(style="border-radius:5px;background-color: #e84646;" @click='dialog = true') Nuevo
    v-dialog(v-model='dialog', persistent max-width='1028px')
          v-container(style='background-color:white !important;max-width: 1028px;')
            v-card-title.justify-center
                span.headline Pago
            div(style="margin-top: 20px;")
                v-flex(xs8 sm8)
                    v-layout(align-center='', justify-center='', row='', wrap fill-height='')
                        v-form(enctype="multipart/form-data")
                        v-flex(xs12, style="display:flex;justify-content:center")
                                v-text-field(id="Nombre"
                                outline
                                required
                                v-model="form.nombre"
                                prepend-inner-icon="payment"
                                label="Nombre Pasarela de pago:"
                                style="height: 56px;width: 95%;margin: 0px 0px 10px;")
                        v-flex(xs12, style="display:flex;justify-content:center")
                            v-switch(v-model="form.estatus", :label='`${estatus}`')
                        v-flex(xs12)
                            div
                                v-flex(xs12 sm9)
                                    v-layout(align-end='', justify-center='', row='', wrap fill-height='')
                                        v-flex(xs3)
                                        v-btn(style="background:grey;border-radius:10px;", @click.native='save') Guardar
                                        v-flex(xs2)
                                        v-btn(style="background:#e84646;;border-radius:10px;", @click.native='close') Salir
    v-dialog(v-model='dialog2', persistent max-width='512px')
          v-container(style='background-color:white !important;max-width: 512px;')
            v-card-title.justify-center
                span.headline Pago
            div(style="margin-top: 20px;")
                v-flex(xs12 sm12)
                    v-layout(align-start='', justify-center='', row='', wrap fill-height='')
                        v-form(enctype="multipart/form-data")
                        v-flex(xs3)
                            v-switch(v-model="form.estatus", :label='`${estatus}`')
                        v-flex(xs12)
                            div
                                v-flex(xs12 sm12)
                                    v-layout(align-end='', justify-start='', row='', wrap fill-height='')
                                        v-flex(xs2)
                                        v-btn(style="background:grey;border-radius:10px;", @click.native='save') Guardar
                                        v-flex(xs2)
                                        v-btn(style="background:#e84646;;border-radius:10px;", @click.native='close') Salir
    v-layout(align-start='', justify-start='', row='', fill-height='')
      v-flex(xs12)
        v-card(color='', style="border-radius: 0px 0px 20px 20px;background-color: #e84646;")
            v-card-title(style="padding: 7px;margin-top: 0px;").justify-center
                span.white--text Lista de Metodos de Pago
        v-data-table.elevation-1(:headers='headers', :items="payment", style="margin-top: 5px;")
          template(slot='items', slot-scope='props')
            td {{ props.item.nombre }}
            td {{ props.item.estatus }}
            //- td.justify-start.layout.px-0
            //-         v-btn(v-if='perm').mx-0(icon, @click='editItem(props.item)', style='margin-top: -9px;')
            //-             v-icon(color='teal') edit
</template>

<script>
import Api from "@/services/methods";
export default {
  name: "mPayment",
  data: () => ({
    perm: "",
    form: {
      _id: "",
      nombre: "",
      estatus: true
    },
    dialog: false,
    dialog2: false,
    editedIndex: -1,
    payment: [],
    headers: [
      { text: "Nombre", value: "nombre" },
      { text: "Estatus", value: "estatus" }
    ],
    defaultForm: {
      _id: "",
      nombre: "",
      estatus: true
    }
  }),
  created() {
    this.verificacion();
    this.initialize();
  },
  computed: {
    estatus() {
      let estado = "";
      if (this.form.estatus === true) {
        estado = "Activo";
      } else {
        estado = "Inactivo";
      }
      return estado;
    }
  },
  methods: {
    verificacion() {
      for (let i = 0; i < this.$store.state.usuario.permisos.length; i++) {
        if (this.$store.state.usuario.permisos[i].ruta === "Adm. de Pagos") {
          for (
            let j = 0;
            j < this.$store.state.usuario.permisos[i].accion.length;
            j++
          ) {
            if (
              this.$store.state.usuario.permisos[i].accion[j] === "Modificar"
            ) {
              return (this.perm = "yes");
            }
          }
        }
      }
    },
    initialize() {
      this.editedIndex = -1;
      Api.get("tipo_pago/admin").then(res => {
        this.payment = res.data;
      });
    },
    close() {
      this.form = Object.assign({}, this.defaultForm);
      this.dialog = false;
      this.dialog2 = false;
      this.initialize();
    },
    editItem(item) {
      this.form.estatus = true;
      this.editedIndex = this.payment.indexOf(item);
      Object.keys(this.form).map(key => {
        if (item[key]) this.form[key] = item[key];
      });
      this.form._id = item._id;
      if (this.form.estatus === "Activo") {
        this.form.estatus = true;
      }
      if (this.form.estatus === "Inactivo") {
        this.form.estatus = false;
      }
      if (this.form.nombre === "PayPal") {
        this.dialog = true;
      } else {
        this.dialog2 = true;
      }
    },
    save() {
      if (this.editedIndex > -1) {
        if (this.form.estatus === true) {
          this.form.estatus = "Activo";
        }
        if (this.form.estatus === false) {
          this.form.estatus = "Inactivo";
        }
        Api.put("tipo_pago/admin", this.form)
          .then(res => {
            this.form = Object.assign({}, this.defaultForm);
            this.dialog = false;
            this.dialog2 = false;
            this.initialize();
          })
          .catch(err => {
            console.log(err);
            this.$message.error("A ocurrido un error." + err);
          });
      } 
      // else {
      //   console.log("paso post")
      //   if (this.form.estatus === true) {
      //     this.form.estatus = "Activo";
      //   }
      //   if (this.form.estatus === false) {
      //     this.form.estatus = "Inactivo";
      //   }
      //   let info = {
      //     nombre: this.form.nombre,
      //     estatus: this.form.estatus
      //   }
      //   Api.post("tipo_pago", info)
      //     .then(res => {
      //       this.form = Object.assign({}, this.defaultForm);
      //       this.dialog = false;
      //       this.dialog2 = false;
      //       this.initialize();
      //     })
      //     .catch(err => {
      //       console.log(err);
      //       this.$message.error("A ocurrido un error." + err);
      //     });
      // }
    }
  }
};
</script>
