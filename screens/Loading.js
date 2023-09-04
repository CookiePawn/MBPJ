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

    return (
        <TouchableOpacity onPress={() => (props.navigation.navigate('TabNavigator'))}>
            <Animated.View style={{ transform: [{ translateX: positionX }, { translateY: positionY }] }}>
                <Image style={styles.image} source={require('../assets/loading.png')}/>
            </Animated.View>
            <Text style={styles.title}>SM {'\n'}KOREA</Text> 
            <Text style={styles.info}>
                CNFT 빅데이터를 분석 & 가공한 구독 시스템{'\n'}
                분야별로 투자 할 수 있는 펀드 서비스 제공{'\n'}
                CNFT 시장 활성화를 위한 다양한 컨텐츠 제공
            </Text> 
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
    info : {
        position: 'absolute',
        bottom: 750,
        left: 10,
        fontSize: 13,
        color: 'white',
        marginLeft: 16,
        marginBottom: 16,
    }
})








export default Loading


