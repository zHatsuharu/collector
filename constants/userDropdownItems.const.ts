import type { DropdownMenuItem } from "@nuxt/ui";

const { logout } = useAuthStore();

export const userDropdownItems = ref<DropdownMenuItem[][]>([[
  {
    label: 'Profile',
    icon: 'i-lucide-user',
    to: '/profile',
  },
  {
    label: 'My collection',
    icon: 'i-mdi-cards',
    to: '/collection',
  },
], [
  {
    label: 'Logout',
    color: 'error',
    icon: 'i-mdi-logout',
    onSelect: logout
  }
]])