<template lang="pug">
div(style="margin-top: -24px;margin-left: -15px;margin-right: -15px;")
  #Consultas
    v-layout(align-start='', justify-start='', row='', fill-height='')
      v-flex(xs12)
        v-card(color='', style="border-radius:5px;background-color: #e84646;")
            v-card-title.justify-center
              img(src='../assets/logo.png', with='60' ,height='60')
                //- span.black--text  Appolo
        v-card(color='', style="border-radius:5px;background-color: #d6d6d6")
            v-card-title(style="padding: 7px;").justify-center
                span.black--text  Administración de Consultas
    v-dialog(v-model='dialog', persistent max-width='1000px')
          v-container(style='background-color:white !important;max-width: 1000px;')
            v-card-title.justify-center
                span.headline Consulta
            div(style="margin-top: 20px;")
                v-flex(xs12 sm12)
                    v-layout(align-start='', justify-center='', row='', wrap fill-height='')
                            v-flex(xs12)

                                v-text-field(id="Nombre"
                                outline
                                required
                                readonly
                                v-if="form.user.nombre"
                                v-model="form.user.nombre"
                                prepend-inner-icon="description"
                                label="Nombre del usuario:")


                                v-layout(align-start='', justify-center='', row='', wrap fill-height='')
                                    v-flex(xs6 style='padding-right: 10px;')
                                        v-card(style="margin-bottom:25px;").elevation-4
                                            v-card-title.justify-center
                                                span Información enviada desde la aplicación

                                        v-text-field(id="latitudapp"
                                        outline
                                        required
                                        readonly
                                        v-if="form.recibidos && form.recibidos.origen && form.recibidos.origen.latitude"
                                        v-model="form.recibidos.origen.latitude"
                                        prepend-inner-icon="description"
                                        label="Origen Latitud:")

                                        v-text-field(id="longitudapp"
                                        outline
                                        required
                                        readonly
                                        v-if="form.recibidos && form.recibidos.origen && form.recibidos.origen.longitude"
                                        v-model="form.recibidos.origen.longitude"
                                        prepend-inner-icon="description"
                                        label="Origen Longitud:")

                                        v-text-field(id="latitudapp2"
                                        outline
                                        required
                                        readonly
                                        v-if="form.recibidos && form.recibidos.destino && form.recibidos.destino.latitude"
                                        v-model="form.recibidos.destino.latitude"
                                        prepend-inner-icon="description"
                                        label="Destino Latitud:")

                                        v-text-field(id="longitudapp2"
                                        outline
                                        required
                                        readonly
                                        v-if="form.recibidos && form.recibidos.destino && form.recibidos.destino.longitude"
                                        v-model="form.recibidos.destino.longitude"
                                        prepend-inner-icon="description"
                                        label="Destino Longitud:")

                                        v-text-field(id="ida_vueltaapp"
                                        outline
                                        required
                                        readonly
                                        v-if="form.recibidos && form.recibidos.ida_vuelta"
                                        v-model="form.recibidos.ida_vuelta"
                                        prepend-inner-icon="description"
                                        label="Ida y vuelta:")

                                        v-text-field(id="vehiculoapp"
                                        outline
                                        required
                                        readonly
                                        v-if="form.recibidos && form.recibidos.vehiculo"
                                        v-model="form.recibidos.vehiculo"
                                        prepend-inner-icon="description"
                                        label="Vehículo:")

                                    v-flex(xs6 style='padding-left: 10px;')

                                        v-card(style="margin-bottom:25px;").elevation-4
                                            v-card-title.justify-center
                                                span Información enviada desde el servidor

                                        v-text-field(id="latitudser"
                                        outline
                                        required
                                        readonly
                                        v-if="form.enviados && form.enviados.origen && form.enviados.origen.latitude"
                                        v-model="form.enviados.origen.latitude"
                                        prepend-inner-icon="description"
                                        label="Origen Latitud:")

                                        v-text-field(id="longitudser"
                                        outline
                                        required
                                        readonly
                                        v-if="form.enviados && form.enviados.origen && form.enviados.origen.longitude"
                                        v-model="form.enviados.origen.longitude"
                                        prepend-inner-icon="description"
                                        label="Origen Longitud:")

                                        v-text-field(id="latitudser2"
                                        outline
                                        required
                                        readonly
                                        v-if="form.enviados && form.enviados.destino && form.enviados.destino.latitude"
                                        v-model="form.enviados.destino.latitude"
                                        prepend-inner-icon="description"
                                        label="Destino Latitud:")

                                        v-text-field(id="longitudser2"
                                        outline
                                        required
                                        readonly
                                        v-if="form.enviados && form.enviados.destino && form.enviados.destino.longitude"
                                        v-model="form.enviados.destino.longitude"
                                        prepend-inner-icon="description"
                                        label="Destino Longitud:")

                                        v-text-field(id="ida_vueltaapp"
                                        outline
                                        required
                                        readonly
                                        v-if="form.enviados && form.enviados.ida_vuelta"
                                        v-model="form.enviados.ida_vuelta"
                                        prepend-inner-icon="description"
                                        label="Ida y vuelta:")

                                        v-text-field(id="vehiculoapp"
                                        outline
                                        required
                                        readonly
                                        v-if="form.enviados && form.enviados.vehiculo"
                                        v-model="form.enviados.vehiculo"
                                        prepend-inner-icon="description"
                                        label="Vehículo:")

                                        v-text-field(id="distancia"
                                        outline
                                        required
                                        readonly
                                        v-if="form.enviados && form.enviados.distancia"
                                        v-model="form.enviados.distancia"
                                        prepend-inner-icon="description"
                                        label="Distancia:")

                                        v-text-field(id="tiempo"
                                        outline
                                        required
                                        readonly
                                        v-if="form.enviados && form.enviados.tiempo"
                                        v-model="form.enviados.tiempo"
                                        prepend-inner-icon="description"
                                        label="Tiempo en minutos:")

                                        v-text-field(id="costo"
                                        outline
                                        required
                                        readonly
                                        v-if="form.enviados && form.enviados.costo"
                                        v-model="form.enviados.costo"
                                        prepend-inner-icon="description"
                                        label="Costo:")

                            div
                                v-flex(xs12 sm12 style='display:flex;justify-content:center')
                                    v-btn(style="background:#e84646;;border-radius:10px;", @click.native='close') Salir
    v-layout(align-start='', justify-start='', row='', fill-height='')
      v-flex(xs12 style='margin-top: 5px;')
        v-text-field(v-model='search', append-icon='search', label='Buscar' style='width:50%;')
        v-card(color='', style="border-radius: 0px 0px 20px 20px;background-color: #e84646;")
            v-card-title(style="padding: 7px;margin-top: 0px;").justify-center
                span.white--text Lista de Consultas
        v-data-table.elevation-1(:headers='headers', :items="consultas", :pagination.sync="pagination", style="margin-top: 5px;")
          template(slot='items', slot-scope='props')
            td(v-if='props.item.fecha') {{ props.item.fecha | moment('DD-MM-YYYY hh:mm A')}}
            td(v-else) sin data
            td(v-if='props.item.user && props.item.user.nombre') {{ props.item.user.nombre }}
            td(v-else) sin data
            td.justify-start.layout.px-0
                    v-btn.mx-0(icon, @click='editItem(props.item)', style='margin-top: -9px;')
                        v-icon(color='teal') visibility
</template>

<script>
import Api from "@/services/methods";
export default {
  name: "mConsulta",
  data: () => ({
    search: '',
    form: {
        fecha: "",
        user: {},
        recibidos: {},
        enviados: {}
    },
    pagination: {
      sortBy: 'fecha', // The field that you're sorting by
      descending: true
    },
    dialog: false,
    editedIndex: -1,
    consultas: [],
    headers: [
        { text: "Fecha", value: "fecha" }, 
        { text: "Usuario", value: "user.nombre" }, 
        { text: "Acción" }
    ],
    defaultForm: {
        fecha: "",
        user: {},
        recibidos: {},
        enviados: {}
    }
  }),
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.editedIndex = -1;
      Api.get("consulta").then(res => {
        this.consultas = res.data;
      });
    },
    close() {
      this.form = Object.assign({}, this.defaultForm);
      this.dialog = false;
      this.initialize();
    },
    editItem(item) {
      this.editedIndex = this.consultas.indexOf(item);
      Object.keys(this.form).map(key => {
        if (item[key]) this.form[key] = item[key];
      });
      this.form._id = item._id;
      this.dialog = true;
    }
  }
};
</script>
