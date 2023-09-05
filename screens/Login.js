import {
    View, 
    Text,
    TextInput,
    TouchableOpacity,
    Animated,
    Image,
    StyleSheet,
    Platform,
} from 'react-native'
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
  
  
const Login = (props) => {

    //아이디 비번 저장
    const [id, setID] = useState();
    const [pw, setPW] = useState();


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
        <View style={{
            flex : 1,
            justifyContent : 'center',
            alignItems: 'center',}}>
            <View style = {styles.loginBox}>
                <CustomTextInput
                    text = '아이디'
                    icon = 'user'
                    lock = {false}
                    value = {id}
                    onChangeText = {(e) => setID(e)}
                />
                <CustomTextInput
                    text = '비밀번호'
                    icon = 'lock'
                    lock = {true}
                    value = {pw}
                    onChangeText = {(e) => setPW(e)}
                />
                <TouchableOpacity
                    style = {styles.loginBtn}
                    title = "Login"
                    onPress = {() => {
                    props.navigation.navigate('TabNavigator')}}
                >
                    <Text style = {{color: 'white', fontWeight: 'bold'}}>로그인</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style = {styles.signUpBtn}
                    title = "signUp"
                    onPress = {() => {
                    props.navigation.navigate('SignUp')}}
                >
                    <Text style = {{color: 'white', fontWeight: 'bold'}}>회원가입</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
  
  
  
  
  
  
  
    const CustomTextInput = (props) => {
        const [isFocused, setIsFocused] = useState(false);
    
        const handleFocus = () => {
            setIsFocused(true);
        };
    
        const handleBlur = () => {
            setIsFocused(false);
        };
        return (
        <View style={{ width: '95%', paddingTop: 10, marginBottom: 7, marginTop: 10 }}>
            <Text
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 10,
                    zIndex: 100,
                    backgroundColor: 'white',
                    paddingLeft: 7,
                    paddingRight: 7}}
            >
                {props.text}
            </Text>
            <View
                style={[{
                    borderWidth: 2,
                    borderColor: 'lightskyblue',
                    flexDirection: 'row',
                    borderRadius: 10,
                    paddingHorizontal: 5,
                    paddingTop: 5,
                }, isFocused ? styles.inputFocused : null,]}
            >
                <AntDesign
                    name = {props.icon}
                    size={20}
                    color="black"
                    style={{ margin: 5 }}
                />
                <TextInput
                    style = {styles.textInput}
                    underlineColorAndroid="transparent"
                    value = {props.value}
                    onChangeText = {props.onChangeText}
                    secureTextEntry={props.lock}
                    maxLength = {20}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </View>
        </View>
    );
};
  
  
  
  
  
  
  
  
  
  
  
  
  
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


    //로그인

    loginBox: {
        width: '98%',
        height: 290,
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: '#1111',
        borderWidth: 2,
        alignItems: 'center'
    },
    textInput: {
        width: '98%', 
        height: 40, 
        position: 'relative', 
        top: -2,
        borderWidth: 0,
        ...Platform.select({
            web: {
                outlineStyle: 'none',
            },
        }),
    },
    loginBtn: {
        width: '95%',
        height: 40,
        marginTop: 35,
        backgroundColor: 'lightskyblue',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center'
    },
    signUpBtn: {
        width: '95%',
        height: 40,
        marginTop: 5,
        backgroundColor: '#c9c9c9',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputFocused: {
        borderColor: 'black',
    },
})
  
  
  
  
  export default Login