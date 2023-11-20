import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    TextInput,
    Keyboard
} from 'react-native'
import React, { useState, useEffect } from 'react'


//헤더
import Header from '../components/Header'


//DB
import { addLetter, loadUserSelect } from '../DB/LoadDB'



const LetterPage = (props) => {
    //로그인 확인
    const { params } = props.route;
    const num = params ? params.num : null;
    const id = params ? params.id : null;
    const pw = params ? params.pw : null;
    const name = params ? params.name : null;
    const email = params ? params.email : null;
    const phone = params ? params.phone : null;
    const image = params ? params.image : null;
    const people = params ? params.people : null;

    const [user, setUser] = useState([])

    useEffect(() => {
        const fetchUser = async () => {
            const users = await loadUserSelect(people)
            setUser(users)
        }
        fetchUser();
    }, [])

    const handleContainerPress = () => {
        // TextInput 이외의 부분을 터치했을 때 키보드를 내립니다.
        Keyboard.dismiss();
    };

    const [eInfo, setEInfo] = useState('')


    return (
        <View style={styles.mainView}>
            <Header
                navi={props}
                params={{
                    num: num,
                    id: id,
                    pw: pw,
                    phone: phone,
                    name: name,
                    email: email,
                    image: image,
                }}
                iconNameL1='arrow-back-outline'
                iconNameR1='notifications-outline'
                iconNameR2='home-outline'
                login={num}
                titleName='쪽지 쓰기'
            />
            <Text style={styles.peopleText}>받는 사람: {user.name}</Text>
            <TouchableOpacity style={styles.inputView} onPress={handleContainerPress}>
                <View>
                    <TextInput
                        style={styles.smallText}
                        placeholder='내용을 입력하세요'
                        value={eInfo}
                        onChangeText={(e) => { setEInfo(e) }}
                        maxLength={1000}
                        multiline={true}
                    />

                </View>
            </TouchableOpacity>



            <TouchableOpacity
                style={styles.chatBtn}
                onPress={async () => {
                    if (eInfo !== '') {
                        await addLetter(num, people, eInfo)
                        alert('쪽지를 보냈습니다')
                        props.navigation.navigate('Category', {
                            num: num,
                            id: id,
                            pw: pw,
                            phone: phone,
                            name: name,
                            email: email,
                            image: image,
                        })
                    } else {
                        alert('내용을 입력해주세요')
                    }
                }}
            >
                <Text style={styles.chatBtnText}>쪽지 전송</Text>
            </TouchableOpacity>
        </View>
    )
}



export default LetterPage;





const styles = StyleSheet.create({

    //메인 뷰
    mainView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },



    // 텍스트 입력 뷰
    inputView: {
        backgroundColor: '#f7f7f7',
        width: '90%',
        height: 580,
        borderRadius: '20'
    },

    // 텍스트 안내
    explanation: {
        fontSize: 16,
        marginLeft: 20,
        marginTop: 20,
        color: '#999999',
    },


    chatBtn: {
        backgroundColor: '#5552E2',
        height: 60,
        width: '90%',
        marginBottom: 20,
        marginTop: 10,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chatBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 600,
    },

    smallText: {
        color: '#767676',
        fontSize: 16,
        fontWeight: '400',
        marginBottom: 30,
        marginLeft: 20,
        marginTop: 20,
    },
    peopleText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color:'#767676',
    }
})