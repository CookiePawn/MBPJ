import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
} from 'react-native'
import { useState, useEffect } from 'react'

import Icon from 'react-native-vector-icons/FontAwesome5'

//헤더
import Header from '../components/Header'

//선택 된 페이지 불러오기
import {
    Stat1,
} from '../components/Team-edit/Stat'







const StartUpEdit = (props) => {
    //로그인 확인
    const { params } = props.route;
    const num = params ? params.num : null;
    const id = params ? params.id : null;
    const pw = params ? params.pw : null;
    const name = params ? params.name : null;
    const email = params ? params.email : null;
    const phone = params ? params.phone : null;
    const image = params ? params.image : null;





    return (
        <View style={styles.mainView}>
            <Header
                navi = {props}
                params = {{
                    num: num,
                    id: id,
                    pw: pw,
                    phone: phone,
                    name: name,
                    email: email,
                    image: image,
                }}
                iconNameL1='arrow-back-outline'
                iconNameR1='notifications'
                iconNameR2='home'
                login = {num}
                titleName='스타트업 선택'
            />
            
            <Stat1 perID={num} navi={props} params={{
                num: num,
                id: id,
                pw: pw,
                phone: phone,
                name: name,
                email: email,
                image: image,
            }} />


        </View>
    )
}




export default StartUpEdit






const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },


   



    //선택 뷰
    choiceView: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    choiceBtn: {
        marginLeft: 30,
        marginRight: 30,
    },
    choiceText: {
        fontSize: 16,
        fontWeight: 600,
    },
    selectedText: {
        color: 'black', // 선택된 상태의 글자 색상
    },
    unselectedText: {
        color: '#DDD', // 선택되지 않은 상태의 글자 색상
    },

})