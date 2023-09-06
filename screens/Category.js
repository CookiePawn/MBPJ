import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Button,
    ScrollView,
    StyleSheet,
    Dimensions
} from 'react-native';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import Swiper from 'react-native-swiper/src'
const { width } = Dimensions.get('window')



const ImageSlider = (props) => {
    return (
        <Swiper
            style={styles.wrapper}
            loop={true}
            index={0}
        >
            <View
                style={styles.slide}
            >
                <Text style={styles.slideText}>IT</Text>
                <TouchableOpacity onPress={() => props.navi.navigation.navigate("Recruitment", {title: 'IT'})}>
                    <Image style={styles.slideImage} source={require('../assets/it.jpg')} />
                </TouchableOpacity>
            </View>
            <View
                style={styles.slide}
            >
                <Text style={styles.slideText}>디자인</Text>
                <TouchableOpacity onPress={() => props.navi.navigation.navigate("Recruitment", {title: '디자인'})}>
                    <Image style={styles.slideImage} source={require('../assets/design.jpg')} />
                </TouchableOpacity>
            </View>
            <View
                style={styles.slide}
            >
                <Text style={styles.slideText}>회계</Text>
                <TouchableOpacity onPress={() => props.navi.navigation.navigate("Recruitment", {title: '회계'})}>
                    <Image style={styles.slideImage} source={require('../assets/accounting.jpg')} />
                </TouchableOpacity>
            </View>
            <View
                style={styles.slide}
            >
                <Text style={styles.slideText}>투자</Text>
                <TouchableOpacity onPress={() => props.navi.navigation.navigate("Recruitment", {title: '투자'})}>
                    <Image style={styles.slideImage} source={require('../assets/loading.png')} />
                </TouchableOpacity>
            </View>
        </Swiper>
    )
}





const Category = (props) => {


    return (
        <View style={styles.view}>
            <View style={styles.infoView}>
                <View style={styles.toolView}>
                    <TouchableOpacity onPress={() => props.navigation.navigate("TabNavigator")}>
                        <Icon name="arrow-back-circle-outline" size={30} color="white"/>
                    </TouchableOpacity>
                    <Icon name="arrow-back-circle-outline" size={30} color="#bb2649"/>
                </View>
                <View style={styles.profileView}>
                    <Image
                        style={styles.profile}
                        source={require('../assets/profile.png')}
                    />
                    <Text style={styles.nicknameText}>김우희 님</Text>
                </View>
                <View style={styles.toolView}> 
                    <TouchableOpacity onPress={() => props.navigation.navigate("TabNavigator", {screen:'User'})}>
                        <Icon name="notifications-outline" size={30} color="white"/>
                    </TouchableOpacity>
                    <Icon name="arrow-back-circle-outline" size={10} color="#bb2649"/>
                    <TouchableOpacity onPress={() => props.navigation.navigate("TabNavigator", {screen:'User'})}>
                        <Icon name="settings-outline" size={30} color="white"/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.categoryView}>
                <View style={styles.slideView}>
                    <ImageSlider
                        navi = {props}
                    /> 
                </View>
                <View style={{flex: 0.4, backgroundColor: 'lightskyblue'}}>

                </View>
            </View>
        </View>
    )
}

export default Category

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#bb2649',
    },
    
    




    //프로필

    infoView: {
        flex: 0.25,
        display: 'flex',
        flexDirection: 'row',
    },
    toolView: {
        flex: 0.25,
        position: 'relative',
        bottom: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileView: {
        flex: 0.5,
        display: 'flex',
        position: 'relative',
        top: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profile: {
        width: 90,
        height: 90,
        borderRadius: 100,
    },
    nicknameText: {
        fontSize: 23,
        fontWeight: 'bold',
        color: 'white',
    },


    //카테고리

    categoryView: {
        flex: 0.75,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowRadius: 4.65,
        shadowOffset: {
            width: 0,
            height: -2,
        },
        elevation: -2,
    }, 


    //카테고리 이미지 슬라이드
    slideView: {
        flex: 0.6,
        backgroundColor: '#1111'
    },
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
        height: '90%',
        borderRadius: 0,
    },
})