import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';


//네비게이터
import StackNavigator from './StackNavigator'

//스크린
import Main from '../screens/Main'
import User from '../screens/User'
import Login from '../screens/Login'
import Recruitment from '../screens/Recruitment'
import RecruitmentInfo from '../screens/RecruitmentInfo'
import Category from '../screens/Category'

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
        </Tab.Navigator>
    )
}


export default TabNavigator;