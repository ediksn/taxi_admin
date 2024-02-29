import api from '@/services/api'
const auth = {
    headers: {Authorization:'JWT ' + localStorage.getItem('token')} 
}
export default {
  getUsuarios (params = '') {
    return api().get('usuario/')
  },
  postUsuarios (data) {
    return api().post('usuario', data, {emulateJSON: true})
  },
  validarUsuario (data) {
    return api().get('usuario/validar/' + data)
  }
}
