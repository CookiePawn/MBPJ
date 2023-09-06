import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import React from 'react';



const User = (props) => {
    return (
        <View>
            <Text>User</Text>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => props.navigation.navigate("Login")}>
                <Text>로그인</Text>
            </TouchableOpacity>   
            <TouchableOpacity 
                style={styles.button}
                onPress={() => props.navigation.navigate("Login")}>
                <Text>로그아웃</Text>
            </TouchableOpacity>  
        </View>
        
    )
}

export default User



const styles = StyleSheet.create({
    //사용자 페이지
    button: {
        margin: 50,
    },
})