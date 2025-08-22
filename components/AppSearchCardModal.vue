<script setup lang="ts">
import { radioItems } from '~/constants/radioItems.const';
import { URLinterface, URLPage, URLParams, URLsearch } from '~/constants/urlInterface.const';
import type { UniformedDataType } from '~/types/uniformedCard.type';

const config = useRuntimeConfig();
const auth = useAuthStore();

const isOpen = defineModel({ default: false });

const type = ref<keyof typeof URLinterface>('pokemon');
const searchCard = ref<string>('');
const searchCardInput = ref<string>('');
const url = computed(() => `${URLinterface[type.value]}?${URLParams[type.value]}&${URLPage[type.value](1)}&${searchCard.value && `&${URLsearch[type.value](searchCard.value)}`}`);
const error = ref<string | null>(null);

const cardToSave = ref<UniformedDataType>();

const body = computed(() => ({
    code: cardToSave.value?.id,
    name: cardToSave.value?.name,
    type: type.value,
    quantity: 1,
    image: cardToSave.value?.images.small,
}))

const { data, pending, execute } = useFetch(() => url.value, {
	method: 'get',
    immediate: false,
	watch: false,
	transform: (input) => transformCardsUtils(type.value!, (input as any).data ?? (input as any).cards),
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
    execute()
}

function saveCardToCollection(cardData: UniformedDataType) {
    cardToSave.value = cardData;
    $fetch(config.public.baseApiUrl + '/cards', {
        method: 'POST',
        body: body.value,
        headers: {
            'Authorization': 'Bearer ' + auth.token,
        }
    }).then(() => isOpen.value = false)
    .catch(console.error);
}

</script>

<template>
    <UModal v-model:open="isOpen" title="Add a card">
        <template #body>
            <div class="grid justify-items-center">
                <URadioGroup class="mb-4" orientation="horizontal" v-model="type" :items="radioItems" />
                <UButtonGroup class="mb-4">
                    <UInput icon="i-lucide-search" size="md" variant="outline" v-model="searchCardInput" placeholder="Search..." :loading="pending" />
                    <UButton icon="i-lucide-search" label="Search" @click="startSearch" :loading="pending" />
                </UButtonGroup>
            </div>
    
            <USeparator class="mb-4" />

            <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <UPageCard
                    v-for="(card, index) in data"
                    :key="index"
                    orientation="vertical"
                    class="cursor-pointer"
                    reverse
                    spotlight
                    :title="card.name"
                    @click="saveCardToCollection(card)"
                >
                    <img :src="card.images.small" :alt="`${card.id}`" class="w-full" />
                </UPageCard>
            </div>
        </template>
    </UModal>
</template>