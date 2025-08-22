<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import * as z from 'zod'

const config = useRuntimeConfig();
const toast = useToast();
const { isAuthenticated } = useAuthStore();

const fields = [
    {
        name: 'username',
        type: 'text' as const,
        label: 'Username',
        require: true,
    },
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
        require: true,
    },
    {
        name: 'confirmPassword',
        type: 'password' as const,
        label: 'Confirm password',
        require: true,
    },
    {
        name: 'entreprise',
        type: 'checkbox' as const,
        label: 'Is it an entreprise account ?',
        require: false,
    },
]

const schema = z.object({
    username: z.string(),
    email: z.email('Invalid email'),
    password: z.string(),
    confirmPassword: z.string(),
    entreprise: z.boolean().default(false).optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

type Schema = z.output<typeof schema>;

let body = ref<Schema>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    entreprise: false,
});

const { pending, execute } = useFetch<{ ok: boolean, message?: string }>(config.public.baseApiUrl + '/users', {
    method: 'POST',
    body: body,
    watch: false,
    immediate: false,
    onResponseError: () => {
        toast.add({
            title: 'An error occured. The email might be already used.',
            color: 'error',
            icon: 'i-memory-alert-octagon',
        })
    },
    onResponse: (res) => {
        if (res.response.ok) {
            toast.add({
                title: 'Account created !',
                description: 'Please login now.'
            })
            
            navigateTo('/login');
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
                        title="Register"
                        description="Create your new account."
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