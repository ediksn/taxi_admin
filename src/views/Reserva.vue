<template lang="pug">
div(style="margin-top: -24px;margin-left: -15px;margin-right: -15px;")
  #Dashboard
    v-layout(align-start='', justify-start='', row='', fill-height='')
      v-flex(xs12)
        v-card(id='color',color='', style="border-radius:5px;background-color: #e84646;")
            v-card-title.justify-center
              img(src='../assets/logo.png', with='60' ,height='60')
        v-card(color='', style="border-radius:5px;background-color: #d6d6d6")
            v-card-title(style="padding: 7px;").justify-center
                span.black--text  Todas las Reservas
    //- v-btn(style="background:grey;border-radius:10px;", @click='pdf()') PDF
    v-flex(xs12 sm12 style="margin-top:20px;")
        v-layout(row='', wrap fill-height='')
            v-flex(xs12)
                v-card(color='', style="border-radius:0px 0px 20px 20px;background-color: white;margin-right: 5px;")
                    v-card(color='', style="border-radius: 0px 0px 20px 20px;background-color: #e84646")
                        v-card-title(style="padding: 3px;")
                            v-flex(xs12 sm12 style="margin-top:0px;")
                                v-layout(align-start='', justify-start='', row='', wrap fill-height='')
                                    v-flex(xs4 style="margin-left:20px;margin-top: 8px;margin-right: -10px;")
                                      span.white--text  Gráfico Reservas
                                    v-flex(xs3 style='margin-right: 5px;')
                                      el-date-picker(v-model="desde" type='date', placeholder='Desde' style="width: 100%;" @change="comparard(desde,hasta)")
                                    v-flex(xs3 style="margin-right: 0px;")
                                        el-date-picker(v-model="hasta" type='date', placeholder='Hasta' style="width: 100%;" @change="comparar(desde,hasta)")
                                    v-flex(xs1 style='height: 10px;')
                                      v-btn(icon, @click='obtenerViajes(), ObtenerReserva()', style='height: 100%;')
                                        v-icon(color='white' style='margin-top: 0px;') search
                    apexchart(width="100%", height="250",ref='chart', type='line', :options='chartOptions2' :series='series') 
    v-layout(align-start='', justify-start='', row='', fill-height='')
      v-flex(xs12)
        v-card(color='', style="border-radius: 0px 0px 20px 20px;background-color: #e84646;")
          v-flex(xs12)
            v-layout(align-start='', justify-start='', row='', wrap, fill-height='')
              v-flex(xs4, style='margin-left:10px')
                div.icnnn.colorselect
                  v-text-field(v-model='search', append-icon='search', label='Buscar' style='width:100%;')
              v-flex(xs1)
              v-flex(xs6)
                v-card-title(style="padding: 7px;margin-top: 5px;").justify-start
                    span.white--text Lista de Reserva
        v-data-table.elevation-1(:headers='headers', :items="transacciones", :search='search', style="margin-top: 0px;")
          template(slot='items', slot-scope='props')
            td(v-if="props.item.id_num") {{ props.item.id_num }}
            td(v-if="!props.item.id_num") {{ "N/A" }}
            td(v-if='props.item.driver') {{ props.item.driver.nombre }} {{ props.item.driver.apellido }}
            td(v-if='!props.item.driver') {{ "N/A" }}
            td(v-if='props.item.user ') {{ props.item.user.nombre }} {{ props.item.user.apellido }}
            td(v-if='!props.item.user') {{ "N/A" }}
            td {{ props.item.fecha }}
            td(v-if='props.item.horaAcep') {{ props.item.horaAcep  | moment('h:mm a') }}
            td(v-if='!props.item.horaAcep') {{"N/A"}}
            td {{ props.item.costo }}
            td {{ props.item.estatus }}
</template>

<script>
import Api from "@/services/methods";
import jsPDF from "jspdf";
export default {
  name: "mReserva",
  data: () => ({
    search: "",
    desde: "",
    hasta: "",
    dialog: false,
    editedIndex: -1,
    transacciones: [],
    choferes: [],
    imagen: [],
    clientes: [],
    headers: [
      { text: "ID", value: "id_num"},
      { text: "Chofer", value: "driver.nombre"},
      { text: "Cliente", value: "user.nombre" },
      { text: "Fecha", value: "fecha" },
      { text: "Hora", value: "horaAcep" },
      { text: "Costo", value: "costo" },
      { text: "Estatus", value: "estatus" }
    ],
    chartOptions2: {
      chart: {
        id: "vuechart-example"
      },
      xaxis: {
        categories: []
      }
    },
    series: []
  }),
  created() {
    this.initialize();
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    }
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
      Api.get("chofer/admin/reserva").then(res => {
        this.choferes = res.data;
      });
      Api.get("cliente/admin/reserva").then(res => {
        this.clientes = res.data;
      });
      Api.get("reserva/admin").then(res => {
        this.transacciones = res.data;
        for (let i = 0; i < this.transacciones.length; i++) {
          if (this.transacciones[i].costo) {
            this.transacciones[i].costo =
              "RD$ " +
              Math.round(this.transacciones[i].costo)
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
          } else {
            this.transacciones[i].costo = "RD$ " + 0;
          }
        }
      });
      Api.get("stats/graficas/reserva/mes").then(res => {
        this.viajes = res.data;
        this.series = res.data.series;
        this.chartOptions2 = {
          xaxis: {
            categories: res.data.fechas
          }
        };
      });
    },
    ObtenerReserva() {
      Api.get("reserva/fechas/" + this.desde + "/" + this.hasta)
        .then(res => {
          this.transacciones = [];
          this.transacciones = res.data;
          for (let i = 0; i < this.transacciones.length; i++) {
            if (this.transacciones[i].costo) {
              this.transacciones[i].costo =
                "RD$ " +
                Math.round(this.transacciones[i].costo)
                  .toString()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
            } else {
              this.transacciones[i].costo = "RD$ " + 0;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    obtenerViajes() {
      Api.get(
        "stats/graficas/reserva/mes?desde=" +
          this.desde +
          "&hasta=" +
          this.hasta
      ).then(res => {
        if (res.data.fechas.length !== 0) {
          this.viajes = res.data;
          this.series = res.data.series;
          this.chartOptions2 = {
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
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [day, month, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    // pdf() {
    //   this.$refs.chart.dataURI().then(uri => {
    //     var doc = new jsPDF("l", "mm", "letter");
    //     doc.setDrawColor(197, 1, 2);
    //     doc.setLineWidth(15);
    //     doc.line(0, 5, 300, 5);

    //     doc.setDrawColor(197, 1, 2);
    //     doc.setLineWidth(285);
    //     doc.line(0, 165, 300, 165);

    //     doc.addImage(imgData, "PNG", 85, 90, 120, 50);
    //     doc.setFontSize(20);
    //     doc.setTextColor(255, 255, 255);
    //     doc.text(90, 150, "ESTADISTICAS BANNER PUNTO DE SALUD ");

    //     doc.addPage("letter", "landscape");
    //     doc.setDrawColor(197, 1, 2);
    //     doc.setLineWidth(15);
    //     doc.line(0, 5, 300, 5);
    //     doc.setFontSize(22);
    //     doc.setTextColor(127, 127, 127);
    //     doc.setFontStyle("bold");
    //     doc.text(5, 25, "Estadisticas Banner");
    //     doc.setFontSize(22);
    //     doc.setTextColor(127, 127, 127);
    //     doc.text(5, 35, "Punto de Salud 2018");
    //     doc.addImage(imgData2, "PNG", 200, 1, 70, 40);

    //     doc.setTextColor(0, 0, 0);
    //     doc.setFontStyle("bold");
    //     doc.setFontSize(15);
    //     doc.text(90, 50, "Advertisement Report: Punto de Salud");
    //     doc.text(108, 55, "Prepared on  2018-04-17");
    //     doc.text(75, 60, "Performance from 2018-02-21 through 2018-04-17");
    //     doc.setFontStyle("bold");
    //     doc.setFontSize(22);
    //     doc.text(105, 72, "Punto de Salud");

    //     doc.setDrawColor(127, 127, 127);
    //     doc.setLineWidth(0.1);
    //     doc.line(75, 75, 195, 75);
    //     doc.setDrawColor(127, 127, 127);
    //     doc.setLineWidth(0.1);
    //     doc.line(75, 83, 195, 83);
    //     doc.setLineWidth(0.1);
    //     doc.line(75, 98, 195, 98);

    //     doc.setLineWidth(0.1);
    //     doc.line(75, 75, 75, 98);
    //     doc.setFontStyle("bold");
    //     doc.setFontSize(13);
    //     doc.text(100, 81, "Name");
    //     doc.setFontStyle("normal");
    //     doc.setFontSize(13);
    //     doc.text(80, 92, "Punto de Salud");
    //     doc.setLineWidth(0.1);
    //     doc.line(140, 75, 140, 98);
    //     doc.setFontStyle("bold");
    //     doc.setFontSize(13);
    //     doc.text(148, 81, "Views");
    //     doc.setFontStyle("normal");
    //     doc.setFontSize(13);
    //     doc.text(144, 92, "245,301");
    //     doc.setLineWidth(0.1);
    //     doc.line(170, 75, 170, 98);
    //     doc.setFontStyle("bold");
    //     doc.setFontSize(13);
    //     doc.text(175, 81, "Clicks");
    //     doc.setFontStyle("normal");
    //     doc.setFontSize(13);
    //     doc.text(174, 92, "22");
    //     doc.setLineWidth(0.1);
    //     doc.line(195, 75, 195, 98);
    //     doc.addImage(uri, "PNG", 38, 105, 200, 100);
    //     doc.save("ejemplo.pdf");
    //   });
    // },
    close() {
      this.form = Object.assign({}, this.defaultForm);
      this.dialog = false;
      this.initialize();
    },
    editItem(item) {
      this.editedIndex = this.transacciones.indexOf(item);
      Object.keys(this.form).map(key => {
        if (item[key]) this.form[key] = item[key];
      });
      this.form._id = item._id;
      this.dialog = true;
    }
  }
};
</script>
<style lang="scss">
.icnnn .theme--light .v-icon {
  color: rgba(255, 255, 255, 0.92);
}
.colorselect .theme--light  {
  color: white !important;
}
@import url(https://fonts.googleapis.com/css?family=Roboto);

body {
  font-family: Roboto, sans-serif;
}

#chart {
  max-width: 650px;
  margin: 35px auto;
}
</style>
