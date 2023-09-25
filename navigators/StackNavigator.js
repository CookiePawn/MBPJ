import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';



//스크린
import StartPage from '../screens/StartPage';
import PersonLogin from '../screens/Login-Person'
import PersonSignUp from '../screens/SignUp-Person'
import Category from '../screens/Category'
import PersonUser from '../screens/User-Person';
import Map from '../screens/Map';



const Stack = createStackNavigator();


const StackNavigator = () => {
    return (
        <Stack.Navigator 
            initialRouteName='StartPage'
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name='StartPage' component={StartPage} options={{unmountOnBlur: true}}/>
            <Stack.Screen name='Category' component={Category} options={{unmountOnBlur: true}}/>
            <Stack.Screen name='PersonLogin' component={PersonLogin} options={{unmountOnBlur: true}}/>
            <Stack.Screen name='PersonSignUp' component={PersonSignUp} options={{unmountOnBlur: true}}/>
            <Stack.Screen name='PersonUser' component={PersonUser} options={{unmountOnBlur: true}}/>

            {/*미완성*/}
            <Stack.Screen name='Map' component={Map}/>
        </Stack.Navigator>
    )
}


export default StackNavigator;