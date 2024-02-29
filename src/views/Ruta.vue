<template lang="pug">
div(style="margin-top: -24px;margin-left: -15px;margin-right: -15px;")
  #Ruta
    v-layout(align-start='', justify-start='', row='', fill-height='')
      v-flex(xs12)
        v-card(color='', style="border-radius:5px;background-color: #e84646;")
            v-card-title.justify-center
              img(src='../assets/logo.png', with='60' ,height='60')
        v-card(color='', style="border-radius:5px;background-color: #d6d6d6")
            v-card-title(style="padding: 7px;").justify-center
                span.black--text  Administrar Rutas
        GmapMap(id='mapa' :center='centrarmapa', :zoom='zooom', style='width: 100%; height: 500px')
            GmapPolygon(v-if='pol', v-for='list in pol', :paths='list.info', :draggable='false' @click="openInfoWindowTemplate(list)")
            gmap-info-window(:options='{maxWidth: 300}', :position='infoWindow.position', :opened='infoWindow.open', @closeclick='infoWindow.open=false')
              | <b> Zona: </b> {{info.nombre}}
              p
              | <b> Area: </b> {{info.perimetro}} Mts²
              p
              | <b> Rutas: </b>
              span(v-for="index in info.detalle") 
                p
                v-flex(xs12)
                  | - <b> Destino: </b> {{index.llegada.nombre}}
                v-flex(xs11, style='margin-left:10px')
                  |   <b> Precio en Taxi: </b> RD$ {{index.precio}}
                v-flex(xs11, style='margin-left:10px')
                  |   <b> Precio en Moto: </b> RD$ {{index.precio_m}}
                v-flex(xs11, style='margin-left:10px')
                  |   <b> Ida y Vuelta en Taxi: </b> RD$  {{index.ida_vuelta}}
                v-flex(xs11, style='margin-left:10px')
                  |   <b> Ida y Vuelta en Moto: </b> RD$  {{index.ida_vuelta_m}}
        v-btn(v-if='cre').mb-2(style="border-radius:5px;background-color: #e84646;" @click='dialog=true') Asignar Ruta
        v-dialog(v-model='dialog', persistent max-width='1028px')
              v-container(style='background-color:white !important;max-width: 1028px;')
                v-card-title.justify-center
                    span.headline Ruta
                div(style="margin-top: 20px;")
                    v-flex(xs12 sm12)
                        v-layout(align-start='', justify-center='', row='', wrap fill-height='')
                            v-flex(xs6)
                              v-form(enctype="multipart/form-data")
                                v-autocomplete(v-if='edit === false', id="salida"
                                    outline
                                    :items="zonas"
                                    v-model="form.salida"
                                    @change="validacionsalida(form.salida)"
                                    prepend-icon="chevron_right",
                                    required
                                    style="height: 56px;width: 95%;margin: 0px 0px 10px;"
                                    label="Zona de Salida:")

                                v-autocomplete(v-if='edit === false', id="llegada"
                                    outline
                                    :items="zonas"
                                    v-model="form.llegada"
                                    @change="validacionllegada(form.llegada)"
                                    prepend-icon="chevron_right",
                                    required
                                    style="height: 56px;width: 95%;margin: 0px 0px 10px;"
                                    label="Zona de Llegada:")

                                v-autocomplete(v-if='edit === true', id="salida"
                                    outline
                                    disabled
                                    :items="zonas"
                                    v-model="form.salida"
                                    @change="validacionsalida(form.salida)"
                                    prepend-icon="chevron_right",
                                    required
                                    style="height: 56px;width: 95%;margin: 0px 0px 10px;"
                                    label="Zona de Salida:")

                                v-autocomplete(v-if='edit === true', id="llegada"
                                    outline
                                    disabled
                                    :items="zonas"
                                    v-model="form.llegada"
                                    @change="validacionllegada(form.llegada)"
                                    prepend-icon="chevron_right",
                                    required
                                    style="height: 56px;width: 95%;margin: 0px 0px 10px;"
                                    label="Zona de Llegada:")

                                v-text-field(id="precio"
                                    outline
                                    required
                                    type="number"
                                    v-model="form.precio"
                                    prepend-inner-icon="attach_money"
                                    label="Precio de la Ruta en Taxi:"
                                    style="height: 56px;width:89%;margin-left: 32px;margin-bottom:10px")

                                v-text-field(id="precio_m"
                                    outline
                                    required
                                    type="number"
                                    v-model="form.precio_m"
                                    prepend-inner-icon="attach_money"
                                    label="Precio de la Ruta en Moto:"
                                    style="height: 56px;width:89%;margin-left: 32px;margin-bottom:10px")

                                v-text-field(id="ida_vuelta"
                                    outline
                                    required
                                    type="number"
                                    v-model="form.ida_vuelta"
                                    prepend-inner-icon="attach_money"
                                    label="Precio Adicional en Viaje de Ida y Vuelta en Taxi:"
                                    style="height: 56px;width:89%;margin-left: 32px;margin-bottom:10px")

                                v-text-field(id="ida_vuelta_m"
                                    outline
                                    required
                                    type="number"
                                    v-model="form.ida_vuelta_m"
                                    prepend-inner-icon="attach_money"
                                    label="Precio Adicional en Viaje de Ida y Vuelta en Moto:"
                                    style="height: 56px;width:89%;margin-left: 32px;")

                                v-container(fluid='', px-0='').justify-center
                                  v-switch(v-model='switch1', :label='`¿Las rutas en ambas direcciones tendra el mismo precio?`', style='display: flex;justify-content: center;')

                                div(style="display: flex;justify-content: center;")
                                  v-btn(style="background:grey;border-radius:10px;", @click.native='save') Guardar
                                  v-btn(style="background:#e84646;;border-radius:10px;", @click.native='close') Salir
    v-layout(align-start='', justify-start='', row='', fill-height='')
      v-flex(xs12 style='margin-top: 0px;')
        v-text-field(v-model='search', append-icon='search', label='Buscar' style='width:50%;')
        v-card(color='', style="border-radius: 0px 0px 20px 20px;background-color: #e84646;")
            v-card-title(style="padding: 7px;").justify-center
                span.white--text Lista de Rutas
        v-data-table.elevation-1(:headers='headers', :items="ruta", :search="search", style="margin-top: 5px;")
          template(slot='items', slot-scope='props')
            td {{ props.item.salida.nombre }}
            td {{ props.item.llegada.nombre }}
            td RD$ {{ props.item.precio }}
            td RD$ {{ props.item.precio_m }}
            td.justify-start.layout.px-0
                    v-btn(v-if='mod').mx-0(icon, @click='editItem(props.item, edit = true)', style='margin-top: -9px;')
                        v-icon(color='teal') edit
                    v-btn.mx-0(icon, @click='buscar(props.item)', style='margin-top: -9px;')
                        v-icon(color='teal') visibility
                    v-btn(v-if='elm').mx-0(icon, @click='Eliminar(props.item)', style='margin-top: -9px;')
                        v-icon(color='red') delete
</template>
<script>
import Api from "@/services/methods";
export default {
  name: "mRuta",
  data: () => ({
    centrarmapa: { lat: 18.735693, lng: -70.1626511 },
    zooom: 12,
    cre: "",
    mod: "",
    elm: "",
    edit: false,
    switch1: false,
    zonas: [],
    infoWindow: {
      position: { lat: 0, lng: 0 },
      open: false,
      template: ""
    },
    form: {
      salida: "",
      llegada: "",
      precio: 0,
      precio_m: 0,
      ida_vuelta: 0,
      ida_vuelta_m: 0
    },
    search: "",
    dialog: false,
    ruta: [],
    pol: [],
    id: "",
    headers: [
      { text: "Salida", value: "salida.nombre" },
      { text: "Llegada", value: "llegada.nombre" },
      { text: "Precio en Taxi", value: "precio" },
      { text: "Precio en Moto", value: "precio_m" },
      { text: "Acciones" }
    ],
    editedIndex: -1,
    defaultForm: {
      salida: "",
      llegada: "",
      precio: 0,
      precio_m: 0,
      ida_vuelta: 0,
      ida_vuelta_m: 0
    },
    info: [],
    content: []
  }),
  created() {
    this.verificacion();
    this.initialize();
  },
  sockets: {
    act_geo(data) {
      this.initialize();
    }
  },
  methods: {
    verificacion() {
      for (let i = 0; i < this.$store.state.usuario.permisos.length; i++) {
        if (
          this.$store.state.usuario.permisos[i].ruta === "Rutas entre Geocercas"
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
            if (
              this.$store.state.usuario.permisos[i].accion[j] === "Eliminar"
            ) {
              this.elm = "yes";
            }
          }
        }
      }
    },
    openInfoWindowTemplate(item) {
      this.infoWindow.position = item.info[0][0];
      this.infoWindow.open = true;
      this.info = item;
    },
    Eliminar(item) {
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
            Api.delete("ruta/" + item._id)
              .then(res => {
                this.$swal.fire(
                  "Felicidades.!",
                  "Eliminación realizada exitosamente.",
                  "success"
                );
                this.infoWindow.open = false;
                this.initialize();
              })
              .catch(err => {
                console.log(err);
              });
          }
        });
    },
    validacionsalida(item) {
      if (item === this.form.llegada) {
        this.$swal.fire(
          "Oops...",
          "Error encontrado, no puede elegir la misma zona de salida y de llegada.",
          "error"
        );
        this.form.llegada = "";
      }
    },
    validacionllegada(item) {
      if (item === this.form.salida) {
        this.$swal.fire(
          "Oops...",
          "Error encontrado, no puede elegir la misma zona de salida y de llegada.",
          "error"
        );
        this.form.salida = "";
      }
    },
    editItem(item) {
      this.editedIndex = this.ruta.indexOf(item);
      Object.keys(this.form).map(key => {
        if (item[key]) this.form[key] = item[key];
      });
      this.form._id = item._id;
      this.form.salida = item.salida.nombre;
      this.form.llegada = item.llegada.nombre;
      this.dialog = true;
    },
    close() {
      this.form = Object.assign({}, this.defaultForm);
      this.dialog = false;
      this.initialize();
    },
    buscar(item) {
      this.centrarmapa = {
        lat: item.salida.polygono[0][0][0].lat,
        lng: item.salida.polygono[0][0][0].lng
      };
      this.zooom = 12;
      document.getElementById("mapa").scrollIntoView();
    },
    initialize() {
      this.info = [];
      this.zooom = 12;
      this.centrarmapa = { lat: 18.735693, lng: -70.1626511 };
      this.editedIndex = -1;
      this.edit = false;
      this.switch1 = false;
      this.ruta = [];
      this.pol = [];
      this.zonas = [];
      Api.get("ruta/admin")
        .then(res => {
          for (let i = 0; i < res.data.length; i++) {
            this.ruta.push(res.data[i]);
          }
        })
        .catch(err => {
          console.log(err);
        });
      Api.get("geocerca/admin/ruta")
        .then(res => {
          for (let i = 0; i < res.data.length; i++) {
            for (let j = 0; j < res.data[i].polygono.length; j++) {
              let contenido = [];
              for (let e = 0; e < this.ruta.length; e++) {
                if (this.ruta[e].salida._id === res.data[i]._id) {
                  contenido.push(this.ruta[e]);
                }
              }
              this.pol.push({
                id: res.data[i]._id,
                nombre: res.data[i].nombre,
                costo_s: res.data[i].costo_salida,
                costo_d: res.data[i].costo_destino,
                costo_s_m: res.data[i].costo_salida_m,
                costo_d_m: res.data[i].costo_destino_m,
                choferes: res.data[i].choferes,
                perimetro: res.data[i].perimetro,
                detalle: contenido,
                info: res.data[i].polygono[j]
              });
              this.zonas.push(res.data[i].nombre);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    save() {
      let result = false;
      for (let j = 0; j < this.ruta.length; j++) {
        if (
          this.form.salida === this.ruta[j].salida.nombre &&
          this.form.llegada === this.ruta[j].llegada.nombre
        ) {
          result = true;
        }
      }
      if (this.editedIndex > -1) {
        for (let i = 0; i < this.pol.length; i++) {
          if (this.form.salida === this.pol[i].nombre) {
            this.form.salida = this.pol[i].id;
          }
          if (this.form.llegada === this.pol[i].nombre) {
            this.form.llegada = this.pol[i].id;
          }
        }
        Api.put("ruta", this.form)
          .then(res => {
            this.form = Object.assign({}, this.defaultForm);
            this.dialog = false;
            this.infoWindow.open = false;
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
        if (result === false) {
          for (let i = 0; i < this.pol.length; i++) {
            if (this.form.salida === this.pol[i].nombre) {
              this.form.salida = this.pol[i].id;
            }
            if (this.form.llegada === this.pol[i].nombre) {
              this.form.llegada = this.pol[i].id;
            }
          }
          if (this.switch1 === true) {
            let form2 = [];
            let form4 = {
              salida: this.form.llegada,
              llegada: this.form.salida,
              precio: this.form.precio,
              precio_m: this.form.precio_m,
              ida_vuelta: this.form.ida_vuelta,
              ida_vuelta_m: this.form.ida_vuelta_m
            };
            form2.push(form4);
            let form3 = {
              salida: form2[0].llegada,
              llegada: form2[0].salida,
              precio: form2[0].precio,
              precio_m: form2[0].precio_m,
              ida_vuelta: form2[0].ida_vuelta,
              ida_vuelta_m: form2[0].ida_vuelta_m
            };
            form2.push(form3);
            let paso = false;
            for (let i = 0; i < this.ruta.length; i++) {
              for (let j = 0; j < form2.length; j++) {
                if (
                  this.ruta[i].salida._id === form2[j].salida &&
                  this.ruta[i].llegada._id === form2[j].llegada
                ) {
                  paso = true;
                }
              }
            }
            if (paso === false) {
              Api.post("ruta/multi", form2)
                .then(res => {
                  this.form = Object.assign({}, this.defaultForm);
                  this.dialog = false;
                  this.infoWindow.open = false;
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
            } else {
              this.$swal.fire(
                "Oops...",
                "Error encontrado, no puede registrar esta ruta debido a que ya se encuentra registrada.",
                "error"
              );
            }
          } else {
            Api.post("ruta", this.form)
              .then(res => {
                this.form = Object.assign({}, this.defaultForm);
                this.dialog = false;
                this.infoWindow.open = false;
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
        } else {
          this.$swal.fire(
            "Oops...",
            "Error encontrado, no puede registrar esta ruta debido a que ya se encuentra registrada.",
            "error"
          );
        }
      }
    }
  }
};
</script>
