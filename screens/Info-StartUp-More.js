import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import { useState, useEffect} from 'react'


//헤더
import Header from '../components/Header'


//선택 된 페이지 불러오기
import {
    Stat0,
    Stat1,
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


    const [stat, setStat] = useState(1)

    const [location, setLocation] = useState('')

    useEffect(() => {

        if(props.route.params?.address) {
            setLocation(props.route.params.address)
        }

    }, [props.route.params.address]); // 의존성 배열에 route.params를 추가합니다.




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
                    location : location
                }}
                iconNameL1='arrow-back-outline'
                iconNameR1='notifications-outline'
                iconNameR2='home-outline'
                login = {num}
                titleName='내 스타트업'
            />
            
            <View style={styles.choiceView}>
                <TouchableOpacity
                    style={[styles.choiceBtn, { right: 0 }]}
                    onPress={() => {
                        setStat(1)
                    }}
                >
                    <Text style={[styles.choiceText, stat === 1 ? styles.selectedText : styles.unselectedText]}>소속 스타트업</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.choiceBtn, { left: 0 }]}
                    onPress={() => {
                        setStat(0)
                    }}
                >
                    <Text style={[styles.choiceText, stat === 0 ? styles.selectedText : styles.unselectedText]}>스타트업 생성</Text>
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
                    location : location
                }}/> : <Stat1 perID ={num} navi = {props} params = {{
                    num: num,
                    id: id,
                    pw: pw,
                    phone: phone,
                    name: name,
                    email: email,
                    image: image,
                }}/>
                
            }

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