import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';



//스크린
import User from '../screens/User';
import StartPage from '../screens/StartPage';
import LoginGuide from '../screens/LoginGuide'
import PersonLogin from '../screens/Login-Person'
import CompanyLogin from '../screens/Login-Company'
import PersonSignUp from '../screens/SignUp-Person'
import CompanySignUp from'../screens/SignUp-Company'
import Recruitment from '../screens/Recruitment'
import RecruitmentInfo from '../screens/RecruitmentInfo'
import Category from '../screens/Category'

const Stack = createStackNavigator();


const StackNavigator = () => {
    return (
        <Stack.Navigator 
            initialRouteName='StartPage'
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name='StartPage' component={StartPage} options={{unmountOnBlur: true}}/>
            <Stack.Screen name='Category' component={Category} options={{unmountOnBlur: true}}/>
            <Stack.Screen name='LoginGuide' component={LoginGuide} options={{unmountOnBlur: true}}/>
            <Stack.Screen name='PersonLogin' component={PersonLogin} options={{unmountOnBlur: true}}/>
            <Stack.Screen name='CompanyLogin' component={CompanyLogin} options={{unmountOnBlur: true}}/>
            <Stack.Screen name='PersonSignUp' component={PersonSignUp} options={{unmountOnBlur: true}}/>
            <Stack.Screen name='CompanySignUp' component={CompanySignUp} options={{unmountOnBlur: true}}/>


            <Stack.Screen name='User' component={User} options={{unmountOnBlur: true}}/>
            <Stack.Screen name='Recruitment' component={Recruitment}/>
            <Stack.Screen name='Recruitmentinfo' component={RecruitmentInfo}/>
        </Stack.Navigator>
    )
}


export default StackNavigator;