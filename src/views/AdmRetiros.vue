<template lang="pug">
div(style="margin-top: -24px;margin-left: -15px;margin-right: -15px;")
  #AdmRetiros
    v-layout(align-start='', justify-start='', row='', fill-height='')
      v-flex(xs12)
        v-card(color='', style="border-radius:5px;background-color: #e84646;")
            v-card-title.justify-center
              img(src='../assets/logo.png', with='60' ,height='60')
        v-card(color='', style="border-radius:5px;background-color: #d6d6d6")
            v-card-title(style="padding: 7px;").justify-center
                span.black--text  Administración de Retiros
    v-dialog(v-model='dialog', persistent max-width='1028px')
          v-container(style='background-color:white !important;max-width: 1028px;')
            v-card-title.justify-center
                span.headline Retiro
            div(style="margin-top: 20px;")
                v-flex(xs12 sm12)
                    v-layout(align-start='', justify-center='', row='', wrap fill-height='')
                        v-flex(xs6)
                          v-form(enctype="multipart/form-data")
                            v-card(style="margin-right: 0px;")
                                v-text-field(id="Nombre"
                                outline
                                disabled
                                required
                                v-model="form2.nombre"
                                prepend-inner-icon="person"
                                label="Nombre:"
                                style="height: 56px;")

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="Apellido"
                                outline
                                disabled
                                required
                                v-model="form2.apellido"
                                prepend-inner-icon="person"
                                label="Apellido:"
                                style="height: 56px;")

                            v-card(v-if='form.tipo === "Cuenta Bancaria"', style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="banco"
                                outline
                                disabled
                                required
                                v-model="form2.nom_banc"
                                prepend-inner-icon="account_balance"
                                label="Nombre del Banco:"
                                style="height: 56px;")

                            v-card(v-if='form.tipo === "Cuenta Bancaria"', style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="numerocta"
                                outline
                                disabled
                                required
                                v-model="form2.num_cuenta"
                                prepend-inner-icon="account_balance_wallet"
                                label="Numero de Cuenta:"
                                style="height: 56px;")

                            v-card(v-if='form.tipo === "Cuenta Bancaria"', style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="tipocta"
                                outline
                                disabled
                                required
                                v-model="form2.tipo_cuenta"
                                prepend-inner-icon="credit_card"
                                label="Tipo de Cuenta:"
                                style="height: 56px;")

                            v-card(v-if='form.tipo === "PayPal"', style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="email"
                                outline
                                disabled
                                required
                                v-model="form2.paypal"
                                prepend-inner-icon="email"
                                label="Correo PayPal:"
                                style="height: 56px;")

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="Identificacion"
                                outline
                                disabled
                                required
                                v-model="form2.identificacion"
                                prepend-inner-icon="account_circle"
                                label="Cédula del Propietario:"
                                style="height: 56px;")
                                
                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="id"
                                outline
                                disabled
                                required
                                v-model="form.id"
                                prepend-inner-icon="code"
                                label="Codigo del Retiro:"
                                style="height: 56px;")

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="tipo"
                                outline
                                disabled
                                required
                                v-model="form.tipo"
                                prepend-inner-icon="code"
                                label="Tipo de Retiro:"
                                style="height: 56px;")

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="monto"
                                outline
                                disabled
                                required
                                v-model="monto"
                                prepend-inner-icon="monetization_on"
                                label="Monto:"
                                style="height: 56px;")

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="Asunto"
                                v-model="form3.titulo"
                                outline
                                required
                                prepend-inner-icon="subject"
                                label="Asunto:"
                                style="height: 56px;")

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-textarea(id="mensaje"
                                outline
                                required
                                v-model="form.comentario"
                                prepend-inner-icon="message"
                                label="Mensaje:"
                                style="height: 133px;")

                            div(style="display: flex;justify-content: center;")
                              v-btn(v-if="form.estatus === 'Pendiente'",style="background:blue;border-radius:10px;", @click="save(stat)") Aprobar
                              v-btn(v-if="form.estatus === 'Pendiente'",style="background:#e84646;border-radius:10px;", @click="save(stat2)") Rechazar
                              v-btn(style="background:grey;border-radius:10px;", @click.native='close') Salir
    v-layout(align-start='', justify-start='', row='', fill-height='')
      v-flex(xs12 style='margin-top: 20px;')
        v-text-field(v-model='search', append-icon='search', label='Buscar' style='width:50%;')
        v-card(color='', style="border-radius: 0px 0px 20px 20px;background-color: #e84646;")
            v-card-title(style="padding: 7px;").justify-center
                span.white--text Lista de Retiros
        v-data-table.elevation-1(:headers='headers', :items="retiros", :search='search' style="margin-top: 5px;")
          template(slot='items', slot-scope='props')
            td {{ props.item.id }}
            td(v-if='props.item.chofer') {{ props.item.chofer.nombre }} {{ props.item.chofer.apellido }}
            td(v-if='!props.item.chofer') {{ "N/A" }}
            td {{ props.item.monto }}
            td {{ props.item.fecha | moment("DD-MM-YYYY, h:mm a") }}
            td {{ props.item.tipo }}
            td {{ props.item.comentario }}
            td {{ props.item.estatus }}
            td.justify-start.layout.px-0
                    v-btn(v-if='perm').mx-0(icon, @click='editItem(props.item)', style='margin-top: -9px;')
                        v-icon(color='teal') visibility
</template>

<script>
import Api from "@/services/methods";
export default {
  name: "mAdmChoferes",
  data: () => ({
    search: "",
    perm: "",
    stat: "Aceptado",
    monto: "",
    stat2: "Rechazado",
    form3: {
      clientes: [],
      choferes: [],
      titulo: "",
      cuerpo: "",
      tokencli: [],
      tokench: []
    },
    form2: {
      nombre: "",
      apellido: "",
      identificacion: "",
      nom_banc: "",
      num_cuenta: "",
      tipo_cuenta: "",
      paypal: ""
    },
    form: {
      id: "",
      chofer: "",
      tipo: "",
      fecha: "",
      estatus: "",
      comentario: ""
    },
    dialog: false,
    editedIndex: -1,
    retiros: [],
    chofer: [],
    headers: [
      { text: "Codigo del Retiro", value: "id" },
      { text: "Chofer", value: "chofer.nombre" },
      { text: "Monto", value: "monto" },
      { text: "Fecha", value: "fecha" },
      { text: "Tipo de Retiro", value: "tipo" },
      { text: "Comentario", value: "comentario" },
      { text: "Estatus", value: "estatus" },
      { text: "Acción" }
    ],
    defaultForm: {
      id: "",
      chofer: "",
      fecha: "",
      tipo: "",
      estatus: "",
      comentario: ""
    },
    defaultForm2: {
      nombre: "",
      apellido: "",
      identificacion: "",
      nom_banc: "",
      num_cuenta: "",
      tipo_cuenta: "",
      paypal: ""
    },
    defaultForm3: {
      clientes: [],
      choferes: [],
      titulo: "",
      cuerpo: "",
      tokencli: [],
      tokench: []
    },
    mtt: []
  }),
  created() {
    this.verificacion();
    this.initialize();
  },
  sockets: {
    act_retiro(data) {
      console.log(data);
      this.sckt();
    }
  },
  methods: {
    verificacion() {
      for (let i = 0; i < this.$store.state.usuario.permisos.length; i++) {
        if (this.$store.state.usuario.permisos[i].ruta === "Adm. de Retiros") {
          for (
            let j = 0;
            j < this.$store.state.usuario.permisos[i].accion.length;
            j++
          ) {
            if (
              this.$store.state.usuario.permisos[i].accion[j] === "Modificar"
            ) {
              return (this.perm = "yes");
            }
          }
        }
      }
    },
    sckt() {
      this.mtt = [];
      this.retiros = [];
      Api.get("retiros/admin").then(res => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].estatus === "Pendiente") {
            this.retiros.push(res.data[i]);
            this.mtt.push({ id: res.data[i]._id, monto: res.data[i].monto });
          }
        }
        for (let i = 0; i < this.retiros.length; i++) {
          this.retiros[i].monto =
            "RD$ " +
            Math.round(this.retiros[i].monto)
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        }
      });
    },
    initialize() {
      this.mtt = [];
      this.editedIndex = -1;
      this.retiros = [];
      Api.get("retiros/admin").then(res => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].estatus === "Pendiente") {
            this.retiros.push(res.data[i]);
            this.mtt.push({ id: res.data[i]._id, monto: res.data[i].monto });
          }
        }
        for (let i = 0; i < this.retiros.length; i++) {
          this.retiros[i].monto =
            "RD$ " +
            Math.round(this.retiros[i].monto)
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        }
      });
    },
    close() {
      this.form = Object.assign({}, this.defaultForm);
      this.form2 = Object.assign({}, this.defaultForm2);
      this.form3 = Object.assign({}, this.defaultForm3);
      this.dialog = false;
      this.initialize();
    },
    editItem(item) {
      this.editedIndex = this.retiros.indexOf(item);
      Object.keys(this.form).map(key => {
        if (item[key]) this.form[key] = item[key];
      });
      for (let i = 0; i < this.mtt.length; i++) {
        if (this.mtt[i].id === item._id) {
          this.form.monto = this.mtt[i].monto;
        }
      }
      this.monto = item.monto;
      this.form._id = item._id;
      this.form2.nombre = item.chofer.nombre;
      this.form2.apellido = item.chofer.apellido;
      this.form2.identificacion = item.chofer.identificacion;
      this.form2.nom_banc = item.chofer.nom_banc;
      this.form2.num_cuenta = item.chofer.num_cuenta;
      this.form2.tipo_cuenta = item.chofer.tipo_cuenta;
      this.form2.paypal = item.chofer.paypal;
      this.form3.tokench.push(item.chofer.fcmtoken);
      this.form3.choferes.push(item.chofer._id);
      this.dialog = true;
    },
    save(stat) {
      this.form.estatus = stat;
      this.form3.cuerpo = this.form.comentario;
      if (this.editedIndex > -1) {
        if (
          this.form3.tokench.length > 0 &&
          this.form3.titulo &&
          this.form3.cuerpo
        ) {
          Api.put("retiros/admin", this.form)
            .then(res => {
              Api.post("notificaciones", this.form3)
                .then(res => {
                  this.form3 = Object.assign({}, this.defaultForm3);
                  this.$swal.fire(
                    "Felicidades.!",
                    "Notificación enviada exitosamente.",
                    "success"
                  );
                })
                .catch(err => {
                  console.log(err);
                  this.form3 = Object.assign({}, this.defaultForm3);
                  this.$swal.fire(
                    "Oops...",
                    "Error encontrado, verifique los datos o llame al administrador.",
                    "error"
                  );
                });
              this.form = Object.assign({}, this.defaultForm);
              this.form2 = Object.assign({}, this.defaultForm2);
              this.form3 = Object.assign({}, this.defaultForm3);
              this.dialog = false;
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
          this.$swal.fire(
            "Oops...",
            "Error encontrado, verifique si la notificación tiene un asunto y un mensaje.",
            "error"
          );
        }
      }
    }
  }
};
</script>
