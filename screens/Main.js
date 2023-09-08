import {
    View, 
    Text,
    TouchableOpacity,
    Animated,
    Image,
    StyleSheet,
    Dimensions,
    Linking,
} from 'react-native'
import React, { useEffect, useState } from 'react';
import Swiper from 'react-native-swiper/src'
const { width } = Dimensions.get('window')










const Main = (props) => {

    //로딩 이미지 애니메이션 초기값
    const positionX = new Animated.Value(0);
    const positionY = new Animated.Value(0);

    //로딩 이벤트
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 4000);


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

        //로딩 기능 초기화
        return () => {
            diagonalAnimation.stop();
            positionX.setValue(0); // Reset the animated values
            positionY.setValue(0);
        };
    }, []);

    if (isLoading) {
        return (
            <View>
                <Animated.View style={{ transform: [{ translateX: positionX }, { translateY: positionY }] }}>
                    <Image style={styles.image} source={require('../assets/loading.png')}/>
                </Animated.View>
                <Text style={styles.title}>SM {'\n'}KOREA</Text>
            </View>
        );
    }


    return (
        <View style={{flex:1}}>
            <View style={{flex: 0.9}}>
                <Text>main</Text>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => props.navigation.navigate("Category")}>
                    <Text>카테고리로 이동</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => props.navigation.navigate("LoginGuide")}>
                    <Text>로그인으로 이동</Text>
                </TouchableOpacity>    
            </View>
        </View>
        
    )
}

export default Main



const styles = StyleSheet.create({

    //로딩창
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



    //메인 페이지
    button: {
        margin: 50,
    },



})