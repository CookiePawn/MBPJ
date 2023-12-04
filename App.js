import {NavigationContainer} from '@react-navigation/native'

//네비게이터
import StackNavigator from './navigators/StackNavigator';



export default function App() {
    return (
        <NavigationContainer>
            <StackNavigator/>
        </NavigationContainer>
    );
}

