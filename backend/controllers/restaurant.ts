import { PATH_RESTAURANT_JSON, PATH_IMAGES } from "../const";
import { DBRestaurant } from "../models/restaurant";
import { readJSON } from "../utils";

const FIT_RADIUS_SQUARE = 0.0003
const euclideSquare = (xA: number, yA: number, xB: number, yB: number)=>{
    return ((xA - xB) ** 2) + ((yA - yB) ** 2)
}

const transformURLRestaurants = (restaurants: [DBRestaurant])=>{
    for (let idRest = 0; idRest < restaurants.length; idRest++){
        for (let idImg = 0; idImg < restaurants[idRest].images.length; idImg++){
            restaurants[idRest].images[idImg] = PATH_IMAGES + restaurants[idRest].images[idImg]
        }
    }
}

export const onGetAvailableRestaurants = async (lat: number, lng: number)=>{
    const restaurants = (await readJSON(PATH_RESTAURANT_JSON)) as [DBRestaurant];

    const availableRestaurants = restaurants.filter(rest=>euclideSquare(lat, lng, rest.lat, rest.lng)<FIT_RADIUS_SQUARE) as [DBRestaurant]
    transformURLRestaurants(availableRestaurants)
    return availableRestaurants
}   