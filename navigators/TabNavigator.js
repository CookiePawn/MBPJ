import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, { useContext, useEffect } from "react";

//네비게이터
import StackNavigator from './StackNavigator'

//스크린
import Loading  from '../screens/Loading';
import Main from '../screens/Main';
import User from '../screens/User'
import Recruitment from '../screens/Recruitment'

const Tab = createBottomTabNavigator();


const TabNavigator = () => {
    return (
        <Tab.Navigator 
            initialRouteName = "Main"
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen name='Main' component={Main}/>
            <Tab.Screen name='User' component={User}/>
            <Tab.Screen name='Recruitment' component={Recruitment}/>
        </Tab.Navigator>
    )
}


export default TabNavigator;