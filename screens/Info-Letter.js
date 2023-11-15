import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import React, { useState, useEffect } from 'react'


import { useIsFocused } from '@react-navigation/native';

//DB
import { loadLetterSelect, deleteLetter } from '../DB/LoadDB'



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







    return (
        <View style={styles.mainView}>
            <View style={styles.titleView}>
                <TouchableOpacity
                    style={[styles.icon, { left: 0, }]}
                    onPress={() => {
                        props.navigation.goBack()
                    }}
                >
                    <Icon name='arrow-back-outline' size={25} color='black' />
                </TouchableOpacity>
                <Text style={styles.titleText}>
                    쪽지
                </Text>
                <TouchableOpacity
                    style={[styles.icon, { right: 0, }]}
                    onPress={() => {
                        if (num == null) {
                            props.navigation.navigate('PersonLogin')
                        } else if (num != null) {
                            props.navigation.navigate('AlertPage', {
                                num: num,
                                id: id,
                                pw: pw,
                                phone: phone,
                                name: name,
                                email: email,
                                image: image,
                            })
                        }
                    }}
                >
                    <Icon name='notifications-outline' size={25} color='black' />
                </TouchableOpacity>
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
                    style={[styles.chatBtn, { width: '100%' }]}
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
                    <Text style={styles.chatBtnText}>삭제하기</Text>
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

    //아이콘 뷰
    titleView: {
        width: '90%',
        height: 100,
        alignItems: 'center',
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

    inputView: {
        backgroundColor: '#f1f1f1',
        flex: 1,
        width: '90%',
        borderRadius: '20',
        alignItems: 'center',
    },

    textView: {
        backgroundColor: '#f1f1f1',
        borderRadius: '40',
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
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
        marginTop: 10,
        marginBottom: 20,
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
    },


    btnView: {
        flexDirection: 'row',
        width: '90%',
        height: 100,
    },
    chatBtn: {
        backgroundColor: '#5552E2',
        height: 60,
        width: '47%',
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    },
    chatBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 600,
    }
})