<script setup lang="ts">
import { collectionAccordionItems } from '~/constants/collectionAccordion.const';
import type { Card } from '~/types/card.type';

const auth = useAuthStore();
const toast = useToast();
const config = useRuntimeConfig();

if (!auth.isAuthenticated) {
    toast.add({
        title: 'Please log in to access this page !'
    });
    navigateTo('/login');
}

const modalOpen = ref<boolean>(false);
const confirmModal = ref<boolean>(false);
const cardToDelete = ref<Card>();

const { refresh } = useFetch(config.public.baseApiUrl + '/cards', {
    method: 'get',
    headers: {
        'Authorization': 'Bearer ' + auth.token,
    },
    watch: false,
    onRequest: () => {
        collectionAccordionItems.value.forEach((item) => item.cards = []);
    },
    onResponse: ({ response }) => {
        if (response.ok) {
            const d = response._data;

            d.forEach((c: Card) => {
                collectionAccordionItems.value.find((item) => item.type === c.type)?.cards.push(c)
            });
        }
    }
})

function saveCard(card: Card) {
    $fetch(config.public.baseApiUrl + '/cards', {
        method: 'PATCH',
        headers: {
            'Authorization': 'Bearer ' + auth.token,
        },
        body: {
            code: card.code,
            quantity: card.quantity,
        }
    }).then(() => {
        refresh()
    })
}

function prepareDelete(card: Card) {
    cardToDelete.value = card;
    confirmModal.value = true;
}

function deleteCard() {
    confirmModal.value = false;
    $fetch(config.public.baseApiUrl + '/cards/' + cardToDelete.value?.code, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + auth.token,
        },
    }).then(() => {
        refresh()
    })
    cardToDelete.value = undefined;
}

</script>

<template>
    <UContainer>
        <UPage>
            <template #left>
                <UPageAside />
            </template>
            <div class="flex my-5 justify-between">
                <h1 class="text-4xl">My collection</h1>
                <UButton icon="i-material-symbols-add-2-rounded" variant="soft" label="Add card" @click="modalOpen = true" />
            </div>
            <USeparator />
            <UPageBody>
                <UAccordion type="multiple" :items="collectionAccordionItems">
                    <template #body="{ item }">
                        <div v-if="item.cards.length <= 0">You don't have any card in your {{ item.label }} collection... Add one !</div>
                        <UPageList class="gap-5" v-else>
                            <UPageCard
                                v-for="(card, index) in item.cards"
                                :key="index"
                                :title="card.name"
                                orientation="horizontal"
                                reverse
                                variant="soft"
                            >
                                <img :src="card.image" :alt="card.code" class="w-25" />
                                <template #description>
                                    Quantity : <UInputNumber :min="0" v-model="card.quantity" />
                                </template>
                                <template #footer>
                                    <UButtonGroup>
                                        <UButton label="Save" icon="i-material-symbols-save-outline" variant="soft" @click="saveCard(card)" />
                                        <UButton label="Delete" icon="i-material-symbols-delete-outline" color="error" variant="soft" @click="prepareDelete(card)" />
                                    </UButtonGroup>
                                </template>
                            </UPageCard>
                        </UPageList>
                    </template>
                </UAccordion>
            </UPageBody>
            
            <AppSearchCardModal v-model="modalOpen"/>
            <AppConfirmModal v-model="confirmModal" @confirm="deleteCard()" />
            
            <template #right>
                <UPageAside />
            </template>
        </UPage>
    </UContainer>
</template>