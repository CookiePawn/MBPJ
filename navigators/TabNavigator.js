import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState, useEffect} from 'react';


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

    //메인 화면에서 로딩으로 인한 탭바 관리
    const [isTabBarVisible, setTabBarVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setTabBarVisible(true);
        }, 4000);
    }, []);


    return (
        <Tab.Navigator 
            initialRouteName = "Main"
            screenOptions={{
                headerShown: false,
                tabBarStyle: { display: isTabBarVisible ? 'flex' : 'none' },
            }}
        >
            <Tab.Screen name='Main' component={Main}/>
            <Tab.Screen name='User' component={User} options={{unmountOnBlur: true}}/>
        </Tab.Navigator>
    )
}


export default TabNavigator;