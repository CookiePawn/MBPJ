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
                >
                    <View
                        style={styles.slide}
                    >
                        <Image style={styles.image} source={require('../assets/start-thinking.png')} />
                        <Text style={styles.text}>협업할 사람을 찾기</Text>
                        <Text style={styles.text}>힘드신가요?</Text>
                        <Text style={styles.subText}>간단하게 사람을 찾아보세요!</Text>
                    </View>
                    <View
                        style={styles.slide}
                    >
                        <Image style={styles.image} source={require('../assets/start-enter.png')} />
                        <Text style={styles.text}>내 전문 분야를</Text>
                        <Text style={styles.text}>등록하세요!</Text>
                        <Text style={styles.subText}>한 눈에 내 능력을 뽐내세요!</Text>
                    </View>
                    <View
                        style={styles.slide}
                    >
                        <Image style={styles.image} source={require('../assets/start-popular.png')} />
                        <Text style={styles.text}>인기있는 기업을</Text>
                        <Text style={styles.text}>추천해드립니다!</Text>
                        <Text style={styles.subText}>더 다양한 기업을 보세요!</Text>
                    </View>
                </Swiper>
            </View>
            <View style={styles.buttonView}>
                <TouchableOpacity
                    style={styles.startButton}
                    onPress={() => {
                        props.navigation.navigate('Category')
                    }}
                >
                    <Text style={styles.buttonText}>시작하기</Text>
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
        fontSize: 32,
        fontWeight: 'bold',
    },
    subText: {
        color: '#fff',
        fontSize: 14,
        marginTop: 12,
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