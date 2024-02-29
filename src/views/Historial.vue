<template lang="pug">
div(style="margin-top: -24px;margin-left: -15px;margin-right: -15px;")
  #Historial
    v-layout(align-start='', justify-start='', row='', fill-height='')
      v-flex(xs12)
        v-card(color='', style="border-radius:5px;background-color: #e84646;")
            v-card-title.justify-center
              img(src='../assets/logo.png', with='60' ,height='60')
        v-card(color='', style="border-radius:5px;background-color: #d6d6d6")
            v-card-title(style="padding: 7px;").justify-center
                span.black--text  Historial de Notificaciones
    v-dialog(v-model='dialog', persistent max-width='1028px')
          v-container(style='background-color:white !important;max-width: 1028px;')
            v-card-title.justify-center
                span.headline Notificación
            div(style="margin-top: 20px;")
                v-flex(xs12 sm12)
                    v-layout(align-start='', justify-center='', row='', wrap fill-height='')
                        v-flex(xs10)
                          v-form(enctype="multipart/form-data")
                            v-text-field(id="asunto"
                            outline
                            disabled
                            required
                            v-model="form.titulo"
                            prepend-inner-icon="subject"
                            label="Asunto:"
                            style="height: 56px;margin: 0px 0px 10px;")

                            v-textarea(id="mensaje"
                            outline
                            required
                            disabled
                            v-model="form.cuerpo"
                            prepend-inner-icon="message"
                            label="Mensaje:"
                            style="height: 133px;")

                            v-card(color='', style="background-color: transparent;margin-top:10px;")
                                v-card-title(style="padding: 7px;margin-top: 0px;").justify-center
                                    span.black--text Lista de Clientes
                            v-data-table.elevation-1(:headers='headers2', :items="form.clientes" style="margin-top: 10px;")
                                template(slot='items', slot-scope='props')
                                    td {{ props.item.clientes.nombre }}
                                    td {{ props.item.clientes.apellido }}
                                    td {{ props.item.clientes.email }}
                                    td {{ props.item.clientes.telefono }}
                                    td {{ props.item.entregado }}

                            v-card(color='', style="background-color: transparent;margin-top:10px;")
                                v-card-title(style="padding: 7px;margin-top: 0px;").justify-center
                                    span.black--text Lista de Choferes
                            v-data-table.elevation-1(:headers='headers2', :items="form.choferes" style="margin-top: 10px;")
                                template(slot='items', slot-scope='props')
                                    td {{ props.item.choferes.nombre }}
                                    td {{ props.item.choferes.apellido }}
                                    td {{ props.item.choferes.email }}
                                    td {{ props.item.choferes.telefono }}
                                    td {{ props.item.entregado }}

                            div(style='display:flex;justify-content:center;')
                                v-btn(style="background:#e84646;;border-radius:10px;", @click.native='close') Salir
    v-layout(align-start='', justify-start='', row='', fill-height='')
      v-flex(xs12 style='margin-top: 5px;')
        v-card(color='', style="border-radius: 0px 0px 20px 20px;background-color: #e84646;")
            v-card-title(style="padding: 7px;margin-top: 0px;").justify-center
                span.white--text Lista de Notificaciones
        v-data-table.elevation-1(:headers='headers', :items="historial", style="margin-top: 5px;")
          template(slot='items', slot-scope='props')
            td {{ props.item.titulo }}
            td {{ props.item.cuerpo }}
            td {{ props.item.createdAt | moment("DD-MM-YYYY, h:mm a") }}
            td.justify-start.layout.px-0
                    v-btn.mx-0(icon, @click='editItem(props.item)', style='margin-top: -9px;')
                        v-icon(color='teal') visibility
</template>

<script>
import Api from "@/services/methods";
export default {
  name: "mHistorial",
  data: () => ({
    form: {
      titulo: "",
      cuerpo: "",
      createdAt: "",
      clientes: [],
      choferes: []
    },
    dialog: false,
    editedIndex: -1,
    historial: [],
    headers2: [
      { text: "Nombre", value: "nombre" },
      { text: "Nombre", value: "apellido" },
      { text: "Correo", value: "email" },
      { text: "Telefono", value: "telefono" },
      { text: "Recibido", value: "entregado" }
    ],
    headers: [
      { text: "Asunto", value: "titulo" },
      { text: "Mensaje", value: "cuerpo" },
      { text: "Fecha", value: "createdAt" },
      { text: "Acción" }
    ],
    defaultForm: {
      titulo: "",
      cuerpo: "",
      createdAt: "",
      clientes: [],
      choferes: []
    }
  }),
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.historial = [];
      Api.get("notificaciones").then(res => {
        for (let i = 0; i < res.data.length; i++) {
          for (let j = 0; j < res.data[i].choferes.length; j++) {
            if (res.data[i].choferes[j].choferes) {
              this.historial.push(res.data[i]);
            }
          }
          for (let e = 0; e < res.data[i].clientes.length; e++) {
            if (res.data[i].clientes[e].clientes) {
              this.historial.push(res.data[i]);
            }
          }
        }
      });
    },
    close() {
      this.form = Object.assign({}, this.defaultForm);
      this.dialog = false;
      this.initialize();
    },
    editItem(item) {
      this.editedIndex = this.historial.indexOf(item);
      Object.keys(this.form).map(key => {
        if (item[key]) this.form[key] = item[key];
      });
      this.form._id = item._id;
      this.dialog = true;
    }
  }
};
</script>
