import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
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
            <TouchableOpacity 
                style={styles.button}
                onPress={() => props.navigation.navigate("Login")}>
                <Text>로그아웃</Text>
            </TouchableOpacity>
        </View>
        
    )
}

export default Main



const styles = StyleSheet.create({

    //메인 페이지
    button: {
        margin: 50,
    },
})