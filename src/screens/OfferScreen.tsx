import React, { useState, useEffect} from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, Alert } from 'react-native'
import { connect } from 'react-redux'
import { ApplicationState, FoodModel, ShoppingState, UserState, onGetOffer, OfferModel, onApplyOffer } from '../redux'

import { ButtonWithIcon, FoodCard, OfferCard, SearchBar } from '../components'
import { FlatList } from 'react-native-gesture-handler'


import { useNavigation } from '../utils'

interface OfferScreenProps{ 
    userReducer: UserState,
    shoppingReducer: ShoppingState,
    onGetOffer: Function,
    onApplyOffer: Function
 }


const _OfferScreen: React.FC<OfferScreenProps> = (props) => {

    const { navigate } = useNavigation()

    const { location, Cart, appliedOffer } = props.userReducer
    const { offers } = props.shoppingReducer

    useEffect(()=>{
        props.onGetOffer(location.postalCode)
    }, [])

    const onTapApplyOffer = (item: OfferModel)=>{
        let total = 0;

        if(Array.isArray(Cart)){
            Cart.map(food=>{
                total += food.price * food.unit
            })
        }

        const taxAmount = (total / 100 * 0.9) + 40 
        const orderAmount = taxAmount + total

        if (orderAmount >= item.minValue){
            props.onApplyOffer(item, false)
            showAlert('Offer Applied', `Offer Applied with discount of ${item.offerPercentage}%`)
        }else{
            showAlert('This Offer is not Applicable', `This offer is only applicable with minimum order amount ${item.minValue}`)
        }
    }

    const showAlert = (title: string, msg: string)=>{
        Alert.alert(
            title,
            msg,
            [
                {text: 'OK', onPress: ()=>{}}
            ]
        )
    }

    const onTapRemoveOffer = (item: OfferModel)=>{
        props.onApplyOffer(item, true)
    }

    const checkIfExist = (item: OfferModel)=>{
        if (appliedOffer._id !== undefined){
            return item._id.toString() === appliedOffer._id.toString()
        }
        return false
    }

    const [isEditing, setIsEditing] = useState(false)
    const [keyword, setKeyword] = useState('')

    const { availableFoods } = props.shoppingReducer;
  
    const onTapFood = (item: FoodModel) => {    
        navigate('FoodDetailPage', { food: item})
    }

    return (<View style={styles.container}>
        <View style={styles.navigation}> 
            <View style={{ display: 'flex', height: 60, justifyContent: 'space-between', flexDirection: 'row', 
                alignItems: 'center', marginLeft: 20, marginRight: 20}}>
                {/* <ButtonWithIcon 
                    icon={require('../images/back_arrow.png')}
                    onTap={()=> goBack()}
                    width={32}
                    height={38} /> */}
                <Text style={{ fontSize: 22, fontWeight: '600'}}>Offers & Deals</Text>
                
            </View>
        </View>

        <View style={styles.body}>
            {Array.isArray(offers) && <FlatList 
                showsVerticalScrollIndicator={false}
                data={offers}
                renderItem={({ item}) => <OfferCard 
                    item={item}
                    onTapRemove={onTapRemoveOffer}
                    onTapApply={onTapApplyOffer}  
                    isApplied={checkIfExist(item)}/> }
                keyExtractor={(item) => `${item._id}`}
            />}
            

        </View>
    </View>)
}


const styles = StyleSheet.create({
container: { flex: 1, backgroundColor: '#F2F2F2'},
navigation: { flex: 1,  marginTop: 43 },
body: { flex: 10, justifyContent: 'center', alignItems: 'center' },
footer: { flex: 1, backgroundColor: 'cyan' }
})



const mapStateToProps = (state: ApplicationState) => ({
    shoppingReducer: state.shoppingReducer,
    userReducer: state.userReducer
})


const OfferScreen = connect(mapStateToProps, {onGetOffer, onApplyOffer})(_OfferScreen)

 export { OfferScreen }