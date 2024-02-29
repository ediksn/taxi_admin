<template lang="pug">
div(style="margin-top: -24px;margin-left: -15px;margin-right: -15px;")
  #CrearExtras
    v-layout(align-start='', justify-start='', row='', fill-height='')
      v-flex(xs12)
        v-card(color='', style="border-radius:5px;background-color: #e84646;")
            v-card-title.justify-center
              img(src='../assets/logo.png', with='60' ,height='60')
                //- span.black--text  Appolo
        v-card(color='', style="border-radius:5px;background-color: #d6d6d6")
            v-card-title(style="padding: 7px;").justify-center
                span.black--text  Administración de Extras
    v-dialog(v-model='dialog', persistent max-width='700px')
          v-btn(v-if='cre').mb-2(slot='activator', style="border-radius:5px;background-color: #e84646;") Nuevo Extra
          v-container(style='background-color:white !important;max-width: 700px;')
            v-card-title.justify-center
                span.headline Extras
            div(style="margin-top: 20px;")
                v-flex(xs12 sm12)
                    v-layout(align-start='', justify-center='', row='', wrap fill-height='')
                        v-flex(xs6)
                          v-form(enctype="multipart/form-data")
                            v-text-field(id="Nombre"
                            outline
                            required
                            v-model="form.nombre"
                            prepend-inner-icon="star_half"
                            label="Nombre del Extra:"
                            style="height: 56px;width: 95%;margin: 0px 0px 10px;")

                            div
                                v-flex(xs12 sm12)
                                    v-layout(row='', wrap fill-height='')
                                        v-flex(xs1)
                                        v-btn(style="background:grey;border-radius:10px;", @click.native='save') Guardar
                                        v-flex(xs1)
                                        v-btn(style="background:#e84646;;border-radius:10px;", @click.native='close') Salir
    v-layout(align-start='', justify-start='', row='', fill-height='')
      v-flex(xs12 style='margin-top: 5px;')
        v-card(color='', style="border-radius: 0px 0px 20px 20px;background-color: #e84646;")
            v-card-title(style="padding: 7px;margin-top: 0px;").justify-center
                span.white--text Lista de Extras
        v-data-table.elevation-1(:headers='headers', :items="extras", style="margin-top: 5px;")
          template(slot='items', slot-scope='props')
            td {{ props.item.nombre }}
            td.justify-start.layout.px-0
                    v-btn(v-if='mod').mx-0(icon, @click='editItem(props.item)', style='margin-top: -9px;')
                        v-icon(color='teal') edit
                    v-btn(v-if='elm').mx-0(icon, @click='deleteItem(props.item)', style='margin-top: -9px;')
                        v-icon(color='pink') delete
</template>

<script>
import Api from "@/services/methods";
export default {
  name: "mCrearExtras",
  data: () => ({
    cre: "",
    mod: "",
    elm: "",
    form: {
      nombre: ""
    },
    dialog: false,
    editedIndex: -1,
    extras: [],
    headers: [{ text: "Nombre", value: "nombre" }, { text: "Acción" }],
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
        if (this.$store.state.usuario.permisos[i].ruta === "Crear Extras") {
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
            if (
              this.$store.state.usuario.permisos[i].accion[j] === "Eliminar"
            ) {
              this.elm = "yes";
            }
          }
        }
      }
    },
    initialize() {
      this.editedIndex = -1;
      Api.get("extra/admin").then(res => {
        this.extras = res.data;
      });
    },
    close() {
      this.form = Object.assign({}, this.defaultForm);
      this.dialog = false;
      this.initialize();
    },
    deleteItem(item) {
      this.$swal
        .fire({
          title: "¿Estás seguro?",
          text: "No podrás revertir esta operación!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, Eliminar!"
        })
        .then(result => {
          if (result.value) {
            Api.delete("extra/" + item._id)
              .then(res => {
                this.$swal.fire(
                  "Felicidades.!",
                  "Eliminación realizada exitosamente.",
                  "success"
                );
                this.initialize();
              })
              .catch(err => {
                console.error(err);
              });
          }
        });
    },
    editItem(item) {
      this.editedIndex = this.extras.indexOf(item);
      Object.keys(this.form).map(key => {
        if (item[key]) this.form[key] = item[key];
      });
      this.form._id = item._id;
      this.dialog = true;
    },
    save() {
      if (this.editedIndex > -1) {
        if (this.form.nombre) {
          Api.put("extra", this.form)
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
          this.$swal.fire(
            "Oops...",
            "Error encontrado, por favor ingrese el nombre del extra.",
            "error"
          );
        }
      } else {
        if (this.form.nombre) {
          Api.post("extra", this.form)
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
          this.$swal.fire(
            "Oops...",
            "Error encontrado, por favor ingrese el nombre del extra.",
            "error"
          );
        }
      }
    }
  }
};
</script>
