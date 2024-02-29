<template lang="pug">
div(style="margin-top: -24px;margin-left: -15px;margin-right: -15px;")
  #Promociones
    v-layout(align-start='', justify-start='', row='', fill-height='')
      v-flex(xs12)
        v-card(color='', style="border-radius:5px;background-color: #e84646;")
            v-card-title.justify-center
              img(src='../assets/logo.png', with='60' ,height='60')
        v-card(color='', style="border-radius:5px;background-color: #d6d6d6")
            v-card-title(style="padding: 7px;").justify-center
                span.black--text  Promociones
    v-dialog(v-model='dialog', persistent max-width='1028px')
          v-btn.mb-2(slot='activator', style="border-radius:5px;background-color: #e84646;") Nueva Promoción
          v-container(style='background-color:white !important;max-width: 1028px;')
            v-card-title.justify-center
                span.headline Promoción
            div(style="margin-top: 20px;")
                v-flex(xs12 sm12)
                    v-layout(align-start='', justify-center='', row='', wrap fill-height='')
                        v-flex(xs6)
                          v-form(enctype="multipart/form-data")

                            v-select(id="correo"
                            outline
                            required
                            v-model="form.correo"
                            prepend-inner-icon="email"
                            label="Opción de correo masivo:")

                            v-text-field(id="codigo"
                            outline
                            required
                            v-model="form.codigo"
                            prepend-inner-icon="code"
                            label="Codigo promoción:")

                            v-text-field(id="fechai"
                            outline
                            required
                            v-model="form.fechai"
                            prepend-inner-icon="event"
                            label="Fecha Inicio:")

                            v-text-field(id="fechaf"
                            v-model="form.fechaf"
                            outline
                            required
                            prepend-inner-icon="event"
                            label="Fecha Fin:")
                            
                            v-text-field(id="limite"
                            outline
                            required
                            v-model="form.limite"
                            prepend-inner-icon="add_to_photos"
                            label="Limite:")

                            v-text-field(id="descuento"
                            outline
                            required
                            v-model="form.descuento"
                            prepend-inner-icon="place"
                            label="Descuento en %:")

                            v-text-field(id="asunto"
                            outline
                            required
                            v-model="form.asunto"
                            prepend-inner-icon="apps"
                            label="Asunto:")

                            v-textarea(id="contenido"
                            outline
                            required
                            v-model="form.contenido"
                            prepend-inner-icon="assignment"
                            label="Contenido:")

                            div
                                v-flex(xs12 sm9)
                                    v-layout(align-end='', justify-center='', row='', wrap fill-height='')
                                        v-flex(xs3)
                                        v-btn(style="background:grey;border-radius:10px;", @click.native='save') Guardar
                                        v-flex(xs2)
                                        v-btn(style="background:#e84646;;border-radius:10px;", @click.native='close') Salir
    v-layout(align-start='', justify-start='', row='', fill-height='')
      v-flex(xs12 style='margin-top: 5px;')
        v-card(color='', style="border-radius: 0px 0px 20px 20px;background-color: #e84646;")
            v-card-title(style="padding: 7px;").justify-center
                span.white--text Lista de Promociones
        v-data-table.elevation-1(:headers='headers', :items="promocion", style="margin-top: 5px;")
          template(slot='items', slot-scope='props')
            td {{ props.item.codigo }}
            td {{ props.item.asunto }}
            td {{ props.item.fechai }}
            td {{ props.item.fechaf }}
            td {{ props.item.limite }}
            td {{ props.item.descuento }}
            td.justify-start.layout.px-0
                    v-btn.mx-0(icon, @click='editItem(props.item)', style='margin-top: -9px;')
                        v-icon(color='teal') edit
</template>

<script>
import Api from "@/services/methods";
export default {
  name: "mPromociones",
  data: () => ({
    form: {
      correo: {},
      codigo: "",
      fechai: "",
      fechaf: "",
      limite: "",
      descuento: "",
      asunto: "",
      contenido: ""
    },
    dialog: false,
    editedIndex: -1,
    promocion: [],
    headers: [
      { text: "Codigo Promoción", value: "codigo" },
      { text: "Asunto", value: "asunto" },
      { text: "Fecha Inicio", value: "fechai" },
      { text: "Fecha Fin", value: "fechaf" },
      { text: "Limite", value: "limite" },
      { text: "Descuento", value: "descuento" },
      { text: "Acción" }
    ],
    defaultForm: {
      correo: {},
      codigo: "",
      fechai: "",
      fechaf: "",
      limite: "",
      descuento: "",
      asunto: "",
      contenido: ""
    }
  }),
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.editedIndex = -1;
      Api.get("promocion").then(res => {
        this.promocion = res.data;
      });
    },
    close() {
      this.form = Object.assign({}, this.defaultForm);
      this.dialog = false;
      this.initialize();
    },
    editItem(item) {
      this.editedIndex = this.promocion.indexOf(item);
      Object.keys(this.form).map(key => {
        if (item[key]) this.form[key] = item[key];
      });
      this.form._id = item._id;

      this.dialog = true;
    },
    save() {
      if (this.editedIndex > -1) {
        Api.put("promocion", this.form)
          .then(res => {
            this.form = Object.assign({}, this.defaultForm);
            this.dialog = false;
            this.$swal.fire(
              "Felicidades.!",
              "Modificación realizada exitosamente.",
              "success"
            );
            this.initialize();
          })
          .catch(err => {
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
