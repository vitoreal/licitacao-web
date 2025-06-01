import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { Notify } from 'quasar';


// TESTE
const api = axios.create({
	baseURL: 'http://localhost:8080/api/'
})

// Interceptador de requisição (opcional)
api.interceptors.request.use((config) => {
  // Ex: adicionar token de autenticação
  // config.headers.Authorization = `Bearer ${token}`
  return config
})

// Interceptador de resposta (opcional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Lidar com erros globalmente
    const statusCode = error.response?.status

	Notify.create({
		type: 'negative',
		message: `Erro ${statusCode}: ${error.response.data?.message || 'Erro desconhecido'}`
	})
    return Promise.reject(error)
  }
)

export default boot(({ app }) => {
  // Faz o Axios global via this.$axios e this.$api
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { axios, api }