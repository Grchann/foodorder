import { generateID } from "../utils"

export interface DBOffer{
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


export const createOffer = (offers: [DBOffer], props: DBOffer)=>{

    return {
        ...props,
        _id: generateID(offers),
    }
}

const toOffers = [
    {
        offerType: 'generic',
        vendors: [],
        images: ['offer_Percent.jpg'],
        title: 'Giảm giá 50%',
        description: 'Giảm giá 50% cho đơn hàng, chưa tính ship. Khuyến mãi chỉ áp dụng với đơn hàng trên 100.000VNĐ',
        minValue: 100,
        offerAmount: 0,
        offerPercentage: 50,
        startValidity: new Date(2023, 4, 1),
        endValidity: new Date(2023, 5, 1),
        promoCode: 'HAPPY50',
        promoType: 'All', 
        bank: [],
        bin: [],
        pinCode: '',
    },

    {
        offerType: 'generic',
        vendors: [],
        images: ['offer_Percent.jpg'],
        title: 'Giảm giá 30%',
        description: 'Giảm giá 30% cho đơn hàng, chưa tính ship. Khuyến mãi chỉ áp dụng với đơn hàng trên 100.000VNĐ',
        minValue: 100,
        offerAmount: 0,
        offerPercentage: 50,
        startValidity: new Date(2023, 4, 1),
        endValidity: new Date(2023, 5, 1),
        promoCode: 'HAPPY30',
        promoType: 'All', 
        bank: [],
        bin: [],
        pinCode: '',
    },
]