<script setup lang="ts">
import { radioItems } from '~/constants/radioItems.const';
import { URLinterface, URLPage, URLParams, URLsearch } from '~/constants/urlInterface.const';
import type { UniformedDataType } from '~/types/uniformedCard.type';

const radioValue = ref<keyof typeof URLinterface>('pokemon');
const searchCardInput = ref<string>('');
const searchCard = ref<string>('');
const openModal = ref<boolean>(false);
const currentCard = ref<UniformedDataType>();
const page = ref<number>(0);
const total = ref<number>(0);
const error = ref<string | null>(null);

const url = computed(() => `${URLinterface[radioValue.value]}?${URLParams[radioValue.value]}&${URLPage[radioValue.value](page.value)}${searchCard.value && `&${URLsearch[radioValue.value](searchCard.value)}`}`);

const { data, pending, execute } = useFetch(() => url.value, {
	method: 'get',
    immediate: false,
	watch: false,
	transform: (input) => transformCardsUtils(radioValue.value!, (input as any).data ?? (input as any).cards),
	onResponse: ({ response }) => {
		if (response.ok) {
			if (radioValue.value === 'pokemon') {
				total.value = response._data.totalCount;
			} else if (radioValue.value === 'yugioh') {
				total.value = response._data.meta.total_rows;
			}
		}
	},
	onResponseError: () => {
		error.value = "Your card was not found... Please check the typo."
	}
})

onBeforeMount(() => {
    pending.value = false;
})

function startSearch() {
	error.value = null;
	searchCard.value = searchCardInput.value;
	if (page.value !== 1) {
		page.value = 1;
	} else {
		execute()
	}
}

watch(page, () => execute())

function viewCard(card: UniformedDataType) {
	currentCard.value = card;
	openModal.value = true;
}

</script>

<template>
    <UContainer>
		<UPage>
			<template #left>
				<UPageAside>
					<URadioGroup
						legend="Series"
						variant="card"
						indicator="end"
						:items="radioItems"
						v-model="radioValue"
					/>
					<USeparator class="my-4" />
					<UInput class="mb-4" icon="i-lucide-search" size="md" variant="outline" v-model="searchCardInput" placeholder="Search..." />
					<UButton
						@click="startSearch()"
						:loading="pending"
						:disabled="!radioValue"
						icon="i-lucide-search"
						size="md"
						color="primary"
						variant="solid"
						label="Chercher"
						class="w-full"
					/>
				</UPageAside>
			</template>
			<UPageBody>
				<UError v-if="error"
					:error="{
						statusMessage: 'Oh Snap !',
						message: error,
					}

				">
					<template #links>
						{{ undefined }}
					</template>	
				</UError>
				<h1 class="w-full text-center" v-else-if="!data && !pending">Commencez la recherche avec le menu pour avoir un résultat !</h1>
				<UPageGrid class="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
					<UPageCard
						v-if="pending"
						v-for="i in 25"
						:key="i"
						spotlight
					>
						<USkeleton class="h-48" />
						<USkeleton class="h-4" />
					</UPageCard>
					<UPageCard
						v-else
						v-for="(card, index) in data"
						:key="index"
						orientation="vertical"
						class="cursor-pointer"
						reverse
						spotlight
						:title="card.name"
						@click="viewCard(card)"
					>
						<img :src="card.images.small" :alt="`${card.id}`" class="w-full" />
					</UPageCard>
				</UPageGrid>
				
				<UPagination v-if="data" :disabled="pending" v-model:page="page" :items-per-page="25" :total="total" variant="subtle" class="justify-items-center" />

				<AppCardModal v-model="openModal" :card="currentCard" />
				
			</UPageBody>
			<template #right>
				<UPageAside />
			</template>
		</UPage>
    </UContainer>
</template>