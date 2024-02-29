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
                span.black--text  Dashboard
        v-card(color='', style="border-radius:0px 0px 20px 20px;background-color: white")
            v-card(color='', style="border-radius: 0px 0px 20px 20px;background-color: #e84646")
                v-card-title(style="padding: 7px;").justify-center
                    v-flex(xs12 sm12 style="margin-top:0px;")
                        v-layout(align-start='', justify-start='', row='', wrap fill-height='')
                            v-flex(xs2 style="margin-left:10px;margin-top: 8px;margin-right:0px;")
                                span.white--text Busqueda
                            v-flex(xs4 style='margin-right: 4px;')
                              el-date-picker(v-model="formini.desde" type='date', placeholder='Desde' style="width: 100%;" @change="comparard(formini.desde,formini.hasta)")
                            v-flex(xs4 style="margin-right: 0px;")
                                el-date-picker(v-model="formini.hasta" type='date', placeholder='Hasta' style="width: 100%;" @change="comparar(formini.desde,formini.hasta)")
                            v-flex(xs1 style='height: 10px;')
                              v-btn(icon, @click='BuscarIni()', style='height: 100%;')
                                v-icon(color='white' style='margin-top: 0px;') search
            v-flex(xs12 sm12 style="margin-top:10px;")
                v-layout(align-start='', justify-start='', row='', wrap fill-height='')
                    v-flex(xs4)
                        v-card(style='border-radius:50px;border: 2px solid;margin: 0px 15px 10px;border-color:#058acd;')
                            v-flex(xs12 sm12)
                                v-layout(row='', wrap fill-height='')
                                    v-flex(xs4)
                                        img(style='margin: 10px 0px 0px 15px;',src='../assets/pago.png', with='60' ,height='60')
                                    v-flex(xs6 style='line-height: 15px;margin-top: 17px;')
                                        p.black--text  Pagos
                                        span.black--text  RD$ {{inita.total}}
                    v-flex(xs4)
                        v-card(style='border-radius:50px;border: 2px solid;margin: 0px 15px 10px;border-color:#e36159;')
                            v-flex(xs12 sm12)
                                v-layout(row='', wrap fill-height='')
                                    v-flex(xs4)
                                        img(style='margin: 10px 0px 0px 15px;',src='../assets/comision.png', with='60' ,height='60')
                                    v-flex(xs6 style='line-height: 15px;margin-top: 17px;')
                                        p.black--text  Comisiones
                                        span.black--text  RD$ {{inita.comision}}
                    v-flex(xs4)
                        v-card(style='border-radius:50px;border: 2px solid;margin: 0px 15px 10px;border-color:#f39c12;')
                            v-flex(xs12 sm12)
                                v-layout(row='', wrap fill-height='')
                                    v-flex(xs4)
                                        img(style='margin: 10px 0px 0px 15px;',src='../assets/efectivo.png', with='60' ,height='60')
                                    v-flex(xs6 style='line-height: 15px;margin-top: 17px;')
                                        p.black--text  Pagos en efectivo
                                        span.black--text  RD$ {{inita.efectivo}}
                    v-flex(xs4)
                        v-card(style='border-radius:50px;border: 2px solid;margin: 0px 15px 10px;border-color:#8360b3;')
                            v-flex(xs12 sm12)
                                v-layout(row='', wrap fill-height='')
                                    v-flex(xs4)
                                        img(style='margin: 10px 0px 0px 15px;',src='../assets/tarjeta.png', with='60' ,height='60')
                                    v-flex(xs6 style='line-height: 15px;margin-top: 17px;')
                                        p.black--text  Pago con PayPal
                                        span.black--text  RD$ {{inita.paypal}}
                    v-flex(xs4)
                        v-card(style='border-radius:50px;border: 2px solid;margin: 0px 15px 10px;border-color:#da39bb;')
                            v-flex(xs12 sm12)
                                v-layout(row='', wrap fill-height='')
                                    v-flex(xs4)
                                        img(style='margin: 10px 0px 0px 15px;',src='../assets/pagospendientes.png', with='60' ,height='60')
                                    v-flex(xs8 style='line-height: 15px;margin-top: 17px;')
                                        p.black--text  Pagos con saldo
                                        span.black--text  RD$ {{inita.saldo}}
                    v-flex(xs4)
                        v-card(style='border-radius:50px;border: 2px solid;margin: 0px 15px 10px;border-color:#90aa2a;')
                            v-flex(xs12 sm12)
                                v-layout(row='', wrap fill-height='')
                                    v-flex(xs4)
                                        img(style='margin: 10px 0px 0px 15px;',src='../assets/totalviajes.png', with='60' ,height='60')
                                    v-flex(xs6 style='line-height: 15px;margin-top: 17px;')
                                        p.black--text  Total de viajes
                                        span.black--text  {{ttviaje.total}}
                    v-flex(xs4)
                        v-card(style='border-radius:50px;border: 2px solid;margin: 0px 15px 10px;border-color:#ee3324;')
                            v-flex(xs12 sm12)
                                v-layout(row='', wrap fill-height='')
                                    v-flex(xs4)
                                        img(style='margin: 10px 0px 0px 15px;',src='../assets/viajescancelados.png', with='60' ,height='60')
                                    v-flex(xs6 style='line-height: 15px;margin-top: 17px;')
                                        p.black--text  Viajes cancelados
                                        span.black--text  {{ttviaje.cancelados}}
                    v-flex(xs4)
                    v-flex(xs4)
                        v-card(style='border-radius:50px;border: 2px solid;margin: 0px 15px 10px;border-color:#d1189f;')
                            v-flex(xs12 sm12)
                                v-layout(row='', wrap fill-height='')
                                    v-flex(xs4)
                                        img(style='margin: 10px 0px 0px 15px;',src='../assets/usuarios.png', with='60' ,height='60')
                                    v-flex(xs6 style='line-height: 15px;margin-top: 17px;')
                                        p.black--text Nuevos usuarios
                                        span.black--text {{newusers}}
        v-card(color='', style="margin-top:20px;border-radius:0px 0px 20px 20px;;background-color: #e84646")
          v-flex(xs12 sm12)
            v-layout(align-start='', justify-start='', row='')
              v-flex(xs1 style='height: 10px;max-width: 7.333333% !important;flex-basis: 3.333333% !important;margin-top: 12px;')
                v-btn(icon, @click='ShowPolg()', style='height: 100%;')
                    v-icon(color='white') map
              v-flex(xs11)
                v-card-title(style="padding: 7px;").justify-center
                    span.white--text Lista de Choferes
              v-flex(xs1 style='height: 10px;max-width: 7.333333% !important;flex-basis: 3.333333% !important;')
                      v-btn(icon, @click='Clean()', style='height: 100%;')
                        v-icon(color='white' style='margin-top: 0px;') refresh
        v-layout(align-start='', justify-center='', row='', fill-height='')
            v-card(color='', style="border-radius:5px;background-color: white;z-index: 100;position: absolute;width: 20%;overflow-x: auto;height: 165px;margin-top: 50px;margin-left: 300px;")
                v-flex(xs12 sm12)
                    v-layout(row='', wrap fill-height='')
                        v-flex(xs4)
                            img(style='margin: 10px 0px 0px 15px;', src='../assets/l3.png', with='30' ,height='30')
                        v-flex(xs6 style='line-height: 15px;margin-top: 0px;')
                            v-btn(style="background:Transparent;border-radius:5px;height: 30px;padding: 0px;width: 90%;", @click='Disponibles()')
                              span.black--text Disponible
                        v-flex(xs4)
                            img(style='margin: 10px 0px 0px 15px;', src='../assets/l4.png', with='30' ,height='30')
                        v-flex(xs6 style='line-height: 15px;margin-top: 0px;')
                            v-btn(style="background:Transparent;border-radius:5px;height: 30px;padding: 0px;width: 90%;", @click='Viajando()')
                              span.black--text  Viajando
                        v-flex(xs4)
                            img(style='margin: 10px 0px 0px 15px;', src='../assets/l1.png', with='30' ,height='30')
                        v-flex(xs8 style='line-height: 15px;margin-top: 0px;')
                            v-btn(style="background:Transparent;border-radius:5px;height: 30px;padding: 0px;width: 90%;", @click='NoDisponible()')
                              span.black--text No Disponible
        GmapMap(id='mapa',v-if='centrarmapa[0]',:center='centrarmapa[0]', :zoom='zooom', map-type-id='terrain', style='width: 100%; height: 300px; margin-top: 0px')
          GmapMarker(:key='index', v-for='(m, index) in posicion', :position='m.map', :icon='Icono(m.rol)', :clickable='false', :draggable='false', @click='center=m.map')
          GmapPolygon(v-if='polygono && show === true', v-for='list in polygono', :paths='list.info', :draggable='false' @click="openInfoWindowTemplate(list)")
          gmap-info-window(:options='{maxWidth: 300}', :position='infoWindow.position', :opened='infoWindow.open', @closeclick='infoWindow.open=false')
            | <b> Nombre: </b> {{info.nombre}}
            p
            | <b> Costo Salida: </b> RD$ {{info.costo_s}}
            p
            | <b> Costo Destino: </b> RD$ {{info.costo_d}}
            p
            | <b> Area: </b> {{info.perimetro}} Mts²
            p
            | <b> Choferes: </b>
            span(v-for="index in info.choferes") 
              p
              | - {{index.nombre}} {{index.apellido}}
        GmapMap(id='mapa2',v-if='!centrarmapa[0]',:center='{lat: 18.735693, lng: -70.1626511}', :zoom='zooom', map-type-id='terrain', style='width: 100%; height: 300px; margin-top: 0px')
          GmapMarker(:key='index2', v-for='(m2, index2) in posicion', :position='m2.map', :icon='Icono(m2.rol)', :clickable='false', :draggable='false', @click='center=m2.map')
          GmapPolygon(v-if='polygono && show === true', v-for='list in polygono', :paths='list.info', :draggable='false' @click="openInfoWindowTemplate(list)")
          gmap-info-window(:options='{maxWidth: 300}', :position='infoWindow.position', :opened='infoWindow.open', @closeclick='infoWindow.open=false')
            | <b> Nombre: </b> {{info.nombre}}
            p
            | <b> Costo Salida: </b> RD$ {{info.costo_s}}
            p
            | <b> Costo Destino: </b> RD$ {{info.costo_d}}
            p
            | <b> Area: </b> {{info.perimetro}} Mts²
            p
            | <b> Choferes: </b>
            span(v-for="index in info.choferes") 
              p
              | - {{index.nombre}} {{index.apellido}}
        v-flex(xs12 sm12 style="margin-top:20px;")
            v-layout(row='', wrap fill-height='')
                v-flex(xs6)
                    v-card(color='', style="border-radius:0px 0px 20px 20px;background-color: white;margin-right: 5px;")
                        v-card(color='', style="border-radius: 0px 0px 20px 20px;background-color: #e84646")
                            v-card-title(style="padding: 3px;")
                                v-flex(xs12 sm12 style="margin-top:0px;")
                                    v-layout(align-start='', justify-start='', row='', wrap fill-height='')
                                        v-flex(xs2 style="margin-left:10px;margin-top: 8px;")
                                          span.white--text  Viajes
                                        v-flex(xs4 style="margin-right: 5px;")
                                                el-date-picker(v-model="formbar.desde" type='date', placeholder='Desde' style="width: 100%;" @change="comparard(formbar.desde,formbar.hasta)")
                                        v-flex(xs4)
                                                el-date-picker(v-model="formbar.hasta" type='date', placeholder='Hasta' style="width: 100%;" @change="comparar(formbar.desde,formbar.hasta)")
                                        v-flex(xs1 style='height: 10px;')
                                          v-btn(icon, @click='BuscarBar()', style='height: 100%;')
                                            v-icon(color='white' style='margin-top: 0px;') search
                        apexchart(height='362',ref='chartbar', type='bar', :options='chartOptions' :series='series')
                v-flex(xs6)
                    v-card(color='', style="border-radius:0px 0px 20px 20px;background-color: white;")
                        v-card(color='', style="border-radius: 0px 0px 20px 20px;background-color: #e84646")
                            v-card-title(style="padding: 3px;")
                                v-flex(xs12 sm12 style="margin-top:0px;")
                                    v-layout(align-start='', justify-start='', row='', wrap fill-height='')
                                        v-flex(xs4 style="margin-left: 5px;margin-top: 8px;margin-right: 0px;")
                                          span.white--text  Pagos por Viajes
                                        v-flex(xs3 style="margin-right: 4px;")
                                                el-date-picker(v-model="formpiep.desde" type='date', placeholder='Desde' style="width: 100%;" @change="comparard(formpiep.desde,formpiep.hasta)")
                                        v-flex(xs3 style='margin-right: 0px;')
                                                el-date-picker(v-model="formpiep.hasta" type='date', placeholder='Hasta' style="width: 100%;" @change="comparar(formpiep.desde,formpiep.hasta)")
                                        v-flex(xs1 style='height: 10px;')
                                          v-btn(icon, @click='BuscarPie()', style='height: 100%;')
                                            v-icon(color='white' style='margin-top: 0px;') search
                        apexchart(height='370',ref='pie2', type='pie', :options='chartOptions2' :series='series2')
        v-flex(xs12 sm12 style="margin-top:20px;")
            v-layout(row='', wrap fill-height='')
                v-flex(xs12)
                    v-card(color='', style="border-radius:0px 0px 20px 20px;background-color: white;margin-right: 5px;")
                        v-card(color='', style="border-radius: 0px 0px 20px 20px;background-color: #e84646")
                            v-card-title(style="padding: 3px;")
                                v-flex(xs12 sm12 style="margin-top:0px;")
                                    v-layout(align-start='', justify-start='', row='', wrap fill-height='')
                                        v-flex(xs3 style="margin-left:40px;margin-top: 8px;margin-right: -30px;")
                                          span.white--text  Viajes por Ciudad
                                        v-flex(xs4 style="margin-right: 0px;")
                                                el-date-picker(v-model="formpieg.desde" type='date', placeholder='Desde' style="width: 90%;" @change="comparard(formpieg.desde,formpieg.hasta)")
                                        v-flex(xs4)
                                                el-date-picker(v-model="formpieg.hasta" type='date', placeholder='Hasta' style="width: 90%;" @change="comparar(formpieg.desde,formpieg.hasta)")
                                        v-flex(xs1 style='height: 10px;max-width: 7.333333% !important;flex-basis: 3.333333% !important;')
                                          v-btn(icon, @click='BuscarPie2()', style='height: 100%;')
                                            v-icon(color='white' style='margin-top: 0px;') search
                        apexchart(height='400',ref='pie2', type='pie', :options='chartOptions3' :series='series3') 
        v-flex(xs12 sm12 style="margin-top:20px;")
            v-layout(row='', wrap fill-height='')
                v-flex(xs12)
                    v-card(color='', style="border-radius:0px 0px 20px 20px;background-color: white;margin-right: 5px;")
                        v-card(color='', style="border-radius: 0px 0px 20px 20px;background-color: #e84646")
                            v-card-title(style="padding: 3px;")
                                v-flex(xs12 sm12 style="margin-top:0px;")
                                    v-layout(align-start='', justify-start='', row='', wrap fill-height='')
                                        v-flex(xs4 style="margin-left:20px;margin-top: 8px;margin-right: 0px;")
                                          span.white--text  Gráfico de ingresos de la empresa
                                        v-flex(xs3 style="margin-right: 25px;")
                                                el-date-picker(v-model="formline.desde" type='date', placeholder='Desde' style="width: 100%;" @change="comparard(formline.desde,formline.hasta)")
                                        v-flex(xs3)
                                                el-date-picker(v-model="formline.hasta" type='date', placeholder='Hasta' style="width: 100%;" @change="comparar(formline.desde,formline.hasta)")
                                        v-flex(xs2 style='height: 10px;max-width: 7.333333% !important;flex-basis: 3.333333% !important;')
                                          v-btn(icon, @click='BuscarLine()', style='height: 100%;')
                                            v-icon(color='white' style='margin-top: 0px;') search
                        apexchart(height="400", ref='line', type='line', :options='chartOptions6' :series='series6')

</template>
<script>
import Api from "@/services/methods";
export default {
  name: "mDashboard",
  data: () => ({
    infoWindow: {
      position: { lat: 0, lng: 0 },
      open: false,
      template: ""
    },
    formbar: {
      desde: "",
      hasta: ""
    },
    formini: {
      desde: "",
      hasta: ""
    },
    formpiep: {
      desde: "",
      hasta: ""
    },
    formpieg: {
      desde: "",
      hasta: ""
    },
    formline: {
      desde: "",
      hasta: ""
    },
    zooom: 12,
    show: true,
    polygono: [],
    info: [],
    posicion: [],
    centrarmapa: [],
    clientes: [],
    choferes: [],
    series: [],
    chartOptions: {
      plotOptions: {
        bar: {
          horizontal: false,
          endingShape: "rounded",
          columnWidth: "55%"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },

      xaxis: {
        categories: []
      },
      yaxis: {
        title: {}
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {}
      }
    },
    series2: [],
    chartOptions2: {
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    },
    series3: [],
    chartOptions3: {
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    },
    series6: [],
    chartOptions6: {
      chart: {
        id: "vuechart-example"
      },
      xaxis: {
        categories: []
      }
    },
    viajebar: [],
    inita: [],
    ttviaje: {
      total: "",
      cancelados: ""
    },
    grafpie: [],
    grafline: [],
    newusers: []
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
    this.actualizar();
  },
  methods: {
    actualizar() {
      Api.get("geocerca/admin/dashboard").then(res => {
        let info = [];
        for (let i = 0; i < res.data.length; i++) {
          for (let j = 0; j < res.data[i].polygono.length; j++) {
            info.push({
              id: res.data[i]._id,
              nombre: res.data[i].nombre,
              costo_s: res.data[i].costo_salida,
              costo_d: res.data[i].costo_destino,
              choferes: res.data[i].choferes,
              perimetro: res.data[i].perimetro,
              info: res.data[i].polygono[j]
            });
          }
        }
        this.polygono = info;
      })
      Api.get("cliente/admin/dashboard").then(res => {
        this.clientes = res.data;
      });
      Api.get("stats/graficas/pagos").then(res => {
        this.grafpie = res.data;
        this.series2 = res.data.series;
        this.chartOptions2 = {
          labels: this.grafpie.pieoptions
        };
      });
      Api.get("stats/graficas/ciudad").then(res => {
        this.series3 = res.data.series;
        this.chartOptions3 = {
          labels: res.data.pieoptions
        };
      });
      Api.get("stats/viajes").then(res => {
        this.viajebar = res.data;
        this.ttviaje.total = res.data.total;
        this.ttviaje.cancelados = res.data.cancelados;
        this.chartOptions = {
          xaxis: {
            categories: this.viajebar.fechas
          }
        };
        this.series = this.viajebar.series;
      });
      Api.get("stats/graficas/comision/mes").then(res => {
        this.grafline = res.data;
        this.chartOptions6 = {
          xaxis: {
            categories: this.grafline.fechas
          }
        };
        this.series6 = this.grafline.series;
      });
      Api.get("stats/resumen/pagos").then(res => {
        this.inita = res.data;
      });
      Api.get("chofer/admin/dashboard").then(res => {
        let info = res.data;
        let posi = [];
        this.centrarmapa.push(info[0].map);
        for (let i = 0; i < info.length; i++) {
          if (info[i].estatus === "Viajando") {
            posi.push({ rol: "viajando", map: info[i].map });
          }
          if (info[i].estatus === "Disponible") {
            posi.push({
              rol: "disponible",
              map: info[i].map
            });
          }
          if (info[i].estatus === "No Disponible") {
            posi.push({
              rol: "no disponible",
              map: info[i].map
            });
          }
        }
        this.choferes = info;
        this.posicion = posi;
      });
      Api.get("stats/nuevos/usuarios").then(res => {
        this.newusers = res.data.usuarios;
      });
      setTimeout(
        function() {
          console.log("paso")
          this.actualizar();
        }.bind(this),
        10000
      );
    },
    ShowPolg() {
      if (this.show === true) {
        this.show = false;
      } else {
        this.show = true;
      }
    },
    initialize() {
      this.show = true;
      this.zooom = 12;
      this.clientes = [];
      this.centrarmapa = [];
      this.polygono = [];
      Api.get("geocerca/admin/dashboard")
        .then(res => {
          for (let i = 0; i < res.data.length; i++) {
            for (let j = 0; j < res.data[i].polygono.length; j++) {
              this.polygono.push({
                id: res.data[i]._id,
                nombre: res.data[i].nombre,
                costo_s: res.data[i].costo_salida,
                costo_d: res.data[i].costo_destino,
                choferes: res.data[i].choferes,
                perimetro: res.data[i].perimetro,
                info: res.data[i].polygono[j]
              });
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
      Api.get("cliente/admin/dashboard").then(res => {
        this.clientes = res.data;
      });
      Api.get("stats/graficas/pagos").then(res => {
        this.grafpie = res.data;
        this.series2 = res.data.series;
        this.chartOptions2 = {
          labels: this.grafpie.pieoptions
        };
      });
      Api.get("stats/graficas/ciudad").then(res => {
        this.series3 = res.data.series;
        this.chartOptions3 = {
          labels: res.data.pieoptions
        };
      });
      Api.get("stats/viajes").then(res => {
        this.viajebar = res.data;
        this.ttviaje.total = res.data.total;
        this.ttviaje.cancelados = res.data.cancelados;
        this.chartOptions = {
          xaxis: {
            categories: this.viajebar.fechas
          }
        };
        this.series = this.viajebar.series;
      });
      Api.get("stats/graficas/comision/mes").then(res => {
        this.grafline = res.data;
        this.chartOptions6 = {
          xaxis: {
            categories: this.grafline.fechas
          }
        };
        this.series6 = this.grafline.series;
      });
      Api.get("stats/resumen/pagos").then(res => {
        this.inita = res.data;
      });
      Api.get("chofer/admin/dashboard").then(res => {
        this.choferes = [];
        this.choferes = res.data;
        this.posicion = [];
        this.centrarmapa.push(this.choferes[0].map);
        for (let i = 0; i < this.choferes.length; i++) {
          if (this.choferes[i].estatus === "Viajando") {
            this.posicion.push({ rol: "viajando", map: this.choferes[i].map });
          }
          if (this.choferes[i].estatus === "Disponible") {
            this.posicion.push({
              rol: "disponible",
              map: this.choferes[i].map
            });
          }
          if (this.choferes[i].estatus === "No Disponible") {
            this.posicion.push({
              rol: "no disponible",
              map: this.choferes[i].map
            });
          }
        }
      });
      Api.get("stats/nuevos/usuarios").then(res => {
        this.newusers = res.data.usuarios;
      });
    },
    openInfoWindowTemplate(item) {
      this.infoWindow.position = item.info[0][0];
      this.infoWindow.open = true;
      this.info = item;
    },
    comparard(desde, hasta) {
      if (hasta) {
        if (this.$moment(desde).isSameOrBefore(hasta) === false) {
          this.$swal.fire(
            "Oops...",
            "Fecha invalida, por favor elija una fecha donde DESDE sea menor que HASTA.",
            "error"
          );
          this.formbar.desde = "";
          this.formbar.hasta = "";
          this.formini.desde = "";
          this.formini.hasta = "";
          this.formpiep.desde = "";
          this.formpiep.hasta = "";
          this.formpieg.desde = "";
          this.formpieg.hasta = "";
          this.formline.desde = "";
          this.formline.hasta = "";
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
          this.formbar.desde = "";
          this.formbar.hasta = "";
          this.formini.desde = "";
          this.formini.hasta = "";
          this.formpiep.desde = "";
          this.formpiep.hasta = "";
          this.formpieg.desde = "";
          this.formpieg.hasta = "";
          this.formline.desde = "";
          this.formline.hasta = "";
        }
      } else {
        this.$swal.fire(
          "Oops...",
          "Fecha invalida, por favor elija una fecha de inicio.",
          "error"
        );
        this.formbar.desde = "";
        this.formbar.hasta = "";
        this.formini.desde = "";
        this.formini.hasta = "";
        this.formpiep.desde = "";
        this.formpiep.hasta = "";
        this.formpieg.desde = "";
        this.formpieg.hasta = "";
        this.formline.desde = "";
        this.formline.hasta = "";
      }
    },
    BuscarPie2() {
      Api.get(
        "stats/graficas/ciudad?desde=" +
          this.formpieg.desde +
          "&hasta=" +
          this.formpieg.hasta
      ).then(res => {
        if (res.data.series.length !== 0 && res.data.pieoptions.length !== 0) {
          this.series3 = res.data.series;
          this.chartOptions3 = {
            labels: res.data.pieoptions
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
    BuscarLine() {
      Api.get(
        "stats/graficas/comision/mes?desde=" +
          this.formline.desde +
          "&hasta=" +
          this.formline.hasta
      ).then(res => {
        if (res.data.fechas.length !== 0) {
          this.grafline = res.data;
          this.chartOptions6 = {
            xaxis: {
              categories: this.grafline.fechas
            }
          };
          this.series6 = this.grafline.series;
        } else {
          this.$swal.fire(
            "Oops...",
            "Fecha no encontrada, realice una busqueda con otro rango de fechas.",
            "error"
          );
        }
      });
    },
    BuscarPie() {
      Api.get(
        "stats/graficas/pagos?desde=" +
          this.formpiep.desde +
          "&hasta=" +
          this.formpiep.hasta
      ).then(res => {
        if (res.data.fechas.length !== 0) {
          this.grafpie = res.data;
          this.series2 = res.data.series;
          this.chartOptions2 = {
            labels: this.grafpie.pieoptions
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
    BuscarIni() {
      this.inita = [];
      this.newusers = "";
      Api.get(
        "stats/nuevos/usuarios?desde=" +
          this.formini.desde +
          "&hasta=" +
          this.formini.hasta
      ).then(res => {
        this.newusers = res.data.usuarios;
      });
      Api.get(
        "stats/resumen/pagos?desde=" +
          this.formini.desde +
          "&hasta=" +
          this.formini.hasta
      ).then(res => {
        this.inita = res.data;
      });
      Api.get(
        "stats/viajes?desde=" +
          this.formini.desde +
          "&hasta=" +
          this.formini.hasta
      ).then(res => {
        this.ttviaje.total = res.data.total;
        this.ttviaje.cancelados = res.data.cancelados;
      });
    },
    BuscarBar() {
      this.viajebar = [];
      Api.get(
        "stats/viajes?desde=" +
          this.formbar.desde +
          "&hasta=" +
          this.formbar.hasta
      ).then(res => {
        if (res.data.fechas.length !== 0) {
          this.viajebar = res.data;
          this.chartOptions = {
            xaxis: {
              categories: this.viajebar.fechas
            }
          };
          this.series = this.viajebar.series;
        } else {
          this.$swal.fire(
            "Oops...",
            "Fecha no encontrada, realice una busqueda con otro rango de fechas.",
            "error"
          );
        }
      });
    },
    Disponibles() {
      Api.get("chofer/admin/dashboard").then(res => {
        this.choferes = [];
        this.choferes = res.data;
        this.posicion = [];
        this.centrarmapa.push(this.choferes[0].map);
        for (let i = 0; i < this.choferes.length; i++) {
          if (this.choferes[i].estatus === "Disponible") {
            this.posicion.push({
              rol: "disponible",
              map: this.choferes[i].map
            });
          }
        }
      });
    },
    Viajando() {
      Api.get("chofer/admin/dashboard").then(res => {
        this.choferes = [];
        this.choferes = res.data;
        this.posicion = [];
        this.centrarmapa.push(this.choferes[0].map);
        for (let i = 0; i < this.choferes.length; i++) {
          if (this.choferes[i].estatus === "Viajando") {
            this.posicion.push({ rol: "viajando", map: this.choferes[i].map });
          }
        }
      });
    },
    NoDisponible() {
      Api.get("chofer/admin/dashboard").then(res => {
        this.choferes = [];
        this.choferes = res.data;
        this.posicion = [];
        this.centrarmapa.push(this.choferes[0].map);
        for (let i = 0; i < this.choferes.length; i++) {
          if (this.choferes[i].estatus === "No Disponible") {
            this.posicion.push({
              rol: "no disponible",
              map: this.choferes[i].map
            });
          }
        }
      });
    },
    Clean() {
      this.initialize();
    },
    Icono(data) {
      if (data === "disponible") {
        return require("../assets/l3.png");
      }
      if (data === "viajando") {
        return require("../assets/l4.png");
      }
      if (data === "no disponible") {
        return require("../assets/l1.png");
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
    }
  }
};
</script>
<style lang="scss">
@import "~@/assets/scss/Dashboard.scss";
</style>
