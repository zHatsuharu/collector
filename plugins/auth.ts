import type { Profile } from "~/types/profile.type";

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.hook('vue:setup', () => {
        const config = useRuntimeConfig();
        const { token } = storeToRefs(useAuthStore());
        const auth = useAuthStore();

        if (!token.value) {
            auth.initToken();

            if (token.value) {
                $fetch<Profile>(config.public.baseApiUrl + '/auth/profile', {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + token.value
                    }
                }).then(response => {
                    auth.saveUser({ id: response.uuid, name: response.username, email: response.email })
                }).catch(() => {
                    auth.logout();
                })
            }
        }
    })
})