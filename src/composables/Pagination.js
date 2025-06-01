// usePagination.js
import { ref } from 'vue'
import { Loading } from 'quasar'

export default function Pagination(api, initialParams = {}) {
  const rows = ref([])
  const filter = ref('')
  const lastPage = ref(1)
  const url = ref(initialParams.url || '')

  const pagination = ref({
    sortBy: initialParams.sortBy,
    descending: initialParams.descending,
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 0,
  })

  const fetchData = async (extraParams) => {
    

    const { page, rowsPerPage, sortBy, descending } = pagination.value

    try {
      Loading.show()

      const response = await api.get(url.value, {
        params: {
          page,
          per_page: rowsPerPage,
          sortBy,
          descending: descending ? 'desc' : 'asc',
          search: filter.value,
          ...extraParams
        }
      })
      rows.value = response.data.data
      lastPage.value = response.data.last_page
      pagination.value.rowsNumber = response.data.total // ESSENCIAL para a paginação funcionar corretamente
    } catch (err) {
      console.error('Erro ao buscar dados:', err)
      Loading.hide()
    } finally {
      Loading.hide()
    }
  }

  const onRequest = (params, extraParams) => {
    pagination.value = { ...pagination.value, ...params.pagination }
    fetchData(extraParams)
  }

  const onFilterChange = () => {
    pagination.value.page = 1
    onRequest({ pagination: pagination.value })
  }

  return {
    rows,
    filter,
    pagination,
    lastPage,
    fetchData,
    onRequest,
    onFilterChange
  }
}
