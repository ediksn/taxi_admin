<template lang="pug">
div(style="margin-top: -24px;margin-left: -15px;margin-right: -15px;")
  #Dispatchers
    v-layout(align-start='', justify-start='', row='', fill-height='')
      v-flex(xs12)
        v-card(color='', style="border-radius:5px;background-color: #e84646;")
            v-card-title.justify-center
              img(src='../assets/logo.png', with='60' ,height='60')
        v-card(color='', style="border-radius:5px;background-color: #d6d6d6")
            v-card-title(style="padding: 7px;").justify-center
                span.black--text  Notificaciones
    v-layout(align-start='', justify-start='', row='', fill-height='')
      v-flex(xs12 style='margin-top: 20px;')
        v-layout(wrap, row='', fill-height='')
            v-flex(xs12)
                v-card
                    v-text-field(id="asunto" v-model="form.titulo" required prepend-inner-icon="subject" label="Asunto:" style="height: 56px;padding: 15px 25px 0px 25px;")
                    v-textarea(id="mensaje" v-model="form.cuerpo" required prepend-inner-icon="message" label="Mensaje:" style="height: 130px;padding: 15px 25px 0px 25px;")
                    div(style='display:flex;justify-content:center;')
                        v-btn(v-if='perm',style="border-radius:5px;height: 35px;padding: 0px;", @click='enviar()')
                            v-icon(color='black' style='margin-right: 5px;') done_outline
                            span.black--text  Enviar
            v-flex(xs6 style='margin-top:20px;')
                v-text-field(v-model='search', append-icon='search', label='Buscar' style='width:95%;')
            v-flex(xs6 style='margin-top:20px;')
                v-select(:items="item" v-model="select" prepend-icon="chevron_right", style="height: 56px;width: 100%;" label="Seleccione el Filtro:" , @change='filtro(select)')
        v-card(color='', style="border-radius: 0px 0px 20px 20px;background-color: #e84646;margin-top:10px")
          v-flex(xs12 sm12)
            v-layout(align-start='', justify-start='', row='')
              v-flex(xs12)
                v-card-title(style="padding: 7px;").justify-center
                    span.white--text Lista de Personas
              v-flex(xs1 style='height: 10px;max-width: 7.333333% !important;flex-basis: 3.333333% !important;')
                      v-btn(icon, @click='sinchk()', style='height: 100%;')
                        v-icon(color='white') done_outline
              v-flex(xs1 style='height: 10px;max-width: 7.333333% !important;flex-basis: 3.333333% !important;')
                      v-btn(icon, @click='chk()', style='height: 100%;')
                        v-icon(color='white') done_all
        v-data-table.elevation-1(:headers='headers', :items="todos", :search='search' style="margin-top: 5px;")
          template(slot='items', slot-scope='props')
            td {{ props.item.nombre }}
            td {{ props.item.apellido }}
            td {{ props.item.email }}
            td {{ props.item.telefono }}
            td {{ props.item.direccion[0] }}
            td {{ props.item.estatus }}
            td.justify-start.layout.px-0
                v-container(fluid='', px-0='', style='margin-left: 20px;margin-top: -25px;')
                    v-checkbox(v-model='props.item.select' color="red")

</template>

<script>
import Api from "@/services/methods";
export default {
  name: "mNotificaciones",
  data: () => ({
    item: ["Todos", "Choferes", "Clientes"],
    form: {
      clientes: [],
      choferes: [],
      titulo: "",
      cuerpo: "",
      tokencli: [],
      tokench: []
    },
    defaultForm: {
      clientes: [],
      choferes: [],
      titulo: "",
      cuerpo: "",
      tokencli: [],
      tokench: []
    },
    select: "",
    search: "",
    perm: "",
    todos: [],
    busqueda: [],
    clientes: [],
    choferes: [],
    headers: [
      // { text: "Identificacion", value: "identificacion" },
      { text: "Nombre", value: "nombre" },
      { text: "Apellido", value: "apellido" },
      { text: "Correo", value: "email" },
      { text: "Telefono", value: "telefono" },
      { text: "Dirección", value: "direccion" },
      { text: "Estatus", value: "estatus" },
      { text: "Selección" }
    ]
  }),
  created() {
    this.verificacion();
    this.initialize();
  },
  sockets: {
    act_chof(data) {
      this.sckt();
    },
    act_cli(data) {
      this.sckt();
    }
  },
  methods: {
    verificacion() {
      for (let i = 0; i < this.$store.state.usuario.permisos.length; i++) {
        if (this.$store.state.usuario.permisos[i].ruta === "Notificaciones") {
          for (
            let j = 0;
            j < this.$store.state.usuario.permisos[i].accion.length;
            j++
          ) {
            if (this.$store.state.usuario.permisos[i].accion[j] === "Crear") {
              return (this.perm = "yes");
            }
          }
        }
      }
    },
    sckt() {
      this.todos = [];
      this.clientes = [];
      this.busqueda = [];
      this.choferes = [];
      this.clientes = [];
      this.form.token = [];
      this.form.tokencli = [];
      this.form.tokench = [];
      this.form.choferes = [];
      this.form.clientes = [];
      Api.get("cliente/admin/notificaciones").then(res => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].fcmtoken) {
            let objeto = {
              _id: res.data[i]._id,
              rol: "Cliente",
              nombre: res.data[i].nombre,
              apellido: res.data[i].apellido,
              email: res.data[i].email,
              telefono: res.data[i].telefono,
              direccion: res.data[i].direccion,
              estatus: res.data[i].estatus,
              token: res.data[i].fcmtoken,
              select: true
            };
            this.clientes.push(objeto);
            this.busqueda.push(objeto);
            this.todos.push(objeto);
          }
        }
      });
      Api.get("chofer/admin/notificaciones").then(res => {
        for (let i = 0; i < res.data.length; i++) {
          if (
            res.data[i].estatus !== "Pendiente" &&
            res.data[i].estatus !== "Rechazado" &&
            res.data[i].fcmtoken
          ) {
            let objeto = {
              _id: res.data[i]._id,
              nombre: res.data[i].nombre,
              apellido: res.data[i].apellido,
              rol: "Chofer",
              email: res.data[i].email,
              telefono: res.data[i].telefono,
              direccion: res.data[i].direccion,
              estatus: res.data[i].estatus,
              token: res.data[i].fcmtoken,
              select: true
            };
            this.choferes.push(objeto);
            this.busqueda.push(objeto);
            this.todos.push(objeto);
          }
        }
      });
    },
    initialize() {
      this.editedIndex = -1;
      this.form = Object.assign({}, this.defaultForm);
      this.todos = [];
      this.clientes = [];
      this.busqueda = [];
      this.choferes = [];
      this.clientes = [];
      this.form.token = [];
      this.form.tokencli = [];
      this.form.tokench = [];
      this.form.choferes = [];
      this.form.clientes = [];
      Api.get("cliente/admin/notificaciones").then(res => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].fcmtoken) {
            let objeto = {
              _id: res.data[i]._id,
              rol: "Cliente",
              nombre: res.data[i].nombre,
              apellido: res.data[i].apellido,
              email: res.data[i].email,
              telefono: res.data[i].telefono,
              direccion: res.data[i].direccion,
              estatus: res.data[i].estatus,
              token: res.data[i].fcmtoken,
              select: true
            };
            this.clientes.push(objeto);
            this.busqueda.push(objeto);
            this.todos.push(objeto);
          }
        }
      });
      Api.get("chofer/admin/notificaciones").then(res => {
        for (let i = 0; i < res.data.length; i++) {
          if (
            res.data[i].estatus !== "Pendiente" &&
            res.data[i].estatus !== "Rechazado" &&
            res.data[i].fcmtoken
          ) {
            let objeto = {
              _id: res.data[i]._id,
              nombre: res.data[i].nombre,
              apellido: res.data[i].apellido,
              rol: "Chofer",
              email: res.data[i].email,
              telefono: res.data[i].telefono,
              direccion: res.data[i].direccion,
              estatus: res.data[i].estatus,
              token: res.data[i].fcmtoken,
              select: true
            };
            this.choferes.push(objeto);
            this.busqueda.push(objeto);
            this.todos.push(objeto);
          }
        }
      });
    },
    sinchk() {
      for (let i = 0; i < this.todos.length; i++) {
        this.todos[i].select = false;
      }
    },
    chk() {
      for (let i = 0; i < this.todos.length; i++) {
        this.todos[i].select = true;
      }
    },
    filtro(item) {
      if (item === "Todos") {
        this.todos = this.busqueda;
      }
      if (item === "Choferes") {
        this.todos = this.choferes;
      }
      if (item === "Clientes") {
        this.todos = this.clientes;
      }
    },
    enviar() {
      this.form.token = [];
      this.form.tokencli = [];
      this.form.tokench = [];
      this.form.choferes = [];
      this.form.clientes = [];
      for (let i = 0; i < this.todos.length; i++) {
        if (this.todos[i].select === true) {
          this.form.token.push(this.todos[i].token);
          if (this.todos[i].rol === "Cliente") {
            this.form.clientes.push(this.todos[i]._id);
            this.form.tokencli.push(this.todos[i].token);
          }
          if (this.todos[i].rol === "Chofer") {
            this.form.choferes.push(this.todos[i]._id);
            this.form.tokench.push(this.todos[i].token);
          }
        }
      }
      if (this.form.token.length > 0 && this.form.titulo && this.form.cuerpo) {
        Api.post("notificaciones", this.form)
          .then(res => {
            this.form = Object.assign({}, this.defaultForm);
            this.$swal.fire(
              "Felicidades.!",
              "Notificación enviada exitosamente.",
              "success"
            );
            this.initialize();
          })
          .catch(err => {
            console.log(err);
            this.form = Object.assign({}, this.defaultForm);
            this.initialize();
            this.$swal.fire(
              "Oops...",
              "Error encontrado, verifique los datos o llame al administrador.",
              "error"
            );
          });
      } else {
        this.$swal.fire(
          "Oops...",
          "Error encontrado, verifique si ha seleccionado alguna persona o si la notificación tiene un asunto y un mensaje.",
          "error"
        );
      }
    }
  }
};
</script>
