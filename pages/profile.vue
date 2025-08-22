<script setup lang="ts">

const config = useRuntimeConfig();
const auth = useAuthStore();
const toast = useToast();

const confirmModal = ref<boolean>(false);

if (!auth.isAuthenticated) {
    toast.add({
        title: 'Please log in to access this page !'
    });
    navigateTo('/login');
}

function deleteProfile() {
    $fetch(config.public.baseApiUrl + '/users', {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + auth.token
        },
    }).then(() => {
        auth.logout()
    })
}

</script>

<template>
    <UContainer>
        <UPage>
            <template #left><UPageAside/></template>
            <UPageBody>
                <UCard>
                    <template #header>
                        {{ auth.user?.name }}
                    </template>

                    Email : {{ auth.user?.email }}

                    <template #footer>
                        <UButton label="Delete account" color="error" variant="soft" @click="confirmModal = true" />
                    </template>
                </UCard>
                <AppConfirmModal v-model="confirmModal" @confirm="deleteProfile()" />
            </UPageBody>
            <template #right><UPageAside/></template>
        </UPage>
    </UContainer>
</template>