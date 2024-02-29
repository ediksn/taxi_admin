<template lang="pug">
  v-navigation-drawer#app-drawer(:mini-variant='mini', v-model='inputValue', app='', dark='', floating='', persistent='', mobile-break-point='991', width='260')
    v-list
      v-list-tile(@click.stop='mini = !mini')
        v-list-tile-action
          v-icon menu
        v-list-tile-title {{ nombre }} {{ apellido }}
      v-list-tile(avatar='', tag='div')
        img(v-if='mini === false',src='../assets/logo2.png', with='40' ,height='40')
        img(v-if='mini === true',src='../assets/logomini.png', with='40' ,height='40', style='margin-left:15px;')
    v-layout.fill-height(tag='v-list', column='')
      v-divider
      v-list-tile.v-list-item(v-for='(link, i) in items.slice(0, 1)', active-class='primary', :to='link.link', avatar='', v-if='link.permiso === mostrar(link.permiso)')
        v-list-tile-action
          v-icon.mgl {{ link.icon }}
        v-list-tile-title(v-text='link.title')
      v-list-group.v-list-item(v-if='chf === true', prepend-icon='directions_car', no-action='').mtd
        template(v-slot:activator='').brd
            v-list-tile-title.txt Choferes
        v-list-tile.v-list-item(v-for='(link3, i) in items4', active-class='primary', :to='link3.link', avatar='', v-if='link3.permiso === mostrar(link3.permiso)')
          v-list-tile-action
            v-icon.mgl {{ link3.icon }}
          v-list-tile-title(v-text='link3.title')
      v-list-tile.v-list-item(v-for='(link, i) in items.slice(1)', active-class='primary', :to='link.link', avatar='', v-if='link.permiso === mostrar(link.permiso)')
        v-list-tile-action
          v-icon.mgl {{ link.icon }}
        v-list-tile-title(v-text='link.title')

      v-list-group.v-list-item(v-if='geo === true',prepend-icon='map', no-action='').mtd
        template(v-slot:activator='').brd
            v-list-tile-title.txt Geocerca
        v-list-tile.v-list-item(v-for='(gee, i) in item6', active-class='primary', :to='gee.link', avatar='', v-if='gee.permiso === mostrar(gee.permiso)')
          v-list-tile-action
            v-icon.mgl {{ gee.icon }}
          v-list-tile-title(v-text='gee.title')

      v-list-group.v-list-item(v-if='noti === true',prepend-icon='notifications', no-action='').mtd
        template(v-slot:activator='').brd
            v-list-tile-title.txt Notificaciones
        v-list-tile.v-list-item(v-for='(not, i) in item7', active-class='primary', :to='not.link', avatar='', v-if='not.permiso === mostrar(not.permiso)')
          v-list-tile-action
            v-icon.mgl {{ not.icon }}
          v-list-tile-title(v-text='not.title')

      v-list-group.v-list-item(v-if='rtr === true',prepend-icon='payment', no-action='').mtd
        template(v-slot:activator='').brd
            v-list-tile-title.txt Retiros
        v-list-tile.v-list-item(v-for='(listado, i) in item5', active-class='primary', :to='listado.link', avatar='', v-if='listado.permiso === mostrar(listado.permiso)')
          v-list-tile-action
            v-icon.mgl {{ listado.icon }}
          v-list-tile-title(v-text='listado.title')
      v-list-group.v-list-item(v-if='rpt === true',prepend-icon='assessment', no-action='').mtd
        template(v-slot:activator='').brd
            v-list-tile-title.txt Reportes
        v-list-tile.v-list-item(v-for='(link1, i) in items2', active-class='primary', :to='link1.link', avatar='', v-if='link1.permiso === mostrar(link1.permiso)')
          v-list-tile-action
            v-icon.mgl {{ link1.icon }}
          v-list-tile-title(v-text='link1.title')
      v-list-group.v-list-item(v-if='cfg === true',prepend-icon='settings', no-action='').mtd
        template(v-slot:activator='').brd
            v-list-tile-title.txt Configuración
        v-list-tile.v-list-item(v-for='(link2, i) in items3', active-class='primary', :to='link2.link', avatar='', v-if='link2.permiso === mostrar(link2.permiso)')
          v-list-tile-action
            v-icon.mgl {{ link2.icon }}
          v-list-tile-title(v-text='link2.title')
      v-list-tile.v-list-item(active-class='primary', @click='logout' ,avatar='')
        v-list-tile-action
          v-icon.mgl lock_open
        v-list-tile-title Cerrar de sesión
</template>

<script>
export default {
  name: "mHeader",
  data: () => ({
    chf: false,
    geo: false,
    rtr: false,
    rpt: false,
    cfg: false,
    noti: false,
    nombre: "",
    apellido: "",
    drawer: true,
    inputValue: true,
    mini: true,
    image:
      "https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg",
    item7: [
      {
        icon: "send",
        title: "Enviar Notificación",
        permiso: "Notificaciones",
        link: "/notificaciones",
        requiresAuth: true
      },
      {
        icon: "assignment",
        title: "Historial",
        link: "/historial",
        permiso: "Historial de Notificaciones",
        requiresAuth: true
      }
    ],
    item6: [
      {
        icon: "add_location",
        title: "Crear Zonas",
        permiso: "Geocerca",
        link: "/geocerca",
        requiresAuth: true
      },
      {
        icon: "streetview",
        title: "Crear Rutas",
        link: "/ruta",
        permiso: "Rutas entre Geocercas",
        requiresAuth: true
      }
    ],
    item5: [
      {
        icon: "account_balance",
        title: "Balance",
        link: "/retiros",
        permiso: "Balance",
        requiresAuth: true
      },
      {
        icon: "business_center",
        title: "Adm. de Retiros",
        link: "/admretiros",
        permiso: "Adm. de Retiros",
        requiresAuth: true
      }
    ],
    items4: [
      {
        icon: "description",
        title: "Lista",
        link: "/choferes",
        permiso: "Lista de Choferes",
        requiresAuth: true
      },
      {
        icon: "network_check",
        title: "Adm. de Choferes",
        permiso: "Adm. de Choferes",
        link: "/admchoferes",
        requiresAuth: true
      }
    ],
    items3: [
      {
        icon: "build",
        title: "Basicas",
        permiso: "Configuraciones Basicas",
        link: "/settings",
        requiresAuth: true
      },
      {
        icon: "description",
        title: "Conceptos",
        permiso: "Configuración de Conceptos",
        link: "/concepto",
        requiresAuth: true
      }
    ],
    items2: [
      {
        icon: "swap_horizontal_circle",
        title: "Reservas",
        permiso: "Reporte de Reservas",
        link: "/reserva",
        requiresAuth: true
      },
      {
        icon: "swap_horiz",
        title: "Transacciones",
        permiso: "Reporte de Transacciones",
        link: "/transacciones",
        requiresAuth: true
      },
      {
        icon: "attach_money",
        title: "Pagos",
        permiso: "Reporte de Pagos",
        link: "/rpagos",
        requiresAuth: true
      }
    ],
    items: [
      {
        icon: "poll",
        title: "Dashboard",
        permiso: "Dashboard",
        link: "/dashboard",
        requiresAuth: true
      },
      {
        icon: "group",
        title: "Clientes",
        permiso: "Clientes",
        link: "/dispatchers",
        requiresAuth: true
      },
      {
        icon: "monetization_on",
        title: "Adm. de Pagos",
        permiso: "Adm. de Pagos",
        link: "/payment",
        requiresAuth: true
      },
      // {
      //   icon: "local_offer",
      //   title: "Promociones",
      //   link: "/promociones",
      //   requiresAuth: true
      // },
      {
        icon: "my_location",
        title: "Seguimiento",
        permiso: "Seguimiento",
        link: "/seguimiento",
        requiresAuth: true
      },
      {
        icon: "star_half",
        title: "Extras",
        permiso: "Crear Extras",
        link: "/crearextras",
        requiresAuth: true
      },
      {
        icon: "import_contacts",
        title: "Consultas",
        link: "/consultas",
        requiresAuth: true
      },
      {
        icon: "add_to_queue",
        title: "Permisos",
        permiso: "Asignación de Permisos",
        link: "/permisos",
        requiresAuth: true
      },
      {
        icon: "insert_comment",
        title: "Comentarios",
        permiso: "Comentarios",
        link: "/comentarios",
        requiresAuth: true
      },
      {
        icon: "cached",
        title: "Devoluciones",
        permiso: "Devoluciones",
        link: "/devoluciones",
        requiresAuth: true
      }
    ]
  }),
  created() {
    if (this.$store.state.usuario) {
      this.nombre = this.$store.state.usuario.nombre;
      this.apellido = this.$store.state.usuario.apellido;
    }
    if (this.$store.state.usuario.permisos) {
      for (let i = 0; i < this.$store.state.usuario.permisos.length; i++) {
        if (
          this.$store.state.usuario.permisos[i].ruta ===
            this.items4[0].permiso ||
          this.$store.state.usuario.permisos[i].ruta === this.items4[1].permiso
        ) {
          this.chf = true;
        }
      }
    }
    if (this.$store.state.usuario.permisos) {
      for (let i = 0; i < this.$store.state.usuario.permisos.length; i++) {
        if (
          this.$store.state.usuario.permisos[i].ruta ===
            this.item5[0].permiso ||
          this.$store.state.usuario.permisos[i].ruta === this.item5[1].permiso
        ) {
          this.rtr = true;
        }
      }
    }
    if (this.$store.state.usuario.permisos) {
      for (let i = 0; i < this.$store.state.usuario.permisos.length; i++) {
        if (
          this.$store.state.usuario.permisos[i].ruta ===
            this.items2[0].permiso ||
          this.$store.state.usuario.permisos[i].ruta ===
            this.items2[1].permiso ||
          this.$store.state.usuario.permisos[i].ruta === this.items2[2].permiso
        ) {
          this.rpt = true;
        }
      }
    }
    if (this.$store.state.usuario.permisos) {
      for (let i = 0; i < this.$store.state.usuario.permisos.length; i++) {
        if (
          this.$store.state.usuario.permisos[i].ruta ===
            this.items3[0].permiso ||
          this.$store.state.usuario.permisos[i].ruta === this.items3[1].permiso
        ) {
          this.cfg = true;
        }
      }
    }
    if (this.$store.state.usuario.permisos) {
      for (let i = 0; i < this.$store.state.usuario.permisos.length; i++) {
        if (
          this.$store.state.usuario.permisos[i].ruta ===
            this.item6[0].permiso ||
          this.$store.state.usuario.permisos[i].ruta === this.item6[1].permiso
        ) {
          this.geo = true;
        }
      }
    }
    if (this.$store.state.usuario.permisos) {
      for (let i = 0; i < this.$store.state.usuario.permisos.length; i++) {
        if (
          this.$store.state.usuario.permisos[i].ruta ===
            this.item7[0].permiso ||
          this.$store.state.usuario.permisos[i].ruta === this.item7[1].permiso
        ) {
          this.noti = true;
        }
      }
    }
    // this.$store.commit("load", "");
    // this.sesion = this.$store.state.usuario;
  },
  computed: {
    login() {
      return this.$store.state.isUserLoggedIn;
    }
  },
  methods: {
    mostrar(item) {
      if (this.$store.state.usuario.permisos) {
        for (let i = 0; i < this.$store.state.usuario.permisos.length; i++) {
          if (this.$store.state.usuario.permisos[i].ruta === item) {
            return this.$store.state.usuario.permisos[i].ruta;
          }
        }
      }
    },
    showMenu(item) {
      if (this.$store.state.isUserLoggedIn && item.requiresAuth) {
        return true;
      } else if (!item.requiresAuth && !this.$store.state.isUserLoggedIn) {
        return true;
      }
      return false;
    },
    logout() {
      this.$store.dispatch("logout");
      this.$cookies.set("token", [], "5D", "");
      window.location.href = "/";
    }
  }
};
</script>
<style lang="scss">
#app-drawer {
  .v-list__tile {
    border-radius: 4px;

    &--buy {
      margin-top: auto;
      margin-bottom: 17px;
    }
  }

  .v-image__image--contain {
    top: 9px;
    height: 60%;
  }
  .fill-height {
    height: auto !important;
  }

  .search-input {
    margin-bottom: 30px !important;
    padding-left: 15px;
    padding-right: 15px;
  }

  .primary--text {
    color: white !important;
    caret-color: white !important;
  }
  .txt {
    height: 48px !important;
    font-size: 14px !important;
    font-weight: 300;
    padding: 9px;
    margin-left: -3px;
  }
  .brd {
    border-radius: 5px;
  }
  .v-list__group__header {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    cursor: pointer;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    list-style-type: none;
    border-radius: 5px;
  }
  .mtd {
    margin-left: 12px;
    margin-right: 6px;
  }
  .mgl {
    margin-left: -4px;
  }
}
</style>
