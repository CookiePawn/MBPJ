import {createStackNavigator} from '@react-navigation/stack';

//네비게이터
import TabNavigator from './TabNavigator';

//스크린
import Loading  from '../screens/Loading';
import Main from '../screens/Main';
import Recruitment from '../screens/Recruitment'
import Category from '../screens/Category'

const Stack = createStackNavigator();


const StackNavigator = () => {
    return (
        <Stack.Navigator 
            initialRouteName='Loading'
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Loading" component={Loading}
                options = {{
                    title : '로딩',
                    headerShown : false,
                    headerLeft: null,
                    //drawerLabel: () => null,
                }}
            />
            <Stack.Screen name='TabNavigator' component={TabNavigator}
                options = {{
                    title : '탭 네비게이터',
                    headerShown : false,
                    headerLeft: null
                }}
            />
            <Stack.Screen name='Recruitment' component={Recruitment}/>
            <Stack.Screen name='Category' component={Category}/>
        </Stack.Navigator>
    )
}


export default StackNavigator;