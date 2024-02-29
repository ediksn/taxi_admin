<template lang="pug">
div(style="margin-top: -24px;margin-left: -15px;margin-right: -15px;")
  #Geocerca
    v-layout(align-start='', justify-start='', row='', fill-height='')
      v-flex(xs12)
        v-card(color='', style="border-radius:5px;background-color: #e84646;")
            v-card-title.justify-center
              img(src='../assets/logo.png', with='60' ,height='60')
        v-card(color='', style="border-radius:5px;background-color: #d6d6d6")
            v-card-title(style="padding: 7px;").justify-center
                span.black--text  Administrar Zonas
        GmapMap(id='mapa' :center='centrarmapa', :zoom='zooom', style='width: 100%; height: 500px' @click='eventomap($event.latLng)')
            // GmapMarker(v-for = 'index in coordinates', :position='index', :clickable='true', :draggable='true')
            GmapPolygon(:paths='paths', :editable='true', @paths_changed='updateEdited($event)', :draggable='true')
            // GmapPolygon(v-if='form.polygono', v-for='list in form.polygono', :paths='list.info', :draggable='false' @click='obt(list)')
            GmapPolygon(v-if='pol && elm', v-for='list in pol', :paths='list.info', :draggable='false' @click="openInfoWindowTemplate(list)" @rightclick='obt(list)')
            GmapPolygon(v-if='pol && !elm', v-for='list in pol', :paths='list.info', :draggable='false' @click="openInfoWindowTemplate(list)")
            gmap-info-window(:options='{maxWidth: 300}', :position='infoWindow.position', :opened='infoWindow.open', @closeclick='infoWindow.open=false')
              | <b> Nombre: </b> {{info.nombre}}
              p
              | <b> Costo Salida en Taxi: </b> RD$ {{info.costo_s}}
              p
              | <b> Costo Destino en Taxi: </b> RD$ {{info.costo_d}}
              p
              | <b> Costo Salida en Moto: </b> RD$ {{info.costo_s_m}}
              p
              | <b> Costo Destino en Moto: </b> RD$ {{info.costo_d_m}}
              p
              | <b> Area: </b> {{info.perimetro}} Mts²
              p
              | <b> Choferes: </b>
              span(v-for="index in info.choferes") 
                p
                | - {{index.nombre}} {{index.apellido}}
        // v-btn.mb-2(style="border-radius:5px;background-color: #e84646;" @click='save()') Guardar
        // v-btn.mb-2(style="border-radius:5px;background-color: #e84646;" @click='guardar()') Fijar
        v-btn(v-if='cre').mb-2(style="border-radius:5px;background-color: #e84646;" @click='continuar()') Continuar
        v-btn.mb-2(style="border-radius:5px;background-color: #e84646;" @click='elim()') Eliminar Punto Anterior
        v-dialog(v-model='dialog', persistent max-width='1028px')
              v-container(style='background-color:white !important;max-width: 1028px;')
                v-card-title.justify-center
                    span.headline Geocerca
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
                                    label="Nombre de la Zona:"
                                    style="height: 56px;")

                                v-card(style="margin-right: 0px;margin-top: 10px;")
                                    v-text-field(id="CostoS"
                                    outline
                                    required
                                    type="number"
                                    v-model="form.costo_salida"
                                    prepend-inner-icon="attach_money"
                                    label="Costo de Salida en Taxi:"
                                    style="height: 56px;")

                                v-card(style="margin-right: 0px;margin-top: 10px;")
                                    v-text-field(id="CostoD"
                                    outline
                                    required
                                    type="number"
                                    v-model="form.costo_destino"
                                    prepend-inner-icon="attach_money"
                                    label="Costo de Destino en Taxi:"
                                    style="height: 56px;")

                                v-card(style="margin-right: 0px;margin-top: 10px;")
                                    v-text-field(id="CostoS_M"
                                    outline
                                    required
                                    type="number"
                                    v-model="form.costo_salida_m"
                                    prepend-inner-icon="attach_money"
                                    label="Costo de Salida en Moto:"
                                    style="height: 56px;")

                                v-card(style="margin-right: 0px;margin-top: 10px;")
                                    v-text-field(id="CostoD_M"
                                    outline
                                    required
                                    type="number"
                                    v-model="form.costo_destino_m"
                                    prepend-inner-icon="attach_money"
                                    label="Costo de Destino en Moto:"
                                    style="height: 56px;")

                                v-container(fluid='', px-0='').justify-center
                                  v-switch(v-model='switch1', :label='`¿Desea Asignar Choferes?`', style='display: flex;justify-content: center;', @change="val(switch1)")

                                v-autocomplete(id="choferes"
                                    outline
                                    :items="choferes"
                                    multiple
                                    v-if="switch1 === true"
                                    v-model="form.choferes"
                                    prepend-inner-icon="chevron_right",
                                    required
                                    style="height: 56px;margin: 0px 0px 10px;"
                                    label="Seleccione los Choferes:")

                                div(style="display: flex;justify-content: center;")
                                  v-btn(style="background:grey;border-radius:10px;", @click.native='save') Guardar
                                  v-btn(style="background:#e84646;;border-radius:10px;", @click.native='close') Salir
    v-layout(align-start='', justify-start='', row='', fill-height='')
      v-flex(xs12 style='margin-top: 0px;')
        v-text-field(v-model='search', append-icon='search', label='Buscar' style='width:50%;')
        v-card(color='', style="border-radius: 0px 0px 20px 20px;background-color: #e84646;")
            v-card-title(style="padding: 7px;").justify-center
                span.white--text Lista de Geocercas
        v-data-table.elevation-1(:headers='headers', :items="geocerca", :search="search", style="margin-top: 5px;")
          template(slot='items', slot-scope='props')
            td {{ props.item.nombre }}
            td RD$ {{ props.item.costo_salida }}
            td RD$ {{ props.item.costo_destino }}
            td RD$ {{ props.item.costo_salida_m }}
            td RD$ {{ props.item.costo_destino_m }}
            td.justify-start.layout.px-0
                    v-btn(v-if='mod').mx-0(icon, @click='editItem(props.item)', style='margin-top: -9px;')
                        v-icon(color='teal') edit
                    v-btn.mx-0(icon, @click='buscar(props.item)', style='margin-top: -9px;')
                        v-icon(color='teal') visibility
</template>

<script>
import Api from "@/services/methods";
import { computeArea } from "spherical-geometry-js";
export default {
  name: "mGeocerca",
  data: () => ({
    centrarmapa: { lat: 18.735693, lng: -70.1626511 },
    zooom: 12,
    cre: "",
    mod: "",
    elm: "",
    infoWindow: {
      position: { lat: 0, lng: 0 },
      open: false,
      template: ""
    },
    search: "",
    switch1: false,
    dialog: false,
    pol: [],
    edited: null,
    none: false,
    paths: [],
    geocerca: [],
    cont: 0,
    choferes: [],
    chof: [],
    path: [],
    id: "",
    headers: [
      { text: "Nombre", value: "nombre" },
      { text: "Costo Salida en Taxi", value: "costo_salida" },
      { text: "Costo Destino en Taxi", value: "costo_destino" },
      { text: "Costo Salida en Moto", value: "costo_salida_m" },
      { text: "Costo Destino en Moto", value: "costo_destino_m" }
    ],
    form: {
      nombre: "",
      costo_destino: 0,
      costo_salida: 0,
      costo_destino_m: 0,
      costo_salida_m: 0,
      choferes: [],
      polygono: [],
      perimetro: 0
    },
    editedIndex: -1,
    defaultForm: {
      nombre: "",
      costo_destino: 0,
      costo_salida: 0,
      costo_destino_m: 0,
      costo_salida_m: 0,
      choferes: [],
      polygono: [],
      perimetro: 0
    },
    info: []
  }),
  created() {
    this.verificacion();
    this.initialize();
  },
  methods: {
    verificacion() {
      for (let i = 0; i < this.$store.state.usuario.permisos.length; i++) {
        if (this.$store.state.usuario.permisos[i].ruta === "Geocerca") {
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
    distancia(item) {
      let area = computeArea(item, 6371e3);
      this.form.perimetro = area.toFixed(2);
      // console.log(item);
      // let acum = 0;
      // for (let i = 0; i < item.length; i++) {
      //   let lat2 = 0;
      //   let lon2 = 0;
      //   var R = 6371; // km
      //   var lat1 = item[i].lat;
      //   var lon1 = item[i].lng;
      //   if (i + 1 === item.length) {
      //     lat2 = item[0].lat;
      //     lon2 = item[0].lng;
      //   } else {
      //     lat2 = item[i + 1].lat;
      //     lon2 = item[i + 1].lng;
      //   }
      //   var φ1 = (lat1 * Math.PI) / 180;
      //   var φ2 = (lat2 * Math.PI) / 180;
      //   var Δφ = ((lat2 - lat1) * Math.PI) / 180;
      //   var Δλ = ((lon2 - lon1) * Math.PI) / 180;

      //   var a =
      //     Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      //     Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      //   var d = R * c;
      //   acum = acum + d;
      // }
      // this.form.perimetro = acum.toFixed(2);
    },
    eventomap(data) {
      this.infoWindow.open = false;
      this.path.push({ lat: data.lat(), lng: data.lng() });
      this.paths.push(this.path);
      this.crear();
    },
    crear() {
      this.paths = [];
      this.paths.push(this.path);
    },
    continuar() {
      if (this.paths.length > 0) {
        if (this.paths[0].length < 3) {
          this.$swal.fire(
            "Oops...",
            "Error encontrado, para guardar la información es necesario tener más de 3 puntos en el polygono.",
            "error"
          );
        } else {
          this.dialog = true;
        }
      } else {
        this.$swal.fire(
          "Oops...",
          "Error encontrado, para guardar la información es necesario tener más de 3 puntos en el polygono.",
          "error"
        );
      }
    },
    buscar(item) {
      this.centrarmapa = {
        lat: item.polygono[0][0][0].lat,
        lng: item.polygono[0][0][0].lng
      };
      this.zooom = 12;
      document.getElementById("mapa").scrollIntoView();
    },
    guardar() {
      if (this.paths[0].length > 2) {
        this.cont++;
        this.form.polygono.push({
          id: this.cont,
          info: this.paths
        });
        this.paths = [];
        this.path = [];
        this.edited = null;
      } else {
        this.$swal.fire(
          "Oops...",
          "Error encontrado, para guardar la información es necesario tener más de 3 puntos en el polygono.",
          "error"
        );
      }
    },
    elim() {
      this.path.splice(this.path.length - 1, 1);
      this.paths.push(this.path);
      this.crear();
    },
    obt(item) {
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
            Api.delete("geocerca/" + item.id)
              .then(res => {
                this.form = Object.assign({}, this.defaultForm);
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
    editItem(item) {
      this.editedIndex = this.geocerca.indexOf(item);
      Object.keys(this.form).map(key => {
        if (item[key]) this.form[key] = item[key];
      });
      let pp = [];
      pp = this.form.choferes;
      this.form.choferes = [];
      for (let i = 0; i < pp.length; i++) {
        this.form.choferes.push(pp[i].nombre + " " + pp[i].apellido);
      }
      if (this.form.choferes.length > 0) {
        this.switch1 = true;
      } else {
        this.switch1 = false;
      }
      this.form._id = item._id;
      this.dialog = true;
    },
    updateEdited(mvcArray) {
      let paths = [];
      for (let i = 0; i < mvcArray.getLength(); i++) {
        let path = [];
        this.path = [];
        for (let j = 0; j < mvcArray.getAt(i).getLength(); j++) {
          let point = mvcArray.getAt(i).getAt(j);
          path.push({ lat: point.lat(), lng: point.lng() });
          this.path.push({ lat: point.lat(), lng: point.lng() });
        }
        paths.push(path);
      }
      this.crear();
      this.edited = paths;
    },
    val(item) {
      if (item === false) {
        this.form.choferes = [];
      }
    },
    close() {
      this.zooom = 12;
      this.editedIndex = -1;
      this.form.nombre = "";
      this.form.costo_destino = 0;
      this.form.costo_salida = 0;
      this.form.choferes = [];
      this.dialog = false;
      this.centrarmapa = { lat: 18.735693, lng: -70.1626511 };
    },
    initialize() {
      this.zooom = 12;
      this.centrarmapa = { lat: 18.735693, lng: -70.1626511 };
      this.editedIndex = -1;
      this.chof = [];
      this.choferes = [];
      this.form.polygono = [];
      this.pol = [];
      this.paths = [];
      this.path = [];
      this.edited = null;
      this.geocerca = [];
      this.none = false;
      Api.get("geocerca/admin")
        .then(res => {
          for (let i = 0; i < res.data.length; i++) {
            for (let j = 0; j < res.data[i].polygono.length; j++) {
              this.cont++;
              this.pol.push({
                id: res.data[i]._id,
                nombre: res.data[i].nombre,
                costo_s: res.data[i].costo_salida,
                costo_d: res.data[i].costo_destino,
                costo_s_m: res.data[i].costo_salida_m,
                costo_d_m: res.data[i].costo_destino_m,
                choferes: res.data[i].choferes,
                perimetro: res.data[i].perimetro,
                info: res.data[i].polygono[j]
              });
            }
          }
          this.id = res.data[0]._id;
          this.geocerca = res.data;
        })
        .catch(err => {
          console.log(err);
          this.none = true;
        });
      Api.get("chofer/admin/geocerca").then(res => {
        for (let i = 0; i < res.data.length; i++) {
          if (
            res.data[i].estatus !== "Pendiente" &&
            res.data[i].estatus !== "Rechazado"
          ) {
            this.choferes.push(res.data[i].nombre + " " + res.data[i].apellido);
            this.chof.push({
              _id: res.data[i]._id,
              nombre: res.data[i].nombre + " " + res.data[i].apellido
            });
          }
        }
      });
    },
    save() {
      if (this.form.nombre) {
        if (this.editedIndex > -1) {
          let chofer = [];
          for (let i = 0; i < this.form.choferes.length; i++) {
            for (let j = 0; j < this.chof.length; j++) {
              if (this.chof[j].nombre === this.form.choferes[i]) {
                chofer.push(this.chof[j]._id);
              }
            }
          }
          this.form.choferes = [];
          this.form.choferes = chofer;
          Api.put("geocerca", this.form)
            .then(res => {
              this.paths = [];
              this.path = [];
              this.edited = null;
              this.form = Object.assign({}, this.defaultForm);
              this.dialog = false;
              this.infoWindow.open = false;
              this.choferes = [];
              this.chof = [];
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
          this.form.polygono.push(this.paths);
          let chofer = [];
          for (let i = 0; i < this.form.choferes.length; i++) {
            for (let j = 0; j < this.chof.length; j++) {
              if (this.chof[j].nombre === this.form.choferes[i]) {
                chofer.push(this.chof[j]._id);
              }
            }
          }
          this.form.choferes = [];
          this.form.choferes = chofer;
          this.distancia(this.form.polygono[0][0]);
          Api.post("geocerca", this.form)
            .then(res => {
              this.paths = [];
              this.path = [];
              this.edited = null;
              this.form = Object.assign({}, this.defaultForm);
              this.dialog = false;
              this.infoWindow.open = false;
              this.choferes = [];
              this.chof = [];
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
          "Error encontrado, para realizar el registro no debe dejar campos vacios.",
          "error"
        );
      }
    }
  }
};
</script>
