<script setup lang="ts">
import type { UniformedDataType } from '~/types/uniformedCard.type';


const model = defineModel({ default: false });
const props = defineProps<{ card: UniformedDataType | undefined }>();

</script>

<template>

    <UModal v-if="props.card" v-model:open="model" :title="props.card.name">
        <template #body>
            <img :src="props.card.images.large" :alt="`${props.card.id}`" class="w-75 mx-auto" />
            <USeparator class="my-7" />
            <div class="grid relative grid-cols-2 grid-flow-col justify-items-center">
                <UButtonGroup size="xl">
                    <template v-if="props.card.prices.cardmarket">
                        <UBadge variant="outline" class="font-bold">Cardmarket</UBadge>
                        <UBadge trailing-icon="i-mdi-currency-eur" variant="outline">{{ props.card.prices.cardmarket.price }}</UBadge>
                        <UButton :to="props.card.prices.cardmarket.url" target="_blank" icon="i-mdi-cart-outline"></UButton>
                    </template>
                    <template v-else>
                        <UBadge variant="outline" color="error" class="font-bold">Cardmarket</UBadge>
                        <UBadge trailing-icon="i-mdi-currency-eur" color="error" variant="outline">--</UBadge>
                        <UButton disabled color="error" target="_blank" icon="i-mdi-cart-outline"></UButton>
                    </template>
                </UButtonGroup>
                <UButtonGroup size="xl">
                    <template v-if="props.card.prices.tcgplayer">
                        <UBadge variant="outline" class="font-bold">TCGPlayer</UBadge>
                        <UBadge icon="i-mdi-currency-usd" variant="outline">{{ props.card.prices.tcgplayer.price }}</UBadge>
                        <UButton :to="props.card.prices.tcgplayer.url" target="_blank" icon="i-mdi-cart-outline"></UButton>
                    </template>
                    <template v-else>
                        <UBadge variant="outline" color="error" class="font-bold">TCGPlayer</UBadge>
                        <UBadge icon="i-mdi-currency-usd" color="error" variant="outline"> -- </UBadge>
                        <UButton disabled color="error" target="_blank" icon="i-mdi-cart-outline"></UButton>
                    </template>
                </UButtonGroup>
            </div>
        </template>
    </UModal>

</template>