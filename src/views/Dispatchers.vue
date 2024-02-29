<template lang="pug">
div(style="margin-top: -24px;margin-left: -15px;margin-right: -15px;")
  #Dispatchers
    v-layout(align-start='', justify-start='', row='', fill-height='')
      v-flex(xs12)
        v-card(color='', style="border-radius:5px;background-color: #e84646;")
            v-card-title.justify-center
              img(src='../assets/logo.png', with='60' ,height='60')
                //- span.black--text  Appolo
        v-card(color='', style="border-radius:5px;background-color: #d6d6d6")
            v-card-title(style="padding: 7px;").justify-center
                span.black--text  Administrar Clientes
    v-dialog(v-model='dialog', persistent max-width='1028px')
          v-container(style='background-color:white !important;max-width: 1028px;')
            v-card-title.justify-center
                span.headline Cliente
            div(style="margin-top: 20px;")
                v-flex(xs12 sm12)
                    v-layout(align-start='', justify-center='', row='', wrap fill-height='')
                        v-flex(xs6)
                          v-form(enctype="multipart/form-data")
                            v-card(style="margin-right: 0px;")
                                v-text-field(id="Nombre"
                                outline
                                :rules="[rules.string]"
                                required
                                v-model="form.nombre"
                                prepend-inner-icon="person"
                                label="Nombre:"
                                style="height: 56px;")

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="Apellido"
                                outline
                                required
                                v-model="form.apellido"
                                prepend-inner-icon="person"
                                label="Apellido:"
                                style="height: 56px;")

                            // v-card(style="margin-right: 0px;margin-top: 10px;")
                            //     v-text-field(id="Identificacion"
                            //     outline
                            //     required
                            //     v-model="form.identificacion"
                            //     prepend-inner-icon="person"
                            //     label="Identificacion:"
                            //     style="height: 56px;")

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="Email"
                                v-model="form.email"
                                outline
                                :rules="[rules.email]"
                                required
                                prepend-inner-icon="email"
                                label="Email:"
                                style="height: 56px;")
                                
                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="Telefono"
                                outline
                                required
                                v-model="form.telefono"
                                mask="phone"
                                prepend-inner-icon="phone"
                                label="Telefono:"
                                style="height: 56px;")

                            //- v-card(style="margin-right: 0px;margin-top: 10px;")
                            //-     v-textarea(id="Dirección"
                            //-     outline
                            //-     required
                            //-     v-model="form.direccion"
                            //-     prepend-inner-icon="place"
                            //-     label="Dirección:"
                            //-     style="height: 133px;")

                            div(style="display: flex;justify-content: center;")
                                v-btn(style="background:grey;border-radius:10px;", @click.native='save') Guardar
                                v-btn(style="background:#e84646;;border-radius:10px;", @click.native='close') Salir
    v-layout(align-start='', justify-start='', row='', fill-height='')
      v-flex(xs12 style='margin-top: 20px;')
        v-text-field(v-model='search', append-icon='search', label='Buscar' style='width:50%;')
        v-card(color='', style="border-radius: 0px 0px 20px 20px;background-color: #e84646;")
            v-card-title(style="padding: 7px;").justify-center
                span.white--text Lista de Clientes
        v-data-table.elevation-1(:headers='headers', :items="dispatchers", :search='search' style="margin-top: 5px;")
          template(slot='items', slot-scope='props')
            // td {{ props.item.identificacion }}
            td {{ props.item.nombre }}
            td(v-if='props.item.apellido') {{ props.item.apellido }}
            td(v-else) N/A
            td {{ props.item.email }}
            td {{ props.item.telefono }}
            //- td {{ props.item.direccion[0] }}
            td(v-if='props.item.estatus') {{ props.item.estatus }}
            td(v-if='!props.item.estatus') {{ " " }}
            td.justify-start.layout.px-0
                    v-btn(v-if='perm && props.item.estatus !== "Web"').mx-0(icon, @click='editItem(props.item)', style='margin-top: -9px;')
                        v-icon(color='teal') edit
                    v-btn(v-if='elm && props.item.estatus !== "Bloqueado" && props.item.estatus !== "Web"').mx-0(icon, @click='blockItem(props.item)', style='margin-top: -9px;')
                        v-icon(color='red') block
                    v-btn(v-if='elm && props.item.estatus === "Bloqueado" && props.item.estatus !== "Web"').mx-0(icon, @click='desblockItem(props.item)', style='margin-top: -9px;')
                        v-icon(color='green') block
                    v-btn(v-if='elm && props.item.estatus !== "Web"').mx-0(icon, @click='deleteItem(props.item)', style='margin-top: -9px;')
                        v-icon(color='red') delete
</template>

<script>
import Api from "@/services/methods";
export default {
  name: "mDispatchers",
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
    search: "",
    perm: "",
    elm: "",
    form: {
      _id: "",
      apellido: "",
      direccion: "",
      email: "",
      // identificacion: "",
      nombre: "",
      telefono: "",
      estatus: ""
    },
    dialog: false,
    editedIndex: -1,
    dispatchers: [],
    headers: [
      // { text: "Identificacion", value: "identificacion" },
      { text: "Nombre", value: "nombre" },
      { text: "Apellido", value: "apellido" },
      { text: "Correo", value: "email" },
      { text: "Telefono", value: "telefono" },
      // { text: "Dirección", value: "direccion" },
      { text: "Estatus", value: "estatus" },
      { text: "Acción" }
    ],
    defaultForm: {
      _id: "",
      apellido: "",
      direccion: "",
      email: "",
      // identificacion: "",
      nombre: "",
      telefono: "",
      estatus: ""
    }
  }),
  created() {
    this.verificacion();
    this.initialize();
  },
  sockets: {
    act_cli(data) {
      Api.get("cliente/admin").then(res => {
        this.dispatchers = res.data;
      });
    }
  },
  methods: {
    verificacion() {
      for (let i = 0; i < this.$store.state.usuario.permisos.length; i++) {
        if (this.$store.state.usuario.permisos[i].ruta === "Clientes") {
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
      Api.get("cliente/admin").then(res => {
        this.dispatchers = res.data;
      });
    },
    close() {
      this.form = Object.assign({}, this.defaultForm);
      this.dialog = false;
      this.initialize();
    },
    desblockItem(item) {
      this.$swal
        .fire({
          title: "¿Estás seguro?",
          text:
            "Confirme si desea continuar con el desbloqueo o cancele la operación!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, Desbloquearlo!"
        })
        .then(result => {
          if (result.value) {
            let info = {
              _id: item._id,
              estatus: "Activo"
            };
            Api.put("cliente/admin/", info)
              .then(res => {
                this.$swal.fire(
                  "Felicidades.!",
                  "Desbloqueo realizado exitosamente.",
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
    blockItem(item) {
      this.$swal
        .fire({
          title: "¿Estás seguro?",
          text:
            "Confirme si desea continuar con el bloqueo o cancele la operación!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, Bloquearlo!"
        })
        .then(result => {
          if (result.value) {
            let info = {
              _id: item._id,
              estatus: "Bloqueado"
            };
            Api.put("cliente/admin/", info)
              .then(res => {
                this.$swal.fire(
                  "Felicidades.!",
                  "Bloqueo realizado exitosamente.",
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
            Api.delete("cliente/admin/" + item._id)
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
      this.editedIndex = this.dispatchers.indexOf(item);
      Object.keys(this.form).map(key => {
        if (item[key]) this.form[key] = item[key];
      });
      this.form._id = item._id;
      this.dialog = true;
    },
    save() {
      if (this.editedIndex > -1) {
        if (this.form.nombre && this.form.apellido && this.form.telefono) {
          Api.put("cliente/admin", this.form)
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
            "Error encontrado, para realizar la modificación no debe dejar campos vacios.",
            "error"
          );
        }
      }
    }
  }
};
</script>
