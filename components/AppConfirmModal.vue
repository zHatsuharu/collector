<script setup lang="ts">

const isOpen = defineModel<boolean>({default: false});
const emit = defineEmits({ confirm: () => true })

</script>

<template>
    <UModal :open="isOpen" title="Are you sure ?">
        <template #body>
            <div class="w-full flex justify-around">
                <UButton variant="soft" color="error" label="Confirm" @click="$emit('confirm')" />
                <UButton variant="outline" label="Cancel" @click="isOpen = false" />
            </div>
        </template>
    </UModal>
</template>