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
                span.black--text  Todas las Transacciones
    v-flex(xs12 sm12 style="margin-top:20px;")
        v-layout(row='', wrap fill-height='')
            v-flex(xs12)
                v-card(color='', style="border-radius:0px 0px 20px 20px;background-color: white;margin-right: 5px;")
                    v-card(color='', style="border-radius: 0px 0px 20px 20px;background-color: #e84646")
                        v-card-title(style="padding: 3px;")
                            v-flex(xs12 sm12 style="margin-top:0px;")
                                v-layout(align-start='', justify-start='', row='', wrap fill-height='')
                                    v-flex(xs4 style="margin-left:20px;margin-top: 8px;margin-right: -10px;")
                                      span.white--text  Gráfico Transacciones
                                    v-flex(xs3 style='margin-right: 15px;')
                                      el-date-picker(v-model="desde" type='date', placeholder='Desde' style="width: 100%;" @change="comparard(desde,hasta)")
                                    v-flex(xs3 style="margin-right: 0px;")
                                        el-date-picker(v-model="hasta" type='date', placeholder='Hasta' style="width: 100%;" @change="comparar(desde,hasta)")
                                    v-flex(xs1 style='height: 10px;')
                                      v-btn(icon, @click='BuscarLine(), ObtenerTrans()', style='height: 100%;')
                                        v-icon(color='white' style='margin-top: 1px;') search
                    apexchart(width="100%", height="250",ref='chart', type='line', :options='chartOptions2' :series='series') 
    v-dialog(v-model='dialog', persistent max-width='1028px')
          v-container(style='background-color:white !important;max-width: 1028px;')
            v-card-title.justify-center
                span.headline Detalles
            div(style="margin-top: 20px;")
                v-flex(xs12 sm12)
                    v-layout(align-start='', justify-center='', row='', wrap fill-height='')
                        v-flex(xs6)
                          v-form(enctype="multipart/form-data")
                            v-card(style="margin-right: 0px;")
                                v-text-field(id="chofer"
                                outline
                                disabled
                                v-model='form.driver'
                                prepend-inner-icon="description"
                                label="Chofer:"
                                style="height: 56px;margin-bottom:10px;")

                                v-text-field(id="cliente"
                                outline
                                disabled
                                v-model='form.cliente'
                                prepend-inner-icon="description"
                                label="Cliente:"
                                style="height: 56px;margin-bottom:10px;")

                                v-text-field(id="fecha"
                                outline
                                disabled
                                v-model='form.fecha'
                                prepend-inner-icon="description"
                                label="Fecha:"
                                style="height: 56px;margin-bottom:10px;")

                                v-text-field(id="debe"
                                outline
                                disabled
                                v-model='form.debe'
                                prepend-inner-icon="description"
                                label="Debe:"
                                style="height: 56px;margin-bottom:10px;")

                                v-text-field(id="haber"
                                outline
                                disabled
                                v-model='form.haber'
                                prepend-inner-icon="description"
                                label="Haber:"
                                style="height: 56px;margin-bottom:10px;")

                                v-text-field(id="comision"
                                outline
                                disabled
                                v-model='form.comision'
                                prepend-inner-icon="description"
                                label="Comision:"
                                style="height: 56px;margin-bottom:10px;")

                                v-text-field(id="total"
                                outline
                                disabled
                                v-model='form.total'
                                prepend-inner-icon="description"
                                label="Total:"
                                style="height: 56px;margin-bottom:10px;")

                                v-text-field(id="tipo"
                                outline
                                disabled
                                v-model='form.tipo'
                                prepend-inner-icon="description"
                                label="Tipo:"
                                style="height: 56px;margin-bottom:10px;")

                                v-text-field(id="AzulOrderId"
                                outline
                                disabled
                                v-if='azul=== true'
                                v-model='form.AzulOrderId'
                                prepend-inner-icon="description"
                                label="Azul Orden Id:"
                                style="height: 56px;margin-bottom:10px;")

                                v-text-field(id="Azul_RRN"
                                outline
                                disabled
                                v-if='azul=== true'
                                v-model='form.Azul_RRN'
                                prepend-inner-icon="description"
                                label="Azul RRN:"
                                style="height: 56px;margin-bottom:10px;")

                                v-text-field(id="Azul_estatus"
                                outline
                                disabled
                                v-if='azul=== true'
                                v-model='form.Azul_estatus'
                                prepend-inner-icon="description"
                                label="Azul estatus:"
                                style="height: 56px;margin-bottom:10px;")

                                v-text-field(id="concepto"
                                outline
                                disabled
                                v-model='form.concepto'
                                prepend-inner-icon="description"
                                label="Concepto:"
                                style="height: 56px;margin-bottom:10px;")

                            div(style="display: flex;justify-content: center;")
                                v-btn(style="background:grey;border-radius:10px;", @click.native='close') Salir
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
                    span.white--text Lista de Transacciones
        v-data-table.elevation-1(:headers='headers', :items="transacciones", :search='search', :pagination.sync="pagination", style="margin-top: 0px;")
          template(slot='items', slot-scope='props')
            //- td {{ props.item._id }}
            td(v-if='props.item.driver') {{ props.item.driver.nombre }} {{ props.item.driver.apellido }}
            td(v-if='!props.item.driver') {{ "N/A" }}
            td(v-if='props.item.cliente') {{ props.item.cliente.nombre }} {{ props.item.cliente.apellido }}
            td(v-if='!props.item.cliente') {{ "N/A" }}
            td {{ props.item.fecha | moment('DD-MM-YYYY hh:mm A')}}
            td(v-if='props.item.debe') {{ props.item.debe }}
            td(v-if='!props.item.debe') {{ "N/A" }}
            td(v-if='props.item.haber') {{ props.item.haber }}
            td(v-if='!props.item.haber') {{ "N/A" }}
            td(v-if='props.item.comision') {{ props.item.comision }}
            td(v-if='!props.item.comision') {{ "N/A" }}
            //- td(v-if='props.item.iva') {{ props.item.iva }}
            //- td(v-if='!props.item.iva') {{ " " }}
            td {{ props.item.total }}
            td {{ props.item.tipo }}
            td.justify-start.layout.px-0
              v-btn.mx-0(icon, @click='editItem(props.item)' style='margin-top: 2px;')
                  v-icon(color='teal') visibility
</template>

<script>
import Api from "@/services/methods";
export default {
  name: "mTransacciones",
  data: () => ({
    dialog: false,
    search: "",
    form: {
      driver: '',
      cliente: '',
      fecha: '',
      debe: '',
      haber: '',
      comision: '',
      total: '',
      tipo: '',
      concepto: '',
      AzulOrderId: '',
      Azul_RRN: '',
      Azul_estatus: '',
      payer_info: ''
    },
    defaultForm: {
      driver: '',
      cliente: '',
      fecha: '',
      debe: '',
      haber: '',
      comision: '',
      total: '',
      tipo: '',
      concepto: '',
      AzulOrderId: '',
      Azul_RRN: '',
      Azul_estatus: '',
      payer_info: ''
    },
    azul: false,
    editedIndex: -1,
    desde: "",
    hasta: "",
    pagination: {
      sortBy: 'fecha', // The field that you're sorting by
      descending: true
    },
    transacciones: [],
    choferes: [],
    imagen: [],
    clientes: [],
    headers: [
      // { text: "ID", value: "_id"},
      { text: "Chofer", value: "driver.nombre" },
      { text: "Cliente", value: "cliente.nombre" },
      { text: "Fecha", value: "fecha" },
      { text: "Debe", value: "debe" },
      { text: "Haber", value: "haber" },
      { text: "Comisión", value: "comision" },
      // { text: "Iva", value: "iva" },
      { text: "Total", value: "total" },
      { text: "Tipo", value: "tipo" },
      { text: "Acciones"}
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
  created() {
    this.initialize();
  },
  sockets: {
    act_trans(data) {
      this.initialize();
    }
  },
  methods: {
    BuscarLine() {
      let des = this.$moment(this.desde).format("YYYY-MM-DD");
      let has = this.$moment(this.hasta).format("YYYY-MM-DD");
      Api.get("stats/graficas/trans/mes?desde=" + des + "&hasta=" + has).then(
        res => {
          if (res.data.fechas.length !== 0) {
            this.chartOptions2 = {
              xaxis: {
                categories: res.data.fechas
              }
            };
            this.series = res.data.series;
          } else {
            this.$swal.fire(
              "Oops...",
              "Fecha no encontrada, realice una busqueda con otro rango de fechas.",
              "error"
            );
          }
        }
      );
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
    ObtenerTrans() {
      Api.get("trans/fechas/" + this.desde + "/" + this.hasta)
        .then(res => {
          this.transacciones = [];
          this.transacciones = res.data;
          for (let i = 0; i < this.transacciones.length; i++) {
            if (this.transacciones[i].debe) {
              this.transacciones[i].debe =
                "RD$ " +
                Math.round(this.transacciones[i].debe)
                  .toString()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
            } else {
              this.transacciones[i].debe = "RD$ " + 0;
            }
            if (this.transacciones[i].haber) {
              this.transacciones[i].haber =
                "RD$ " +
                Math.round(this.transacciones[i].haber)
                  .toString()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
            } else {
              this.transacciones[i].haber = "RD$ " + 0;
            }
            if (this.transacciones[i].comision) {
              this.transacciones[i].comision =
                "RD$ " +
                Math.round(this.transacciones[i].comision)
                  .toString()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
            } else {
              this.transacciones[i].comision = "RD$ " + 0;
            }
            // if (this.transacciones[i].iva) {
            //   this.transacciones[i].iva =
            //     "RD$ " +
            //     Math.round(this.transacciones[i].iva)
            //       .toString()
            //       .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
            // } else {
            //   this.transacciones[i].iva = "RD$ " + 0;
            // }
            if (this.transacciones[i].total) {
              this.transacciones[i].total =
                "RD$ " +
                this.transacciones[i].total
                  .toFixed(1)
                  .toString()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
            } else {
              this.transacciones[i].total = "RD$ " + 0;
            }
          }
        })
        .catch(err => {
          console.log(err);
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
    },
    redondeo(data) {
      return data.toFixed(2);
    },
    initialize() {
      Api.get("trans").then(res => {
        this.transacciones = res.data;
        for (let i = 0; i < this.transacciones.length; i++) {
          if (this.transacciones[i].debe) {
            this.transacciones[i].debe =
              "RD$ " +
              Math.round(this.transacciones[i].debe)
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
          } else {
            this.transacciones[i].debe = "RD$ " + 0;
          }
          if (this.transacciones[i].haber) {
            this.transacciones[i].haber =
              "RD$ " +
              Math.round(this.transacciones[i].haber)
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
          } else {
            this.transacciones[i].haber = "RD$ " + 0;
          }
          if (this.transacciones[i].comision) {
            this.transacciones[i].comision =
              "RD$ " +
              Math.round(this.transacciones[i].comision)
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
          } else {
            this.transacciones[i].comision = "RD$ " + 0;
          }
          // if (this.transacciones[i].iva) {
          //   this.transacciones[i].iva =
          //     "RD$ " +
          //     Math.round(this.transacciones[i].iva)
          //       .toString()
          //       .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
          // } else {
          //   this.transacciones[i].iva = "RD$ " + 0;
          // }
          if (this.transacciones[i].total) {
            this.transacciones[i].total =
              "RD$ " +
              this.transacciones[i].total
                .toFixed(1)
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
          } else {
            this.transacciones[i].total = "RD$ " + 0;
          }
        }
      });
      Api.get("stats/graficas/trans/mes").then(res => {
        this.chartOptions2 = {
          xaxis: {
            categories: res.data.fechas
          }
        };
        this.series = res.data.series;
      });
    },
    close() {
      this.form = Object.assign({}, this.defaultForm);
      this.dialog = false;
      this.azul = false
      this.initialize();
    },
    editItem(item) {
      this.editedIndex = this.transacciones.indexOf(item);
      Object.keys(this.form).map(key => {
        if (item[key]) this.form[key] = item[key];
      });
      if (item.driver && item.driver.nombre) {
        this.form.driver = item.driver.nombre
      } else {
        this.form.driver = ''
      }
      if (item.cliente && item.cliente.nombre) {
        this.form.cliente = item.cliente.nombre
      } else {
        this.form.cliente = ''
      }
      if (item.concepto && item.concepto.nombre) {
        this.form.concepto = item.concepto.nombre
      } else {
        this.form.concepto = ''
      }
      if (item.AzulOrderId) {
        this.azul = true
        this.form.AzulOrderId = item.AzulOrderId
      } else {
        this.form.AzulOrderId = ''
      }
      // if (item.payer_info) {
      //   this.paypl = true
      //   this.form.payer_info = item.payer_info
      // } else {
      //   this.form.payer_info = ''
      // }
      if (item.Azul_RRN) {
        this.azul = true
        this.form.Azul_RRN = item.Azul_RRN
      } else {
        this.form.Azul_RRN = ''
      }
      if (item.Azul_estatus) {
        this.azul = true
        this.form.Azul_estatus = item.Azul_estatus
      } else {
        this.form.Azul_estatus = ''
      }
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
