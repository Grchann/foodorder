import React, { useState, useEffect} from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, Dimensions } from 'react-native'
import { FoodModel, OfferModel } from '../redux'
import { ButtonAddRemove } from './ButtonAddRemove'

interface OfferCardProps{ 
    item: OfferModel;
    onTapApply: Function;
    onTapRemove: Function;
    isApplied: boolean
 }
 
const OfferCard: React.FC<OfferCardProps> = ({ item, onTapApply, onTapRemove, isApplied }) => {
    
    return (
        <View style={styles.container}>

            <Image 
                source={{ uri: `${item.images[0]}`}} 
                style={{ 
                    width: Dimensions.get('screen').width -20, 
                    height: 200, 
                    borderRadius: 20, 
                    backgroundColor: '#EAEAEA'}} /> 
            <View style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                <View style={{ display: 'flex', flex: 7.5, padding: 10}}>
                    <Text style={{fontSize: 16, fontWeight: '700'} }>{item.title}</Text>
                    <Text style={{fontSize: 12}}>{item.description}</Text>
                </View>
                
                <View style={{ display: 'flex', flex: 4.5, padding: 10}}>
                    {isApplied ? 
                    <TouchableOpacity 
                        style={[styles.applyPromo, {backgroundColor: '#FF4673'}]}
                        onPress={()=>onTapRemove(item)}>
                        <Text style={{fontSize: 16, fontWeight: '600', color: '#FFF'}}>Remove</Text>
                    </TouchableOpacity> 
                    :
                    <TouchableOpacity 
                        style={styles.applyPromo}
                        onPress={()=>onTapApply(item)}>
                        <Text style={{fontSize: 16, fontWeight: '600', color: '#FFF'}}>Apply </Text>
                        <Text style={{fontSize: 13, fontWeight: '600', color: '#FFF'}}>{item.promoCode}</Text>
                    </TouchableOpacity>
                    }
                    
                </View>
            </View> 
        </View>
    )
}


const styles = StyleSheet.create({
    container: {     
        display: 'flex',
        flex: 1, 
        width: Dimensions.get('screen').width - 20,
        margin: 10,
        borderRadius: 20,
        backgroundColor: '#EFCA5F',
        height: 270,
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        flexDirection: 'column'
        
        

    },
    navigation: { flex: 2, backgroundColor: 'red' },
    body: { flex: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: 'yellow' },
    footer: { flex: 1, backgroundColor: 'cyan' },
    applyPromo: {
        flexDirection: 'row',
        backgroundColor: '#8FC777',
        padding: 10,
        paddingLeft: 25,
        paddingRight: 25,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export { OfferCard }