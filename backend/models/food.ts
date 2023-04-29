import { generateID } from "../utils"

export interface DBFood {
    _id: string,
    name: string,
    description: string,
    category: string,
    readyTime: number, //minutes
    rating: number,
    price: number,
    images: [string]
}

export const createFood = (foods: [DBFood], props: DBFood)=>{
    return {
        ...props,
        _id: generateID(foods),
    }   
}

const toFoods = [
    // Bún bò
    {
        name: 'Bún bò Huế Giò heo',
        description: 'Có giò nên hơi đắt, mấy đứa thông cảm',
        category: 'Món nước',
        readyTime: 5,
        rating: 4,
        price: 40,
        images: ['food_BunBoGioHeo.jpg']
    },
    
    {
        name: 'Bún bò Huế Tái Chả',
        description: 'Chả này chả bò',
        category: 'Món nước',
        readyTime: 5,
        rating: 4,
        price: 30,
        images: ['food_BunBoTaiCha.jpg']
    },
    
    {
        name: 'Bún bò Huế Chả cua',
        description: 'Chả này cua hơn đường Trường Sơn',
        category: 'Món nước',
        readyTime: 5,
        rating: 4,
        price: 40,
        images: ['food_BunBoChaCua.jpg']
    },
    
    // Quán chay
    {
        name: 'Chả giò chay',
        description: 'Trỏng toàn đậu xanh hông à',
        category: 'Chay',
        readyTime: 15,
        rating: 4,
        price: 15,
        images: ['food_ChaGioChay.jpg']
    },
    
    {
        name: 'Chả lụa chay',
        description: 'Mới mua ngoài chợ về, rắc thêm xíu muối',
        category: 'Chay',
        readyTime: 2,
        rating: 4,
        price: 10,
        images: ['food_ChaLuaChay.jpg']
    },
    
    {
        name: 'Đậu phụ non sốt Nấm Đông cô',
        description: 'Mại dô, món đặc biệt',
        category: 'Chay',
        readyTime: 10,
        rating: 4,
        price: 20,
        images: ['food_DauPhuNonSotNamDongCo.jpg']
    },
    
    {
        name: 'Đậu phụ sốt cà chua',
        description: 'Hương vị dân dẫ',
        category: 'Chay',
        readyTime: 10,
        rating: 4,
        price: 10,
        images: ['food_DauPhuSotCaChua.jpg']
    },
    
    {
        name: 'Hủ tiếu chay',
        description: 'Cho ai chán cơm thèm hủ tiếu',
        category: 'Chay',
        readyTime: 3,
        rating: 4,
        price: 15,
        images: ['food_HuTieuChay.jpg']
    },
    
    {
        name: 'Nấm kim châm xào chay',
        description: 'Ăn coi chừng thủng dạ dày',
        category: 'Chay',
        readyTime: 10,
        rating: 4,
        price: 15,
        images: ['food_NamKimChamXaoChay.jpg']
    },
    
    {
        name: 'Bánh bèo Huế',
        description: 'Nhỏ mà có võ',
        category: 'Bánh',
        readyTime: 5,
        rating: 4,
        price: 3,
        images: ['food_BanhBeo.jpg']
    },
    
    {
        name: 'Bánh bột lọc Huế',
        description: 'Vừa dài vừa dai, ai chả thích',
        category: 'Bánh',
        readyTime: 3,
        rating: 4,
        price: 4,
        images: ['food_BanhBotLoc.jpg']
    },
    
    {
        name: 'Bánh nậm Huế',
        description: 'Bánh tuổi thơ thôi chứ cũng không biết ngon gì',
        category: 'Bánh',
        readyTime: 3,
        rating: 4,
        price: 3,
        images: ['food_BanhNam.jpg']
    },
    
    {
        name: 'Bánh ram ít Huế',
        description: 'Bánh ni lạ quá',
        category: 'Bánh',
        readyTime: 5,
        rating: 4,
        price: 5,
        images: ['food_BanhRamIt.jpg']
    },
    
    {
        name: 'Bánh Xèo Huế',
        description: 'Bánh dày trong, giòn ngoài, xực xực với cọng giá, còn thịt đâu hổng thấy',
        category: 'Bánh',
        readyTime: 8,
        rating: 4,
        price: 5,
        images: ['food_BanhXeo.jpg']
    },
    
    // Quán mỳ quảng
    {
        name: 'Mỳ Quảng tôm thịt',
        description: 'Có tôm có thịt, à có trứng cút nữa',
        category: 'Món nước',
        readyTime: 8,
        rating: 4,
        price: 25,
        images: ['food_MyQuangTomThit.jpg']
    },
    
    {
        name: 'Mỳ Quảng gà',
        description: 'Gà mới được bứng từ trên núi về',
        category: 'Món nước',
        readyTime: 8,
        rating: 4,
        price: 25,
        images: ['food_MyQuangGa.jpg']
    },
    
    {
        name: 'Mỳ Quảng cá lóc',
        description: 'Cá cũng mới được bứng từ trên núi về',
        category: 'Món nước',
        readyTime: 8,
        rating: 3,
        price: 25,
        images: ['food_MyQuangCaLoc.jpg']
    },
    
    {
        name: 'Mỳ Quảng ếch',
        description: 'Ăn ngán trên bờ với dưới nước rồi thì mình ăn lưỡng cư',
        category: 'Món nước',
        readyTime: 8,
        rating: 4,
        price: 25,
        images: ['food_MyQuangEch.jpg']
    },
    
    {
        name: 'Bún riêu cua đồng',
        description: 'Nhiều nơi gọi là bún đỏ, có đậu phụ chiên nhưng không giòn đâu',
        category: 'Món nước',
        readyTime: 8,
        rating: 4,
        price: 20,
        images: ['food_BunRieuCuaDong.jpg']
    },
    
    // Quan Banh Canh
    {
        name: 'Bánh canh chả cá',
        description: 'bánh bột gạo, chả cá 5k 1 bịch ngoài chợ',
        category: 'Món nước',
        readyTime: 8,
        rating: 4,
        price: 15,
        images: ['food_BanhCanhChaCa.jpg']
    },
    
    {
        name: 'Bánh canh ghẹ',
        description: 'Ghẹ bánh canh nên hơi đắt',
        category: 'Món nước',
        readyTime: 8,
        rating: 4,
        price: 50,
        images: ['food_BanhCanhGhe.jpg']
    },
    
    {
        name: 'Bánh canh bột xắt thịt vịt',
        description: 'Đặc sản miền tây sông nước, nước đậm màu chứ không trong vắt, nhưng là hàng lậu',
        category: 'Món nước',
        readyTime: 8,
        rating: 4,
        price: 25,
        images: ['food_BanhCanhBotXatThitVit.jpg']
    },
    
    {
        name: 'Bánh canh khoai mỡ',
        description: 'Là Thanos nhưng bị cắt sợi',
        category: 'Món nước',
        readyTime: 8,
        rating: 4,
        price: 25,
        images: ['food_BanhCanhKhoaiMo.jpg']
    },

    // Banh cuon
    {
        name: 'Bánh cuốn thịt nấm tai mèo',
        description: 'Nhân nhiều ăn coi chừng đổ nước nhân',
        category: 'Bánh',
        readyTime: 8,
        rating: 4,
        price: 7,
        images: ['food_BanhCuonThitNam.jpg']
    },
    
    {
        name: 'Gỏi cuốn tôm',
        description: 'Tôm hơi bị ngọt. Nước mắm thì bớt đường lại rồi',
        category: 'Món nước',
        readyTime: 5,
        rating: 4,
        price: 8,
        images: ['food_GoiCuonTom.jpg']
    },

    // Seafood
    {
        name: 'Nghêu nướng mỡ hành',
        description: 'Hành được lấy từ Tây tạng nên hơi đắng',
        category: 'Hải sản',
        readyTime: 20,
        rating: 4,
        price: 12,
        images: ['food_NgheuNuongMoHanh.jpg']
    },

    {
        name: 'Mực hấp hành gừng',
        description: 'Như tên',
        category: 'Hải sản',
        readyTime: 20,
        rating: 4,
        price: 60,
        images: ['food_MucHapHanhGung.jpg']
    },

    {
        name: 'Bạch tuộc xào cay kiểu Hàn',
        description: 'Bạch tuộc 10 chân pk?',
        category: 'Hải sản',
        readyTime: 20,
        rating: 4,
        price: 50,
        images: ['food_BachTuocXaoCayHan.jpg']
    },

    {
        name: 'Lẩu thái hải sản',
        description: 'Nước cốt thịt, topping tôm sú, nghêu, mực',
        category: 'Hải sản',
        readyTime: 20,
        rating: 4,
        price: 100,
        images: ['food_LauThaiHaiSan.jpg']
    },
]