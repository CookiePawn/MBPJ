import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';


//네비게이터
import TabNavigator from './TabNavigator';

//스크린
import Main from '../screens/Main'
import User from '../screens/User'
import Login from '../screens/Login'
import SignUp from '../screens/SignUp'
import Test from '../screens/Test'
import Recruitment from '../screens/Recruitment'
import RecruitmentInfo from '../screens/RecruitmentInfo'
import Category from '../screens/Category'

const Stack = createStackNavigator();


const StackNavigator = () => {
    return (
        <Stack.Navigator 
            initialRouteName='TabNavigator'
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name='TabNavigator' component={TabNavigator}
                options = {{
                    title : '탭 네비게이터',
                }}
            />
            <Stack.Screen name='Login' component={Login} options={{unmountOnBlur: true}}/>
            <Stack.Screen name='SignUp' component={SignUp} options={{unmountOnBlur: true}}/>
            <Stack.Screen name='Test' component={Test}/>
            <Stack.Screen name='Recruitment' component={Recruitment}/>
            <Stack.Screen name='Recruitmentinfo' component={RecruitmentInfo}/>
            <Stack.Screen name='Category' component={Category}/>
        </Stack.Navigator>
    )
}


export default StackNavigator;