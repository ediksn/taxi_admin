<template lang="pug">
div(style="margin-top: -24px;margin-left: -15px;margin-right: -15px;")
  #Choferes
    v-layout(align-start='', justify-start='', row='', fill-height='')
      v-flex(xs12)
        v-card(color='', style="border-radius:5px;background-color: #e84646;")
            v-card-title.justify-center
              img(src='../assets/logo.png', with='60' ,height='60')
                //- span.black--text  Appolo
        v-card(color='', style="border-radius:5px;background-color: #d6d6d6")
            v-card-title(style="padding: 7px;").justify-center
                span.black--text Choferes
    v-dialog(v-model='dialogbanco', persistent max-width='1028px')
          v-container(style='background-color:white !important;max-width: 1028px;')
            v-card-title.justify-center
                span.headline Datos Bancarios y Cuenta PayPal
            div(style="margin-top: 20px;")
                v-flex(xs12 sm12)
                    v-layout(align-start='', justify-center='', row='', wrap fill-height='')
                        v-flex(xs6)
                          v-form(enctype="multipart/form-data")
                            v-card(style="margin-right: 0px;")
                                v-text-field(id="nombre"
                                outline
                                required
                                disabled
                                v-model="formba.nom_banc"
                                prepend-inner-icon="account_balance"
                                label="Nombre del Banco:"
                                style="height: 56px;")

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="tipo"
                                outline
                                required
                                disabled
                                v-model="formba.tipo_cuenta"
                                prepend-inner-icon="account_balance"
                                label="Tipo de Cuenta:"
                                style="height: 56px;")

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="numero"
                                outline
                                required
                                disabled
                                v-model="formba.num_cuenta"
                                prepend-inner-icon="account_balance"
                                label="Numero de Cuenta:"
                                style="height: 56px;")

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="paypal"
                                outline
                                required
                                disabled
                                v-model="formba.paypal"
                                prepend-inner-icon="local_parking"
                                label="PayPal:"
                                style="height: 56px;")

                            div(style="display: flex;justify-content: center;")
                                v-btn(style="background:#e84646;;border-radius:10px;", @click.native='close') Salir
    v-dialog(v-model='dialogcarro', persistent max-width='1028px')
          v-container(style='background-color:white !important;max-width: 1028px;')
            v-card-title.justify-center
                span.headline Vehiculo
            div(style="margin-top: 20px;")
                v-flex(xs12 sm12)
                    v-layout(align-start='', justify-center='', row='', wrap fill-height='')
                        v-flex(xs6)
                          v-form(enctype="multipart/form-data")
                            v-card(style="margin-right: 0px;")
                                v-text-field(id="modelo"
                                outline
                                required
                                disabled
                                v-model="formveh.modelo"
                                prepend-inner-icon="local_taxi"
                                label="Modelo:"
                                style="height: 56px;")

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="placa"
                                outline
                                required
                                disabled
                                v-model="formveh.placa"
                                prepend-inner-icon="local_taxi"
                                label="Placa:"
                                style="height: 56px;")

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="color"
                                outline
                                required
                                disabled
                                v-model="formveh.color"
                                prepend-inner-icon="local_taxi"
                                label="Color:"
                                style="height: 56px;")

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="tipo"
                                v-model="formveh.tipo"
                                outline
                                required
                                disabled
                                prepend-inner-icon="local_taxi"
                                label="Tipo:"
                                style="height: 56px;")

                            v-card(style="margin-right: 0px;margin-top: 10px;border: 2px solid;border-color: #757575;")
                                div(style="display: flex;margin-left: 12px;margin-top:10px").justify-start
                                  v-icon(color='grey') star_half
                                  span(style="margin-left: 5px;").grey--text <b> Extras: </b>
                                div(style="display: flex;margin-left: 42px;",v-for="item in formveh.extras").justify-start
                                  h5(style="line-height: 0.5 !important;").grey--text - {{item}}

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                              v-card-title.justify-center
                                span Fotos del Vehiculo
                            v-card(v-for='item in formveh.images', style="margin-right: 0px;margin-top: 10px;")
                              img(:src='ruta + item.url', width='100%', height='100%')

                            div(style="display: flex;justify-content: center;")
                                v-btn(style="background:#e84646;;border-radius:10px;", @click.native='close') Salir
    v-dialog(v-model='dialog', persistent max-width='1028px')
          v-container(style='background-color:white !important;max-width: 1028px;')
            v-card-title.justify-center
                span.headline Chofer
            div(style="margin-top: 20px;")
                v-flex(xs12 sm12)
                    v-layout(align-start='', justify-center='', row='', wrap fill-height='')
                        v-flex(xs6)
                          v-form(enctype="multipart/form-data")
                            v-card(style="margin-right: 0px;")
                                v-text-field(id="Nombre"
                                outline
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

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="Identificacion"
                                outline
                                required
                                mask="###############################"
                                v-model="form.identificacion"
                                prepend-inner-icon="person"
                                label="Identificacion:"
                                style="height: 56px;")

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="Email"
                                v-model="form.email"
                                outline
                                required
                                :rules="[rules.email]"
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

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="Password2"
                                outline
                                :type="show1 ? 'text' : 'password'"
                                counter
                                required
                                v-model="form.password"
                                prepend-inner-icon="lock"
                                label="Contraseña:"
                                style="height: 56px;")

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-textarea(id="Dirección"
                                outline
                                required
                                v-model="form.direccion"
                                prepend-inner-icon="place"
                                label="Dirección:"
                                style="height: 133px;")

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="unidad"
                                outline
                                required
                                v-model="form.unidad"
                                prepend-inner-icon="local_taxi"
                                label="Unidad:"
                                style="height: 56px;")

                            v-container(v-if='form.estatus === "Disponible" || form.estatus === "No Disponible"', fluid='', px-0='').justify-center
                              v-switch(v-model='switch1', :label="`Estatus: ${form.estatus}`", style='display: flex;justify-content: center;', @change="cambio(switch1)")


                            //- v-card(style="margin-right: 0px;margin-top: 10px;")
                            //-   v-card-title.justify-center
                            //-     span Documentos del Chofer
                            //- v-card(v-for='item in form.documents', style="margin-right: 0px;margin-top: 10px;")
                            //-   img(:src='ruta + item.url', width='100%', height='100%')

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                              v-card-title.justify-center
                                span Foto del Chofer
                            v-card(v-if='form.imagen.url', style="margin-right: 0px;margin-top: 10px;")
                              a(:href="ruta + form.imagen.url" target="_blank")
                                img(:src='ruta + form.imagen.url', :href='ruta + form.imagen.url',width='100%', height='100%')

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                              v-card-title.justify-center
                                span Licencia del Chofer
                            v-card(v-if='form.licen.url', style="margin-right: 0px;margin-top: 10px;")
                              a(:href="ruta + form.licen.url" target="_blank")
                                img(:src='ruta + form.licen.url', width='100%', height='100%')

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                              v-card-title.justify-center
                                span Identificación del Chofer
                            v-card(v-if='form.iden.url', style="margin-right: 0px;margin-top: 10px;")
                              a(:href="ruta + form.iden.url" target="_blank")
                                img(:src='ruta + form.iden.url', width='100%', height='100%')

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                              v-card-title.justify-center
                                span Matricula
                            v-card(v-if='form.iden.url', style="margin-right: 0px;margin-top: 10px;")
                              a(:href="ruta + form.matricula.url" target="_blank")
                                img(:src='ruta + form.matricula.url', width='100%', height='100%')

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                              v-card-title.justify-center
                                span Seguro
                            v-card(v-if='form.iden.url', style="margin-right: 0px;margin-top: 10px;")
                              a(:href="ruta + form.seguro.url" target="_blank")
                                img(:src='ruta + form.seguro.url', width='100%', height='100%')

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                              v-card-title.justify-center
                                span Fotos del Vehiculo
                            v-card(v-for='item in fotos', style="margin-right: 0px;margin-top: 10px;")
                              a(:href="ruta + item.url" target="_blank")
                                img(:src='ruta + item.url', width='100%', height='100%')

                            div(style="display: flex;justify-content: center;")
                                v-btn(style="background:grey;border-radius:10px;", @click.native='save') Guardar
                                v-btn(style="background:#e84646;;border-radius:10px;", @click.native='close') Salir
    v-layout(align-start='', justify-start='', row='', fill-height='')
      v-flex(xs12 style='margin-top: 20px;')
        v-text-field(v-model='search', append-icon='search', label='Buscar' style='width:50%;')
        v-card(color='', style="border-radius: 0px 0px 20px 20px;background-color: #e84646;")
            v-card-title(style="padding: 7px;").justify-center
                span.white--text Lista de Choferes
        v-data-table.elevation-1(:headers='headers', :items="chofer", :search="search", style="margin-top: 5px;")
          template(slot='items', slot-scope='props')
            td(v-if='props.item.identificacion') {{ props.item.identificacion }}
            td(v-else) N/A
            td {{ props.item.telefono }}
            td {{ props.item.nombre }}
            td {{ props.item.apellido }}
            td(v-if='props.item.vehiculo') {{ props.item.vehiculo.tipo }}
            td(v-if='!props.item.vehiculo') {{ " " }}
            td {{ props.item.email }}
            td {{ props.item.unidad }}
            td {{ props.item.estatus }}
            td.justify-start.layout.px-0
                    v-btn(v-if='perm').mx-0(icon, @click='editItem(props.item)', style='margin-top: -9px;')
                        v-icon(color='teal') edit
                    v-btn.mx-0(icon, @click='vercarro(props.item)', style='margin-top: -9px;')
                        v-icon(color='teal') directions_car
                    v-btn.mx-0(icon, @click='verbanco(props.item)', style='margin-top: -9px;')
                        v-icon(color='teal') account_balance
                    v-btn(v-if='elm && props.item.estatus !== "Bloqueado"').mx-0(icon, @click='blockItem(props.item)', style='margin-top: -9px;')
                        v-icon(color='red') block
                    v-btn(v-if='elm && props.item.estatus === "Bloqueado"').mx-0(icon, @click='desblockItem(props.item)', style='margin-top: -9px;')
                        v-icon(color='green') block
                    v-btn(v-if='elm').mx-0(icon, @click='deleteItem(props.item)', style='margin-top: -9px;')
                        v-icon(color='red') delete

</template>

//
<script>
import Api from "@/services/methods";
import { server, port } from "@/services/environment";
import EXIF from "exif-js";
export default {
  name: "mChoferes",
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
    ruta: server + ":" + port,
    switch1: false,
    search: "",
    perm: "",
    show1: false,
    elm: "",
    fotos: {},
    formba: {
      nom_banc: "",
      tipo_cuenta: "",
      num_cuenta: "",
      paypal: ""
    },
    defaultFormBa: {
      nom_banc: "",
      tipo_cuenta: "",
      num_cuenta: "",
      paypal: ""
    },
    formveh: {
      modelo: "",
      placa: "",
      color: "",
      extras: [],
      tipo: "",
      images: []
    },
    defaultFormVeh: {
      modelo: "",
      placa: "",
      color: "",
      extras: [],
      tipo: "",
      images: []
    },
    form: {
      _id: "",
      nombre: "",
      apellido: "",
      identificacion: "",
      documents: [],
      licen: [],
      iden: [],
      matricula: [],
      seguro: [],
      direccion: [],
      imagen: [],
      password: "",
      telefono: "",
      email: "",
      unidad: "",
      estatus: ""
    },
    dialog: false,
    dialogcarro: false,
    dialogbanco: false,
    editedIndex: -1,
    chofer: [],
    headers: [
      { text: "Identificación", value: "identificacion" },
      { text: "Teléfono", value: "telefono" },
      { text: "Nombre", value: "nombre" },
      { text: "Apellido", value: "apellido" },
      { text: "Vehiculo", value: "vehiculo.tipo" },
      { text: "Correo", value: "email" },
      { text: "Unidad", value: "unidad" },
      { text: "Estatus", value: "estatus" },
      { text: "Acción" }
    ],
    defaultForm: {
      _id: "",
      nombre: "",
      apellido: "",
      identificacion: "",
      documents: [],
      licen: [],
      iden: [],
      imagen: [],
      matricula: [],
      seguro: [],
      direccion: [],
      unidad: "",
      password: "",
      telefono: "",
      email: "",
      estatus: ""
    }
  }),
  created() {
    this.verificacion();
    this.initialize();
  },
  sockets: {
    act_chof(data) {
      Api.get("chofer/admin").then(res => {
        this.chofer = [];
        for (let i = 0; i < res.data.length; i++) {
          if (
            res.data[i].estatus !== "Pendiente" &&
            res.data[i].estatus !== "Rechazado"
          ) {
            this.chofer.push(res.data[i]);
          }
        }
      });
    },
    putt_chof(data) {
      Api.get("chofer/admin").then(res => {
        this.chofer = [];
        for (let i = 0; i < res.data.length; i++) {
          if (
            res.data[i].estatus !== "Pendiente" &&
            res.data[i].estatus !== "Rechazado"
          ) {
            this.chofer.push(res.data[i]);
          }
        }
      });
    }
  },
  methods: {
    verificacion() {
      for (let i = 0; i < this.$store.state.usuario.permisos.length; i++) {
        if (
          this.$store.state.usuario.permisos[i].ruta === "Lista de Choferes"
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
      this.chofer = [];
      Api.get("chofer/admin").then(res => {
        this.chofer = [];
        for (let i = 0; i < res.data.length; i++) {
          if (
            res.data[i].estatus !== "Pendiente" &&
            res.data[i].estatus !== "Rechazado"
          ) {
            this.chofer.push(res.data[i]);
          }
        }
      });
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
              estatus: "No Disponible"
            };
            Api.put("chofer/admin/", info)
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
            Api.put("chofer/admin/", info)
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
            Api.delete("chofer/admin/" + item._id)
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
    close() {
      this.dialogcarro = false;
      this.dialogbanco = false;
      this.formveh = Object.assign({}, this.defaultFormVeh);
      this.formba = Object.assign({}, this.defaultFormBa);
      this.fotos = {};
      this.form = Object.assign({}, this.defaultForm);
      this.dialog = false;
      this.initialize();
    },
    cambio(item) {
      if (item === true) {
        this.form.estatus = "Disponible";
      }
      if (item === false) {
        this.form.estatus = "No Disponible";
      }
    },
    editItem(item) {
      this.editedIndex = this.chofer.indexOf(item);
      Object.keys(this.form).map(key => {
        if (item[key]) this.form[key] = item[key];
      });
      this.form._id = item._id;
      Api.get(`vehiculo/owner/${item._id}`)
        .then(res => {
          var fotos = res.data.images;
          this.fotos = fotos;
        })
        .catch(err => {
          console.log(err);
        });
      if (this.form.estatus === "Disponible") {
        this.switch1 = true;
      }
      if (this.form.estatus === "No Disponible") {
        this.switch1 = false;
      }
      this.dialog = true;
      setTimeout(() => {
        let imgs = window.document.getElementsByTagName("img");
        for (let i = 0; i < imgs.length; i++) {
          EXIF.getData(imgs[i], () => {
            switch (parseInt(EXIF.getTag(imgs[i], "Orientation"))) {
              case 2:
                imgs[i].style.transform = "rotate(90deg) scale(0.57,1.78)";
                break;
              case 3:
                imgs[i].style.transform = "rotate(180deg)";
                break;
              case 4:
                imgs[i].style.transform = "rotate(180deg) scaleX(-1)";
                break;
              case 5:
                imgs[i].style.transform = "rotate(270deg) scaleX(-1)";
                break;
              case 6:
                imgs[i].style.transform = "rotate(90deg) scale(0.57,1.78)";
                break;
              case 7:
                imgs[i].style.transform = "rotate(90deg) scaleX(-1)";
                break;
              case 8:
                imgs[i].style.transform = "rotate(270deg)";
                break;
            }
          });
        }
      }, 500);
    },
    vercarro(item) {
      Object.keys(this.formveh).map(key => {
        if (item.vehiculo[key]) this.formveh[key] = item.vehiculo[key];
      });
      this.formveh._id = item._id;
      this.dialogcarro = true;
    },
    verbanco(item) {
      Object.keys(this.formba).map(key => {
        if (item[key]) this.formba[key] = item[key];
      });
      this.formba._id = item._id;
      this.dialogbanco = true;
    },
    save() {
      if (
        this.form.password &&
        this.form.telefono &&
        this.form.nombre &&
        this.form.apellido &&
        this.form.identificacion &&
        this.form.unidad
      ) {
        if (this.editedIndex > -1) {
          Api.put("chofer/admin", this.form)
            .then(res => {
              this.form = Object.assign({}, this.defaultForm);
              this.dialog = false;
              this.$swal.fire(
                "Felicidades.!",
                "Modificación realizada exitosamente.",
                "success"
              );
              this.close();
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
          "Error encontrado, para realizar la modificación no debe dejar campos vacios.",
          "error"
        );
      }
    }
  }
};
</script>
