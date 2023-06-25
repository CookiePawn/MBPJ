import {createDrawerNavigator} from '@react-navigation/drawer';
import React, { useState } from "react";

//네비게이터
import TabNavigator from './TabNavigator';
import StackNavigator from './StackNavigator'

//스크린
import Loading  from '../screens/Loading';
import Main from '../screens/Main';
import User from '../screens/User';


const Drawer = createDrawerNavigator();


const DrawerNavigator = () => {
    return (
        <Drawer.Navigator 
            initialRouteName="Loading"
        >
            <Drawer.Screen name="Loading" component={Loading}
                options = {{
                    title : '로딩',
                    headerShown : false,
                    headerLeft: null,
                    drawerLabel: () => null,
                }}
            />
            <Drawer.Screen name="Main" component={TabNavigator}/>
            <Drawer.Screen name="User" component={TabNavigator}/>
        </Drawer.Navigator>
    )
}


export default DrawerNavigator;