<template lang="pug">
div(style="margin-top: -24px;margin-left: -15px;margin-right: -15px;")
  #Concepto
    v-layout(align-start='', justify-start='', row='', fill-height='')
      v-flex(xs12)
        v-card(color='', style="border-radius:5px;background-color: #e84646;")
            v-card-title.justify-center
              img(src='../assets/logo.png', with='60' ,height='60')
                //- span.black--text  Appolo
        v-card(color='', style="border-radius:5px;background-color: #d6d6d6")
            v-card-title(style="padding: 7px;").justify-center
                span.black--text  Administración de Conceptos de Transacciones
    v-dialog(v-model='dialog', persistent max-width='700px')
          v-btn(v-if='cre').mb-2(slot='activator', style="border-radius:5px;background-color: #e84646;") Nuevo Concepto
          v-container(style='background-color:white !important;max-width: 700px;')
            v-card-title.justify-center
                span.headline Concepto
            div(style="margin-top: 20px;")
                v-flex(xs12 sm12)
                    v-layout(align-start='', justify-center='', row='', wrap fill-height='')
                        v-flex(xs12)
                          v-form(enctype="multipart/form-data")
                            v-text-field(id="Nombre"
                            outline
                            required
                            v-model="form.nombre"
                            prepend-inner-icon="description"
                            label="Nombre del Concepto:"
                            style="height: 56px;width: 95%;margin: 0px 0px 10px;")

                            div
                                v-flex(xs12 sm12)
                                    v-layout(row='', wrap fill-height='')
                                        v-flex(xs3)
                                        v-btn(style="background:grey;border-radius:10px;", @click.native='save') Guardar
                                        v-flex(xs2)
                                        v-btn(style="background:#e84646;;border-radius:10px;", @click.native='close') Salir
    v-layout(align-start='', justify-start='', row='', fill-height='')
      v-flex(xs12 style='margin-top: 5px;')
        v-card(color='', style="border-radius: 0px 0px 20px 20px;background-color: #e84646;")
            v-card-title(style="padding: 7px;margin-top: 0px;").justify-center
                span.white--text Lista de Conceptos
        v-data-table.elevation-1(:headers='headers', :items="conceptos", style="margin-top: 5px;")
          template(slot='items', slot-scope='props')
            td {{ props.item.nombre }}
            //- td.justify-start.layout.px-0
            //-         v-btn(v-if='mod').mx-0(icon, @click='editItem(props.item)', style='margin-top: -9px;')
            //-             v-icon(color='teal') edit
                    //- v-btn.mx-0(icon, @click='deleteItem(props.item)', style='margin-top: -9px;')
                    //-     v-icon(color='pink') delete
</template>

<script>
import Api from "@/services/methods";
export default {
  name: "mConcepto",
  data: () => ({
    cre: "",
    mod: "",
    form: {
      nombre: ""
    },
    dialog: false,
    editedIndex: -1,
    conceptos: [],
    headers: [{ text: "Nombre", value: "nombre" }],
    defaultForm: {
      nombre: ""
    }
  }),
  created() {
    this.verificacion();
    this.initialize();
  },
  methods: {
    verificacion() {
      for (let i = 0; i < this.$store.state.usuario.permisos.length; i++) {
        if (
          this.$store.state.usuario.permisos[i].ruta ===
          "Configuración de Conceptos"
        ) {
          for (
            let j = 0;
            j < this.$store.state.usuario.permisos[i].accion.length;
            j++
          ) {
            if (this.$store.state.usuario.permisos[i].accion[j] === "Crear") {
              this.cre = "yes";
            }
            if (
              this.$store.state.usuario.permisos[i].accion[j] === "Modificar"
            ) {
              this.mod = "yes";
            }
          }
        }
      }
    },
    initialize() {
      this.editedIndex = -1;
      Api.get("concepto/admin").then(res => {
        this.conceptos = res.data;
      });
    },
    close() {
      this.form = Object.assign({}, this.defaultForm);
      this.dialog = false;
      this.initialize();
    },
    // deleteItem(item) {
    //   console.log(item);
    //   const confirmar = confirm(
    //     "¿Está seguro de que desea borrar este elemento?"
    //   );
    //   if (confirmar) {
    //     Api.delete("concepto/" + item._id)
    //       .then(res => {
    //         console.log(res.data);
    //         this.initialize();
    //       })
    //       .catch(err => {
    //         console.error(err);
    //       });
    //   }
    // },
    editItem(item) {
      this.editedIndex = this.conceptos.indexOf(item);
      Object.keys(this.form).map(key => {
        if (item[key]) this.form[key] = item[key];
      });
      this.form._id = item._id;
      this.dialog = true;
    },
    save() {
      if (this.editedIndex > -1) {
        Api.put("concepto", this.form)
          .then(res => {
            this.form = Object.assign({}, this.defaultForm);
            this.dialog = false;
            this.$swal.fire(
              "Felicidades.!",
              "Modificación realizada exitosamente.",
              "success"
            );
            this.initialize();
          })
          .catch(err => {
            console.log(err);
            this.$swal.fire(
              "Oops...",
              "Error encontrado, verifique los datos o llame al administrador.",
              "error"
            );
          });
      } else {
        Api.post("concepto", this.form)
          .then(res => {
            this.form = Object.assign({}, this.defaultForm);
            this.dialog = false;
            this.$swal.fire(
              "Felicidades.!",
              "Registro realizado exitosamente.",
              "success"
            );
            this.initialize();
          })
          .catch(err => {
            console.log(err);
            this.$swal.fire(
              "Oops...",
              "Error encontrado, verifique los datos o llame al administrador.",
              "error"
            );
          });
      }
    }
  }
};
</script>
