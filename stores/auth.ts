import { defineStore } from 'pinia';
import type { User } from '~/types/user.type';

export const useAuthStore = defineStore('auth', () => {
    const token = ref<string | null>(null);
    const user = ref<User | null>(null);

    const isAuthenticated = computed(() => !!token.value);

    function saveToken(newToken: string | null) {
        token.value = newToken;
        if (newToken) {
            localStorage.setItem('token', newToken);
        } else {
            localStorage.removeItem('token');
        }
    }

    function saveUser(newUser: User) {
        user.value = newUser;
    }

    function logout() {
        saveToken(null);
        user.value = null;
        navigateTo('/');
    }

    function initToken() {
        const tokenLocal = localStorage.getItem('token');

        if (tokenLocal) {
            saveToken(tokenLocal);
        }
    }

    return {
        token,
        user,
        isAuthenticated,
        initToken,
        saveToken,
        saveUser,
        logout,
    }
})