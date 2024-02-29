<template lang="pug">
div(style="margin-top: -24px;margin-left: -15px;margin-right: -15px;")
  #Settings
    v-layout(align-start='', justify-start='', row='', fill-height='')
      v-flex(xs12)
        v-card(color='', style="border-radius:5px;background-color: #e84646;")
            v-card-title.justify-center
              img(src='../assets/logo.png', with='60' ,height='60')
        v-card(color='', style="border-radius:5px;background-color: #d6d6d6")
            v-card-title(style="padding: 7px;").justify-center
                span.black--text  Configuraciones
    v-container
        div(style="margin-top: 20px;")
            v-flex(xs12 sm12)
                v-layout(align-start='', justify-center='', row='', wrap fill-height='')
                    v-flex(xs6)
                      v-form(enctype="multipart/form-data")
                        //- v-text-field(id="Tarifa"
                        //- outline
                        //- type="number"
                        //- required
                        //- v-model="form.tarifa"
                        //- prepend-inner-icon="attach_money"
                        //- label="Tarifa:"
                        //- style="height: 56px;")
                        //-   template(v-slot:prepend='')
                        //-     v-tooltip(bottom='')
                        //-       template(v-slot:activator='{ on }')
                        //-         v-icon(v-on='on') help
                        //-       | Tarifa general calculada en base a la distancia(Km) del viaje.
                        v-text-field(id="servidor"
                        outline
                        required
                        v-model="form.servidor"
                        prepend-inner-icon="email"
                        label="Servidor:"
                        style="height: 56px;margin-top: 10px;")
                          template(v-slot:prepend='')
                            v-tooltip(bottom='')
                              template(v-slot:activator='{ on }')
                                v-icon(v-on='on') help
                              | Servidor de correo electronico.

                        v-text-field(id="puerto"
                        outline
                        required
                        v-model="form.puerto"
                        prepend-inner-icon="email"
                        label="Puerto:"
                        style="height: 56px;margin-top: 10px;")
                          template(v-slot:prepend='')
                            v-tooltip(bottom='')
                              template(v-slot:activator='{ on }')
                                v-icon(v-on='on') help
                              | Puerto del servidor de correo electronico.

                        v-text-field(id="correo"
                        outline
                        required
                        v-model="form.correo"
                        prepend-inner-icon="email"
                        label="Correo:"
                        style="height: 56px;margin-top: 10px;")
                          template(v-slot:prepend='')
                            v-tooltip(bottom='')
                              template(v-slot:activator='{ on }')
                                v-icon(v-on='on') help
                              | Correo electronico para el envio de mensajes.

                        v-text-field(id="clave"
                        outline
                        required
                        v-model="form.clave"
                        prepend-inner-icon="email"
                        label="Clave:"
                        style="height: 56px;margin-top: 10px;")
                          template(v-slot:prepend='')
                            v-tooltip(bottom='')
                              template(v-slot:activator='{ on }')
                                v-icon(v-on='on') help
                              | Clave del correo electronico para el envio de mensajes.

                        v-text-field(id="Comision"
                        outline
                        required
                        type="number"
                        v-model="form.comision"
                        prepend-inner-icon="monetization_on"
                        label="Comisión:"
                        style="height: 56px;margin-top: 10px;")
                          template(v-slot:prepend='')
                            v-tooltip(bottom='')
                              template(v-slot:activator='{ on }')
                                v-icon(v-on='on') help
                              | Porcentaje en números enteros, para la comision de cada viaje, ejemplo: 40.

                        v-text-field(id="costo"
                        outline
                        required
                        type="number"
                        v-model="form.cost_espera"
                        prepend-inner-icon="money_off"
                        label="Costo de Espera:"
                        style="height: 56px;margin-top: 10px;")
                          template(v-slot:prepend='')
                            v-tooltip(bottom='')
                              template(v-slot:activator='{ on }')
                                v-icon(v-on='on') help
                              | Tarifa aplicable al tiempo adicional del tiempo máximo de espera.
                        //- v-text-field(id="itbis"
                        //- outline
                        //- type="number"
                        //- required
                        //- v-model="form.iva"
                        //- prepend-inner-icon="local_atm"
                        //- label="ITBIS:"
                        //- style="height: 56px;margin-top: 10px;")
                        //-   template(v-slot:prepend='')
                        //-     v-tooltip(bottom='')
                        //-       template(v-slot:activator='{ on }')
                        //-         v-icon(v-on='on') help
                        //-       | Porcentaje en números enteros, ejemplo: 12.

                        //- v-text-field(id="dist_min"
                        //- outline
                        //- required
                        //- type="number"
                        //- v-model="form.dist_min"
                        //- prepend-inner-icon="streetview"
                        //- label="Distancia Minima:"
                        //- style="height: 56px;margin-top: 10px;")
                        //-   template(v-slot:prepend='')
                        //-     v-tooltip(bottom='')
                        //-       template(v-slot:activator='{ on }')
                        //-         v-icon(v-on='on') help
                        //-       | Distancia en km.
                        v-text-field(id="dist_max"
                        outline
                        required
                        type="number"
                        v-model="dist_max_m"
                        prepend-inner-icon="streetview"
                        label="Distancia Maxima en Moto:"
                        style="height: 56px;margin-top: 10px;")
                          template(v-slot:prepend='')
                            v-tooltip(bottom='')
                              template(v-slot:activator='{ on }')
                                v-icon(v-on='on') help
                              | Distancia en km.

                        v-text-field(id="perim_busq"
                        outline
                        required
                        type="number"
                        v-model="form.perim_busq"
                        prepend-inner-icon="my_location"
                        label="Perimetro de Busqueda:"
                        style="height: 56px;margin-top: 10px;")
                          template(v-slot:prepend='')
                            v-tooltip(bottom='')
                              template(v-slot:activator='{ on }')
                                v-icon(v-on='on') help
                              | Perimetro en km.

                        v-text-field(id="perim_cli"
                        outline
                        type="number"
                        required
                        v-model="form.perim_cli"
                        prepend-inner-icon="person_pin_circle"
                        label="Perimetro Cliente:"
                        style="height: 56px;margin-top: 10px;")
                          template(v-slot:prepend='')
                            v-tooltip(bottom='')
                              template(v-slot:activator='{ on }')
                                v-icon(v-on='on') help
                              | Perimetro en km.

                        v-text-field(id="tarifa_ext"
                        outline
                        required
                        type="number"
                        v-model="form.tarifa_ext"
                        prepend-inner-icon="attach_money"
                        label="Tarifa Extra:"
                        style="height: 56px;margin-top: 10px;")
                          template(v-slot:prepend='')
                            v-tooltip(bottom='')
                              template(v-slot:activator='{ on }')
                                v-icon(v-on='on') help
                              | Tarifa aplicable al tiempo adicional del tiempo estimado del viaje.
                        v-text-field(id="tiempo_esp"
                        outline
                        required
                        type="number"
                        v-model="form.tiempo_esp"
                        prepend-inner-icon="alarm"
                        label="Tiempo de Espera del Chofer:"
                        style="height: 56px;margin-top: 10px;")
                          template(v-slot:prepend='')
                            v-tooltip(bottom='')
                              template(v-slot:activator='{ on }')
                                v-icon(v-on='on') help
                              | Tiempo en segundos.

                        v-text-field(id="espera_max"
                        outline
                        required
                        type="number"
                        v-model="form.espera_max"
                        prepend-inner-icon="alarm"
                        label="Tiempo de Espera Maxima:"
                        style="height: 56px;margin-top: 10px;")
                          template(v-slot:prepend='')
                            v-tooltip(bottom='')
                              template(v-slot:activator='{ on }')
                                v-icon(v-on='on') help
                              | Tiempo en minutos.

                        //- v-text-field(id="tarifa_min"
                        //- outline
                        //- type="number"
                        //- required
                        //- v-model="form.tarifa_min"
                        //- prepend-inner-icon="attach_money"
                        //- label="Tarifa Minima:"
                        //- style="height: 56px;margin-top: 10px;")
                        //-   template(v-slot:prepend='')
                        //-     v-tooltip(bottom='')
                        //-       template(v-slot:activator='{ on }')
                        //-         v-icon(v-on='on') help
                        //-       | Tarifa aplicable a viajes que no superen la distancia minima, Tarifa Minima = Tarifa Minima * Distancia Minima(Km)
                        //- v-text-field(id="tarifa_max"
                        //- outline
                        //- required
                        //- type="number"
                        //- v-model="form.tarifa_max"
                        //- prepend-inner-icon="attach_money"
                        //- label="Tarifa Maxima:"
                        //- style="height: 56px;margin-top: 10px;")
                        //-   template(v-slot:prepend='')
                        //-     v-tooltip(bottom='')
                        //-       template(v-slot:activator='{ on }')
                        //-         v-icon(v-on='on') help
                        //-       | Tarifa aplicable a viajes que superan la distancia maxima, Tarifa Maxima = Tarifa Maxima * Distancia Maxima(Km)
                        v-text-field(id="ida_vuelta"
                        outline
                        required
                        type="number"
                        v-model="form.ida_vuelta"
                        prepend-inner-icon="attach_money"
                        label="Porcentaje de Incremento Para Viajes de Ida y Vuelta:"
                        style="height: 56px;margin-top: 10px;")
                          template(v-slot:prepend='')
                            v-tooltip(bottom='')
                              template(v-slot:activator='{ on }')
                                v-icon(v-on='on') help
                              | Porcentaje en números enteros, ejemplo: 40.
                        template
                          v-card(style="margin-top: 10px;background:transparent;width:95%;border: 2px solid;border-color: #6d6d6d !important;margin-left: 31px")
                            v-card-title.justify-center
                              span Configuración del Taxi
                        template(v-for="(index, key) in rango")
                          v-card(flat='', style='border: 2px solid;border-color: #6d6d6d !important;width: 94%;display: flex;margin-top: 15px;margin-left: 32px;justify-content: center;')
                            v-flex(xs12)
                              v-layout(align-start='', justify-center='', row='', wrap fill-height='')
                                v-flex(xs6)
                                  v-subheader(style='width: 141px;') Rango en KM (Taxi)
                                v-flex(xs6, style='display: flex;justify-content: flex-end;')
                                  v-btn(v-if="key > 0 && rango > 1", @click='eliminarRango(key)', color='error', style='border-radius:0px;background: #cc0707;padding:0px;margin-top:0px;min-width: 25px;height: 20px;') 
                                    span(style='color: white;') X
                                  v-btn(v-if="(key+1) === rango", @click='agregarRango(key)', color='success', style='border-radius:0px;background: #cc0707;padding:0px;margin-top:0px;margin-left:0px;min-width: 25px;height: 21px;font-size: 14px;') 
                                    span(style='color: white;') +
                                v-flex(xs12)
                                  v-card-text
                                    v-layout(v-if="rango === 1", row='')
                                      v-flex(shrink='', style='width: 60px')
                                        v-text-field.mt-0(:id="'distmin' + [0]", v-model='value3[0][0]', hide-details='', single-line='', type='number')
                                      v-flex.px-3
                                        v-range-slider(:id="'dist' + [0]", v-model='value3[0]', :max='max[0]', :min='min[0]', :step='0.01')
                                      v-flex(shrink='', style='width: 60px')
                                        v-text-field.mt-0(:id="'distmax' + [0]", v-model='value3[0][1]', hide-details='', single-line='', type='number')
                                    v-layout(v-else, row='')
                                      v-flex(shrink='', style='width: 60px')
                                        v-text-field.mt-0(:id="'distmin' + [key]",v-model='value3[key][0]', hide-details='', single-line='', type='number')
                                      v-flex.px-3
                                        v-range-slider(:id="'dist' + [key]",v-model='value3[key]', :max='max[key]', :min='min[key]', :step='0.01')
                                      v-flex(shrink='', style='width: 60px')
                                        v-text-field.mt-0(:id="'distmax' + [key]", v-model='value3[key][1]', hide-details='', single-line='', type='number')
                                v-flex(xs12)
                                  v-card-text
                                    v-layout(row='')
                                      v-flex(xs12)
                                        v-text-field(:id="'tbase' + [key]"
                                        outline
                                        required
                                        type="number"
                                        v-model="tarifa_base[key]"
                                        prepend-inner-icon="attach_money"
                                        label="Tarifa Base:"
                                        style="height: 56px;width:95%")
                                      v-flex(xs12)
                                        v-text-field(:id="'tkm' + [key]"
                                        outline
                                        required
                                        type="number"
                                        v-model="tarif_km[key]"
                                        prepend-inner-icon="attach_money"
                                        label="Tarifa por Km:"
                                        style="height: 56px;width:95%")

                        template
                          v-card(style="margin-top: 10px;background:transparent;width:95%;border: 2px solid;border-color: #6d6d6d !important;margin-left: 31px")
                            v-card-title.justify-center
                              span Configuración de la Moto
                        template(v-for="(index2, key2) in rango_m")
                          v-card(flat='', style='border: 2px solid;border-color: #6d6d6d !important;width: 94%;display: flex;margin-top: 15px;margin-left: 32px;justify-content: center;')
                            v-flex(xs12)
                              v-layout(align-start='', justify-center='', row='', wrap fill-height='')
                                v-flex(xs6)
                                  v-subheader(style='width: 141px;') Rango en KM (Moto)
                                v-flex(xs6, style='display: flex;justify-content: flex-end;')
                                  v-btn(v-if="key2 > 0 && rango_m > 1", @click='eliminarRango_M(key2)', color='error', style='border-radius:0px;background: #cc0707;padding:0px;margin-top:0px;min-width: 25px;height: 20px;') 
                                    span(style='color: white;') X
                                  v-btn(v-if="(key2+1) === rango_m", @click='agregarRango_M(key2)', color='success', style='border-radius:0px;background: #cc0707;padding:0px;margin-top:0px;margin-left:0px;min-width: 25px;height: 21px;font-size: 14px;') 
                                    span(style='color: white;') +
                                v-flex(xs12)
                                  v-card-text
                                    v-layout(v-if="rango_m === 1", row='')
                                      v-flex(shrink='', style='width: 60px')
                                        v-text-field.mt-0(:id="'distmin_m' + [0]", v-model='value3_m[0][0]', hide-details='', single-line='', type='number')
                                      v-flex.px-3
                                        v-range-slider(:id="'dist_m' + [0]", v-model='value3_m[0]', :max='max_m[0]', :min='min_m[0]', :step='0.01')
                                      v-flex(shrink='', style='width: 60px')
                                        v-text-field.mt-0(:id="'distmax_m' + [0]", v-model='value3_m[0][1]', hide-details='', single-line='', type='number')
                                    v-layout(v-else, row='')
                                      v-flex(shrink='', style='width: 60px')
                                        v-text-field.mt-0(:id="'distmin_m' + [key2]",v-model='value3_m[key2][0]', hide-details='', single-line='', type='number')
                                      v-flex.px-3
                                        v-range-slider(:id="'dist_m' + [key2]",v-model='value3_m[key2]', :max='max_m[key2]', :min='min_m[key2]', :step='0.01')
                                      v-flex(shrink='', style='width: 60px')
                                        v-text-field.mt-0(:id="'distmax_m' + [key2]", v-model='value3_m[key2][1]', hide-details='', single-line='', type='number')
                                v-flex(xs12)
                                  v-card-text
                                    v-layout(row='')
                                      v-flex(xs12)
                                        v-text-field(:id="'tbase_m' + [key2]"
                                        outline
                                        required
                                        type="number"
                                        v-model="tarifa_base_m[key2]"
                                        prepend-inner-icon="attach_money"
                                        label="Tarifa Base:"
                                        style="height: 56px;width:95%")
                                      v-flex(xs12)
                                        v-text-field(:id="'tkm_m' + [key2]"
                                        outline
                                        required
                                        type="number"
                                        v-model="tarif_km_m[key2]"
                                        prepend-inner-icon="attach_money"
                                        label="Tarifa por Km:"
                                        style="height: 56px;width:95%")

                        v-select(id="preferencia"
                        outline
                        :items="pref"
                        v-model="form.preferencia"
                        prepend-icon="chevron_right",
                        required
                        style="height: 59px;width: 100%;margin: 0px 0px 10px;margin-top: 10px;"
                        label="Seleccione la Preferencia del Costo Entre Geocercas sin Ruta:")

                        div(style='margin-top:20px;')
                            v-flex(xs12 sm9)
                                v-layout(align-end='', justify-center='', row='', wrap fill-height='')
                                    v-flex(xs3)
                                    v-btn(v-if='cre || mod', style="background:grey;border-radius:10px;", @click.native='save') Guardar
</template>
<script>
import Api from "@/services/methods";
export default {
  name: "mSettings",
  data: () => ({
    max: [3000],
    wat: false,
    min: [0],
    max_m: [300],
    min_m: [0],
    pref: ["Salida", "LLegada"],
    cre: "",
    tarifa_base: [],
    tarif_km: [],
    tarifa_base_m: [],
    tarif_km_m: [],
    value3: [],
    value3_m: [],
    mod: "",
    dialog: false,
    editedIndex: -1,
    settings: [],
    dist_max_m: 0,
    form: {
      _id: 0,
      servidor: "",
      puerto: "",
      clave: "",
      correo: "",
      // tarifa: 0,
      comision: 0,
      cost_espera: 0,
      // iva: 0,
      // dist_min: 0,
      dist_max_m: 0,
      perim_busq: 0,
      perim_cli: 0,
      tarifa_ext: 0,
      tiempo_esp: 0,
      espera_max: 0,
      // tarifa_max: 0,
      // tarifa_min: 0,
      preferencia: "",
      intervalo: [],
      intervalo_m: [],
      ida_vuelta: 0
    },
    form2: {
      servidor: "",
      puerto: "",
      clave: "",
      correo: "",
      // tarifa: "",
      comision: "",
      cost_espera: "",
      // iva: "",
      // dist_min: 0,
      dist_max_m: 0,
      perim_busq: 0,
      perim_cli: 0,
      tarifa_ext: 0,
      tiempo_esp: 0,
      espera_max: 0,
      // tarifa_max: 0,
      // tarifa_min: 0,
      preferencia: "",
      intervalo: [],
      intervalo_m: [],
      ida_vuelta: 0
    },
    defaultForm: {
      _id: "",
      servidor: "",
      puerto: "",
      clave: "",
      correo: "",
      // tarifa: "",
      comision: "",
      cost_espera: "",
      // iva: "",
      // dist_min: 0,
      dist_max_m: 0,
      perim_busq: 0,
      perim_cli: 0,
      tarifa_ext: 0,
      tiempo_esp: 0,
      espera_max: 0,
      // tarifa_max: 0,
      // tarifa_min: 0,
      preferencia: "",
      ida_vuelta: 0,
      intervalo_m: [],
      intervalo: []
    },
    defaultForm2: {
      // tarifa: "",
      comision: "",
      cost_espera: "",
      // iva: "",
      // dist_min: 0,
      dist_max_m: 0,
      perim_busq: 0,
      perim_cli: 0,
      tarifa_ext: 0,
      tiempo_esp: 0,
      espera_max: 0,
      // tarifa_max: 0,
      // tarifa_min: 0,
      preferencia: "",
      ida_vuelta: 0,
      intervalo_m: [],
      intervalo: []
    },
    rango: 1,
    rango_m: 1,
    bool: true
  }),
  watch: {
    dist_max_m() {
      if (this.wat === true && this.rango_m === 1) {
        this.value3_m[0][1] = this.dist_max_m;
        this.max_m[0] = this.dist_max_m;
      }
    }
  },
  created() {
    this.verificacion();
    this.initialize();
    this.value3.push([0, 3000]);
    this.value3_m.push([0, 300]);
  },
  methods: {
    verificacion() {
      for (let i = 0; i < this.$store.state.usuario.permisos.length; i++) {
        if (
          this.$store.state.usuario.permisos[i].ruta ===
          "Configuraciones Basicas"
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
          }
        }
      }
    },
    agregarRango(index) {
      this.value3.push([this.value3[index][0], this.value3[index][1]]);
      this.max[index] = this.value3[index][1];
      this.min[index] = this.value3[index][0];
      let a = this.max[index] + 2000;
      let b = parseFloat(this.max[index] + 0.01);
      let bb = parseFloat(b.toFixed(2));
      this.value3[index + 1][0] = bb;
      this.value3[index + 1][1] = a;
      this.min.push(bb);
      this.max.push(a);
      this.tarifa_base.length + 1;
      this.tarif_km.length + 1;
      this.rango++;
    },
    agregarRango_M(index) {
      this.value3_m.push([this.value3_m[index][0], this.value3_m[index][1]]);
      this.max_m[index] = this.value3_m[index][1];
      this.min_m[index] = this.value3_m[index][0];
      let a = this.dist_max_m;
      let b = parseFloat(this.max_m[index] + 0.01);
      let bb = parseFloat(b.toFixed(2));
      this.value3_m[index + 1][0] = bb;
      this.value3_m[index + 1][1] = a;
      this.min_m.push(bb);
      this.max_m.push(a);
      this.tarifa_base_m.length + 1;
      this.tarif_km_m.length + 1;
      this.rango_m++;
    },
    eliminarRango(index) {
      this.tarifa_base.splice(index, 1);
      this.tarif_km.splice(index, 1);
      this.value3.splice(index, 1);
      this.max.splice(index, 1);
      this.min.splice(index, 1);
      this.rango--;
      if (this.max.length === 1) {
        this.max[0] = 3000;
        this.min[0] = 0;
      } else {
        this.max[index - 1] = this.max[index - 1] + 2000;
      }
    },
    eliminarRango_M(index) {
      this.tarifa_base_m.splice(index, 1);
      this.tarif_km_m.splice(index, 1);
      this.value3_m.splice(index, 1);
      this.max_m.splice(index, 1);
      this.min_m.splice(index, 1);
      this.rango_m--;
      if (this.max_m.length === 1) {
        this.max_m[0] = this.dist_max_m;
        this.min_m[0] = 0;
      } else {
        this.max_m[index - 1] = this.dist_max_m;
      }
    },
    initialize() {
      this.wat = false;
      Api.get("settings/admin").then(res => {
        this.form = [];
        this.settings = res.data;
        this.form._id = this.settings._id;
        // this.form.tarifa = this.settings.tarifa * 1000;
        this.form.comision = this.settings.comision;
        this.form.cost_espera = this.settings.cost_espera;
        // this.form.iva = this.settings.iva;
        // this.form.dist_min = this.settings.dist_min * 1000;
        if (this.settings.dist_max_m) {
          this.form.dist_max_m = this.settings.dist_max_m / 1000;
        }
        this.form.perim_busq = this.settings.perim_busq / 1000;
        this.form.perim_cli = this.settings.perim_cli / 1000;
        this.form.tarifa_ext = this.settings.tarifa_ext;
        this.form.tiempo_esp = this.settings.tiempo_esp;
        this.form.espera_max = this.settings.espera_max;
        this.form.servidor = this.settings.servidor;
        this.form.puerto = this.settings.puerto;
        this.form.correo = this.settings.correo;
        this.form.clave = this.settings.clave;
        // this.form.tarifa_max = this.settings.tarifa_max * 1000;
        // this.form.tarifa_min = this.settings.tarifa_min * 1000;
        this.form.preferencia = this.settings.preferencia;
        this.form.ida_vuelta = this.settings.ida_vuelta;
        if (this.settings.intervalo.length > 0) {
          this.rango = this.settings.intervalo.length;
          this.value3 = [];
          this.max = [];
          this.min = [];
          for (let i = 0; i < this.settings.intervalo.length; i++) {
            if (!this.settings.intervalo[i].dist_max) {
              this.value3.push([
                this.settings.intervalo[i].dist_min / 1000,
                this.settings.intervalo[i].dist_min / 1000
              ]);
              this.max.push(this.settings.intervalo[i].dist_min / 1000 + 2000);
              this.min.push(this.settings.intervalo[i].dist_min / 1000);
              this.tarifa_base.push(this.settings.intervalo[i].tarifa_base);
              this.tarif_km.push(this.settings.intervalo[i].tarif_km * 1000);
            } else {
              this.value3.push([
                this.settings.intervalo[i].dist_min / 1000,
                this.settings.intervalo[i].dist_max / 1000
              ]);
              this.max.push(this.settings.intervalo[i].dist_max / 1000);
              this.min.push(this.settings.intervalo[i].dist_min / 1000);
              this.tarifa_base.push(this.settings.intervalo[i].tarifa_base);
              this.tarif_km.push(this.settings.intervalo[i].tarif_km * 1000);
            }
          }
        }
        if (this.settings.intervalo_m.length > 0) {
          this.rango_m = this.settings.intervalo_m.length;
          this.value3_m = [];
          this.max_m = [];
          this.min_m = [];
          for (let i = 0; i < this.settings.intervalo_m.length; i++) {
            if (!this.settings.intervalo_m[i].dist_max) {
              this.value3_m.push([
                this.settings.intervalo_m[i].dist_min / 1000,
                this.settings.intervalo_m[i].dist_min / 1000
              ]);
              this.max_m.push(
                this.settings.intervalo_m[i].dist_min / 1000 + 2000
              );
              this.min_m.push(this.settings.intervalo_m[i].dist_min / 1000);
              this.tarifa_base_m.push(this.settings.intervalo_m[i].tarifa_base);
              this.tarif_km_m.push(
                this.settings.intervalo_m[i].tarif_km * 1000
              );
            } else {
              this.value3_m.push([
                this.settings.intervalo_m[i].dist_min / 1000,
                this.settings.intervalo_m[i].dist_max / 1000
              ]);
              this.max_m.push(this.settings.intervalo_m[i].dist_max / 1000);
              this.min_m.push(this.settings.intervalo_m[i].dist_min / 1000);
              this.tarifa_base_m.push(this.settings.intervalo_m[i].tarifa_base);
              this.tarif_km_m.push(
                this.settings.intervalo_m[i].tarif_km * 1000
              );
            }
          }
        }
        this.dist_max_m = this.form.dist_max_m;
        this.wat = true;
      });
    },
    save() {
      if (this.settings._id !== undefined) {
        let inter = [];
        for (let i = 0; i < this.value3.length; i++) {
          if (this.value3[i][0] === this.value3[i][1]) {
            inter.push({
              tarifa_base: parseFloat(this.tarifa_base[i]),
              tarif_km: this.tarif_km[i] / 1000,
              dist_min: this.value3[i][0] * 1000
            });
          } else {
            inter.push({
              tarifa_base: parseFloat(this.tarifa_base[i]),
              tarif_km: this.tarif_km[i] / 1000,
              dist_min: this.value3[i][0] * 1000,
              dist_max: this.value3[i][1] * 1000
            });
          }
        }
        let inter2 = [];
        for (let i = 0; i < this.value3_m.length; i++) {
          if (this.value3_m[i][0] === this.value3_m[i][1]) {
            inter2.push({
              tarifa_base: parseFloat(this.tarifa_base_m[i]),
              tarif_km: this.tarif_km_m[i] / 1000,
              dist_min: this.value3_m[i][0] * 1000
            });
          } else {
            inter2.push({
              tarifa_base: parseFloat(this.tarifa_base_m[i]),
              tarif_km: this.tarif_km_m[i] / 1000,
              dist_min: this.value3_m[i][0] * 1000,
              dist_max: this.value3_m[i][1] * 1000
            });
          }
        }
        let info = {
          _id: this.form._id,
          // tarifa: this.form.tarifa / 1000,
          comision: this.form.comision,
          cost_espera: this.form.cost_espera,
          servidor: this.form.servidor,
          puerto: this.form.puerto,
          correo: this.form.correo,
          clave: this.form.clave,
          // iva: this.form.iva,
          // dist_min: this.form.dist_min / 1000,
          dist_max_m: this.dist_max_m * 1000,
          perim_busq: this.form.perim_busq * 1000,
          perim_cli: this.form.perim_cli * 1000,
          tarifa_ext: this.form.tarifa_ext,
          tiempo_esp: this.form.tiempo_esp,
          espera_max: this.form.espera_max,
          // tarifa_max: this.form.tarifa_max / 1000,
          // tarifa_min: this.form.tarifa_min / 1000,
          preferencia: this.form.preferencia,
          ida_vuelta: this.form.ida_vuelta,
          intervalo: inter,
          intervalo_m: inter2
        };
        Api.put("settings", info)
          .then(res => {
            this.form = Object.assign({}, this.defaultForm);
            this.form2 = Object.assign({}, this.defaultForm2);
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
        // this.form2.tarifa = this.form.tarifa / 1000;
        this.form2.comision = this.form.comision;
        this.form2.cost_espera = this.form.cost_espera;
        this.form2.servidor = this.form.servidor;
        this.form2.puerto = this.form.puerto;
        this.form2.correo = this.form.correo;
        this.form2.clave = this.form.clave;
        // this.form2.iva = this.form.iva;
        // this.form2.dist_min = this.form.dist_min / 1000;
        this.form2.dist_max_m = this.dist_max_m * 1000;
        this.form2.perim_busq = this.form.perim_busq * 1000;
        this.form2.perim_cli = this.form.perim_cli * 1000;
        this.form2.tarifa_ext = this.form.tarifa_ext;
        this.form2.tiempo_esp = this.form.tiempo_esp;
        this.form2.espera_max = this.form.espera_max;
        // this.form2.tarifa_max = this.form.tarifa_max / 1000;
        // this.form2.tarifa_min = this.form.tarifa_min / 1000;
        this.form2.preferencia = this.form.preferencia;
        this.form2.ida_vuelta = this.form.ida_vuelta;
        for (let i = 0; i < this.value3.length; i++) {
          if (this.value3[i][0] === this.value3[i][1]) {
            this.form2.intervalo.push({
              tarifa_base: parseFloat(this.tarifa_base[i]),
              tarif_km: this.tarif_km[i] / 1000,
              dist_min: this.value3[i][0] * 1000
            });
          } else {
            this.form2.intervalo.push({
              tarifa_base: parseFloat(this.tarifa_base[i]),
              tarif_km: this.tarif_km[i] / 1000,
              dist_min: this.value3[i][0] * 1000,
              dist_max: this.value3[i][1] * 1000
            });
          }
        }
        for (let i = 0; i < this.value3_m.length; i++) {
          if (this.value3_m[i][0] === this.value3_m[i][1]) {
            this.form2.intervalo_m.push({
              tarifa_base: parseFloat(this.tarifa_base_m[i]),
              tarif_km: this.tarif_km_m[i] / 1000,
              dist_min: this.value3_m[i][0] * 1000
            });
          } else {
            this.form2.intervalo_m.push({
              tarifa_base: parseFloat(this.tarifa_base_m[i]),
              tarif_km: this.tarif_km_m[i] / 1000,
              dist_min: this.value3_m[i][0] * 1000,
              dist_max: this.value3_m[i][1] * 1000
            });
          }
        }
        Api.post("settings", this.form2)
          .then(res => {
            this.form = Object.assign({}, this.defaultForm);
            this.form2 = Object.assign({}, this.defaultForm2);
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
    }
  }
};
</script>
