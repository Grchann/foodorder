import React, { useEffect, useState} from 'react'
import { View, Text, StyleSheet, Dimensions , Image } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'

import { useNavigation } from '../utils'

import { connect } from 'react-redux'

import { ButtonWithIcon, CategoryCard, SearchBar, RestaurantCard, FoodCard } from '../components'


import { onAvailability, onSearchFoods ,UserState, ApplicationState, ShoppingState, Restaurant, FoodModel } from '../redux'
 
interface HomeProps{
    userReducer: UserState,
    shoppingReducer: ShoppingState,
    onAvailability: Function,
    onSearchFoods: Function
}

export const _HomeScreen: React.FC<HomeProps> = (props) => {
    

    const { navigate } = useNavigation()


    const { location } = props.userReducer;
    const { availability } = props.shoppingReducer;

    const { categories, foods, restaurants } = availability

 
    useEffect(() => {
        props.onAvailability(location.postalCode)
        setTimeout(() => {
            props.onSearchFoods(location.postalCode)
        }, 1000 )

    }, [, location])

    const onTapRestaurant = (item: Restaurant) => {
        navigate('RestaurantPage', { restaurant: item})
    }

    const onTapFood = (item: FoodModel) => {    
        navigate('FoodDetailPage', { food: item})
    }



    return (
        <View style={styles.container}>
            <View style={styles.navigation}> 
                <View style={{ marginTop: 50, flex: 4, backgroundColor: 'white', paddingLeft: 30, paddingRight: 20, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row'}}>
                    <Image source={require('../images/delivery_icon.png')} style={{width: 32, height: 32}} />
                    <Text style={{width: 280, marginRight: 5}}>{location.displayAddress} </Text> 
                    <ButtonWithIcon onTap={() => {navigate('LocationPage')}} icon={require('../images/edit_icon.png')} width={24} height={24} />

                </View>
                <View style={{ display: 'flex', height: 60, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', marginLeft: 4}}>
                    <SearchBar didTouch={() => {
                        navigate('SearchPage')
                    }}  onTextChange={() => {}} />
                    <ButtonWithIcon onTap={() => {}} icon={require('../images/settings_icon.png')} width={30} height={30} />
                </View>
            </View>
            
            <View style={styles.body}>
                <ScrollView>
                    <FlatList 
                        key='categories'
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={categories}
                        renderItem ={({ item }) =>  <CategoryCard item={item} onTap={() => { alert('Category tapped') }} /> } 
                        keyExtractor={(item) => `${item._id}`}
                    />
                    <View>
                        <Text style={{fontSize: 25, fontWeight: '600', color: '#f15b5d', marginLeft: 20 }} > Top Restaurants</Text>
                    </View>

                    <FlatList 
                        key='top_restaurants'
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={restaurants}
                        renderItem ={({ item }) =>  <RestaurantCard item={item} onTap={onTapRestaurant} /> } 
                        keyExtractor={(item) => `${item._id}`}
                    />

                    <View>
                        <Text style={{fontSize: 25, fontWeight: '600', color: '#f15b5d', marginLeft: 20 }} > 30 Minutes Foods</Text>
                    </View>
                    <FlatList 
                        key='foods'
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={foods}
                        renderItem ={({ item }) =>  <RestaurantCard item={item} onTap={onTapFood} /> } 
                        keyExtractor={(item) => `${item._id}`}
                    />
                    

                </ScrollView>

                 
            </View>
         </View>
    )

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    navigation: {
        flex: 2,
     },
    body: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center',
     },
    

})


const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer,
    shoppingReducer: state.shoppingReducer
})

const HomeScreen = connect(mapToStateProps, { onAvailability,  onSearchFoods })(_HomeScreen)

export { HomeScreen }