<template>

	<q-page padding>

    <q-toolbar class="bg-secondary text-white">
      <q-avatar>
        <q-icon name="category" size="md" />
      </q-avatar>
      <q-toolbar-title>
       Lista de licitações
      </q-toolbar-title>
    </q-toolbar>

		<div class="q-pa-lg shadow-1">
			<q-table card-class="bg-grey-1 text-brown" table-class="text-grey-8" table-header-class="text-black" flat
				bordered :rows="rows" :columns="columns" row-key="id" v-model:pagination="pagination"
				:rows-per-page-options="[]" no-data-label="Nenhum registro encontrado"
				@request="onRequest">

				<!-- Campo de busca -->
				<template v-slot:top>
					<q-space />
					<q-input v-model="filter" debounce="300" color="secondary" bg-color="white" square outlined dense
						label="Buscar" @update:model-value="onFilterChange">
						<template v-slot:append>
							<q-icon name="search" />
						</template>
					</q-input>
				</template>

				<template v-slot:body="props">
					<q-tr :props="props">
						<q-td key="nome" :props="props">
							{{ props.row.nome }}
						</q-td>
					</q-tr>
				</template>
				<template v-slot:bottom>
				<div class="row q-pt-sm col-12 justify-end">
					<q-pagination
					v-model="pagination.page"
					:max="Math.ceil(pagination.rowsNumber / pagination.rowsPerPage)"
					direction-links
					boundary-links
					icon-first="skip_previous"
					icon-last="skip_next"
					icon-prev="fast_rewind"
					icon-next="fast_forward"
					color="secondary"
					size="md"
					@update:model-value="onRequest({ pagination })"
					/>
				</div>
			</template>
			</q-table>
		</div>
	</q-page>

</template>

<script setup>
import { api } from 'src/boot/axios';
//import { useQuasar } from 'quasar';
import { computed, onMounted, ref } from 'vue';
//import mensagemNotify from 'src/composables/MensagemNotify';
import Pagination from 'src/composables/Pagination';

//const mensagem = mensagemNotify();
//const q$ = useQuasar();

const columns = computed(() => [
{ name: 'nome', label: 'Nome', field: 'nome', align: 'left', },
]);

 // Passando o parâmetro sortBy ao inicializar o composable
 const { rows, filter, pagination, onRequest, onFilterChange } = Pagination(api, {
  sortBy: 'nome',
  descending: false,
  url: 'categoria/listar',
})


onMounted(() => {
	// const extraParams = { tipo: 'ativo', categoria_id: 5 };
	const extraParams = ref({})
	onRequest({ pagination: pagination.value }, extraParams);
});
</script>
