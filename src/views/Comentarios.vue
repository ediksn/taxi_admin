<template lang="pug">
div(style="margin-top: -24px;margin-left: -15px;margin-right: -15px;")
  #Comentarios
    v-layout(align-start='', justify-start='', row='', fill-height='')
      v-flex(xs12)
        v-card(color='', style="border-radius:5px;background-color: #e84646;")
            v-card-title.justify-center
              img(src='../assets/logo.png', with='60' ,height='60')
        v-card(color='', style="border-radius:5px;background-color: #d6d6d6")
            v-card-title(style="padding: 7px;").justify-center
                span.black--text  Lista de Comentarios
    v-dialog(v-model='dialog', persistent max-width='900px')
      v-container(style='background-color:white !important;max-width: 900px;')
        v-card-title.justify-center
          span.headline Información
        div(style="margin-top: 20px;")
          v-flex(xs12 sm12)
            v-layout(align-start='', justify-center='', row='', wrap fill-height='')
              v-flex(xs6)
                v-form(enctype="multipart/form-data")
                  v-card(style="margin-right: 0px;margin-bottom: 20px;")
                    v-card-title.justify-center
                      span Datos del Chofer

                  v-text-field(id="Nombre"
                  outline
                  disabled
                  required
                  v-model="form.nombre_ch"
                  prepend-inner-icon="local_taxi"
                  label="Nombre del Chofer:")

                  v-text-field(id="ident_ch"
                  outline
                  disabled
                  required
                  v-model="form.ident_ch"
                  prepend-inner-icon="local_taxi"
                  label="Identificación del Chofer:")

                  v-text-field(id="email_ch"
                  outline
                  disabled
                  required
                  v-model="form.email_ch"
                  prepend-inner-icon="local_taxi"
                  label="Correo del Chofer:")

                  v-text-field(id="tlf_ch"
                  outline
                  disabled
                  required
                  v-model="form.tlf_ch"
                  prepend-inner-icon="local_taxi"
                  label="Teléfono del Chofer:")

                  v-text-field(id="unidad"
                  outline
                  disabled
                  required
                  v-model="form.unidad"
                  prepend-inner-icon="local_taxi"
                  label="Unidad del Chofer:")

                  v-card(style="margin-right: 0px;margin-bottom: 20px;")
                    v-card-title.justify-center
                      span Datos del Cliente

                  v-text-field(id="Cliente"
                  outline
                  disabled
                  required
                  v-model="form.nombre_cl"
                  prepend-inner-icon="person"
                  label="Nombre del Cliente:")

                  v-text-field(id="ident_cl"
                  outline
                  disabled
                  required
                  v-model="form.ident_cl"
                  prepend-inner-icon="person"
                  label="Identificación del Cliente:")

                  v-text-field(id="email_cl"
                  outline
                  disabled
                  required
                  v-model="form.email_cl"
                  prepend-inner-icon="local_taxi"
                  label="Correo del Cliente:")

                  v-text-field(id="tlf_cl"
                  outline
                  disabled
                  required
                  v-model="form.tlf_cl"
                  prepend-inner-icon="local_taxi"
                  label="Teléfono del Cliente:")

                  v-card(style="margin-right: 0px;margin-bottom: 20px;")
                    v-card-title.justify-center
                      span Ruta del Viaje

                  GmapMap(id='mapa', ref="mapa", :center='{lat: 18.735693, lng: -70.1626511}', :zoom='zooom', map-type-id='terrain', style='width: 100%; height: 300px; margin-bottom: 20px')
                    GmapMarker(:key='index', v-for='(m, index) in posicion', :position='m.map', :icon='Icono(m.rol)', :clickable='false', :draggable='false', @click='center=m.map')
                    GmapPolyline(v-if='flightPlanCoordinates', :path='flightPlanCoordinates', :options="{ strokeColor:'#73b9ff', strokeWeight: 5}")
                    GmapPolyline(v-if='flightPlanCoordinates2', :path='flightPlanCoordinates2', :options="{ strokeColor:'red'}")
                  
                  v-card(style="margin-right: 0px;margin-bottom: 20px;")
                    v-card-title.justify-center
                      span(style="font-size: 17px;text-decoration: underline;") Factura
                    div
                      p(style='margin-left:10px') <b style="font-size:15px;"> Dirección de origen: </b> {{factura.origen}}
                      p(style='margin-left:10px') <b style="font-size:15px;"> Dirección de destino: </b> {{factura.destino}}
                      p(style='margin-left:10px') <b style="font-size:15px;"> Distancia total: </b> {{factura.distancia}}
                      p(style='margin-left:10px') <b style="font-size:15px;"> Duración del recorrido: </b> {{factura.duracion}} min
                      p(style='margin-left:10px') <b style="font-size:15px;"> Tarifa por tiempo de espera: </b> {{factura.tarifa}}
                      p(style='margin-left:10px') <b style="font-size:15px;"> Costo del viaje: </b> {{factura.costo}}
                      p(style='margin-left:10px') <b style="font-size:15px;"> Total: </b> {{factura.total}}

                  v-text-field(id="hora"
                  outline
                  disabled
                  required
                  v-model="form.hora"
                  prepend-inner-icon="date"
                  label="Fecha:")
                  
                  div
                    v-flex(xs12 sm12, md12)
                      v-layout(align-start='', justify-center='', row='', wrap fill-height='')
                        v-btn(style="background:#e84646;;border-radius:10px;", @click.native='close') Salir
    v-container(grid-list-md)
        v-card(style='border-radius:10px;background-color: transparent;')
          v-flex(xs12)
            v-layout(wrap)
              v-flex(xs10 style='padding-left:30px')
                v-flex(xs12 style='margin-top:7px')
                  v-layout(wrap)
                    v-flex(xs6)
                      el-date-picker(v-model="desde" type='date', placeholder='Desde' style="width: 100%;" @change="comparard(desde,hasta)")
                    v-flex(xs6)
                      el-date-picker(v-model="hasta" type='date', placeholder='Hasta' style="width: 100%;" @change="comparar(desde,hasta)")
              v-flex(xs2 style='display:flex;justify-content:center')
                v-btn(style="background:#1976d2;border-radius:5px;height: 40px;padding: 0px;min-width: 10px;width: 58px;", @click="ObtenerReserva()")
                  v-icon(color='white' style='margin-right: 5px;') search
              v-flex(xs5 v-if='mostrar')
                v-select(id="filtro" :items="options" v-model="filtro" prepend-icon="chevron_right", label="Seleccione el tipo de busqueda:", style="width: 80%;")
              v-flex(v-if="filtro !==''" xs5)
                v-text-field(id="busqueda", v-model="busqueda", prepend-icon="chevron_right", label="Ingrese la información:" style="width: 80%;")
              v-flex(v-if="filtro !==''" xs1)
                v-btn(style="background:#1976d2;border-radius:5px;height: 40px;padding: 0px;min-width: 10px;width: 58px;", @click="limpiar()")
                  v-icon(color='white' style='margin-right: 0px;') brush
          v-container(v-for='item in reserva',grid-list-md style='border-radius:5px;')
            v-card(color='', style="border-radius:5px;background-color: #e84646;")
              v-flex(xs12 style='display: flex;justify-content: center;margin-bottom: -40px;')
                v-btn(style="background:#1976d2;border-radius:20px;height: 30px;padding: 0px;min-width: 10px;width: 58px;", @click="Ruta(item)")
                  v-icon(color='white' style='margin-right: 5px;') visibility
              v-layout(wrap style='margin-top: 0px;')
                v-flex(xs6, sm6)
                  v-flex(xs12, sm12, style='margin-top: 30px;')
                      v-card(style='border-radius:10px;margin: 0px 20px 0px;')
                          v-layout(row='', fill-height='')
                              v-flex(xs2='', style='margin-left:10px;')
                                  img(v-if="item.driver && item.driver.imagen && item.driver.imagen.url", :src='ruta + item.driver.imagen.url',width='40', height='40' style="margin-top: 8px;")
                                  img(v-if="!item.driver && !item.driver.imagen", :src='ruta + "/images/car.png"',width='40', height='40' style="margin-top: 8px;")
                              v-flex(xs4='' style='margin-left:0px;')
                                  h5(style="margin-top: 15px;").black--text {{item.driver.nombre}} {{item.driver.apellido}}
                              v-flex(xs5='' style='margin-left:0px;')
                                  h5(v-if="item.driver.unidad", style="margin-top: 15px;").black--text  (Unidad: {{item.driver.unidad}})
                              v-flex(xs1='' style='height: 10px;margin-right: 10px;margin-top:10px;')
                                  v-icon(color='blue' style='margin-left:0px') directions_car
                          v-layout(row='', wrap fill-height='' style='margin-left:5px;')
                              v-flex(xs7, style="display:flex;justify-content:center;margin-top:-28px")
                                v-flex(xs12, style='margin-left:73px')
                                  v-layout(align-start='', justify-center='', row='', fill-height='', wrap)
                                    v-flex(xs2)
                                      v-icon(color='blue') phone
                                    v-flex(xs10)                                  
                                      p.black--text ({{item.driver.telefono}})
                              v-flex(xs12 style='line-height: 0px;')
                                  p.black--text  {{item.comen_dri}}
                              v-flex(xs4)
                                  p.black--text  {{item.horaTerm | moment("DD-MM-YYYY, h:mm:ss a") }}
                              v-flex(xs8 style="display:flex;justify-content:flex-end;")
                                v-rating(v-model='item.val_dri', readonly)
                v-flex(xs6, sm6)
                  v-flex(xs12, sm12, style='margin-top: 30px;')
                      v-card(style='border-radius:10px;margin: 0px 20px 0px;')
                          v-layout(row='', fill-height='')
                              v-flex(xs2='', style='margin-left:10px;')
                                  img(v-if="item.user && item.user.imagen && item.user.imagen.url", :src='ruta + item.user.imagen.url',width='40', height='40' style="margin-top: 8px;")
                                  img(v-if="!item.user && !item.user.imagen", :src='ruta + "/images/sin.jpg"',width='40', height='40' style="margin-top: 8px;")
                              v-flex(xs9='' style='margin-left:0px;')
                                  h5(style="margin-top: 15px;").black--text {{item.user.nombre}} {{item.user.apellido}}
                              v-flex(xs1='' style='height: 10px;margin-right: 10px;margin-top:10px;')
                                  v-icon(color='blue' style='margin-left:0px;') person
                          v-layout(row='', wrap fill-height='' style='margin-left:5px;')
                              v-flex(xs7, style="display:flex;justify-content:center;margin-top:-28px")
                                v-flex(xs12, style='margin-left:73px')
                                  v-layout(align-start='', justify-center='', row='', fill-height='', wrap)
                                    v-flex(xs2)
                                      v-icon(color='blue') phone
                                    v-flex(xs10)                                  
                                      p.black--text ({{item.user.telefono}})
                              v-flex(xs12 style='line-height: 0px;')
                                  p.black--text  {{item.comen_cli}}
                              v-flex(xs4)
                                  p.black--text  {{item.horaTerm | moment("DD-MM-YYYY, h:mm:ss a") }}
                              v-flex(xs8 style="display:flex;justify-content:flex-end;")
                                  v-rating(v-model='item.val_cli', readonly)
                p
                span.transparent--text .
    //===========================================================Modal Espera==============================================================================================
    v-dialog(v-model='dialog4', persistent max-width='600px')
      v-container(style='background-color:white !important;max-width: 600px;')
        div(style="margin-top: 20px;")
            v-flex(xs12 sm12)
              v-layout(align-start='', justify-center='', row='', wrap fill-height='')
                v-flex(xs12)
                  v-card-title(style="padding: 7px;").justify-center
                    h3.black--text  Esperando Respuesta del Servidor.!!
                v-flex(xs12)
                    .text-xs-center
                      img(src='../assets/gif_taxi2.gif', with='200' ,height='150')
                v-flex(xs12)
                  v-card-title(style="padding: 7px;").justify-center
                    h4.black--text  Por favor espere...
</template>

<script>
import Api from "@/services/methods";
import { server, port } from "@/services/environment";
export default {
  name: "mComentarios",
  data: () => ({
    dialog: false,
    dialog4: false,
    ruta: server + ":" + port,
    reserva: [],
    mostrar: false,
    reservares: [],
    reservares2: [],
    options: ["Nombre del chofer", "Nombre del cliente", "Número del chofer", "Número del cliente", "Unidad del chofer"],
    filtro: "",
    busqueda: "",
    rating: 3,
    desde: "",
    hasta: "",
    zooom: 12,
    posicion: [],
    flightPlanCoordinates: [],
    flightPlanCoordinates2: [],
    factura: {
      origen: "",
      destino: "",
      distancia: "",
      duracion: "",
      tarifa: "",
      costo: "",
      total: ""
    },
    form: {
      nombre_ch: "",
      ident_ch: "",
      email_ch: "",
      tlf_ch: "",
      unidad: "",
      nombre_cl: "",
      ident_cl: "",
      email_cl: "",
      tlf_cl: "",
      hora: ""
    }
  }),
  watch: {
    busqueda() {
      this.Busq();
    }
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      Api.get("reserva/admin/comen").then(res => {
        this.reserva = [];
        this.reservares = [];
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].user && res.data[i].user.nombre && res.data[i].driver && res.data[i].driver.nombre && (res.data[i].comen_dri || res.data[i].comen_cli)) {
            this.reserva.push(res.data[i]);
            this.reservares.push(res.data[i]);
            this.reservares2.push(res.data[i]);
          }
        }
      });
    },
    comparard(desde, hasta) {
      if (hasta) {
        if (this.$moment(desde).isSameOrBefore(hasta) === false) {
          this.$swal.fire(
            "Oops...",
            "Fecha invalida, por favor elija una fecha donde DESDE sea menor que HASTA.",
            "error"
          );
          this.desde = "";
          this.hasta = "";
        }
      }
    },
    comparar(desde, hasta) {
      if (desde) {
        if (this.$moment(desde).isSameOrBefore(hasta) === false) {
          this.$swal.fire(
            "Oops...",
            "Fecha invalida, por favor elija una fecha donde DESDE sea menor que HASTA.",
            "error"
          );
          this.desde = "";
          this.hasta = "";
        }
      } else {
        this.$swal.fire(
          "Oops...",
          "Fecha invalida, por favor elija una fecha de inicio.",
          "error"
        );
        this.desde = "";
        this.hasta = "";
      }
    },
    close() {
      this.dialog = false
    },
    Icono(data) {
      if (data === "chofer") {
        return require("../assets/taxi.png");
      }
      if (data === "cliente") {
        return require("../assets/male-2.png");
      }
      if (data === "finish") {
        return require("../assets/finish.png");
      }
      if (data === "viajando") {
        return require("../assets/car_share.png");
      }
      if (data === "moto") {
        return require("../assets/motorcycle.png");
      }
      if (data === "motod") {
        return require("../assets/vespa.png");
      }
      if (data === "stop") {
        return require("../assets/stop.png");
      }
    },
    ObtenerReserva() {
      if (this.desde && this.hasta) {
        this.dialog4 = true;
        Api.get("reserva/fecha_fin/" + this.desde + "/" + this.hasta)
          .then(res => {
            this.dialog4 = false;
            this.reserva = [];
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].user && res.data[i].user.nombre && res.data[i].driver && res.data[i].driver.nombre && (res.data[i].comen_dri || res.data[i].comen_cli)) {
                this.reserva.push(res.data[i]);
                this.reservares.push(res.data[i]);
              }
            }
            if (this.reserva.length > 0) {
              this.mostrar = true
            }
          })
          .catch(err => {
            this.dialog4 = false;
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
          "Error encontrado, debe ingresar ambas fechas para realizar esta operación.",
          "error"
        );
      }
    },
    Busq(){
      // if (this.filtro === "Fecha"){
      //   this.reserva = []
      //   for (let i = 0; i < this.reservares.length; i++) {
      //     if (this.$moment(this.reservares[i].horaTerm).isSameOrAfter(this.desde) && this.$moment(this.reservares[i].horaTerm).isSameOrBefore(this.hasta)) {
      //       this.reserva.push(this.reservares[i])
      //     }
      //   }
      // }
      if (this.filtro === "Nombre del chofer") {
        this.reserva = this.reservares.filter(el=>{
            let nombre = el.driver.nombre + " " + el.driver.apellido
            return nombre.toLowerCase().includes(this.busqueda.toLowerCase())
        })
      }
      if (this.filtro === "Nombre del cliente") {
        this.reserva = this.reservares.filter(el=>{
            let nombre = el.user.nombre + " " + el.user.apellido
            return nombre.toLowerCase().includes(this.busqueda.toLowerCase())
        })
      }
      if (this.filtro === "Número del chofer") {
        this.reserva = this.reservares.filter(el=>{
            return el.driver.telefono.toLowerCase().includes(this.busqueda.toLowerCase())
        })
      }
      if (this.filtro === "Número del cliente") {
        this.reserva = this.reservares.filter(el=>{
            return el.user.telefono.toLowerCase().includes(this.busqueda.toLowerCase())
        })
      }
      if (this.filtro === "Unidad del chofer") {
        this.reserva = this.reservares.filter(el=>{
            return el.driver.unidad.includes(this.busqueda)
        })
      }
    },
    limpiar() {
      this.desde = "";
      this.hasta = "";
      this.filtro = "";
      this.busqueda = "";
      this.mostrar = false;
      this.reserva = []
      for (let i = 0; i < this.reservares2.length; i++) {
        this.reserva.push(this.reservares2[i])
      }
    },
    Ruta(data) {
      let a = this.$moment(data.horaIni)
      let b = this.$moment(data.horaAcep)
      let time = a.diff(b, 's')
      this.factura.origen = data.salida
      this.factura.destino = data.llegada
      this.factura.distancia = data.distancia
      if (data.costo_tiempo_espera) {
        this.factura.tarifa = "RD$ " + Math.round(data.costo_tiempo_espera).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
      } else {
        this.factura.tarifa = "RD$ " + parseFloat(0).toFixed(2)
      }
      this.factura.duracion = parseInt(data.duracion) / 60
      this.factura.costo = "RD$ " + Math.round(data.costo).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
      this.factura.total = "RD$ " + Math.round(data.total).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
      this.form.nombre_ch = data.driver.nombre + " " + data.driver.apellido
      if (data.driver.identificacion) {
        this.form.ident_ch = data.driver.identificacion
      }
      if (data.driver.email) {
        this.form.email_ch = data.driver.email
      }
      if (data.driver.telefono) {
        this.form.tlf_ch = data.driver.telefono
      }
      if (data.driver.unidad) {
        this.form.unidad = data.driver.unidad
      }
      this.form.nombre_cl = data.user.nombre + " " + data.user.apellido
      if (data.user.identificacion) {
        this.form.ident_cl = data.user.identificacion
      }
      if (data.user.email) {
        this.form.email_cl = data.user.email
      }
      if (data.user.telefono) {
        this.form.tlf_cl = data.user.telefono
      }
      this.form.hora = this.$moment(data.fecha).format('DD-MM-YYYY, h:mm a')
      this.dialog = true
      this.zooom = 12;
      this.posicion = [];
      this.flightPlanCoordinates = [];
      this.flightPlanCoordinates2 = [];
      if (data.puntos && data.puntos.length > 0) {
        let objeto2 = {
          lat: data.origen.lat,
          lng: data.origen.lng
        };
        this.flightPlanCoordinates.push(objeto2);
        for (let i = 0; i < data.puntos.length; i++) {
          let objeto = {
            lat: data.puntos[i].lat,
            lng: data.puntos[i].lng
          };
          this.flightPlanCoordinates.push(objeto);
        }
        let p1 = this.flightPlanCoordinates[
          this.flightPlanCoordinates.length - 1
        ];
        this.posicion.push({
          rol: "cliente",
          map: this.flightPlanCoordinates[0]
        });
        this.posicion.push({
          rol: "stop",
          map: p1
        });
        this.$gmapApiPromiseLazy().then(() => {
          var bounds = new google.maps.LatLngBounds(); /* etc */
          bounds.extend(p1);
          bounds.extend(this.flightPlanCoordinates[0]);
          this.$refs.mapa.$mapObject.fitBounds(bounds);
        });
      } else {
        let objeto = {
          lat: data.origen.lat,
          lng: data.origen.lng
        };
        this.flightPlanCoordinates.push(objeto);
        let objeto2 = {
          lat: data.origen.lat,
          lng: data.origen.lng
        };
        this.flightPlanCoordinates.push(objeto2);
        let p1 = this.flightPlanCoordinates[
          this.flightPlanCoordinates.length - 1
        ];
        this.posicion.push({
          rol: "cliente",
          map: this.flightPlanCoordinates[0]
        });
        this.posicion.push({
          rol: "stop",
          map: p1
        });
        this.$gmapApiPromiseLazy().then(() => {
          var bounds = new google.maps.LatLngBounds(); /* etc */
          bounds.extend(p1);
          bounds.extend(this.flightPlanCoordinates[0]);
          this.$refs.mapa.$mapObject.fitBounds(bounds);
        });
      }
      // if (data.ruta_cliente.length > 0) {
      //   for (let i = 0; i < data.ruta_cliente.length; i++) {
      //     let objeto = {
      //       lat: data.ruta_cliente[i].latitude,
      //       lng: data.ruta_cliente[i].longitude
      //     };
      //     this.flightPlanCoordinates.push(objeto);
      //   }
      //   let p1 = this.flightPlanCoordinates[
      //     this.flightPlanCoordinates.length - 1
      //   ];
      //   this.posicion.push({
      //     rol: "cliente",
      //     map: this.flightPlanCoordinates[0]
      //   });
      //   this.posicion.push({
      //     rol: "finish",
      //     map: p1
      //   });
      //   this.$gmapApiPromiseLazy().then(() => {
      //     var bounds = new google.maps.LatLngBounds(); /* etc */
      //     bounds.extend(this.flightPlanCoordinates[0]);
      //     bounds.extend(p1);
      //     this.$refs.mapa.$mapObject.fitBounds(bounds);
      //   });
      // } else {
        // if (data.puntos && data.puntos.length > 0) {
        //   for (let i = 0; i < data.pasos.length; i++) {
        //     let objeto = {
        //       lat: data.pasos[i].start_location.lat,
        //       lng: data.pasos[i].start_location.lng
        //     };
        //     this.flightPlanCoordinates.push(objeto);
        //     let objeto2 = {
        //       lat: data.pasos[i].end_location.lat,
        //       lng: data.pasos[i].end_location.lng
        //     };
        //     this.flightPlanCoordinates.push(objeto2);
        //   }
        //   let p1 = this.flightPlanCoordinates[
        //     this.flightPlanCoordinates.length - 1
        //   ];
        //   for (let i = 0; i < data.pasos_vuelta.length; i++) {
        //     let objeto3 = {
        //       lat: data.pasos_vuelta[i].start_location.lat,
        //       lng: data.pasos_vuelta[i].start_location.lng
        //     };
        //     this.flightPlanCoordinates2.push(objeto3);
        //     let objeto4 = {
        //       lat: data.pasos_vuelta[i].end_location.lat,
        //       lng: data.pasos_vuelta[i].end_location.lng
        //     };
        //     this.flightPlanCoordinates2.push(objeto4);
        //   }
        //   this.posicion.push({
        //     rol: "cliente",
        //     map: this.flightPlanCoordinates[0]
        //   });
        //   this.posicion.push({
        //     rol: "stop",
        //     map: p1
        //   });
        //   this.$gmapApiPromiseLazy().then(() => {
        //     var bounds = new google.maps.LatLngBounds(); /* etc */
        //     bounds.extend(p1);
        //     bounds.extend(this.flightPlanCoordinates[0]);
        //     this.$refs.mapa.$mapObject.fitBounds(bounds);
        //   });
        // } else {
        //   for (let i = 0; i < data.pasos.length; i++) {
        //     let objeto = {
        //       lat: data.pasos[i].start_location.lat,
        //       lng: data.pasos[i].start_location.lng
        //     };
        //     this.flightPlanCoordinates.push(objeto);
        //     let objeto2 = {
        //       lat: data.pasos[i].end_location.lat,
        //       lng: data.pasos[i].end_location.lng
        //     };
        //     this.flightPlanCoordinates.push(objeto2);
        //   }
        //   let p1 = this.flightPlanCoordinates[
        //     this.flightPlanCoordinates.length - 1
        //   ];
        //   this.posicion.push({
        //     rol: "cliente",
        //     map: this.flightPlanCoordinates[0]
        //   });
        //   this.posicion.push({
        //     rol: "finish",
        //     map: p1
        //   });
        //   this.$gmapApiPromiseLazy().then(() => {
        //     var bounds = new google.maps.LatLngBounds(); /* etc */
        //     bounds.extend(this.flightPlanCoordinates[0]);
        //     bounds.extend(p1);
        //     this.$refs.mapa.$mapObject.fitBounds(bounds);
        //   });
        // }
      // }
    },
  }
};
</script>
