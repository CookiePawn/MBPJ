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








//광고
const ImageSlider = (props) => {
    const openInstagram = (name) => {
        const homepageUrl = `https://www.instagram.com/${name}`; // 홈페이지 URL을 여기에 입력하세요.
        Linking.openURL(homepageUrl)
        .then((supported) => {
            if (!supported) {
                console.log(`URL을 열 수 없습니다: ${homepageUrl}`);
            } else {
                console.log(`URL을 엽니다: ${homepageUrl}`);
            }
        })
        .catch((error) => {
            console.error('URL 열기 오류:', error);
        });
    };

    return (
        <Swiper
            style={styles.wrapper}
            loop={true}
            index={0}
            autoplay={true}
        >
            <View
                style={styles.slide}
            >
                <TouchableOpacity onPress={() => openInstagram('stupic.s')}>
                    <Image style={styles.slideImage} source={require('../assets/main/1.png')} />
                </TouchableOpacity>
            </View>
            <View
                style={styles.slide}
            >
                <TouchableOpacity onPress={() => openInstagram('whitepaper_hwan')}>
                    <Image style={styles.slideImage} source={require('../assets/main/2.png')} />
                </TouchableOpacity>
            </View>
            <View
                style={styles.slide}
            >
                <TouchableOpacity onPress={() => openInstagram('woo_is_stupid')}>
                    <Image style={styles.slideImage} source={require('../assets/main/3.png')} />
                </TouchableOpacity>
            </View>
            <View
                style={styles.slide}
            >
                <TouchableOpacity onPress={() => openInstagram('anjuncheorl')}>
                    <Image style={styles.slideImage} source={require('../assets/main/4.png')} />
                </TouchableOpacity>
            </View>
        </Swiper>
    )
}






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
                    onPress={() => props.navigation.navigate("Test")}>
                    <Text>테스트로 이동</Text>
                </TouchableOpacity>    
            </View>
            <View style={{flex: 0.1, backgroundColor: 'lightskyblue', borderWidth: 5, borderColor: 'blue'}}>
                <ImageSlider
                    navi = {props}
                />
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




    //광고
    wrapper: { 
    },
    slide: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    slideText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#bb2649',
        marginTop: 30,
        marginBottom: 10,
    },
    slideImage: {
        width,
        height: '100%',
        borderRadius: 0,
    },
})