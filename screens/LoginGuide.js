import {
    View,
    Text,
    StyleSheet,
    Image, 
    Dimensions,
    TouchableOpacity,
} from 'react-native'
import React, { Component, useState } from 'react'
import Swiper from 'react-native-swiper/src'
const { width } = Dimensions.get('window')


const StartPage = (props) => {

    //현재 페이지 상태
    const [currentIndex, setCurrentIndex] = useState(0);
    const [buttonText, setButtonText] = useState('개인회원 로그인 바로가기');


    return (
        <View style={{
            flex: 1, 
            backgroundColor: '#181420'
        }}>
            <View style={styles.imageSlideView}>
                <Swiper
                    style={styles.wrapper}
                    loop={false}
                    dotStyle={{ backgroundColor: '#D9D9D9' }}
                    activeDotStyle={{ width: 30, backgroundColor: '#5552E2' }}
                    onIndexChanged={(index) => {
                        setCurrentIndex(index);
                        switch (index) {
                            case 0:
                                setButtonText('개인회원 로그인 바로가기');
                                break;
                            case 1:
                                setButtonText('기업회원 로그인 바로가기');
                                break;
                            default:
                                // 기타 경우 처리
                                break;
                        }
                    }}
                >
                    <View
                        style={styles.slide}
                    >
                        <Image style={styles.image} source={require('../assets/start-solo.png')} />
                        <Text style={styles.text}>개인 회원이에요!</Text>
                    </View>
                    <View
                        style={styles.slide}
                    >
                        <Image style={styles.image} source={require('../assets/start-enter.png')} />
                        <Text style={styles.text}>기업 회원이에요!</Text>
                    </View>
                </Swiper>
            </View>
            <View style={styles.buttonView}>
                <TouchableOpacity 
                    style={styles.startButton}
                    onPress={() => {
                        switch (currentIndex) {
                            case 0:
                                props.navigation.navigate('PersonLogin')
                                break;
                            case 1:
                                props.navigation.navigate('CompanyLogin')
                                break;
                            default:
                                // 기타 경우 처리
                                break;
                        }
                    }}
                >
                    <Text style={styles.buttonText}>{buttonText}</Text>
                </TouchableOpacity>
            </View>
        </View>    
    )
}

export default StartPage


const styles = StyleSheet.create({
    //시작 페이지
    imageSlideView: {
        flex: 0.9,
    },
    buttonView: {
        flex: 0.1,
        alignItems: 'center',
    },


    //이미지 슬라이드
    wrapper: {},
    slide: {
        height: '75%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    image: {
        width,
        flex: 1,
    },
    paginationStyle: {
        height: '50%',
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    paginationText: {
        color: 'white',
        fontSize: 20
    },


    //시작 버튼
    startButton: {
        width: '90%',
        height: '70%',
        backgroundColor: '#5552E2',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
})