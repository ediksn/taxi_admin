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
                span.black--text  Pagos
        v-card(color='', style="border-radius:0px 0px 20px 20px;background-color: white")
            v-card(color='', style="border-radius: 0px 0px 20px 20px;background-color: #e84646")
                v-card-title(style="padding: 3px;").justify-center
                    v-flex(xs12 sm12 style="margin-top:0px;")
                        v-layout(align-start='', justify-start='', row='', wrap fill-height='')
                            v-flex(xs4 style="margin-left:20px;margin-top: 8px;margin-right: -10px;")
                                span.white--text Busqueda
                            v-flex(xs3 style='margin-right: 15px;')
                              el-date-picker(v-model="desde" type='date', placeholder='Desde' style="width: 100%;" @change="comparard(desde,hasta)")
                            v-flex(xs3 style="margin-right: 0px;")
                                el-date-picker(v-model="hasta" type='date', placeholder='Hasta' style="width: 100%;" @change="comparar(desde,hasta)")
                            v-flex(xs1 style='height: 10px;')
                              v-btn(icon, @click='obtenerViajes()', style='height: 100%;')
                                v-icon(color='white' style='margin-top: 0px;') search
            v-flex(xs12 sm12 style="margin-top:10px;")
                v-layout(align-start='', justify-start='', row='', wrap fill-height='')
                    v-flex(xs12)
                        v-card(style='border-radius:50px;border: 2px solid;margin: 0px 15px 10px;border-color:#058acd;')
                            v-flex(xs12 sm12)
                                v-layout(row='', wrap fill-height='')
                                    v-flex(xs1)
                                        img(style='margin: 10px 0px 0px 15px;',src='../assets/pago.png', with='60' ,height='60')
                                    v-flex(xs10 style='line-height: 15px;margin-top: 17px;margin-left: 15px;')
                                        p.black--text  <b> Pago Total: </b> RD$ {{viajes.total_monto}}
                                        p.black--text  <b> Viajes Totales: </b> {{viajes.total}}
    v-flex(xs12 sm12 style="margin-top:10px;")
        v-layout(row='', wrap fill-height='')
            v-flex(xs12)
                v-card(color='', style="border-radius:0px 0px 20px 20px;background-color: white;margin-right: 5px;")
                    v-card(color='', style="border-radius: 0px 0px 20px 20px;background-color: #e84646")
                        v-card-title(style="padding: 0px;")
                            v-flex(xs12 sm12 style="margin-top:0px;")
                                v-layout(align-start='', justify-start='', row='', wrap fill-height='')
                                    v-flex(xs12)
                                        v-card-title(style="padding: 5px;").justify-center
                                            span.white--text  Viajes
                    //- GChart(type='ColumnChart' :data='chartData' :options='chartOptions')
                    apexchart(width="100%", height="250",ref='chart', type='bar', :options='chartOptions' :series='series')
</template>

<script>
import Api from "@/services/methods";
export default {
  name: "mPagos",
  data: () => ({
    desde: "",
    hasta: "",
    form: {
      solicitud: "",
      nombre: "",
      monto: "",
      fecha: "",
      estatus: ""
    },
    dialog: false,
    editedIndex: -1,
    headers: [
      { text: "ID Solicitud", value: "solicitud" },
      { text: "Nombre Chofer", value: "nombre" },
      { text: "Cantidad de Retiro", value: "monto" },
      { text: "Fecha de Solicitud", value: "fecha" },
      { text: "Estatus", value: "estatus" },
      { text: "Acción" }
    ],
    series: [],
    chartOptions: {
      chart: {
        height: 350,
        type: "bar"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 2
      },
      grid: {
        row: {
          colors: ["#fff", "#f2f2f2"]
        }
      },
      xaxis: {
        labels: {
          rotate: -45
        },
        categories: []
      },
      yaxis: {
        title: {
          text: "Servings"
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [50, 0, 100]
        }
      }
    },
    viajes: []
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
      Api.get("stats/viajes/mes").then(res => {
        this.viajes = res.data;
        this.viajes.total_monto = Math.round(res.data.total_monto)
          .toFixed(0)
          .toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        this.series = res.data.series;
        this.chartOptions = {
          xaxis: {
            categories: res.data.fechas
          }
        };
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
    obtenerViajes() {
      Api.get(
        "stats/viajes/mes?desde=" + this.desde + "&hasta=" + this.hasta
      ).then(res => {
        if (res.data.fechas.length !== 0) {
          this.viajes = res.data;
          this.viajes.total_monto = Math.round(res.data.total_monto)
            .toFixed(0)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
          this.series = res.data.series;
          this.chartOptions = {
            xaxis: {
              categories: res.data.fechas
            }
          };
        } else {
          this.$swal.fire(
            "Oops...",
            "Fecha no encontrada, realice una busqueda con otro rango de fechas.",
            "error"
          );
        }
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
