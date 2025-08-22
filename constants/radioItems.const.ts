import type { RadioGroupItem } from "@nuxt/ui";

export const radioItems: RadioGroupItem[] = [
    {
        label: 'Pokémon',
        value: 'pokemon',
    },
    {
        label: 'Yu-Gi-Oh',
        value: 'yugioh',
    },
    {
        label: 'Magic',
        value:'magic',
        disabled: true,
        class: 'cursor-not-allowed'
    },
];