import { generateID } from "../utils"

export interface DBCategory{
    _id: string,
    title: string,
    icon: string
}

export const createCategory = (categories: [DBCategory], props: DBCategory)=>{
    return {
        ...props,
        _id: generateID(categories),
    }
}

const toCategories = [
    {
        title: 'Chay',
        icon: 'category_Chay.jpg'
    },

    {
        title: 'Bánh truyền thống',
        icon: 'category_BanhTruyenThong.jpg'
    },

    {
        title: 'Hải sản',
        icon: 'category_HaiSan.jpg'
    },

    {
        title: 'Món nước',
        icon: 'category_MonNuoc.jpg'
    },
]

