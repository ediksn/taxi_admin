<template lang="pug">
div(style="margin-top: -24px;margin-left: -15px;margin-right: -15px;")
  #Devoluciones
    v-layout(align-start='', justify-start='', row='', fill-height='')
      v-flex(xs12)
        v-card(color='', style="border-radius:5px;background-color: #e84646;")
            v-card-title.justify-center
              img(src='../assets/logo.png', with='60' ,height='60')
                //- span.black--text  Appolo
        v-card(color='', style="border-radius:5px;background-color: #d6d6d6")
            v-card-title(style="padding: 7px;").justify-center
                span.black--text  Administración de Devoluciones
    v-dialog(v-model='dialog', persistent max-width='700px')
          v-container(style='background-color:white !important;max-width: 700px;')
            v-card-title.justify-center
                span.headline Devolución
            div(style="margin-top: 20px;")
                v-flex(xs12 sm12)
                    v-layout(align-start='', justify-center='', row='', wrap fill-height='')
                        v-flex(xs8)
                          v-form(enctype="multipart/form-data")
                            v-text-field(id="reserva"
                            outline
                            readonly
                            v-model="form.reserva"
                            prepend-inner-icon="description"
                            label="Número de la reserva:"
                            style="height: 56px;width: 95%;margin: 0px 0px 10px;")

                            v-text-field(id="cliente"
                            outline
                            readonly
                            v-model="form.cliente"
                            prepend-inner-icon="description"
                            label="Nombre del cliente:"
                            style="height: 56px;width: 95%;margin: 0px 0px 10px;")

                            v-text-field(id="chofer"
                            outline
                            readonly
                            v-model="form.chofer"
                            prepend-inner-icon="description"
                            label="Nombre del chofer:"
                            style="height: 56px;width: 95%;margin: 0px 0px 10px;")

                            v-text-field(id="unidad"
                            outline
                            readonly
                            v-model="form.unidad"
                            prepend-inner-icon="description"
                            label="Unidad del chofer:"
                            style="height: 56px;width: 95%;margin: 0px 0px 10px;")

                            v-text-field(id="descripcion"
                            outline
                            readonly
                            v-model="form.descripcion"
                            prepend-inner-icon="description"
                            label="Descripción de la devolución:"
                            style="height: 56px;width: 95%;margin: 0px 0px 10px;")

                            v-text-field(id="total"
                            outline
                            readonly
                            v-model="form.total"
                            prepend-inner-icon="description"
                            label="Total de la devolución:"
                            style="height: 56px;width: 95%;margin: 0px 0px 10px;")

                            v-text-field(id="estatus"
                            outline
                            readonly
                            v-model="form.estatus"
                            prepend-inner-icon="description"
                            label="Estatus de la devolución:"
                            style="height: 56px;width: 95%;margin: 0px 0px 10px;")

                            v-textarea(id="nota"
                            outline
                            v-if='form.estatus ===  "Pendiente"'
                            v-model="form.nota"
                            prepend-inner-icon="description"
                            label="Nota para el cliente:"
                            style="height: 133px;width: 95%")


                            div
                              v-flex(v-if="loading === true", xs12 sm12 md12 style='margin-top:15px')
                                v-layout(align-start='', justify-center='', row='', wrap fill-height='')
                                  v-progress-circular(indeterminate='', color='primary')
                              v-flex(v-if="loading === false", xs12 sm12 md12)
                                v-layout(align-start='', justify-center='', row='', wrap fill-height='')
                                    v-btn(v-if='form.estatus === "Pendiente"' style="background:#e84646;border-radius:10px;", @click.native='save("Aceptado")') Aprobar
                                    v-btn(v-if='form.estatus === "Pendiente"' style="background:grey;border-radius:10px;", @click.native='save("Rechazado")') Rechazar
                                    v-btn(style="background:#e84646;;border-radius:10px;", @click.native='close') Salir
    div(style="margin-top:20px")
        v-flex(xs12)
            v-layout(wrap)
                v-flex(xs5)
                    v-select(:items='opciones' v-model="seleccion" label='Filtro de busqueda' outlined='' style='width:100%')
                v-flex(xs2 style='display: flex;justify-content: center;margin-top: 18px;')
                  a(@click='limpiar()')
                    img(src='../assets/clean.png', height='30', width='30')
                v-flex(xs5)
                    v-text-field(v-model='search', append-icon='search', label='Buscar' style='width:100%;')
    v-layout(align-start='', justify-start='', row='', fill-height='')
      v-flex(xs12 style='margin-top: 5px;')
        v-card(color='', style="border-radius: 0px 0px 20px 20px;background-color: #e84646;")
            v-card-title(style="padding: 7px;margin-top: 0px;").justify-center
                span.white--text Lista de Devoluciones
        v-data-table.elevation-1(:headers='headers', :items="devoluciones", :search='search', style="margin-top: 5px;")
          template(slot='items', slot-scope='props')
            td {{ props.item.fecha | moment('DD-MM-YYYY hh:mm A')}}
            td(v-if='props.item.reserva') {{ props.item.reserva.id_num }}
            td(v-if='!props.item.reserva') {{ "N/A" }}
            td(v-if='props.item.cliente') {{ props.item.cliente.nombre }} {{ props.item.cliente.apellido }}
            td(v-if='!props.item.cliente') {{ "N/A" }}
            td(v-if='props.item.chofer') {{ props.item.chofer.nombre }} {{ props.item.chofer.apellido }}
            td(v-if='!props.item.chofer') {{ "N/A" }}
            td(v-if='props.item.total') {{ props.item.total }}
            td(v-if='!props.item.total') {{ "N/A" }}
            td(v-if='props.item.estatus') {{ props.item.estatus }}
            td(v-if='!props.item.estatus') {{ "N/A" }}
            td.justify-start.layout.px-0
                v-btn(v-if='mod').mx-0(icon, @click='editItem(props.item)', style='margin-top: -9px;')
                    v-icon(color='teal') visibility
</template>

<script>
import Api from "@/services/methods";
export default {
  name: "mDevoluciones",
  data: () => ({
    cre: "",
    mod: "",
    elm: "",
    loading: false,
    search: "",
    seleccion: "",
    opciones: ["Todos", "Pendiente", "Aceptado", "Rechazado"],
    form: {
      fecha: "",
      cliente: "",
      chofer: "",
      unidad: "",
      reserva: "",
      descripcion: "",
      total: "",
      estatus: "",
      nota: ""
    },
    dialog: false,
    editedIndex: -1,
    devoluciones: [],
    cliente: '',
    chofer: '',
    devolucionesres: [],
    reservaid: '',
    headers: [
        { text: "Fecha", value: "fecha" },
        { text: "Reserva", value: "reserva.id_num" },
        { text: "Cliente", value: "cliente.nombre" + " " + "cliente.apellido"},
        { text: "Chofer", value: "chofer.nombre" },
        { text: "Total", value: "total" },
        { text: "Estatus", value: "estatus" },
        { text: "Acción" }
    ],
    defaultForm: {
      fecha: "",
      cliente: "",
      chofer: "",
      unidad: "",
      reserva: "",
      descripcion: "",
      total: "",
      estatus: "",
      nota: ""
    }
  }),
  created() {
    this.verificacion();
    this.initialize();
  },
    watch: {
    seleccion() {
      if (this.seleccion === "Pendiente") {
        this.devoluciones = []
        for (let i = 0; i < this.devolucionesres.length; i++) {
          if (this.devolucionesres[i].estatus === "Pendiente") {
            this.devoluciones.push(this.devolucionesres[i])
          }
        }
      }
      if (this.seleccion === "Aceptado") {
        this.devoluciones = []
        for (let i = 0; i < this.devolucionesres.length; i++) {
          if (this.devolucionesres[i].estatus === "Aceptado") {
            this.devoluciones.push(this.devolucionesres[i])
          }
        }
      }
      if (this.seleccion === "Rechazado") {
        this.devoluciones = []
        for (let i = 0; i < this.devolucionesres.length; i++) {
          if (this.devolucionesres[i].estatus === "Rechazado") {
            this.devoluciones.push(this.devolucionesres[i])
          }
        }
      }
      if (this.seleccion === "Todos") {
        this.devoluciones = this.devolucionesres
      }
    },
  },
  methods: {
    limpiar() {
      this.seleccion = ''
      this.search = ''
      this.devoluciones = this.devolucionesres
    },
    verificacion() {
      for (let i = 0; i < this.$store.state.usuario.permisos.length; i++) {
        if (this.$store.state.usuario.permisos[i].ruta === "Devoluciones") {
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
            if (
              this.$store.state.usuario.permisos[i].accion[j] === "Eliminar"
            ) {
              this.elm = "yes";
            }
          }
        }
      }
    },
    initialize() {
      this.reservaid = ''
      this.cliente = ''
      this.chofer = ''
      this.editedIndex = -1;
      Api.get("devolucion").then(res => {
        this.devoluciones = res.data;
        this.devolucionesres = res.data;
      });
    },
    close() {
      this.form = Object.assign({}, this.defaultForm);
      this.reservaid = ''
      this.cliente = ''
      this.chofer = ''
      this.dialog = false;
      this.initialize();
    },
    editItem(item) {
      this.editedIndex = this.devoluciones.indexOf(item);
      Object.keys(this.form).map(key => {
        if (item[key]) this.form[key] = item[key];
      });
      if (item.cliente && item.cliente.nombre && item.cliente.apellido) {
          this.form.cliente = item.cliente.nombre + ' ' + item.cliente.apellido
      } else {
          if (item.cliente && item.cliente.nombre) {
            this.form.cliente = item.cliente.nombre
          } else {
            this.form.cliente = 'N/A'
          }
      }
      if (item.cliente) {
        this.cliente = item.cliente._id
      }
      if (item.chofer) {
        this.chofer = item.chofer._id
      }
      if (item.chofer && item.chofer.nombre && item.chofer.apellido) {
          this.form.chofer = item.chofer.nombre + ' ' + item.chofer.apellido
      } else {
          if (item.chofer && item.chofer.nombre) {
            this.form.chofer = item.chofer.nombre
          } else {
            this.form.chofer = 'N/A'
          }
      }
      if (item.chofer && item.chofer.unidad) {
        this.form.unidad = item.chofer.unidad
      } else {
        this.form.unidad = 'N/A'
      }
      if (item.reserva) {
        this.form.reserva = item.reserva.id_num
        this.reservaid = item.reserva._id
      }
      this.form._id = item._id;
      this.dialog = true;
    },
    save(item) {
      if (this.form.nota) {
        this.loading = true
        if (item === "Rechazado") {
          let info = {
            _id: this.form._id,
            cliente: this.cliente,
            chofer: this.chofer,
            nota: this.form.nota,
            estatus: "Rechazado"
          }
          Api.put("devolucion", info).then(res => {
            this.form = Object.assign({}, this.defaultForm);
            this.dialog = false;
            this.$swal.fire(
              "Felicidades.!",
              "Devolución rechazada exitosamente.",
              "success"
            );
            this.initialize();
            this.loading = false
          }).catch(err => {
            this.loading = false
            console.log(err);
            this.$swal.fire(
              "Oops...",
              "Error encontrado, verifique los datos o llame al administrador.",
              "error"
            );
          });
        } else {
          let data = {
            reserva: this.reservaid
          }
          Api.post("trans/devolucion", data).then(resu=>{
            if (resu.data.status === "success") {
              let info = {
                _id: this.form._id,
                cliente: this.cliente,
                chofer: this.chofer,
                nota: this.form.nota,
                estatus: item
              }
              Api.put("devolucion", info).then(res => {
                this.form = Object.assign({}, this.defaultForm);
                this.dialog = false;
                this.$swal.fire(
                    "Felicidades.!",
                    "Devolución aprobada exitosamente.",
                    "success"
                );
                this.initialize();
                this.loading = false
              }).catch(err => {
                this.loading = false
                console.log(err);
                this.$swal.fire(
                  "Oops...",
                  "Error encontrado, verifique los datos o llame al administrador.",
                  "error"
                );
              });
            } else {
              if (resu.data.error) {
                this.form.nota = "Devolución rechazada"
                let info = {
                  _id: this.form._id,
                  nota: this.form.nota,
                  cliente: this.cliente,
                  chofer: this.chofer,
                  estatus: "Rechazado"
                }
                Api.put("devolucion", info).then(res => {
                  this.form = Object.assign({}, this.defaultForm);
                  this.dialog = false;
                  if (resu.data.error === "Original transaction is invalid, exceeds original amount or has already been returned") {
                    this.$swal.fire(
                      "Oops... Error encontrado",
                      "La transacción original no es válida, excede la cantidad original o ya ha sido devuelta",
                      "error"
                    );
                  } else {
                    this.$swal.fire(
                      "Oops... Error encontrado",
                      "El sistema azul no puede realizar devolución de esta transacción por problemas en los datos enviados.",
                      "error"
                    );
                  }
                  this.initialize();
                  this.loading = false
                }).catch(err => {
                  this.loading = false
                  console.log(err);
                  this.$swal.fire(
                    "Oops...",
                    "Error encontrado, verifique los datos o llame al administrador.",
                    "error"
                  );
                });
              }
              this.loading = false
            }
          }).catch(erro=>{
            this.loading = false
              console.log(erro);
              this.$swal.fire(
                "Oops...",
                "Error encontrado, verifique los datos o llame al administrador.",
                "error"
              );
          })
        }
      } else {
        this.$swal.fire(
          "Oops...",
          "Error encontrado, para continuar con la operación debe escribir una nota al cliente.",
          "error"
        );
      }
    }
  }
};
</script>
