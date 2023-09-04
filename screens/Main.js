import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import { Button } from 'react-native-web';


const Main = (props) => {
    return (
        <View>
            <Text>main</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("Category")}>
                카테고리로 이동
            </TouchableOpacity>
        </View>
        
    )
}

export default Main