import axios from 'axios'
// import { Address } from 'expo-location'
import { Dispatch } from 'react'
import { BASE_URL, MAP_API_KEY } from '../../utils'
import { Category, FetchDirectionResponse, FetchRoute, FoodAvailability, FoodModel, OfferModel, Restaurant } from '../models'
import { onGetAvailability, onGetAvailableFoods } from '../../../backend/controllers'
import { onGetOffers } from '../../../backend/controllers/offer'

// const [LAT, LNG] = [15.975285677159741, 108.2523549954628]
const WRONG_BASE_URL = [
    'http://localhost:8888/',
    'https://online-foods.herokuapp.com/'
]

//availability Action

export interface AvailabilityAction{
    readonly type: 'ON_AVAILABILITY',
    payload: FoodAvailability
}


export interface FoodSearchAction{
    readonly type: 'ON_FOODS_SEARCH',
    payload: [FoodModel]
}


export interface ShoppingErrorAction{
    readonly type: 'ON_SHOPPING_ERROR',
    payload: any
}

export interface OfferSearchAction{
    readonly type: 'ON_OFFER_SEARCH',
    payload: [OfferModel]
}
export interface ResetFoodsAction{
    readonly type: 'ON_RESET_FOODS',
    payload: FoodAvailability
}
export interface FetchDirectionAction{
    readonly type: 'ON_FETCH_DIRECTION',
    payload: FetchRoute
}
export interface FetchDirectionsAction{
    readonly type: 'ON_FETCH_DIRECTIONS',
    payload: [FetchRoute]
}


export type ShoppingAction = AvailabilityAction | 
    ShoppingErrorAction | 
    FoodSearchAction | 
    OfferSearchAction | 
    ResetFoodsAction | 
    FetchDirectionAction |
    FetchDirectionsAction
//Trigger actions from components
export const onAvailability = (lat: number, lng: number) => {

    return async ( dispatch: Dispatch<ShoppingAction>) => {

        try {

            // const response = await axios.get<FoodAvailability>(`${BASE_URL}food/availability/${POST_CODE}`)
            const response = await onGetAvailability(lat, lng)
            let {categories, restaurants, foods, restaurantsRoute} = response.body.data
            const newFoods = foods.map(food=>{
                return {
                    ...food,
                    unit: 0
                }
            }) as [any]

            // replaceFoodAvailabilityURL(response.data);

            // console.log('response: ', response)
            if(!response){
                dispatch({
                    type: 'ON_SHOPPING_ERROR',
                    payload: 'Availability error'
                })
            }else{
                // save our location in local storage
                dispatch({
                    type: 'ON_AVAILABILITY',
                    payload: {
                        foods: newFoods,
                        categories: categories as [Category],
                        restaurants: restaurants as [Restaurant]
                    }
                })
                dispatch({
                    type: 'ON_FETCH_DIRECTIONS',
                    payload: restaurantsRoute as [FetchRoute]
                })
                dispatch({
                    type: 'ON_FOODS_SEARCH',
                    payload: newFoods,
                })
                
            }


        } catch (error) {
            // console.log('error axios: ', error)
            dispatch({
                type: 'ON_SHOPPING_ERROR',
                payload: error
            })
        }

    }

}



//Trigger actions from components
export const onSearchFoods = (lat: number, lng: number) => {


    return async ( dispatch: Dispatch<ShoppingAction>) => {

        try {

            // const response = await axios.get<[FoodModel]>(`${BASE_URL}food/search/${POST_CODE}`)
            // replaceFoodsURL(response.data)

            // const response = await onGetAvailableFoods(LAT, LNG)

            // const newFoods = response.body.data.map(food=>{
            //     return {
            //         ...food,
            //         unit: 0
            //     }
            // }) as [any]

            // console.log(response)
            const response = true

            if(!response){
                dispatch({
                    type: 'ON_SHOPPING_ERROR',
                    payload: 'Availability error'
                })
            }else{
                // save our location in local storage
                dispatch({
                    type: 'ON_FOODS_SEARCH',
                    payload: {} as [FoodModel]
                })
            }


        } catch (error) {
            // console.log('error axios: ', error)
            dispatch({
                type: 'ON_SHOPPING_ERROR',
                payload: error
            })
        }

    }

}


//Trigger actions from components
export const onGetOffer = (postCode: string) => {

    return async ( dispatch: Dispatch<ShoppingAction>) => {

        try {

            // const response = await axios.get<[OfferModel]>(`${BASE_URL}food/offers/${POST_CODE}`)

            // // console.log(response)
            // replaceFoodsURL(response.data)
            const response = await onGetOffers()
            if(!response.body.data){
                dispatch({
                    type: 'ON_SHOPPING_ERROR',
                    payload: 'Offer Availability error'
                })
            }else{
                // save our location in local storage
                dispatch({
                    type: 'ON_OFFER_SEARCH',
                    payload: response.body.data
                })
            }


        } catch (error) {
            // console.log('error axios: ', error)
            dispatch({
                type: 'ON_SHOPPING_ERROR',
                payload: error
            })
        }
    }
}

export const onResetFoods = (availability: FoodAvailability)=>{
    return async ( dispatch: Dispatch<ShoppingAction>) => {
        for (let idFood = 0; idFood<availability.foods.length; idFood++){
            availability['foods'][idFood].unit = 0;
        }
        for (let idRes = 0; idRes<availability.restaurants.length; idRes++){
            for (let idFood = 0; idFood<availability.restaurants[idRes].foods.length; idFood++){
                availability['restaurants'][idRes]['foods'][idFood].unit = 0;
            }
        }
        dispatch({
            type: 'ON_RESET_FOODS',
            payload: availability
        })
    }

}

export const onFetchDirection = (restaurant: Restaurant, latDest: number, lngDest: number) => {
 
    return async ( dispatch: Dispatch<ShoppingAction>) => {

        try {
            const response = await axios.get<FetchDirectionResponse>(`https://maps.google.com/maps/api/directions/json
                ?origin=${restaurant.lat},${restaurant.lng}
                &destination=${latDest},${lngDest}
                &mode=driving
                &key=${MAP_API_KEY}`
            )

            // const response = {
            //     data: '123 Nguyen Van Linh'
            // }
            console.log('response: ', response)

            if(!response){
                dispatch({
                    type: 'ON_SHOPPING_ERROR',
                    payload: 'Direction Fetching Error'
                })
            }else{
                const { routes } = response.data

                if (Array.isArray(routes) && routes.length > 0){
                    const route = routes[0]
                    var distance= 0; // meters
                    var duration = 0; //secs
                    for(let idStep = 0; idStep < route.legs[0].steps.length; idStep++){
                        distance += route.legs[0].steps[idStep].distance.value;
                        duration += route.legs[0].steps[idStep].duration.value;
                    } 
                    dispatch({
                        type: 'ON_FETCH_DIRECTION',
                        payload: {
                            ...route,
                            totalDistance: distance,
                            totalDuration: duration,
                            idRestaurant: restaurant._id
                        }
                    })
                }
            }
        } catch (error) {
            dispatch({
                type: 'ON_SHOPPING_ERROR',
                payload: error
            })
        }
    }

}


