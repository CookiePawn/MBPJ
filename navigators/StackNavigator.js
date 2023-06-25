import {createStackNavigator} from '@react-navigation/stack';

//네비게이터
import TabNavigator from './TabNavigator';
import DrawerNavigator from './DrawerNavigator';

//스크린
import Loading  from '../screens/Loading';
import Main from '../screens/Main';

const Stack = createStackNavigator();


const StackNavigator = () => {
    return (
        <Stack.Navigator 
            initialRouteName='Loading'
        >
            <Stack.Screen name="Loading" component={Loading}
                options = {{
                    title : '로딩',
                    headerShown : false,
                    headerLeft: null,
                    //drawerLabel: () => null,
                }}
            />
            <Stack.Screen name='DrawerNavigator' component={DrawerNavigator}
                options = {{
                    title : '탭 네비게이터',
                    headerShown : false,
                    headerLeft: null
                }}
            />
        </Stack.Navigator>
    )
}


export default StackNavigator;