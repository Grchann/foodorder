import { generateID } from "../utils"

export interface DBCart{
    _id: string,
    food: string,
    unit: number,
    requestInfo: string
}

export const generateCart = (carts: [DBCart])=>{
    return {
        _id: generateID(carts),
        food: '',
        unit: 0,
        requestInfo: ''
    }
}

