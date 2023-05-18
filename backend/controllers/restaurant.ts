import axios from "axios";
import { MAP_API_KEY } from "../../src/utils";
import { PATH_RESTAURANT_JSON, PATH_IMAGES } from "../const";
import { AvailableRoute, FetchDirectionResponse, FetchRoute } from "../models";
import { DBRestaurant } from "../models/restaurant";
import { readJSON } from "../utils";

const FIT_RADIUS_SQUARE = 0.0003
const THRESHOLD_DISTANCE = 3000
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

    // const firstFilterRestaurants = restaurants.filter(rest=>euclideSquare(lat, lng, rest.lat, rest.lng)<FIT_RADIUS_SQUARE) as [any]
    const firstFilterRestaurants = restaurants as [any]
    const firstFilterRestaurantsDirection = (await Promise.all(firstFilterRestaurants.map(rest=>onFetchDirection(rest, lat, lng)))) as [AvailableRoute] 
    const secondFilterRestaurants = [];
    const secondFilterRestaurantsDirection = [];
    for (let idRes = 0; idRes < firstFilterRestaurants.length; idRes++){
        console.log(idRes, firstFilterRestaurantsDirection[idRes].totalDistance)
        if (firstFilterRestaurantsDirection[idRes] === undefined || 
            firstFilterRestaurantsDirection[idRes].totalDistance > THRESHOLD_DISTANCE){
            
            continue;
        }else{
            secondFilterRestaurants.push(firstFilterRestaurants[idRes]);
            secondFilterRestaurantsDirection.push(firstFilterRestaurantsDirection[idRes])
        }
    }
    transformURLRestaurants(secondFilterRestaurants as [DBRestaurant])
    return {
        availableRestaurants: secondFilterRestaurants,
        routes: secondFilterRestaurantsDirection
    }
}   

export const onFetchDirection = async (restaurant: DBRestaurant, latDest: number, lngDest: number) => {
    const response = await axios.get<FetchDirectionResponse>(`https://maps.google.com/maps/api/directions/json?origin=${restaurant.lat},${restaurant.lng}&destination=${latDest},${lngDest}&mode=driving&key=${MAP_API_KEY}`
    )

    const { routes } = response.data

    if (Array.isArray(routes) && routes.length > 0){
        const route = routes[0]
        var distance= 0; // meters
        var duration = 0; //secs
        for(let idStep = 0; idStep < route.legs[0].steps.length; idStep++){
            distance += route.legs[0].steps[idStep].distance.value;
            duration += route.legs[0].steps[idStep].duration.value;
        }   
        return {
            ...route,
            totalDistance: distance,
            totalDuration: duration,
            idRestaurant: restaurant._id
        } as AvailableRoute
    }else{
        return undefined
    }
}