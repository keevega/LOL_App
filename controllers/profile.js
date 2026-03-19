import obtenerDatos from "../helpers/getData.js";

const apiKey = process.env.APIKEY

const show_profile = (req, res) => {
    res.render('home', {

    });
}

const search_profile = async (req, res) => {
    const {summonerName} = req.body
    const [user,tag] = summonerName.split('#')

    const datos = await obtenerDatos(user,tag, apiKey)

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