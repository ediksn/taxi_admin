<template lang="pug">
div(style="margin-top: -24px;margin-left: -15px;margin-right: -15px;")
  #Dashboard
    v-layout(align-start='', justify-start='', row='', fill-height='')
      v-flex(xs12)
        v-card(color='', style="border-radius:5px;background-color: #e84646;")
            v-card-title.justify-center
              img(src='../assets/logo.png', with='60' ,height='60')
        v-card(color='', style="border-radius:5px;background-color: #d6d6d6")
            v-card-title(style="padding: 7px;").justify-center
                span.black--text  Retiros
        v-card(color='', style="border-radius:0px 0px 20px 20px;background-color: white")
            v-card(color='', style="border-radius: 0px 0px 20px 20px;background-color: #e84646")
                v-card-title(style="padding: 3px;").justify-center
                    v-flex(xs12 sm12 style="margin-top:0px;")
                        v-layout(align-start='', justify-start='', row='', wrap fill-height='')
                            v-flex(xs3 style="margin-left:20px;margin-top: 8px;margin-right: -10px;")
                                span.white--text Busqueda
                            v-flex(xs4 style='margin-right: 15px;')
                              el-date-picker(v-model="desde" type='date', placeholder='Desde' style="width: 100%;" @change="comparard(desde,hasta)")
                            v-flex(xs4 style="margin-right: 15px;")
                                el-date-picker(v-model="hasta" type='date', placeholder='Hasta' style="width: 100%;" @change="comparar(desde,hasta)")
                            v-flex(xs1 style='height: 10px;max-width: 7.333333% !important;flex-basis: 3.333333% !important;')
                              v-btn(icon, @click='ObtenerData(), ObtenerRetiros()', style='height: 100%;')
                                v-icon(color='white' style='margin-top: 0px;') search
            v-flex(xs12 sm12 style="margin-top:10px;")
                v-layout(align-start='', justify-start='', row='', wrap fill-height='')
                    v-flex(xs4)
                        v-card(style='border-radius:50px;border: 2px solid;margin: 0px 15px 10px;border-color:#e36159;')
                            v-flex(xs12 sm12)
                                v-layout(row='', wrap fill-height='')
                                    v-flex(xs4)
                                        img(style='margin: 10px 0px 0px 15px;',src='../assets/solicitudretiro.png', with='60' ,height='60')
                                    v-flex(xs8 style='line-height: 15px;margin-top: 17px;')
                                        p.black--text  Nro. de Solicitud de Retiro
                                        span.black--text  {{inita.totalcount}}
                    v-flex(xs4)
                        v-card(style='border-radius:50px;border: 2px solid;margin: 0px 15px 10px;border-color:#9139db;')
                            v-flex(xs12 sm12)
                                v-layout(row='', wrap fill-height='')
                                    v-flex(xs4)
                                        img(style='margin: 10px 0px 0px 15px;',src='../assets/solicitudaprobada.png', with='60' ,height='60')
                                    v-flex(xs8 style='line-height: 15px;margin-top: 17px;')
                                        p.black--text  Nro. de Solicitudes Aprobadas
                                        span.black--text  {{inita.countapro}}
                    v-flex(xs4)
                        v-card(style='border-radius:50px;border: 2px solid;margin: 0px 15px 10px;border-color:#3991db;')
                            v-flex(xs12 sm12)
                                v-layout(row='', wrap fill-height='')
                                    v-flex(xs4)
                                        img(style='margin: 10px 0px 0px 15px;',src='../assets/solicitudesdenegadas.png', with='60' ,height='60')
                                    v-flex(xs8 style='line-height: 15px;margin-top: 17px;')
                                        p.black--text  Nro. de Solicitudes Denegadas
                                        span.black--text  {{inita.countrech}}
                    v-flex(xs4)
                        v-card(style='border-radius:50px;border: 2px solid;margin: 0px 15px 10px;border-color:#d7db3c;')
                            v-flex(xs12 sm12)
                                v-layout(row='', wrap fill-height='')
                                    v-flex(xs4)
                                        img(style='margin: 10px 0px 0px 15px;',src='../assets/transpago.png', with='60' ,height='60')
                                    v-flex(xs6 style='line-height: 15px;margin-top: 17px;')
                                        p.black--text  Transacciones de Pago
                                        span.black--text  RD$ {{inita.total}}
                    v-flex(xs4)
                        v-card(style='border-radius:50px;border: 2px solid;margin: 0px 15px 10px;border-color:#1fc0c6;')
                            v-flex(xs12 sm12)
                                v-layout(row='', wrap fill-height='')
                                    v-flex(xs4)
                                        img(style='margin: 10px 0px 0px 15px;',src='../assets/pagosdenegados.png', with='60' ,height='60')
                                    v-flex(xs6 style='line-height: 15px;margin-top: 17px;')
                                        p.black--text Pagos Denegados
                                        span.black--text RD$ {{inita.rechazadas}}
                    v-flex(xs4)
                        v-card(style='border-radius:50px;border: 2px solid;margin: 0px 15px 10px;border-color:#da39bb;')
                            v-flex(xs12 sm12)
                                v-layout(row='', wrap fill-height='')
                                    v-flex(xs4)
                                        img(style='margin: 10px 0px 0px 15px;',src='../assets/pagospendientes.png', with='60' ,height='60')
                                    v-flex(xs8 style='line-height: 15px;margin-top: 17px;')
                                        p.black--text  Solicitud de Pagos Pendientes
                                        span.black--text  RD$ {{inita.pendientes}}
    v-layout(align-start='', justify-start='', row='', fill-height='')
      v-flex(xs12 style='margin-top: 5px;')
        v-card(color='', style="border-radius: 0px 0px 20px 20px;background-color: #e84646;")
            v-card-title(style="padding: 7px;").justify-center
                span.white--text Lista de Retiros
        v-data-table.elevation-1(:headers='headers', :items="retiros", style="margin-top: 5px;")
          template(slot='items', slot-scope='props')
            td {{ props.item.id }}
            td {{ props.item.chofer.nombre }} {{ props.item.chofer.apellido }}
            td {{ props.item.monto }}
            td {{ props.item.fecha | moment("DD-MM-YYYY, h:mm a") }}
            td {{ props.item.tipo }}
            td {{ props.item.comentario }}
            td {{ props.item.estatus }}
            //- td.justify-start.layout.px-0
            //-         v-btn.mx-0(icon, @click='editItem(props.item)', style='margin-top: 0px;')
            //-             v-icon(color='teal') visibility
</template>

<script>
import Api from "@/services/methods";
export default {
  name: "mRetiros",
  data: () => ({
    desde: "",
    hasta: "",
    form: {
      id: "",
      chofer: "",
      monto: "",
      tipo: "",
      fecha: "",
      estatus: "",
      comentario: ""
    },
    dialog: false,
    editedIndex: -1,
    retiros: [],
    headers: [
      { text: "Codigo del Retiro", value: "id" },
      { text: "Chofer", value: "chofer" },
      { text: "Monto", value: "monto" },
      { text: "Fecha", value: "fecha" },
      { text: "Tipo de Retiro", value: "tipo" },
      { text: "Comentario", value: "comentario" },
      { text: "Estatus", value: "estatus" }
    ],
    inita: []
  }),
  created() {
    this.initialize();
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    }
  },
  filters: {
    displayDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day[0]}${day[1]}/${month}/${year}`;
    }
  },
  methods: {
    initialize() {
      Api.get("retiros/admin/balance").then(res => {
        this.retiros = res.data;
        for (let i = 0; i < this.retiros.length; i++) {
          this.retiros[i].monto =
            "RD$ " +
            Math.round(this.retiros[i].monto)
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        }
      });
      Api.get("stats/resumen/retiros").then(res => {
        this.inita = res.data;
      });
    },
    ObtenerData() {
      this.retiros = [];
      Api.get(
        "stats/resumen/retiros?desde=" + this.desde + "&hasta=" + this.hasta
      ).then(res => {
        this.inita = res.data;
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
    ObtenerRetiros() {
      this.retiros = [];
      Api.get("retiros/fechas/" + this.desde + "/" + this.hasta).then(res => {
        this.retiros = res.data;
      });
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [day, month, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
  }
};
</script>
