import {NavigationContainer} from '@react-navigation/native'


//네비게이터
import StackNavigator from './navigators/StackNavigator'
import DrawerNavigator from './navigators/DrawerNavigator';
import TabNavigator from './navigators/TabNavigator';




export default function App() {
    return (
        <NavigationContainer>
            <DrawerNavigator/>
        </NavigationContainer>
    );
}

