import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Animated
} from 'react-native'
import React from 'react';




const Loading = (props) => {


    //로딩 이미지 애니메이션 초기값
    const positionX = new Animated.Value(0);
    const positionY = new Animated.Value(0);

    

    //로딩 이미지 애니메이션
    const diagonalAnimation = Animated.loop(
        Animated.parallel([
            Animated.timing(positionX, {
                toValue: -300,
                duration: 20000,
                useNativeDriver: true,
            }),
            Animated.timing(positionY, {
                toValue: -100,
                duration: 20000,
                useNativeDriver: true,
            }),
        ])
    );
    diagonalAnimation.start();


    window.onload = pageLoad;
    function pageLoad(){
        props.navigation.navigate('TabNavigator')
    };

    

    return (
        <TouchableOpacity onPress={() => (props.navigation.navigate('TabNavigator'))}>
            <Animated.View style={{ transform: [{ translateX: positionX }, { translateY: positionY }] }}>
                <Image style={styles.image} source={require('../assets/loading.png')}/>
            </Animated.View>
            <Text style={styles.title}>SM {'\n'}KOREA</Text>
        </TouchableOpacity>
        
    )
}



const styles = StyleSheet.create({
    image : {
        width: 750,
        height: 1624,
    },
    title : {
        position: 'absolute',
        bottom: 820,
        left: 10,
        fontSize: 35,
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 16,
        marginBottom: 16,
    },
})








export default Loading


