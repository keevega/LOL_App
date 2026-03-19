import obtenerDatos from "../helpers/getData.js";

const apiKey = 'RGAPI-42917b27-b1e1-4633-92c9-5817978498f0'

const show_profile = (req, res) => {
    res.render('home', {

    });
}

const search_profile = async (req, res) => {
    const {summonerName} = req.body
    const [user,tag] = summonerName.split('#')

    const datos = await obtenerDatos(user,tag, apiKey)

    console.log(datos.length)

    if(datos.length !== 7){
        res.render('home',{
            error: true,
            msg: 'Este usuario No Existe'
        })
    }

    const [icono, level, tier, rank, leaguePoints, wins, losses] = datos;

    res.render('home',{
        user,
        tag,
        icono,
        level,
        tier,
        rank,
        leaguePoints,
        wins,
        losses
    })
}


export {
    show_profile,
    search_profile
}