import axios from 'axios'
import { Dispatch } from 'react'
import { BASE_URL, MAP_API_KEY } from '../../utils'
import AsyncStorage from '@react-native-community/async-storage'
import { FoodModel, OfferModel, OrderModel, UserModel, Address, PickedLocationResult } from '../models'
import { onBECancelOrder, onBECreateOrder, onBEGetOrders, onChangeProfile, onConfirmOTP, onLogin, onSignUp } from '../../../backend/controllers'

export interface UpdateLocationAction{
    readonly type: 'ON_UPDATE_LOCATION',
    payload: Address
}


export interface UserErrorAction{
    readonly type: 'ON_USER_ERROR',
    payload: any
}


export interface UpdateCartAction{
    readonly type: 'ON_UPDATE_CART',
    payload: FoodModel
}

export interface UserLoginAction{
    readonly type: 'ON_USER_LOGIN',
    payload: UserModel
}

export interface UserLogoutAction{
    readonly type: 'ON_USER_LOGOUT',
    payload: string
}

export interface ClearCartAction{
    readonly type: 'ON_CLEAR_CART',
    payload: string
}
export interface CreateOrderAction{
    readonly type: 'ON_CREATE_ORDER',
    payload: OrderModel
}
export interface ViewOrderAction{
    readonly type: 'ON_VIEW_ORDER' | 'ON_CANCEL_ORDER',
    payload: [OrderModel]
}
export interface AddRemoveOfferAction{
    readonly type: 'ON_ADD_OFFER' | 'ON_REMOVE_OFFER',
    payload: OfferModel
}

export interface FetchLocationAction{
    readonly type: 'ON_FETCH_LOCATION',
    payload: any
}
export interface EditProfileAction{
    readonly type: 'ON_EDIT_PROFILE',
    payload: UserModel
}




export type UserAction = 
    UpdateLocationAction | 
    UserErrorAction | 
    UpdateCartAction | 
    UserLoginAction | 
    UserLogoutAction |
    ClearCartAction |
    CreateOrderAction | 
    ViewOrderAction |
    AddRemoveOfferAction |
    FetchLocationAction |
    EditProfileAction;


// User Actions trigger from Components

export const onUpdateLocation = (location: Address) => {

    return async ( dispatch: Dispatch<UserAction>) => {

        try {
            const locationString = JSON.stringify(location)
            await AsyncStorage.setItem('user_location', locationString)
            // save our location in local storage
            dispatch({
                type: 'ON_UPDATE_LOCATION',
                payload: location
            })

        } catch (error) {
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }

    }

}

export const onFetchLocation = (lat: number, lng: number) => {
 
    return async ( dispatch: Dispatch<UserAction>) => {

        try {
            const response = await axios.get<PickedLocationResult>(`http://maps.google.com/maps/api/geocode/json?address=?${lat},${lng}&key=${MAP_API_KEY}`)

            // const response = {
            //     data: '123 Nguyen Van Linh'
            // }

            if(!response){
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'Address Fetching Error'
                })
            }else{
                const { results } = response.data

                if (Array.isArray(results) && results.length > 0){
                    const pickedAddress = results[0]
                    dispatch({
                        type: 'ON_FETCH_LOCATION',
                        payload: pickedAddress
                    })
                }
            }
        } catch (error) {
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }

}



export const onUpdateCart = (item: FoodModel) => {

     
    return async ( dispatch: Dispatch<UserAction>) => {
        dispatch({
            type: 'ON_UPDATE_CART',
            payload: item
        })
    }

}

export const onUserLogin = (email: string, password: string) => {
 
    return async ( dispatch: Dispatch<UserAction>) => {

        try {
            //  const response = await axios.post<UserModel>(`${BASE_URL}user/login`, {
            //     email,
            //     password
            // })
            const response = await onLogin(email, password)

            // console.log(response)

            if(!response.body.data){
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'Login Error'
                })
            }else{
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: response.body.data
                })
            }
        } catch (error) {
            console.log('catch: ', error)
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }

}


export const onUserLogout = () => {

    return async ( dispatch: Dispatch<UserAction>) => {

        try {
            
            dispatch({
                type: 'ON_USER_LOGOUT',
                payload: 'Logout'
            })
            
        } catch (error) {
            // console.log(error);
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}


export const onUserSignup = (email: string, phone: string ,password: string) => {
 
    return async ( dispatch: Dispatch<UserAction>) => {

        try {
            //  const response = await axios.post<UserModel>(`${BASE_URL}user/create-account`, {
            //     email,
            //     phone,
            //     password
            // })

            const response = await onSignUp(email, password, phone)

            console.log(response)

            if(!response.body.data){
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'Login Error'
                })
            }else{
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: {
                        ...response.body.data,
                        token: undefined
                    }
                })
            }
        } catch (error) {
            // console.log(error);
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }

}


export const onVerifyOTP = (otp: string, user: UserModel) => {
 
    return async ( dispatch: Dispatch<UserAction>) => {

        try {
            // axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`

            // const response = await axios.patch<UserModel>(`${BASE_URL}user/verify`, {
            //     otp
            // })

            const response = await onConfirmOTP(user._id, otp)

            // console.log(response)

            if(!response){
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'User Vertification Error'
                })
            }else{
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: response.body.data as UserModel
                })
            }
        } catch (error) {
            // console.log(error);
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }

}


export const onOTPRequest = (user: UserModel) => {
 
    return async ( dispatch: Dispatch<UserAction>) => {

        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`

            const response = await axios.get<UserModel>(`${BASE_URL}user/otp`)

            // console.log(response)

            if(!response){
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'User Vertification Error'
                })
            }else{
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: response.data
                })
            }
        } catch (error) {
            // console.log(error);
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }

}

export const onClearCart = ()=>{
    return async ( dispatch: Dispatch<UserAction>) => {
        dispatch({
            type: 'ON_CLEAR_CART',
            payload: 'Clear Cart Successfully'
        })
    }

}


export const onCreateOrder = (cartItems: [FoodModel], user: UserModel, offer: OfferModel) => {

    let totalAmount = cartItems.reduce((total, currentItem)=>total + currentItem.price * currentItem.unit, 0);
    // after offer

    if (offer._id!==undefined){
        totalAmount = totalAmount * (100 - offer.offerPercentage)
    }else{
        offer = {} as OfferModel
    }


    const order = {
        items: cartItems.map(item=>{
            return {
                food: {
                    _id: item._id,
                },
                unit: item.unit,
                requestInfo: ''
            }
        }),
        totalAmount: totalAmount,
        paidThrough: 'cash',
        offer: offer
    }

    // console.log(order)

    //transaction ID
    return async ( dispatch: Dispatch<UserAction>) => {

        try {
            // axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`

            // const response = await axios.post<OrderModel>(`${BASE_URL}user/create-order` , {
            //     cart
            // })

            const response = await onBECreateOrder(user._id, order)

            console.log(response)

            if(!response.body.data){
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'User Vertification Error'
                })
            }else{
                dispatch({
                    type: 'ON_CREATE_ORDER',
                    payload: response.body.data
                })
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}

export const onGetOrder = (user: UserModel) => {

    return async ( dispatch: Dispatch<UserAction>) => {

        try {
            // axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`

            // const response = await axios.get<[OrderModel]>(`${BASE_URL}user/order` )
            const response = await onBEGetOrders(user._id)

            console.log(response)

            if(!response.body.data){
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'User Vertification Error'
                })
            }else{
                dispatch({
                    type: 'ON_VIEW_ORDER',
                    payload: response.body.data as [OrderModel]
                })
            }
        } catch (error) {
            // console.log(error);
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}


export const onCancelOrder = (order: OrderModel, user: UserModel) => {

    return async ( dispatch: Dispatch<UserAction>) => {

        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`

            // const response = await axios.delete<[OrderModel]>(`${BASE_URL}user/order/${order._id}` )

            const response = await onBECancelOrder(user._id, order)

            // console.log(response)

            if(!response.body.data){
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'User Vertification Error'
                })
            }else{
                dispatch({
                    type: 'ON_CANCEL_ORDER',
                    payload: response.body.data as [OrderModel]
                })
            }
        } catch (error) {
            // console.log(error);
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}


export const onApplyOffer = (offer: OfferModel, isRemove: boolean) => {

     
    return async (dispatch: Dispatch<UserAction>) => {
        if (isRemove){
            dispatch({
                type: 'ON_REMOVE_OFFER',
                payload: offer
            })
        }else{
            dispatch({
                type: 'ON_ADD_OFFER',
                payload: offer
            })
        }
            
    }

}

export const onEditProfile = (user: UserModel, firstName: string, lastName: string) => {

     
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const response = await onChangeProfile(user._id, firstName, lastName)

            // console.log(response)

            if(!response.body.data){
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'Login Error'
                })
            }else{
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: response.body.data
                })
            }
        } catch (error) {
            console.log('catch: ', error)
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
            
    }

}



