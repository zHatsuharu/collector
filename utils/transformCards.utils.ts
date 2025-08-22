import type { UniformedDataType } from "~/types/uniformedCard.type";

export default function transformCards(type: 'pokemon' | 'yugioh' | 'magic', data: any[]): UniformedDataType[] {

    switch (type) {
        case 'pokemon':
            return data.map(pokemonUniforming);
        case 'yugioh':
            return data.map(yugiohUniforming);
        case 'magic':
            return data.map(magicUniforming);
    }
}


function pokemonUniforming(card: any): UniformedDataType {
    const obj = {
        id: card.id,
        images: {
            small: card.images.small,
            large: card.images.large,
        },
        name: card.name,
        prices: {} as Record<string, Object>,
    }

    if (card.cardmarket) {
        obj.prices.cardmarket = {
            url: card.cardmarket.url,
            price: card.cardmarket.prices.averageSellPrice
        }
    }

    if (card.tcgplayer) {
        obj.prices.tcgplayer = {
            url: card.tcgplayer.url,
            price: card.tcgplayer.prices[Object.keys(card.tcgplayer.prices)[0]].market
        }
    }

    return obj;
}

function yugiohUniforming(card: any): UniformedDataType {
    return {
        id: card.id,
        images: {
            small: card.card_images[0].image_url_small,
            large: card.card_images[0].image_url,
        },
        name: card.name,
        prices: {
            cardmarket: {
                url: card.ygoprodeck_url,
                price: parseFloat(card.card_prices[0].cardmarket_price),
            },
            tcgplayer: {
                url: card.ygoprodeck_url,
                price: parseFloat(card.card_prices[0].tcgplayer_price),
            }
        }
    }
}

function magicUniforming(card: any): UniformedDataType {
    return {
        id: card.id,
        images: {
            small: card.imageUrl,
            large: card.imageUrl,
        },
        name: card.name,
        prices: {

        }
    }
} 