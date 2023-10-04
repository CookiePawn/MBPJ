import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';



//스크린
import StartPage from '../screens/StartPage';
import PersonLogin from '../screens/Login-Person'
import PersonSignUp from '../screens/SignUp-Person'
import Category from '../screens/Category'
import MyPage from '../screens/MyPage';
import MyProfile from '../screens/MyProfile'
import Map from '../screens/Map';
import People from '../screens/People';
import Cofounder from '../screens/Cofounder';
import Team from '../screens/Team';
import PeopleInfo from '../screens/Info-People';
import Chatbot from '../screens/Chatbot';


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
            
            

            {/*미완성*/}
            <Stack.Screen name='Map' component={Map}/>
            <Stack.Screen name='People' component={People}/>
            <Stack.Screen name='PeopleInfo' component={PeopleInfo}/>
            <Stack.Screen name='Cofounder' component={Cofounder}/>
            <Stack.Screen name='Team' component={Team}/>
            <Stack.Screen name='MyPage' component={MyPage}/>
            <Stack.Screen name='MyProfile' component={MyProfile}/>
            <Stack.Screen name="Chatbot" component={Chatbot}/>
        </Stack.Navigator>
    )
}


export default StackNavigator;