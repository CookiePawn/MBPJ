import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native'
import React, { useState, useEffect } from 'react'


import { useIsFocused } from '@react-navigation/native';

//헤더
import Header from '../components/Header';

//DB
import { loadLetterSelect, deleteLetter, loadUserSelect } from '../DB/LoadDB'



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


    //DB
    const [letter, setLetter] = useState([])

    const isFocused = useIsFocused();



    useEffect(() => {
        const fetchLetter = async () => {
            const letters = await loadLetterSelect(people)
            setLetter(letters)
        }

        fetchLetter()
       
    }, [isFocused])

    useEffect(()=> {
        const fetchUser = async () => {
            if(letter && letter.toID) {
                const users = await loadUserSelect(letter.toID)
                setUser(users)   
            } 
        }     
        fetchUser()
    }, [letter])







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
                iconNameR1='notifications-outline'
                iconNameR2='home-outline'
                login = {num}
                titleName='쪽지'
            />
            <Text style= {styles.peopleText}>보낸사람: {user.name}</Text>
            <View style={styles.inputView}>
                <ScrollView
                    style={{ width: '90%' }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.textView}>
                        <Text style={styles.smallText}>{letter.content}</Text>
                    </View>
                </ScrollView>
            </View>

 
            <View style={styles.btnView}>
                <TouchableOpacity 
                    style={styles.chatBtn1}
                    onPress={async() => {
                        props.navigation.navigate('LetterPage', {
                            num: num,
                            id: id,
                            pw: pw,
                            phone: phone,
                            name: name,
                            email: email,
                            image: image,
                            people: letter.toID,
                        })
                    }}
                >
                    <Text style = {styles.chatBtnText}>답장하기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.chatBtn}
                    onPress={async() => {
                        alert('쪽지가 삭제되었습니다')
                        await deleteLetter(letter.id)
                        props.navigation.navigate('AlertPage', {
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
                    <Text style={styles.chatBtnText1}>삭제</Text>
                </TouchableOpacity>
            </View>
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

    

    inputView: {
        backgroundColor: '#f1f1f1',
        flex: 1,
        width: '90%',
        borderRadius: '10',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#d9d9d9',
    },

    textView: {
        backgroundColor: '#f1f1f1',
        borderRadius: '40',
        width: '100%',
        marginTop: 20,
    },

    chatBtn: {
        backgroundColor: '#d9d9d9',
        height: 60,
        width: '24%',
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 300,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto'
    },
    chatBtn1: {
        backgroundColor: '#5552E2',
        height: 60,
        width: '72%',
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 'auto'
    },
    chatBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 600,
    },
    chatBtnText1: {
        color: '#767676',
        fontSize: 16,
        fontWeight: 600,
    },

    smallText: {
        color: '#767676',
        fontSize: 16,
        fontWeight: '400',
    },


    btnView: {
        flexDirection: 'row',
        width: '90%',
    },
    peopleText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color:'#767676',
    },
})