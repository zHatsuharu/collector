<script setup lang="ts">
import { UButton } from '#components';
import { userDropdownItems } from '~/constants/userDropdownItems.const';

const auth = useAuthStore();
</script>

<template>
    <UHeader title="Collector" :toggle="false">
        <template #right>            
            <UColorModeButton variant="outline" />

            <USeparator orientation="vertical" class="mx-1" />

            <UButtonGroup v-if="!auth.isAuthenticated">
                <UButton variant="outline" to="/login">Login</UButton>
                <UButton to="/register">Register</UButton>
            </UButtonGroup>

            <UDropdownMenu arrow :items="userDropdownItems" class="cursor-pointer" v-else>
                <UUser
                    :name="auth.user?.name"
                    :avatar="{
                        src: 'https://github.com/nuxt-ui-pro.png'
                    }"
                />
            </UDropdownMenu>
        </template>
    </UHeader>
    <UMain>
        <slot />
    </UMain>
    <UFooter />
</template>