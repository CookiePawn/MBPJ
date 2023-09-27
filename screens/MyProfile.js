import { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import db from '../DB/FireBase'
import { doc, updateDoc } from 'firebase/firestore';




const MyProfile = (props) => {
    //로그인 확인
    const { params } = props.route;
    const num = params ? params.num : null;
    const id = params ? params.id : null;
    const pw = params ? params.pw : null;
    const name = params ? params.name : null;
    const email = params ? params.email : null;
    const phone = params ? params.phone : null;

    //개인정보 수정
    const [rePw, setRePw] = useState('')



    const infoChange = async () => {
        try {
            // Firestore에서 해당 문서의 참조 가져오기
            const userDocRef = doc(db, 'PersonLogin', num);

            await updateDoc(userDocRef, {perPW: rePw});
            alert('개인정보가 변경되었습니다!')
        } catch (error) {
            console.error('비밀번호 업데이트 오류:', error);
        }
    };











    return (
        <View style={styles.mainView}>
            <View style={styles.titleView}>
                <TouchableOpacity
                    style={[styles.icon, {left: 0,}]}
                    onPress={()=>{
                        props.navigation.goBack()
                    }}
                >
                    <Icon name='arrow-back-outline' size={25} color='black'/>
                </TouchableOpacity>
                <Text style={styles.titleText}>
                    내 프로필
                </Text>
                <Icon name='notifications-outline' size={25} color='black' style={[styles.icon, {right: 0,}]}/>
                <TouchableOpacity
                    style={[styles.icon, {right: 40,}]}
                    onPress={()=>{
                        props.navigation.navigate('Category', {
                            num: num,
                            id: id,
                            pw: pw,
                            phone: phone,
                            name: name,
                            email: email,
                        })
                    }}
                >
                    <Icon name='home-outline' size={25} color='black'/>
                </TouchableOpacity>
            </View>
            <View style={styles.profileView}>
                <Image 
                    style={styles.image} 
                    source={require('../assets/peopleImage/moohee.png')}
                />
                <TouchableOpacity 
                    style={styles.imageBtn}
                >
                    <Text style={styles.imageBtnText}>사진 변경</Text>    
                </TouchableOpacity>
            </View>
            <View style={styles.changeProfileView}>
                <Text style={styles.changeProfileTitle}>개인정보 변경</Text>
                <View style={styles.changeProfileSubView}>
                    <Text style={styles.changeProfileSubTitle}>이름</Text>
                    <Text style={styles.changeProfileSubInfo}>{name}</Text>
                </View>
                <View style={styles.changeProfileSubView}>
                    <Text style={styles.changeProfileSubTitle}>전화번호</Text>
                    <Text style={styles.changeProfileSubInfo}>{phone}</Text>
                </View>
                <View style={styles.changeProfileSubView}>
                    <Text style={styles.changeProfileSubTitle}>이메일</Text>
                    <Text style={styles.changeProfileSubInfo}>{email}</Text>
                </View>
                <Text style={styles.changeProfileTitle}>비밀번호 변경</Text>
                <View style={styles.changeProfileSubView}>
                    <Text style={styles.changeProfileSubTitle}>아이디</Text>
                    <Text style={styles.changeProfileSubInfo}>{id}</Text>
                </View>
                <View style={styles.changeProfileSubView}>
                    <Text style={styles.changeProfileSubTitle}>비밀번호</Text>
                    <TextInput
                        style={styles.changeProfileSubTextInput}
                        placeholder={pw}
                        placeholderTextColor='#777'
                        value={rePw}
                        onChangeText={(e)=>{setRePw(e)}}
                        maxLength={20}
                    />
                </View>
                <TouchableOpacity
                    style={styles.saveBtn}
                    onPress={()=> {
                        infoChange()
                        props.navigation.navigate('MyPage', {
                            num: num,
                            id: id,
                            pw: rePw,
                            phone: phone,
                            name: name,
                            email: email,
                        })
                    }}
                >
                    <Text style={styles.saveBtnText}>저장하기</Text>
                </TouchableOpacity>
            </View>    
        </View>
    )
}



export default MyProfile




const styles = StyleSheet.create({
    
    //메인 뷰
    mainView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },


    //content
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



    //프로필 뷰
    profileView: {
        width: '90%',
        height: 180,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 100,
    },
    imageBtn: {
        width: 114,
        height: 37,
        backgroundColor: '#E2E2F9',
        borderRadius: 30,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageBtnText: {
        color: '#6866E7',
        fontSize: 16,
        fontWeight: 600,
    },




    //개인정보 변경 뷰
    changeProfileView: {
        width: '100%',
        marginTop: 30,
    },
    changeProfileTitle: {
        width: '100%',
        lineHeight: 55,
        paddingLeft: 20,
        backgroundColor: '#F6F6F6',
    },
    changeProfileSubView: {
        flexDirection: 'row',
        borderColor: '#DDD',
        borderBottomWidth: 1,
    },
    changeProfileSubTitle: {
        width: '20%',
        fontSize: 16,
        fontWeight: 600,
        lineHeight: 60,
        paddingLeft: 20,
    },
    changeProfileSubInfo: {
        position: 'absolute',
        right: 20,
        lineHeight: 60,
        color: '#777',
        fontSize: 16,
    },
    changeProfileSubTextInput: {
        flex: 1,
        height: 60,
        fontSize: 16,
        textAlign: 'right',
        paddingRight: 20,
    },





    //저장하기 버튼
    saveBtn: {
        position: 'absolute',
        right: 20,
        bottom: -50,
    },
    saveBtnText: {
        fontSize: 16,
        fontWeight: 600,
    },
})