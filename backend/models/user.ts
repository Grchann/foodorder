import { generateID } from "../utils"


export interface DBUser{
    _id: string,
    email: string,
    password: string,
    phone: string,
    firstName: string,
    lastName: string,
    verified: boolean,
    carts: [any], //[idCart]
    orders: [any]    //[idOrder]
}


export const generateUser = (users: [DBUser])=>{
    return {
        _id: generateID(users),

        email: '',
        password: '',
        phone: '',

        firstName: '',
        lastName: '',

        verified: false,

        carts: {} as [string],
        orders: {} as [string]
    }
}







