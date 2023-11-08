import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
} from 'react-native'
import { useState, useEffect } from 'react'

import Icon from 'react-native-vector-icons/Ionicons'


//선택 된 페이지 불러오기
import {
    Stat0,
    Stat1,
    Stat2,
} from '../components/Info-StartUp-edit/Stat'







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


    const [stat, setStat] = useState(0)




    return (
        <SafeAreaView style={styles.mainView}>
            <View style={styles.iconView}>
                <TouchableOpacity
                    style={[styles.icon, { left: 0, }]}
                    onPress={() => {
                        props.navigation.goBack()
                    }}
                >
                    <Icon name='arrow-back-outline' size={25} color='black' />
                </TouchableOpacity>
                <Text style={styles.titleText}>
                    내 스타트업
                </Text>
                <Icon name='notifications-outline' size={25} color='black' style={[styles.icon, { right: 0, }]} />
                <TouchableOpacity
                    style={[styles.icon, { right: 40, }]}
                    onPress={() => {
                        props.navigation.navigate('Category', {
                            num: num,
                            id: id,
                            pw: pw,
                            phone: phone,
                            name: name,
                            email: email,
                            image: image,
                        })
                    }}
                >
                    <Icon name='home-outline' size={25} color='black' />
                </TouchableOpacity>
            </View>
            <View style={styles.choiceView}>
                <TouchableOpacity
                    style={[styles.choiceBtn, { left: 0 }]}
                    onPress={() => {
                        setStat(0)
                    }}
                >
                    <Text style={[styles.choiceText, stat === 0 ? styles.selectedText : styles.unselectedText]}>스타트업 생성</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setStat(1)
                    }}
                >
                    <Text style={[styles.choiceText, stat === 1 ? styles.selectedText : styles.unselectedText]}>스타트업 수정</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.choiceBtn, { right: 0 }]}
                    onPress={() => {
                        setStat(2)
                    }}
                >
                    <Text style={[styles.choiceText, stat === 2 ? styles.selectedText : styles.unselectedText]}>소속 스타트업</Text>
                </TouchableOpacity>
            </View>
            {
                stat === 0 ? <Stat0 perID = {num} navi = {props} params = {{
                    num: num,
                    id: id,
                    pw: pw,
                    phone: phone,
                    name: name,
                    email: email,
                    image: image,
                }}/> :
                stat === 1 ? <Stat1 /> :
                <Stat2 perID ={num} navi = {props} params = {{
                    num: num,
                    id: id,
                    pw: pw,
                    phone: phone,
                    name: name,
                    email: email,
                    image: image,
                }}/>
            }

        </SafeAreaView>
    )
}




export default StartUpEdit






const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        alignItems: 'center',
    },


    //아이콘 뷰
    iconView: {
        width: '90%',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 30,
    },
    icon: {
        position: 'absolute',
        bottom: 0,
    },
    titleText: {
        position: 'absolute',
        bottom: 0,
        fontSize: 23,
        fontWeight: 'bold',
    },



    //선택 뷰
    choiceView: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    choiceBtn: {
        position: 'absolute',
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