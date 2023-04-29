import React, { useState, useEffect, createRef} from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { ApplicationState, onGetOrder, OrderModel, UserState } from '../redux'

import { ButtonWithIcon, FoodCard, FoodCardInfo, SearchBar, ButtonWithTitle } from '../components'
import { FlatList, ScrollView } from 'react-native-gesture-handler'

import PaymentTypePopup from 'react-native-raw-bottom-sheet'

import { checkExistence, useNavigation } from '../utils'
import { OrderCard } from '../components/OrderCard'

interface OrderScreenProps{ 
    userReducer: UserState,
    onGetOrder: Function
    navigation: {getParam: Function, goBack: Function}
 }


const _OrderScreen: React.FC<OrderScreenProps> = (props) => {

    const {goBack} = props.navigation
    const { navigate } = useNavigation()
 
    const { user, orders } = props.userReducer;

    // console.log('Available Orders: ', JSON.stringify(orders))

    useEffect(() => {
        props.onGetOrder(user)
    },[]);

    const onTapOrder = (order: OrderModel)=>{
        navigate('OrderDetailPage', {order})
    }
    
    const orderView = ()=>{
        return (
            <View style={styles.container}>
                <View style={styles.navigation}> 
                    <View style={{ display: 'flex', height: 60, justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginRight: 20,}}>
                        <ButtonWithIcon 
                            icon={require('../images/back_arrow.png')}
                            onTap={()=> goBack()}
                            width={32}
                            height={38} />
                        <Text style={{ fontSize: 22, fontWeight: '600', marginLeft: 30}}>My Orders</Text>
                        
                    </View>
                </View>

                <View style={styles.body}>

                    <FlatList 
                        showsVerticalScrollIndicator={false}
                        data={orders}
                        renderItem={({ item}) => <OrderCard 
                            item={item}
                            onTap={()=>onTapOrder(item)}
                        /> }
                        keyExtractor={(item) => `${item._id}`}
                    />  
                
                </View>
                <View style={styles.footer}>
                    
                </View>

            </View>
        )
    }

    if(orders.length > 0){
        return orderView();
        

    }else{

        return (
            <View style={styles.container}>
                <View style={styles.navigation}> 
                    <View style={{ display: 'flex', height: 60, justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginRight: 20,}}>
                        <ButtonWithIcon 
                            icon={require('../images/back_arrow.png')}
                            onTap={()=> goBack()}
                            width={32}
                            height={38} />
                        <Text style={{ fontSize: 22, fontWeight: '600', marginLeft: 30}}>My Orders</Text>
                    </View>
                </View>
                <View style={styles.body}>
                    <Text style={{fontSize: 25, fontWeight: '600'}}> Your Order is Empty</Text>
                </View>
                
            </View>
        )
         
    } 
    
 
}


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F2F2F2'},
    navigation: { flex: 1,  marginTop: 43, },
    body: { flex: 9, justifyContent: 'center', alignItems: 'center' },
    footer: { flex: 2, justifyContent: 'center', paddingLeft: 10, paddingRight: 10 },
    amountDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        margin: 5,
    },
    paymentView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        margin: 5,
        backgroundColor: '#E3BE74'
    },
    paymentOptions: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20
    },
    options: {
        display: 'flex',
        height: 120,
        width: 160,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 10,
        borderColor: '#A0A0A0',
        backgroundColor: '#F2F2F2',
        borderWidth: 0.2,
        borderRadius: 10,
        margin: 10
    },
    optionText: {
        fontSize: 16, 
        fontWeight: '600', 
        color: '#545252'
    },
    icon: {
        width: 115,
        height: 80
    },

})



const mapStateToProps = (state: ApplicationState) => ({
    shoppingReducer: state.shoppingReducer,
    userReducer: state.userReducer
})


const OrderScreen = connect(mapStateToProps, {onGetOrder})(_OrderScreen)

 export { OrderScreen }