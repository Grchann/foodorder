import axios from 'axios'
import { Address } from 'expo-location'
import { Dispatch } from 'react'
import { BASE_URL } from '../../utils'
import { Category, FoodAvailability, FoodModel, OfferModel, Restaurant } from '../models'
import { onGetAvailability, onGetAvailableFoods } from '../../../backend/controllers'
import { readJSON } from '../../../backend/utils'
import { onGetOffers } from '../../../backend/controllers/offer'

const POST_CODE = 400012
const [LAT, LNG] = [15.975285677159741, 108.2523549954628]
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


export type ShoppingAction = AvailabilityAction | ShoppingErrorAction | FoodSearchAction | OfferSearchAction | ResetFoodsAction

function replaceFoodsURL(foods:any){
    
    for (let idFood = 0; idFood < foods.length; idFood++){
        for (let idImage = 0; idImage < foods[idFood].images.length; idImage++ ){
            const oldValue = foods[idFood].images[idImage];
            let newValue = oldValue.replace(WRONG_BASE_URL[0], BASE_URL);
            newValue = newValue.replace(WRONG_BASE_URL[1], BASE_URL);
            foods[idFood].images[idImage] = newValue
        }
    }
}

function replaceCategoriesURL(categories: any){
    for (let idCate = 0; idCate < categories.length; idCate++){
        const oldValue = categories[idCate].icon;
        let newValue = oldValue.replace(WRONG_BASE_URL[0], BASE_URL);
        newValue = newValue.replace(WRONG_BASE_URL[1], BASE_URL);
        categories[idCate].icon = newValue
    }
}

function replaceRestaurantsURL(restaurants: any){
    replaceFoodsURL(restaurants);   // because Restaurant has same property images with Food
    for (let idRest = 0; idRest < restaurants.length; idRest++){
        replaceFoodsURL(restaurants[idRest].foods)
    }
}

function replaceFoodAvailabilityURL(data: any){
    replaceCategoriesURL(data.categories);
    replaceFoodsURL(data.foods);
    replaceRestaurantsURL(data.restaurants);
}
//Trigger actions from components
export const onAvailability = (postCode: string) => {

    return async ( dispatch: Dispatch<ShoppingAction>) => {

        try {

            // const response = await axios.get<FoodAvailability>(`${BASE_URL}food/availability/${POST_CODE}`)
            const response = await onGetAvailability(LAT, LNG)
            let {categories, restaurants, foods} = response.body.data
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
export const onSearchFoods = (postCode: string) => {


    return async ( dispatch: Dispatch<ShoppingAction>) => {

        try {

            // const response = await axios.get<[FoodModel]>(`${BASE_URL}food/search/${POST_CODE}`)
            const response = await onGetAvailableFoods(LAT, LNG)

            const newFoods = response.body.data.map(food=>{
                return {
                    ...food,
                    unit: 0
                }
            }) as [any]

            // console.log(response)
            // replaceFoodsURL(response.data)

            if(!response){
                dispatch({
                    type: 'ON_SHOPPING_ERROR',
                    payload: 'Availability error'
                })
            }else{
                // save our location in local storage
                dispatch({
                    type: 'ON_FOODS_SEARCH',
                    payload: newFoods
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


