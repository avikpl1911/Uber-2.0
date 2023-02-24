import { StyleSheet, Text, View,SafeAreaView, Touchable, TouchableOpacity } from 'react-native'
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_KEY} from "@env";
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import Navfavourites from './Navfavourites';
import { Icon } from 'react-native-elements';


const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Good Morning</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
         <View>
            <GooglePlacesAutocomplete
            placeholder='Where to?'
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={400}

            onPress={(data,detailes = null)=>{
               dispatch(setDestination({
                location:detailes.geometry.location,
                description:data.description
               }));
               navigation.navigate("RideOptionsCard");
            }}



            styles={{
                container:{
                    backgroundColor:"white",
                    paddingTop: 20,
                    flex: 0
                },
                textInput:{
                    backgroundColor:"#DDDDDF",
                    borderRadius:0,
                    fontSize: 18
                },
                textInputContainer:{
                    paddingHorizontal: 20,
                    padding: 0
                }
            }}
            enablePoweredByContainer={false}
            fetchDetails={true}
            minLength={2}
            query={{
                key: GOOGLE_MAPS_KEY,
                language:'en'
            }}
            />
         </View>
         <Navfavourites/>
      </View>
      <View
      style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t
      border-gray-100
      `}>
        <TouchableOpacity
        onPress={()=>navigation.navigate("RideOptionsCard")}
        style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
        >
            <Icon name="car" type="font-awesome" color="white" size={16} />
            <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}
        >
            <Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
            <Text style={tw`text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default NavigateCard

