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
        v-btn(v-if='perm').mb-2(@click="dialog2 = true" style="border-radius:5px;background-color: #e84646;") Nuevo Usuario
    v-dialog(v-model='dialog2', persistent max-width='900px')
          v-container(style='background-color:white !important;max-width: 900px;')
            v-card-title.justify-center
                span.headline Usuario
            div(style="margin-top: 20px;")
                v-flex(xs12 sm12)
                    v-layout(align-start='', justify-center='', row='', wrap fill-height='')
                        v-flex(xs8)
                          v-form(enctype="multipart/form-data")
                            v-text-field(id="nombre"
                                outline
                                required
                                mask="Aaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
                                v-model="form3.nombre"
                                prepend-inner-icon="person"
                                label="Nombre:"
                                style="height: 56px;width: 89%;margin: 0px 32px 10px;")

                            v-text-field(id="apellido"
                                outline
                                required
                                mask="Aaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
                                v-model="form3.apellido"
                                prepend-inner-icon="person"
                                label="Apellido:"
                                style="height: 56px;width: 89%;margin: 0px 32px 10px;")

                            v-text-field(id="identificacion"
                                outline
                                required
                                v-model="form3.identificacion"
                                mask="###############################"
                                prepend-inner-icon="perm_identity"
                                label="Identificacion:"
                                style="height: 56px;width: 89%;margin: 0px 32px 10px;")

                            v-text-field(id="tlf"
                                outline
                                required
                                mask="phone"
                                v-model="form3.telefono"
                                prepend-inner-icon="phone"
                                label="Telefono:"
                                style="height: 56px;width: 89%;margin: 0px 32px 10px;")

                            v-text-field(id="usuario"
                                outline
                                required
                                v-model="form3.email"
                                :rules="[rules.email]"
                                prepend-inner-icon="email"
                                label="Correo:"
                                style="height: 56px;width: 89%;margin: 0px 32px 10px;")

                            v-text-field(id="contraseña"
                                outline
                                required
                                :append-icon="show1 ? 'visibility' : 'visibility_off'"
                                :type="show1 ? 'text' : 'password'"
                                counter
                                @click:append="show1 = !show1"
                                v-model="form3.password"
                                prepend-inner-icon="lock"
                                label="Contraseña:"
                                style="height: 56px;width: 89%;margin: 0px 32px 10px;")

                            div(style="display: flex;justify-content: center;")
                                v-btn(style="background:grey;border-radius:10px;", @click.native='guardar') Guardar
                                v-btn(style="background:#e84646;;border-radius:10px;", @click.native='close') Salir
    v-dialog(v-model='dialog', persistent max-width='900px')
          v-container(style='background-color:white !important;max-width: 900px;')
            v-card-title.justify-center
                span.headline Permisos
            div(style="margin-top: 20px;")
                v-flex(xs12 sm12)
                    v-layout(align-start='', justify-center='', row='', wrap fill-height='')
                        v-flex(xs8)
                          v-form(enctype="multipart/form-data")
                            v-text-field(id="Usuario"
                                outline
                                required
                                disabled
                                v-model="form.email"
                                prepend-inner-icon="person"
                                label="Nombre de Usuario:"
                                style="height: 56px;width: 89%;margin: 0px 32px 10px;")

                            v-select(id="accion"
                                outline
                                :items="options"
                                multiple
                                v-model="accion"
                                prepend-icon="chevron_right",
                                required
                                style="height: 56px;width: 95%;margin: 0px 0px 10px;"
                                label="Seleccione Acción:")

                            v-autocomplete(id="ruta"
                                outline
                                :items="item"
                                multiple
                                v-model="ruta"
                                prepend-icon="chevron_right",
                                required
                                style="width: 95%;margin: 0px 0px 10px;"
                                label="Seleccione Ruta:")

                            div(style="display: flex;justify-content: center;")
                                v-btn(style="background:grey;border-radius:10px;", @click='add(ruta,accion)') Agregar
                            div(style="display: flex;justify-content: center;")
                                v-btn(style="background:#e84646;border-radius:10px;", @click='AllPermisos()') Agregar todos los Permisos
                                v-btn(style="background:#e84646;border-radius:10px;", @click='DeleteAllPermisos()') Eliminar todos los Permisos

                            v-data-table.elevation-1(:headers='headers2', :items="listado", style="margin-top: 5px;")
                                template(slot='items', slot-scope='props2')
                                    td {{ props2.item.ruta }}
                                    td {{ props2.item.accion }}
                                    td.justify-start.layout.px-0
                                        v-btn.mx-0(icon, @click='deleteItem(props2.item.ruta)', style='margin-top: -9px;')
                                            v-icon(color='pink') delete
                            div(style="display: flex;justify-content: center;")
                                v-btn(style="background:grey;border-radius:10px;", @click.native='save') Guardar
                                v-btn(style="background:#e84646;;border-radius:10px;", @click.native='close') Salir
    v-layout(align-start='', justify-start='', row='', fill-height='')
      v-flex(xs12 style='margin-top: 5px;')
        v-text-field(v-model='search', append-icon='search', label='Buscar' style='width:50%;')
        v-card(color='', style="border-radius: 0px 0px 20px 20px;background-color: #e84646;")
            v-card-title(style="padding: 7px;margin-top: 0px;").justify-center
                span.white--text Lista de Usuarios
        v-data-table.elevation-1(:headers='headers', :items="usuario", :search='search', style="margin-top: 5px;")
          template(slot='items', slot-scope='props')
            td {{ props.item.nombre }}
            td {{ props.item.apellido }}
            td {{ props.item.email }}
            td.justify-start.layout.px-0
                    v-btn(v-if='perm').mx-0(icon, @click='editItem2(props.item)', style='margin-top: -9px;')
                        v-icon(color='teal') edit
                    v-btn(v-if='perm').mx-0(icon, @click='editItem(props.item)', style='margin-top: -9px;')
                        v-icon(color='teal') add_box
                    v-btn(v-if='elm').mx-0(icon, @click='deleteItem2(props.item)', style='margin-top: -9px;')
                        v-icon(color='red') delete
</template>

<script>
import Api from "@/services/methods";
export default {
  name: "mPermisos",
  data: () => ({
    rules: {
      required: value => !!value || "Required.",
      string: value => {
        const pattern = /^[a-zA-Z]+$/;
        return pattern.test(value) || "dato invalido.";
      },
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "";
      }
    },
    show1: false,
    search: "",
    listado: [],
    perm: "",
    elm: "",
    options: ["Ver", "Crear", "Modificar", "Eliminar"],
    item: [
      "Adm. de Choferes",
      "Adm. de Retiros",
      "Lista de Choferes",
      "Configuración de Conceptos",
      "Crear Extras",
      "Dashboard",
      "Clientes",
      "Adm. de Pagos",
      "Asignación de Permisos",
      "Reporte de Reservas",
      "Balance",
      "Reporte de Pagos",
      "Seguimiento",
      "Configuraciones Basicas",
      "Reporte de Transacciones",
      "Geocerca",
      "Comentarios",
      "Notificaciones",
      "Rutas entre Geocercas",
      "Historial de Notificaciones",
      "Devoluciones"
    ],
    ruta: "",
    accion: "",
    permisos: [],
    form2: {
      permisos: []
    },
    form: {
      nombre: "",
      apellido: "",
      email: "",
      permisos: []
    },
    form3: {
      nombre: "",
      apellido: "",
      identificacion: "",
      telefono: "",
      email: "",
      password: ""
    },
    dialog: false,
    dialog2: false,
    editedIndex: -1,
    editedIndex2: -1,
    usuario: [],
    headers: [
      { text: "Nombre", value: "nombre" },
      { text: "Apellido", value: "apellido" },
      { text: "Usuario", value: "email" },
      { text: "Acciones" }
    ],
    headers2: [
      { text: "Ruta", value: "ruta" },
      { text: "Acciones", value: "accion" },
      { text: "Acción" }
    ],
    defaultForm2: {
      nombre: "",
      apellido: "",
      identificacion: "",
      telefono: "",
      email: "",
      password: ""
    },
    defaultForm: {
      nombre: "",
      apellido: "",
      email: "",
      permisos: []
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
          "Asignación de Permisos"
        ) {
          for (
            let j = 0;
            j < this.$store.state.usuario.permisos[i].accion.length;
            j++
          ) {
            if (
              this.$store.state.usuario.permisos[i].accion[j] === "Modificar"
            ) {
              this.perm = "yes";
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
      this.editedIndex2 = -1;
      //   this.form2.permisos = [];
      this.ruta = "";
      this.accion = "";
      Api.get("usuario/admin").then(res => {
        this.usuario = res.data;
      });
    },
    DeleteAllPermisos() {
      this.listado = [];
      this.form2.permisos = [];
      this.$swal.fire(
        "Felicidades.!",
        "Permisos Eliminados con Exito.",
        "success"
      );
    },
    AllPermisos() {
      this.listado = [];
      this.form2.permisos = [];
      for (let i = 0; i < this.item.length; i++) {
        this.listado.push({
          ruta: this.item[i],
          accion: "Ver Crear Modificar Eliminar"
        });
        this.form2.permisos.push({ ruta: this.item[i], accion: this.options });
      }
      this.$swal.fire(
        "Felicidades.!",
        "Permisos Agregados con Exito.",
        "success"
      );
    },
    deleteItem2(item) {
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
            Api.delete("usuario/" + item._id)
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
    add(ruta, accion) {
      let bols = false;
      let view = false;
      if (ruta && accion) {
        for (let j = 0; j < accion.length; j++) {
          if (accion[j] === "Ver") {
            view = true;
          }
        }
        if (view === true) {
          if (this.form2.permisos.length > 0) {
            for (let i = 0; i < this.form2.permisos.length; i++) {
              for (let j = 0; j < ruta.length; j++) {
                if (this.form2.permisos[i].ruta === ruta[j]) {
                  bols = true;
                }
              }
            }
          }
          if (bols === false) {
            let stg = "";
            for (let e = 0; e < accion.length; e++) {
              stg += accion[e] + " ";
            }
            for (let i = 0; i < ruta.length; i++) {
              this.listado.push({ ruta: ruta[i], accion: stg });
              this.form2.permisos.push({ ruta: ruta[i], accion: accion });
            }
            this.$swal.fire(
              "Felicidades.!",
              "Permiso Agregado con Exito.",
              "success"
            );
          } else {
            this.$swal.fire(
              "Oops...",
              "Ya posee en la lista esta misma ruta, eliminela y vuelva a añadir si desea modificarla.",
              "error"
            );
          }
        } else {
          this.$swal.fire(
            "Oops...",
            "Para agregar esta o estas acciones a la lista es necesario incluir la acción (VER) en la misma.",
            "error"
          );
        }
      } else {
        this.$swal.fire(
          "Oops...",
          "Debe ingresar ambos campos( ruta y accion ) para poder agregarlo a la lista.",
          "error"
        );
      }
    },
    close() {
      //   this.form2.permisos = [];
      this.ruta = "";
      this.accion = "";
      this.form = Object.assign({}, this.defaultForm);
      this.dialog = false;
      this.dialog2 = false;
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
            for (let i = 0; i < this.form2.permisos.length; i++) {
              if (this.form2.permisos[i].ruta === item) {
                this.form2.permisos.splice(i, 1);
                this.listado.splice(i, 1);
              }
            }
          }
        });
    },
    editItem2(item) {
      this.editedIndex2 = this.usuario.indexOf(item);
      Object.keys(this.form3).map(key => {
        if (item[key]) this.form3[key] = item[key];
      });
      this.form3._id = item._id;
      this.dialog2 = true;
    },
    editItem(item) {
      this.form2 = [];
      this.listado = [];
      this.editedIndex = this.usuario.indexOf(item);
      Object.keys(this.form).map(key => {
        if (item[key]) this.form[key] = item[key];
      });
      this.form._id = item._id;
      this.form2.permisos = item.permisos;
      for (let e = 0; e < item.permisos.length; e++) {
        let stg = "";
        for (let i = 0; i < item.permisos[e].accion.length; i++) {
          stg += item.permisos[e].accion[i] + " ";
        }
        this.listado.push({ ruta: item.permisos[e].ruta, accion: stg });
      }
      this.dialog = true;
    },
    save() {
      if (this.editedIndex > -1) {
        this.form.permisos = this.form2.permisos;
        Api.put("usuario/admin", this.form)
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
      }
    },
    guardar() {
      if (
        this.form3.nombre &&
        this.form3.apellido &&
        this.form3.email &&
        this.form3.password
      ) {
        if (this.editedIndex2 > -1) {
          Api.put("usuario/admin", this.form3)
            .then(res => {
              this.form3 = Object.assign({}, this.defaultForm2);
              this.dialog2 = false;
              this.$swal.fire(
                "Felicidades.!",
                "Registro realizada exitosamente.",
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
          Api.post("usuario", this.form3)
            .then(res => {
              let form = {
                nombre: this.form3.nombre,
                apellido: this.form3.apellido,
                email: this.form3.email,
                telefono: this.form3.telefono,
                password: "¬",
                estatus: "Web",
                web: res.data._id
              };
              Api.post("cliente", form)
                .then(res => {
                  console.log("paso cliente");
                })
                .catch(err => {
                  console.log(err);
                });
              this.form3 = Object.assign({}, this.defaultForm2);
              this.dialog2 = false;
              this.$swal.fire(
                "Felicidades.!",
                "Registro realizada exitosamente.",
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
      } else {
        this.$swal.fire(
          "Oops...",
          "Error encontrado, para realizar el registro no debe dejar campos vacios.",
          "error"
        );
      }
    }
  }
};
</script>
