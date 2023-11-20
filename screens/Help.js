import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import React, { useState, useEffect } from 'react'


//db 로드
import { updateStartUpStep } from '../DB/LoadDB'



const Help = (props) => {
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
                    도움말
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
            
            <View style = {styles.helpView1}>
                <Text style = {styles.mainText}>사람과 스타트업을 추천해드려요</Text>
                <Text style = {styles.subText}>추천을 활용해보세요</Text>
            </View>

            <View style = {styles.helpView}>
                <Text style = {styles.mainText}>창업이 처음이신가요?</Text>
                <Text style = {styles.subText}>창업을 시작하는 멤버를 구할 때 공동 창업자 모집을 활용하세요</Text>
            </View>
            
            <View style = {styles.helpView}>
                <Text style = {styles.mainText}>팀원이 필요하신가요?</Text>
                <Text style = {styles.subText}>팀원 모집을 사용하여 팀원을 구해보세요</Text>
            </View>

            <View style = {styles.helpView}>
                <Text style = {styles.mainText}>AI가 점수를 매겨드려요</Text>
                <Text style = {styles.subText}>개인 또는 스타트업에 대한 점수를 AI가 계산하여 알려드립니다</Text>
            </View>

            <View style = {styles.helpView}>
                <Text style = {styles.mainText}>그래프를 통해 정보를 얻어가세요</Text>
                <Text style = {styles.subText}>정보를 분석하여 그래프로 알려드립니다</Text>
            </View>

            <View style = {styles.helpView}>
                <Text style = {styles.mainText}>쪽지를 활용하세요</Text>
                <Text style = {styles.subText}>관심이 생긴 사람, 스타트업에게 쪽지를 보내보세요</Text>
            </View>

            <View style = {styles.helpView}>
                <Text style = {styles.mainText}>내 주변에 있는 개인, 기업을 확인하세요</Text>
                <Text style = {styles.subText}>내 위치를 기준으로 주변에 있는 개인과 기업을 확인하세요</Text>
            </View>

        </View>

    )
}



export default Help





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
    

    helpView1: {
        backgroundColor: 'white',
        width: '90%',
        height: 50,
        marginBottom: 50,
        marginTop: 10
    },
    helpView: {
        backgroundColor: 'white',
        width: '90%',
        height: 50,
        marginBottom: 50
    },


    mainText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    subText: {
        fontSize: 16,
        color: '#767676',
        marginTop: 10
    }
})