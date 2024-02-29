<template lang="pug">
    v-card(style="width: 89%;margin-top:10px")
        GmapMap(id='map', ref='map',:zoom='zooom', :center='centermap', map-type-id='terrain', style='width: 100%; height: 300px; margin-top: 0px', @click='marcas($event.latLng)')
            GmapMarker(:key='index', v-for='(p, index) in punto_reserva', :position='p.map', :clickable='false', :draggable='false', @click='center=p.map')
</template>

<script>
import Api from "@/services/methods";
import { EventBus } from "../Events.js";
export default {
  props: ["coordl", "coords"],
  data: () => ({
    suma: 1,
    cont: 0,
    renderComponent: true,
    punto_reserva: [],
    zooom: 12,
    // centermap: { lat: 18.492144, lng: -69.942564 },
    centermap: { lat: 18.492144, lng: -69.942564 },
    form2: {
      tiempo_viaje: "",
      distancia: "",
      tarifa_aprox: "",
      pto_partida: "",
      pto_llegada: ""
    },
    paso: false,
    vuelta: false
  }),
  watch: {
    coordl() {
      this.eventomap(this.coordl);
    },
    coords() {
      this.punto_reserva = [];
      this.centermap = { lat: this.coords.lat(), lng: this.coords.lng() };
      this.eventomap(this.coords);
    }
  },
  mounted() {
    EventBus.$on("other_rut", data => {
      this.idavuelta(data);
    });
    EventBus.$on("transpo", data => {
      this.cont = this.cont + 1;
      let body;
      if (data.ida_vuelta) {
        body = {
          origen: data.origen,
          destino: data.destino,
          vehiculo: data.vehiculo,
          ida_vuelta: true
        };
      } else {
        body = {
          origen: data.origen,
          destino: data.destino,
          vehiculo: data.vehiculo
        };
      }
      EventBus.$emit("esperar", "hola");
      Api.post("reserva/consulta", body)
        .then(res => {
          if (res.data.data) {
            this.form2.tiempo_viaje =
              (res.data.data.tiempo / 60).toFixed(0) + " min";
            this.form2.distancia = res.data.data.distancia;
            this.form2.tarifa_aprox = res.data.data.costo;
            this.form2.pto_partida = res.data.data.salida;
            this.form2.pto_llegada = res.data.data.llegada;
            EventBus.$emit("info", this.form2);
            EventBus.$emit("puntos", body);
          } else {
            this.$swal.fire(
              "Oops...",
              "Error encontrado, la distancia del viaje supera el límite de la distancia máxima en moto.",
              "error"
            );
            EventBus.$emit("error", "hola");
          }
        })
        .catch(err => {
          console.log(err);
          EventBus.$emit("error", "hola");
          this.$swal.fire(
            "Oops...",
            "Error encontrado, error al comunicarse con el servidor.",
            "error"
          );
        });
    });
  },
  methods: {
    calculateAndDisplayRoute(
      directionsService,
      directionsDisplay,
      start,
      destination
    ) {
      directionsDisplay.setMap(this.$refs.map.$mapObject);
      directionsService.route(
        {
          origin: start,
          destination: destination,
          travelMode: "DRIVING"
        },
        function(response, status) {
          if (status === "OK") {
            directionsDisplay.setDirections(response);
            this.punto_reserva = [];
            this.ruta_reserva = [];
          } else {
            window.alert("Directions request failed due to " + status);
          }
        }
      );
    },
    getDirection() {
      this.$gmapApiPromiseLazy().then(() => {
        var bounds = new google.maps.LatLngBounds(); /* etc */
      });
      var directionsService = new google.maps.DirectionsService();
      var directionsDisplay = new google.maps.DirectionsRenderer();
      if (this.vuelta) {
        directionsDisplay = new google.maps.DirectionsRenderer({
          polylineOptions: {
            strokeColor: "red"
          }
        });
      }
      this.calculateAndDisplayRoute(
        directionsService,
        directionsDisplay,
        this.punto_reserva[0].map,
        this.punto_reserva[1].map
      );
      this.punto_reserva = [];
      // this.centermap = this.punto_reserva[0].map;
    },
    limpiar() {
      this.punto_reserva = [];
      this.ruta_reserva = [];
    },
    marcas(data) {
      EventBus.$emit("autocomp", "info");
      this.eventomap(data);
    },
    idavuelta(data) {
      this.punto_reserva = [];
      if (data.seleccion === "Si") {
        this.punto_reserva.push({
          map: { lat: data.destino.lat, lng: data.destino.lng }
        });
        this.punto_reserva.push({
          map: { lat: data.origen.lat, lng: data.origen.lng }
        });
        this.vuelta = true;
        this.getDirection();
      }
    },
    eventomap(data) {
      if (this.paso === false) {
        if (this.punto_reserva.length < 2) {
          this.punto_reserva.push({
            map: { lat: data.lat(), lng: data.lng() }
          });
        }
        if (this.punto_reserva.length === 2) {
          if (
            this.punto_reserva[0].map.lat === 18.4527527 &&
            this.punto_reserva[0].map.lng === -69.95856909999998
          ) {
            this.punto_reserva[0].map.lat = 18.452792;
            this.punto_reserva[0].map.lng = -69.958497;
          }
          let body = {
            origen: this.punto_reserva[0].map,
            destino: this.punto_reserva[1].map,
            vehiculo: "Taxi"
          };
          this.ir = body.origen;
          this.retorno = body.destino;
          EventBus.$emit("esperar", "hola");
          Api.post("reserva/consulta", body)
            .then(res => {
              this.form2.tiempo_viaje =
                (res.data.data.tiempo / 60).toFixed(0) + " min";
              this.form2.distancia = res.data.data.distancia;
              this.form2.tarifa_aprox = res.data.data.costo;
              this.form2.pto_partida = res.data.data.salida;
              this.form2.pto_llegada = res.data.data.llegada;
              EventBus.$emit("info", this.form2);
              EventBus.$emit("puntos", body);
            })
            .catch(err => {
              console.log(err);
              EventBus.$emit("error", "hola");
              this.$swal.fire(
                "Oops...",
                "Error encontrado, error al comunicarse con el servidor.",
                "error"
              );
            });
          this.getDirection();
          this.paso = true;
        }
      } else {
        this.$swal.fire(
          "Oops...",
          "Error encontrado, ya se encuentra una ruta en proceso, si desea cambiarla o crear otra presione el boton limpiar.",
          "error"
        );
      }
    }
  }
};
</script>

<style></style>
