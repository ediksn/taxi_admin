import Vue from "vue";
import Router from "vue-router";
import store from '@/store/'
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Dispatchers from "./views/Dispatchers.vue";
import Choferes from "./views/Choferes.vue";
import Reserva from "./views/Reserva.vue";
import Api from "@/services/methods";
import LoginApi from '@/services/login'
import Payment from "./views/Payment.vue";
import Settings from "./views/Settings.vue";
import Seguimiento from "./views/Seguimiento.vue";
import CrearExtras from "./views/CrearExtras.vue";
import Dashboard from "./views/Dashboard.vue";
// import Promociones from "./views/Promociones.vue";
import Retiros from "./views/Retiros.vue";
import rPagos from "./views/rPagos.vue";
import Concepto from "./views/Concepto.vue";
import Transacciones from "./views/Transacciones.vue";
import AdmChoferes from "./views/AdmChoferes.vue";
import AdmRetiros from "./views/AdmRetiros.vue";
import Permisos from "./views/Permisos.vue";
import SinPermiso from "./views/SinPermiso.vue";
import Geocerca from "./views/Geocerca.vue";
import Comentarios from "./views/Comentarios.vue";
import Notificaciones from "./views/Notificaciones.vue";
import Devoluciones from "./views/Devoluciones.vue";
import Ruta from "./views/Ruta.vue";
import Historial from "./views/Historial.vue";
import Consultas from "./views/Consultas.vue";
import { Loading } from "element-ui";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: {
        isPublic: false
      }
    },
    {
      path: "/",
      name: "login",
      component: Login,
      meta: {
        isPublic: true,
        isLog: true
      }
    },
    {
      path: "/dispatchers",
      name: "dispatchers",
      component: Dispatchers,
      meta: {
        isPublic: false
      }
    },
    {
      path: "/choferes",
      name: "choferes",
      component: Choferes,
      meta: {
        isPublic: false
      }
    },
    {
      path: "/admchoferes",
      name: "admchoferes",
      component: AdmChoferes,
      meta: {
        isPublic: false
      }
    },
    {
      path: "/reserva",
      name: "reserva",
      component: Reserva,
      meta: {
        isPublic: false
      }
    },
    {
      path: "/transacciones",
      name: "transacciones",
      component: Transacciones,
      meta: {
        isPublic: false
      }
    },
    {
      path: "/payment",
      name: "payment",
      component: Payment,
      meta: {
        isPublic: false
      }
    },
    {
      path: "/seguimiento",
      name: "seguimmiento",
      component: Seguimiento,
      meta: {
        isPublic: false
      }
    },
    {
      path: "/geocerca",
      name: "geocerca",
      component: Geocerca,
      meta: {
        isPublic: false
      }
    },
    {
      path: "/comentarios",
      name: "comentarios",
      component: Comentarios,
      meta: {
        isPublic: false
      }
    },
    {
      path: "/consultas",
      name: "consultas",
      component: Consultas,
      meta: {
        isPublic: false
      }
    },
    {
      path: "/rpagos",
      name: "rpagos",
      component: rPagos,
      meta: {
        isPublic: false
      }
    },
    {
      path: "/crearextras",
      name: "crearextras",
      component: CrearExtras,
      meta: {
        isPublic: false
      }
    },
    {
      path: "/notificaciones",
      name: "notificaciones",
      component: Notificaciones,
      meta: {
        isPublic: false
      }
    },
    {
      path: "/sinpermiso",
      name: "sinpermiso",
      component: SinPermiso,
      meta: {
        isPublic: false
      }
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: {
        isPublic: false
      }
    },
    {
      path: "/permisos",
      name: "permisos",
      component: Permisos,
      meta: {
        isPublic: false
      }
    },
    // {
    //   path: "/promociones",
    //   name: "promociones",
    //   component: Promociones,
    //   meta: {
    //     isPublic: false
    //   }
    // },
    {
      path: "/retiros",
      name: "retiros",
      component: Retiros,
      meta: {
        isPublic: false
      }
    },
    {
      path: "/devoluciones",
      name: "devoluciones",
      component: Devoluciones,
      meta: {
        isPublic: false
      }
    },
    {
      path: "/historial",
      name: "historial",
      component: Historial,
      meta: {
        isPublic: false
      }
    },
    {
      path: "/ruta",
      name: "ruta",
      component: Ruta,
      meta: {
        isPublic: false
      }
    },
    {
      path: "/admretiros",
      name: "admretiros",
      component: AdmRetiros,
      meta: {
        isPublic: false
      }
    },
    {
      path: "/concepto",
      name: "concepto",
      component: Concepto,
      meta: {
        isPublic: false
      }
    },
    {
      path: "/settings",
      name: "settings",
      component: Settings,
      meta: {
        isPublic: false
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.isPublic)
  if(requiresAuth === false) {
  LoginApi
  .refreshtoken()
      .then(res => {
        store.dispatch('setuser', res.data.usuario)
        if(to.path == '/devoluciones'){
          let bols = false;
          let bols2 = false;
          let loadingInstance = Loading.service({ fullscreen: true });
          if (store.state.usuario.permisos) {
            for (let i = 0; i < store.state.usuario.permisos.length; i++) {
              if (store.state.usuario.permisos[i].ruta === "Devoluciones") {
                bols = true;
                for (
                  let j = 0;
                  j < store.state.usuario.permisos[i].accion.length;
                  j++
                ) {
                  if (store.state.usuario.permisos[i].accion[j] === "Ver") {
                    bols2 = true;
                    loadingInstance.close();
                    next()
                  }
                }
              }
            }
          }
          if (bols === false || bols2 === false) {
            loadingInstance.close();
            // window.location.href = "/sinpermiso";
            next('/sinpermiso')
          }
        }
        if(to.path == '/choferes'){
          let bols = false;
          let bols2 = false;
          let loadingInstance = Loading.service({ fullscreen: true });
          if (store.state.usuario.permisos) {
            for (let i = 0; i < store.state.usuario.permisos.length; i++) {
              if (store.state.usuario.permisos[i].ruta === "Lista de Choferes") {
                bols = true;
                for (
                  let j = 0;
                  j < store.state.usuario.permisos[i].accion.length;
                  j++
                ) {
                  if (store.state.usuario.permisos[i].accion[j] === "Ver") {
                    bols2 = true;
                    loadingInstance.close();
                    next()
                  }
                }
              }
            }
          }
          if (bols === false || bols2 === false) {
            loadingInstance.close();
            // window.location.href = "/sinpermiso";
            next('/sinpermiso')
          }
        }
        if(to.path == '/admchoferes'){
          let bols = false;
          let bols2 = false;
          let loadingInstance = Loading.service({ fullscreen: true });
          if (store.state.usuario.permisos) {
            for (let i = 0; i < store.state.usuario.permisos.length; i++) {
              if (store.state.usuario.permisos[i].ruta === "Adm. de Choferes") {
                bols = true;
                for (
                  let j = 0;
                  j < store.state.usuario.permisos[i].accion.length;
                  j++
                ) {
                  if (store.state.usuario.permisos[i].accion[j] === "Ver") {
                    bols2 = true;
                    loadingInstance.close();
                    next()
                  }
                }
              }
            }
          }
          if (bols === false || bols2 === false) {
            loadingInstance.close();
            // window.location.href = "/sinpermiso";
            next('/sinpermiso')
          }
        }
        if(to.path == '/dispatchers'){
          let bols = false;
          let bols2 = false;
          let loadingInstance = Loading.service({ fullscreen: true });
          if (store.state.usuario.permisos) {
            for (let i = 0; i < store.state.usuario.permisos.length; i++) {
              if (store.state.usuario.permisos[i].ruta === "Clientes") {
                bols = true;
                for (
                  let j = 0;
                  j < store.state.usuario.permisos[i].accion.length;
                  j++
                ) {
                  if (store.state.usuario.permisos[i].accion[j] === "Ver") {
                    bols2 = true;
                    loadingInstance.close();
                    next()
                  }
                }
              }
            }
          }
          if (bols === false || bols2 === false) {
            loadingInstance.close();
            // window.location.href = "/sinpermiso";
            next('/sinpermiso')
          }
        }
        if(to.path == '/payment'){
          let bols = false;
          let bols2 = false;
          let loadingInstance = Loading.service({ fullscreen: true });
          if (store.state.usuario.permisos) {
            for (let i = 0; i < store.state.usuario.permisos.length; i++) {
              if (store.state.usuario.permisos[i].ruta === "Adm. de Pagos") {
                bols = true;
                for (
                  let j = 0;
                  j < store.state.usuario.permisos[i].accion.length;
                  j++
                ) {
                  if (store.state.usuario.permisos[i].accion[j] === "Ver") {
                    bols2 = true;
                    loadingInstance.close();
                    next()
                  }
                }
              }
            }
          }
          if (bols === false || bols2 === false) {
            loadingInstance.close();
            // window.location.href = "/sinpermiso";
            next('/sinpermiso')
          }
        }
        if(to.path == '/seguimiento'){
          let bols = false;
          let bols2 = false;
          let loadingInstance = Loading.service({ fullscreen: true });
          if (store.state.usuario.permisos) {
            for (let i = 0; i < store.state.usuario.permisos.length; i++) {
              if (store.state.usuario.permisos[i].ruta === "Seguimiento") {
                bols = true;
                for (
                  let j = 0;
                  j < store.state.usuario.permisos[i].accion.length;
                  j++
                ) {
                  if (store.state.usuario.permisos[i].accion[j] === "Ver") {
                    bols2 = true;
                    loadingInstance.close();
                    next()
                  }
                }
              }
            }
          }
          if (bols === false || bols2 === false) {
            loadingInstance.close();
            // window.location.href = "/sinpermiso";
            next('/sinpermiso')
          }
        }
        if(to.path == '/crearextras'){
          let bols = false;
          let bols2 = false;
          let loadingInstance = Loading.service({ fullscreen: true });
          if (store.state.usuario.permisos) {
            for (let i = 0; i < store.state.usuario.permisos.length; i++) {
              if (store.state.usuario.permisos[i].ruta === "Crear Extras") {
                bols = true;
                for (
                  let j = 0;
                  j < store.state.usuario.permisos[i].accion.length;
                  j++
                ) {
                  if (store.state.usuario.permisos[i].accion[j] === "Ver") {
                    bols2 = true;
                    loadingInstance.close();
                    next()
                  }
                }
              }
            }
          }
          if (bols === false || bols2 === false) {
            loadingInstance.close();
            // window.location.href = "/sinpermiso";
            next('/sinpermiso')
          }
        }
        if(to.path == '/permisos'){
          let bols = false;
          let bols2 = false;
          let loadingInstance = Loading.service({ fullscreen: true });
          if (store.state.usuario.permisos) {
            for (let i = 0; i < store.state.usuario.permisos.length; i++) {
              if (store.state.usuario.permisos[i].ruta === "Asignación de Permisos") {
                bols = true;
                for (
                  let j = 0;
                  j < store.state.usuario.permisos[i].accion.length;
                  j++
                ) {
                  if (store.state.usuario.permisos[i].accion[j] === "Ver") {
                    bols2 = true;
                    loadingInstance.close();
                    next()
                  }
                }
              }
            }
          }
          if (bols === false || bols2 === false) {
            loadingInstance.close();
            // window.location.href = "/sinpermiso";
            next('/sinpermiso')
          }
        }
        if(to.path == '/retiros'){
          let bols = false;
          let bols2 = false;
          let loadingInstance = Loading.service({ fullscreen: true });
          if (store.state.usuario.permisos) {
            for (let i = 0; i < store.state.usuario.permisos.length; i++) {
              if (store.state.usuario.permisos[i].ruta === "Balance") {
                bols = true;
                for (
                  let j = 0;
                  j < store.state.usuario.permisos[i].accion.length;
                  j++
                ) {
                  if (store.state.usuario.permisos[i].accion[j] === "Ver") {
                    bols2 = true;
                    loadingInstance.close();
                    next()
                  }
                }
              }
            }
          }
          if (bols === false || bols2 === false) {
            loadingInstance.close();
            // window.location.href = "/sinpermiso";
            next('/sinpermiso')
          }
        }
        if(to.path == '/admretiros'){
          let bols = false;
          let bols2 = false;
          let loadingInstance = Loading.service({ fullscreen: true });
          if (store.state.usuario.permisos) {
            for (let i = 0; i < store.state.usuario.permisos.length; i++) {
              if (store.state.usuario.permisos[i].ruta === "Adm. de Retiros") {
                bols = true;
                for (
                  let j = 0;
                  j < store.state.usuario.permisos[i].accion.length;
                  j++
                ) {
                  if (store.state.usuario.permisos[i].accion[j] === "Ver") {
                    bols2 = true;
                    loadingInstance.close();
                    next()
                  }
                }
              }
            }
          }
          if (bols === false || bols2 === false) {
            loadingInstance.close();
            // window.location.href = "/sinpermiso";
            next('/sinpermiso')
          }
        }
        if(to.path == '/reserva'){
          let bols = false;
          let bols2 = false;
          let loadingInstance = Loading.service({ fullscreen: true });
          if (store.state.usuario.permisos) {
            for (let i = 0; i < store.state.usuario.permisos.length; i++) {
              if (store.state.usuario.permisos[i].ruta === "Reporte de Reservas") {
                bols = true;
                for (
                  let j = 0;
                  j < store.state.usuario.permisos[i].accion.length;
                  j++
                ) {
                  if (store.state.usuario.permisos[i].accion[j] === "Ver") {
                    bols2 = true;
                    loadingInstance.close();
                    next()
                  }
                }
              }
            }
          }
          if (bols === false || bols2 === false) {
            loadingInstance.close();
            // window.location.href = "/sinpermiso";
            next('/sinpermiso')
          }
        }
        if(to.path == '/transacciones'){
          let bols = false;
          let bols2 = false;
          let loadingInstance = Loading.service({ fullscreen: true });
          if (store.state.usuario.permisos) {
            for (let i = 0; i < store.state.usuario.permisos.length; i++) {
              if (store.state.usuario.permisos[i].ruta === "Reporte de Transacciones") {
                bols = true;
                for (
                  let j = 0;
                  j < store.state.usuario.permisos[i].accion.length;
                  j++
                ) {
                  if (store.state.usuario.permisos[i].accion[j] === "Ver") {
                    bols2 = true;
                    loadingInstance.close();
                    next()
                  }
                }
              }
            }
          }
          if (bols === false || bols2 === false) {
            loadingInstance.close();
            // window.location.href = "/sinpermiso";
            next('/sinpermiso')
          }
        }
        if(to.path == '/rpagos'){
          let bols = false;
          let bols2 = false;
          let loadingInstance = Loading.service({ fullscreen: true });
          if (store.state.usuario.permisos) {
            for (let i = 0; i < store.state.usuario.permisos.length; i++) {
              if (store.state.usuario.permisos[i].ruta === "Reporte de Pagos") {
                bols = true;
                for (
                  let j = 0;
                  j < store.state.usuario.permisos[i].accion.length;
                  j++
                ) {
                  if (store.state.usuario.permisos[i].accion[j] === "Ver") {
                    bols2 = true;
                    loadingInstance.close();
                    next()
                  }
                }
              }
            }
          }
          if (bols === false || bols2 === false) {
            loadingInstance.close();
            // window.location.href = "/sinpermiso";
            next('/sinpermiso')
          }
        }
        if(to.path == '/settings'){
          let bols = false;
          let bols2 = false;
          let loadingInstance = Loading.service({ fullscreen: true });
          if (store.state.usuario.permisos) {
            for (let i = 0; i < store.state.usuario.permisos.length; i++) {
              if (store.state.usuario.permisos[i].ruta === "Configuraciones Basicas") {
                bols = true;
                for (
                  let j = 0;
                  j < store.state.usuario.permisos[i].accion.length;
                  j++
                ) {
                  if (store.state.usuario.permisos[i].accion[j] === "Ver") {
                    bols2 = true;
                    loadingInstance.close();
                    next()
                  }
                }
              }
            }
          }
          if (bols === false || bols2 === false) {
            loadingInstance.close();
            // window.location.href = "/sinpermiso";
            next('/sinpermiso')
          }
        }
        if(to.path == '/concepto'){
          let bols = false;
          let bols2 = false;
          let loadingInstance = Loading.service({ fullscreen: true });
          if (store.state.usuario.permisos) {
            for (let i = 0; i < store.state.usuario.permisos.length; i++) {
              if (store.state.usuario.permisos[i].ruta === "Configuración de Conceptos") {
                bols = true;
                for (
                  let j = 0;
                  j < store.state.usuario.permisos[i].accion.length;
                  j++
                ) {
                  if (store.state.usuario.permisos[i].accion[j] === "Ver") {
                    bols2 = true;
                    loadingInstance.close();
                    next()
                  }
                }
              }
            }
          }
          if (bols === false || bols2 === false) {
            loadingInstance.close();
            // window.location.href = "/sinpermiso";
            next('/sinpermiso')
          }
        }
        if(to.path == '/dashboard'){
          let bols = false;
          let bols2 = false;
          let loadingInstance = Loading.service({ fullscreen: true });
          if (store.state.usuario.permisos) {
            for (let i = 0; i < store.state.usuario.permisos.length; i++) {
              if (store.state.usuario.permisos[i].ruta === "Dashboard") {
                bols = true;
                for (
                  let j = 0;
                  j < store.state.usuario.permisos[i].accion.length;
                  j++
                ) {
                  if (store.state.usuario.permisos[i].accion[j] === "Ver") {
                    bols2 = true;
                    loadingInstance.close();
                    next()
                  }
                }
              }
            }
          }
          if (bols === false || bols2 === false) {
            loadingInstance.close();
            // window.location.href = "/sinpermiso";
            next('/sinpermiso')
          }
        }
        if(to.path == '/geocerca'){
          let bols = false;
          let bols2 = false;
          let loadingInstance = Loading.service({ fullscreen: true });
          if (store.state.usuario.permisos) {
            for (let i = 0; i < store.state.usuario.permisos.length; i++) {
              if (store.state.usuario.permisos[i].ruta === "Geocerca") {
                bols = true;
                for (
                  let j = 0;
                  j < store.state.usuario.permisos[i].accion.length;
                  j++
                ) {
                  if (store.state.usuario.permisos[i].accion[j] === "Ver") {
                    bols2 = true;
                    loadingInstance.close();
                    next()
                  }
                }
              }
            }
          }
          if (bols === false || bols2 === false) {
            loadingInstance.close();
            // window.location.href = "/sinpermiso";
            next('/sinpermiso')
          }
        }
        if(to.path == '/comentarios'){
          let bols = false;
          let bols2 = false;
          let loadingInstance = Loading.service({ fullscreen: true });
          if (store.state.usuario.permisos) {
            for (let i = 0; i < store.state.usuario.permisos.length; i++) {
              if (store.state.usuario.permisos[i].ruta === "Comentarios") {
                bols = true;
                for (
                  let j = 0;
                  j < store.state.usuario.permisos[i].accion.length;
                  j++
                ) {
                  if (store.state.usuario.permisos[i].accion[j] === "Ver") {
                    bols2 = true;
                    loadingInstance.close();
                    next()
                  }
                }
              }
            }
          }
          if (bols === false || bols2 === false) {
            loadingInstance.close();
            // window.location.href = "/sinpermiso";
            next('/sinpermiso')
          }
        }
        if(to.path == '/notificaciones'){
          let bols = false;
          let bols2 = false;
          let loadingInstance = Loading.service({ fullscreen: true });
          if (store.state.usuario.permisos) {
            for (let i = 0; i < store.state.usuario.permisos.length; i++) {
              if (store.state.usuario.permisos[i].ruta === "Notificaciones") {
                bols = true;
                for (
                  let j = 0;
                  j < store.state.usuario.permisos[i].accion.length;
                  j++
                ) {
                  if (store.state.usuario.permisos[i].accion[j] === "Ver") {
                    bols2 = true;
                    loadingInstance.close();
                    next()
                  }
                }
              }
            }
          }
          if (bols === false || bols2 === false) {
            loadingInstance.close();
            // window.location.href = "/sinpermiso";
            next('/sinpermiso')
          }
        }
        if(to.path == '/ruta'){
          let bols = false;
          let bols2 = false;
          let loadingInstance = Loading.service({ fullscreen: true });
          if (store.state.usuario.permisos) {
            for (let i = 0; i < store.state.usuario.permisos.length; i++) {
              if (store.state.usuario.permisos[i].ruta === "Rutas entre Geocercas") {
                bols = true;
                for (
                  let j = 0;
                  j < store.state.usuario.permisos[i].accion.length;
                  j++
                ) {
                  if (store.state.usuario.permisos[i].accion[j] === "Ver") {
                    bols2 = true;
                    loadingInstance.close();
                    next()
                  }
                }
              }
            }
          }
          if (bols === false || bols2 === false) {
            loadingInstance.close();
            // window.location.href = "/sinpermiso";
            next('/sinpermiso')
          }
        }
        if(to.path == '/historial'){
          let bols = false;
          let bols2 = false;
          let loadingInstance = Loading.service({ fullscreen: true });
          if (store.state.usuario.permisos) {
            for (let i = 0; i < store.state.usuario.permisos.length; i++) {
              if (store.state.usuario.permisos[i].ruta === "Historial de Notificaciones") {
                bols = true;
                for (
                  let j = 0;
                  j < store.state.usuario.permisos[i].accion.length;
                  j++
                ) {
                  if (store.state.usuario.permisos[i].accion[j] === "Ver") {
                    bols2 = true;
                    loadingInstance.close();
                    next()
                  }
                }
              }
            }
          }
          if (bols === false || bols2 === false) {
            loadingInstance.close();
            // window.location.href = "/sinpermiso";
            next('/sinpermiso')
          }
        }
         next()
      })
      .catch(error => {
          next('/')
      })
  }else{
    if(to.path == '/'){
      LoginApi
      .refreshtoken()
        .then(res => {
          store.dispatch('setuser', res.data.usuario)
          
          next('/home')
        })
        .catch(error => {
            //next('/login')
        })
    }
    next()
  }
})

export default router