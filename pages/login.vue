<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import * as z from 'zod'

const config = useRuntimeConfig();
const { isAuthenticated, saveToken, saveUser } = useAuthStore();
const toast = useToast();

const fields = [
    {
        name: 'email',
        type: 'text' as const,
        label: 'Email',
        require: true,
    },
    {
        name: 'password',
        type: 'password' as const,
        label: 'Password',
        require: true
    },
]

const schema = z.object({
    email: z.email('Invalid email'),
    password: z.string(),
})

type Schema = z.output<typeof schema>;

let body = ref<Schema>({
    email: '',
    password: '',
});

const { pending, execute } = useFetch<{ ok: boolean, message?: string }>(config.public.baseApiUrl + '/auth/login', {
    method: 'POST',
    body: body,
    watch: false,
    immediate: false,
    onResponseError: () => {
        toast.add({
            title: 'Wrong email or password.',
            color: 'error',
            icon: 'i-memory-alert-octagon',
        })
    },
    onResponse: (res) => {
        if (res.response.ok) {
            const result = res.response._data;
            
            saveToken(result.access_token);
            saveUser({
                id: result.uuid,
                name: result.username,
                email: body.value.email,
            });
            
            navigateTo('/');
        }
    }
})


function onSubmit(payload: FormSubmitEvent<Schema>) {
    pending.value = true;
    body.value = payload.data;
    execute();
}

onBeforeMount(() => {
    if (isAuthenticated) {
        navigateTo('/');
    }
    pending.value = false;
})

</script>

<template>
    <UContainer>
        <UPage>
            <UPageBody>
                <UPageCard class="max-w-md mx-auto" spotlight variant="ghost">
                    <UAuthForm
                        title="Login"
                        description="Enter your credentials to access your account."
                        icon="i-lucide-user"
                        :fields="fields"
                        :schema="schema"
                        :disabled="pending"
                        @submit="onSubmit"
                    />
                </UPageCard>
            </UPageBody>
        </UPage>
    </UContainer>
</template>