import type { AccordionItem } from "@nuxt/ui";
import type { keyof } from "zod";
import type { User } from "~/types/user.type";
import type { URLParams } from "./urlInterface.const";
import type { Card } from "~/types/card.type";

interface CollectionItem extends AccordionItem {
    type: keyof typeof URLParams
    cards: Array<Card>
}

export const collectionAccordionItems = ref<CollectionItem[]>([
    {
        icon: 'i-ic-twotone-catching-pokemon',
        label: 'Pokemon',
        ui: {
            leadingIcon: 'text-3xl',
            label: 'text-2xl',
        },
        type: 'pokemon',
        cards: [],
    },
    {
        icon: 'i-arcticons-yu-gi-oh',
        label: 'Yu-Gi-Oh',
        ui: {
            leadingIcon: 'text-3xl',
            label: 'text-2xl',
        },
        type: 'yugioh',
        cards: [],
    },
    {
        icon: 'i-arcticons-magic',
        label: 'Magic',
        ui: {
            leadingIcon: 'text-3xl',
            label: 'text-2xl',
        },
        type: 'magic',
        cards: [],
    }
])