import { PATH_IMAGES, PATH_OFFER_JSON } from "../const"
import { DBOffer } from "../models/offer"
import { readJSON } from "../utils"



export const onGetOffers = async ()=>{
    const dbOffers = (await readJSON(PATH_OFFER_JSON)) as [DBOffer]
    for (let idOffer = 0; idOffer<dbOffers.length; idOffer++){
        for (let idImg = 0; idImg<dbOffers[idOffer].images.length; idImg++){
            dbOffers[idOffer].images[idImg] = PATH_IMAGES + dbOffers[idOffer].images[idImg]
        }
    }
    return {
        status: 200,
        body:{
            data: dbOffers
        }
    }
}