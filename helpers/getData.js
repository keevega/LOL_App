
async function obtenerDatos(user, tag, apiKey) {
    const url = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${user}/${tag}?api_key=${apiKey}`

    try {
        const response = await fetch(url)

        if(!response.ok) {
            throw new Error(`Error en la petición: ${response.status}`)
        }


        //Obtenemos el userID de la cuenta
        const {puuid} = await response.json()
        

        //Funciones para obtener datos de usuario a partir del UserId
        const array1 = await encontrarUsuario(puuid, apiKey)
        const array2 = await obtenerElo(puuid, apiKey)

        return [...array1, ...array2]

    } catch (error) {
        console.error('Hubo un problema con la petición:', error);
        return 0
    }

}

async function encontrarUsuario(userId,apiKey) {
    const url = `https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${userId}?api_key=${apiKey}`

    try {
        const response = await fetch(url)

        if(!response.ok) {
            throw new Error(`Error en la petición: ${response.status}`)
        }

        //Obtenemos icono y nivel de la cuenta
        const {profileIconId, summonerLevel} = await response.json()

        return [profileIconId, summonerLevel]

    } catch (error) {
        console.error('Hubo un problema con la petición:', error);
    }

}

async function obtenerElo(userId, apiKey) {
    const url = `https://la1.api.riotgames.com/lol/league/v4/entries/by-puuid/${userId}?api_key=${apiKey}`
    
    try {
        const response = await fetch(url)

        if(!response.ok) {
            throw new Error(`Error en la petición: ${response.status}`)
        }

        //Obtenemos icono y nivel de la cuenta
        const data = await response.json()
        if (data[0].queueType === 'RANKED_SOLO_5x5') {
            const {tier, rank, leaguePoints, wins, losses} = data[0]
             return [tier, rank, leaguePoints, wins, losses]
        }
        else {
            const {tier, rank, leaguePoints, wins, losses} = data[1]
            return [tier, rank, leaguePoints, wins, losses]
        }
        
       

    } catch (error) {
        console.error('Hubo un problema con la petición:', error);
    }

}


export default obtenerDatos