// import { Address } from 'expo-location'

export interface Address{
    // base property of Address expo-location
    name: string,
    street: string,
    city: string,
    country: string,
    region: string,
    postalCode: string,

    // new property
    latitude?: number,
    longitude?: number,
    displayAddress?: string
    
}

// category
export interface Category{
    _id: string,
    title: string,
    icon: string
}


// Food Model
export interface FoodModel{
    _id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    readyTime: number;
    images: [string];
    unit: number;
}
 
//Restaurant Model
export interface Restaurant{
    _id: string;
    name: string;
    foodType: string;
    address: string;
    phone: string;
    images: string;
    foods: [FoodModel];
}

export interface FoodAvailability{
    categories: [Category];
    restaurants: [Restaurant];
    foods: [FoodModel]
}
 
//todo : Modify later
//User Model
export interface UserModel{
    _id: string
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    token: string | undefined,
    verified: boolean
}
 
export interface UserState{
    user: UserModel;
    location: Address;
    error: string | undefined;
    Cart: [FoodModel];
    orders: [OrderModel],
    appliedOffer: OfferModel,
    pickedAddress: PickedAddress
}

export interface ShoppingState{
    availability: FoodAvailability,
    availableFoods: [FoodModel]
    offers: [OfferModel]
    //other models
}

export interface CartModel{
    _id: string,
    food: FoodModel,
    unit: number,
}
export interface OrderModel{
    _id: string,
    orderID: string,
    items: [CartModel],
    totalAmount: number,
    orderDate: Date,
    paidThrough: string,
    paymentResponse: string,
    orderStatus: string
}

export interface OfferModel{
    _id: string,
    offerType: string, // Vendor // generic
    vendors: [any],
    images: [string],
    title: string,
    description: string,
    minValue: number,
    offerAmount: number,
    offerPercentage: number,
    startValidity: Date,
    endValidity: Date,
    promoCode: string,
    promoType: string, // User // All // Bank // Card
    bank: [any],
    bin: [any],
    pinCode: string,
}

export interface PickedLocationResult{
    results:[{
        address_components:[
            {
                long_name: string,
                short_name: string,
                types: [string]
            }
        ],
        formatted_address: string,
        place_id: string
    }]
}

export interface PickedAddress{
    address_components:[
        {
            long_name: string,
            short_name: string,
            types: [string]
        }
    ],
    formatted_address: string,
    place_id: string
}
