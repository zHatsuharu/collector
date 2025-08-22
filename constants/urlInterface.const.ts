export const URLinterface = {
    "pokemon": "https://api.pokemontcg.io/v2/cards",
    "yugioh": "https://db.ygoprodeck.com/api/v7/cardinfo.php",
    "magic": "https://api.magicthegathering.io/v1/cards"
}

export const URLParams = {
    "pokemon": "pageSize=25",
    "yugioh": "num=25",
    "magic": "pageSize=25"
}

export const URLPage = {
    "pokemon": (page: number) => `page=${page}`,
    "yugioh": (page: number) => `offset=${(page-1) * 25}`,
    "magic": (page: number) => ``,
}

export const URLsearch = {
    "pokemon": (name: string) => `q=name:"${name}"`,
    "yugioh": (name: string) => 'fname=' + name,
    "magic": (name: string) => '',
}