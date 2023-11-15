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
import React, { useState, useEffect } from 'react'


import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync } from 'expo-image-manipulator';

//db 로드
import {
    addCofounder
} from '../DB/LoadDB'

import DropDownPicker from 'react-native-dropdown-picker'


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



    //정보 수정
    const [title, setTitle] = useState('')
    const [info, setInfo] = useState('')
    const [idea, setIdea] = useState('')
    const [benefit, setBenefit] = useState('')

    const [profileImg, setProfileImg] = useState(null)


    //DropDownPicker 관련
    const [pickerOpen, setPickerOpen] = useState(false);
    const [fieldValue, setFieldValue] = useState(null);
    const [fieldItems, setFieldItems] = useState([
        {label : 'IT', value : 'IT'},
        {label : 'Education', value : 'Education'},
        {label : 'F&B', value : 'F&B'},
        {label : 'Creative', value : 'Creative'},
    ])
    const [savedField, setSavedField] = useState('Choose Your Field');



    const requestGalleryPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('갤러리 접근 권한이 필요합니다!');
            return false;
        }
        return true;
    };


    const pickImage = async () => {
        // 갤러리 접근 권한 요청
        const hasPermission = await requestGalleryPermission();
        if (!hasPermission) return;

        // 이미지 선택기를 여는 부분
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            // 이미지를 리사이징하고 원하는 크기로 압축
            const resizedImage = await manipulateAsync(
                result.assets[0].uri, // result.assets[0].uri 대신 result.uri 사용
                [{ resize: { width: 500 } }], // 원하는 크기로 조정
                { compress: 0.5 } // 이미지 압축률 조절 (0.5는 50% 압축)
            );

            // 선택한 이미지를 Firebase Storage에 업로드하는 함수 호출
            setProfileImg(resizedImage.uri);
        }
    };













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
            <View style={styles.profileView}>

                {
                    // profileImg가 null이 아니면 바로 profileImg를 사용하고,
                    // 그렇지 않을 경우 기존의 imageUrl 배열을 순회합니다.
                    profileImg ? (
                        <Image
                            style={styles.profileImage}
                            source={{ uri: profileImg }}
                        />
                    ) : (
                        <Image
                            style={styles.profileImage}
                            source={require('../assets/start-solo.png')}
                        />
                    )
                }
                <TouchableOpacity
                    style={styles.imageBtn}
                    onPress={pickImage}
                >
                    <Text style={styles.imageBtnText}>사진 추가</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.inforView}>
                <View style={{ flex: 1 }}>
                    <Text style={[styles.bigText, { fontSize: 25, fontWeight: 'bold' }]}>제목</Text>
                    <TextInput
                        style={styles.smallText}
                        placeholder='제목을 입력해주세요'
                        value={title}
                        onChangeText={(e) => { setTitle(e) }}
                        maxLength={500}
                    />

                    <Text style={styles.bigText}>분야</Text>
                    <DropDownPicker
                        open = {pickerOpen}
                        value = {fieldValue}
                        items = {fieldItems}
                        setOpen = {setPickerOpen}
                        setValue = {setFieldValue}
                        setItems = {setFieldItems}
                        placeholder= {savedField}
                        theme = 'LIGHT'
                        listMode='MODAL'
                        style = {{bottom : 5}}/>



                    <Text style={styles.bigText}>아이디어</Text>
                    <TextInput
                        style={styles.smallText}
                        placeholder='아이디어를 입력해주세요'
                        value={idea}
                        onChangeText={(e) => { setIdea(e) }}
                        maxLength={500}
                        multiline={true}
                    />

                    <Text style={styles.bigText}>상세내역</Text>
                    <TextInput
                        style={styles.smallText}
                        placeholder='상세내역을 입력해주세요'
                        value={info}
                        onChangeText={(e) => { setInfo(e) }}
                        maxLength={500}
                        multiline={true}
                    />

                    <Text style={styles.bigText}>복리후생</Text>
                    <TextInput
                        style={styles.smallText}
                        placeholder='복리후생을 입력해주세요'
                        value={benefit}
                        onChangeText={(e) => { setBenefit(e) }}
                        maxLength={200}
                        multiline={true}
                    />
                </View>
            </ScrollView>

            <TouchableOpacity
                style={styles.chatBtn}
                onPress={
                    async () => {
                        await addCofounder(num, title, fieldValue, idea, info, benefit, profileImg);
                        props.navigation.navigate("CofounderList", {
                            num: num,
                            id: id,
                            pw: pw,
                            phone: phone,
                            name: name,
                            email: email,
                            image: image,
                        })
                    }

                }
            >
                <Text style={styles.chatBtnText}>저장하기</Text>
            </TouchableOpacity>
        </View>
    )
}



export default StartUpEdit

const styles = StyleSheet.create({

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
    },
    icon: {
        position: 'absolute',
        bottom: 0,
    },




    //프로필 세션
    profileView: {
        width: '90%',
        height: 100,
        marginTop: 30,
        flexDirection: 'row',
        flex: 1,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        margin: 10,
        marginLeft: 0,
        marginRight: 20,
    },
    profileInfoView: {
        flex: 1,
        justifyContent: 'center',
    },
    imageBtn: {
        width: 90,
        height: 37,
        backgroundColor: '#E8E8E8',
        borderRadius: 30,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageBtnText: {
        color: '#777777',
        fontSize: 16,
        fontWeight: 600,
    },
    nameText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    infoText: {
        fontSize: 14,
        color: 'rgba(153, 153, 153, 0.60)',
        marginTop: 25,
    },


    // 정보 세션
    inforView: {
        width: '90%',
        height: 500,
        marginTop: 100,
    },
    bigText: {
        color: '#111',
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 10,
    },
    smallText: {
        color: 'rgba(153, 153, 153, 0.60)',
        fontSize: 14,
        fontWeight: '400',
        marginBottom: 30,
        marginTop: 10,
    },
    midText: {
        fontSize: 16,
        color: '#111',
    },


    //채팅 세션
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
    }
})