<template>

	<q-page padding>

    <q-toolbar class="bg-secondary text-white">
      <q-avatar>
        <q-icon name="public" size="md" />
      </q-avatar>
      <q-toolbar-title>
       Lista de licitações
      </q-toolbar-title>
    </q-toolbar>

		<div class="q-pa-lg shadow-1">
			<q-table card-class="bg-grey-1 text-brown" table-class="text-grey-8" table-header-class="text-black" flat
				bordered :rows="rows" :columns="columns" row-key="id" :pagination="pagination"
				:rows-per-page-options="[]" no-data-label="Nenhum registro encontrado"
				@request="onRequest">

				<!-- Campo de busca -->
				<template v-slot:top>
					<div class="row q-col-gutter-md items-center full-width">
						<div class="col">
						<q-input
							v-model="codigoUasg"
							debounce="300"
							color="secondary"
							bg-color="white"
							square
							outlined
							dense
							label="Buscar Código UASG"
							@update:model-value="onFilterChange"
						>
							<template v-slot:append>
							<q-icon name="search" />
							</template>
						</q-input>
						</div>

						<div class="col">
						<q-input
							v-model="numeroPregao"
							debounce="300"
							color="secondary"
							bg-color="white"
							square
							outlined
							dense
							label="Buscar Número Pregão"
							@update:model-value="onFilterChange"
						>
							<template v-slot:append>
							<q-icon name="search" />
							</template>
						</q-input>
						</div>
					</div>
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
						@update:model-value="val => {
							pagination.page = val
							onRequest({ pagination: { ...pagination } })
						}"
						/>
					</div>
				</template>

				<template v-slot:body-cell-visualizada="props">
				<q-td :props="props">
					<q-checkbox
					v-model="props.row.visualizada"
					@update:model-value="val => marcarComoVisualizado(props.row.id, val)"
					/>
				</q-td>
				</template>
			</q-table>
		</div>
	</q-page>

</template>

<script setup>

import { api } from 'src/boot/axios';
import { Loading } from 'quasar';
import { computed, onMounted } from 'vue';
import mensagemNotify from 'src/composables/MensagemNotify';
import Pagination from 'src/composables/Pagination';

const mensagem = mensagemNotify();

const columns = computed(() => [
	{ name: 'visualizada', label: '✔️', field: 'visualizada', align: 'center' },
	{ name: 'id', label: 'Id', field: 'id', align: 'left', },
	{ name: 'codigo_uasg', label: 'Código UASG', field: 'codigo_uasg', align: 'left', },
	{ name: 'numero_pregao', label: 'Pregão', field: 'numero_pregao', align: 'left', },
	{ name: 'objeto', label: 'Objeto', field: 'objeto', align: 'left', },
	{ name: 'data_proposta', label: 'Data Proposta', field: 'data_proposta', align: 'left', },
]);

 // Passando o parâmetro sortBy ao inicializar o composable
 const { rows, codigoUasg, numeroPregao, pagination, onRequest, onFilterChange } = Pagination(api, {
  sortBy: 'nome',
  descending: false,
  url: 'licitacao',
})

async function marcarComoVisualizado(id, visualizada) {
  try {
    Loading.show()
	const response = await api.put(`licitacao/${id}/visualizada`, { visualizada })

	// Atualiza a linha manualmente se necessário:
    const row = rows.value.find(r => r.id === id);
    if (row) row.visualizada = response.data.data;
	Loading.hide()
    mensagem.mensagemPositive(response.data.message);

  } catch (error) {
		const response = error.response;
		mensagem.mensagemNegative(response?.data?.message || 'Erro inexperado!');
		Loading.hide()
	} finally {
		Loading.hide();
	}
}

onMounted(() => {
	onRequest({ pagination: pagination.value });
});
</script>
