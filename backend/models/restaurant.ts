import { generateID } from "../utils"

export interface DBRestaurant{
    _id: string,
    name: string,
    foodType: string,
    pinCode: string,
    lat: number,
    lng: number,
    address: string,
    phone: string,
    rating: number,
    images: [string],
    foods: [string]
}

export const createRestaurants = (restaurants: [DBRestaurant], props: DBRestaurant)=>{
    return {
        ...props,
        _id: generateID(restaurants),
    }
}

const toRestaurants = [

    {
        name: 'Bún bò Bà Xin',
        address: '14 Triệu Nữ Vương, Hải Châu 2, Hải Châu, Đà Nẵng 550000, Việt Nam',
        foodType: 'Bún',
        pinCode: '',
        lat: 16.06749283763648,
        lng: 108.21598685476827,
        phone: '0587137419',
        rating: 3,
        images: ['res_BunBo.png'],
        foods: [
            'd3a2ef03-0dea-4319-9f0f-bc7448622982', // Bún bò Huế giò heo
            '91af6476-9540-4b64-886d-37840648640e', // Bún bò Huế Tái chả 
            '2b9c3c7b-62b9-4d7d-8aa2-8380e3b12279', // Bún bò Huế chả cua
        ]
    },

    {
        name: 'Anh Quân Seafood',
        address: 'X6GX+558, Hoà Hải, Ngũ Hành Sơn, Đà Nẵng 550000, Việt Nam',
        foodType: 'Hải sản',
        pinCode: '',
        lat: 15.975447082839173, 
        lng: 108.24797761685107,
        phone: '0868707709',
        rating: 4,
        images: ['res_AnhQuanSeafood.png'],
        foods: [
            '0f81f3e5-640a-4ccc-9081-f9fa570c787c', // Nghêu nướng mỡ hành
            '52e5a033-7032-451d-bb43-d07827fdba77', // Mực hấp hành gừng
            '4036eec1-48df-49df-a3b6-ee336b783847', // Bạch tuộc xào cay kiểu Hàn
            'a010c6b1-e883-41ec-9a5f-dbebba1153d0', // Lẩu thái Hải sản
        ]
    },

    {
        name: 'Bún + Mỳ quảng : Minh Hạnh',
        address: '02 Lê Thiện Trị, Hoà Hải, Ngũ Hành Sơn, Đà Nẵng 840511, Việt Nam',
        foodType: 'Mỳ quảng',
        pinCode: '',
        lat: 15.978624066703805, 
        lng: 108.25326722871147, 
        phone: '0389501872',
        rating: 4,
        images: ['res_MyQuang.png'],
        foods: [
            '8bbf2291-548c-4a03-a640-2c579cde3827', // Mỳ quảng tôm thịt
            '4ef94ad6-ac86-4466-9ce6-38e09d86221e', // Mỳ quảng gà
            '1fc91ead-9dff-4cfb-887c-abf5f5ad637f', // Mỳ quảng cá lóc
            'a71f638d-b955-4e74-a4da-93d0dbeaf1d7', // Mỳ quảng ếch
            'e63e819a-1a8b-47ed-9e56-5bfc73806e83', // Bún riêu cua đồng
        ]
    },

    {
        name: 'Tiệm bánh Huế - O Đa',
        address: 'Đ. Khái Tây 1, Hoà Quý, Ngũ Hành Sơn, Đà Nẵng 550000, Việt Nam',
        foodType: 'Bánh ngọt',
        pinCode: '',
        lat: 15.980826586649767, 
        lng: 108.23723173563312, 
        phone: '03718114537',
        rating: 4,
        images: ['res_HueODa.png'],
        foods: [
            '2d4e514c-82f8-4b04-9d56-616b6f8de074', // Bánh bèo Huế
            '66077280-ce38-4d2b-8f37-58f36433445a', // Bánh bột lọc Huế
            'e42bda01-2ac4-49cb-8b24-f2ac264d6238', // Bánh nậm Huế
            '463eb273-b75a-48c0-bf3a-1e6403761ab6', // Bánh ram ít Huế
            'f3454544-85d5-4c66-b7d9-4edbe5c20ede', // Bánh xèo Huế
        ]
    },

    {
        name: 'Bếp Chay 10K Chân Tâm',
        address: '45 Nguyễn Dục, Hoà Hải, Ngũ Hành Sơn, Đà Nẵng 550000, Việt Nam',
        foodType: 'Đồ ăn chay',
        pinCode: '',
        lat: 15.979924238628445, 
        lng: 108.25286997962245, 
        phone: '0783276779',
        rating: 4,
        images: ['res_Chay.png'],
        foods: [
            '326a6a82-3a23-4a15-8325-26c8e3b99fb6', // Chả giò chay
            '3126304f-317b-4cc4-a31a-1b7c90484c0b', // Chả lụa chay
            '89333953-000f-4bdf-ada9-56a06f90a1b7', // Đậu phụ non sốt nấm đông cô
            '42a64e99-a94e-4726-8cb1-7a797aae92bd', // Đậu phụ sốt cà chua
            'f74a24a9-db42-462b-8b7d-4dd6d4cdb712', // Hủ tiếu chay
            'a1ecee4a-057f-4047-a906-54e8ac231970', // Nấm kim châm xào chay
        ]
    },

    {
        name: 'Bánh cuốn nóng Hoa',
        address: '04 Nguyễn Duy Cung, Hoà Hải, Ngũ Hành Sơn, Đà Nẵng 550000, Việt Nam',
        foodType: 'Đồ ăn sáng',
        pinCode: '',
        lat: 15.981446299996575, 
        lng: 108.25460355052465, 
        phone: '0934848362',
        rating: 4,
        images: ['res_BanhCuon.png'],
        foods: [
            '0e136f94-e192-447c-9ebb-58916105d94f', // Bánh cuốn thịt nấm tai heo
            'cb18798b-f7be-42cd-a0a8-8c7ab0791264', // Gỏi cuốn tôm
        ]
    },

    {
        name: 'Bánh canh Bé Út',
        address: '12 Thích Phước Huệ, Hoà Hải, Ngũ Hành Sơn, Đà Nẵng 550000, Việt Nam',
        foodType: 'Đồ ăn sáng',
        pinCode: '',
        lat: 15.98301404864612, 
        lng: 108.25311224230593, 
        phone: '03548484848',
        rating: 4,
        images: ['res_BanhCanh.png'],
        foods: [
            'f1152d76-a4e1-4882-86b0-89e90fbbaaa0', // Bánh canh chả cá
            '24175e7d-f3f9-4d54-8220-06ca1ca97081', // Bánh canh ghẹ
            '3ae2472f-4976-4ab6-907b-45484064a3bc', // Bánh canh bột xát thịt vịt
            '9ed4d19f-5448-4d22-9b12-6e96cc62a371', // Bánh canh khoai mỡ
        ]
    },
]