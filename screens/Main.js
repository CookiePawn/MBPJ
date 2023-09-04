import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import React from 'react';



const Main = (props) => {
    return (
        <View>
            <Text>main</Text>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => props.navigation.navigate("Category")}>
                <Text>카테고리로 이동</Text>
            </TouchableOpacity>
        </View>
        
    )
}

export default Main



const styles = StyleSheet.create({
    button: {
        margin: 50,
    },
})