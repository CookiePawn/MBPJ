import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    StyleSheet,
} from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//이미지 선택
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync } from 'expo-image-manipulator';

//헤더
import Header from '../components/Header';

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
        { label: 'IT', value: 'IT' },
        { label: 'Education', value: 'Education' },
        { label: 'F&B', value: 'F&B' },
        { label: 'Creative', value: 'Creative' },
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
                iconNameR1='notifications'
                iconNameR2='home'
                login={num}
            />
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
            <KeyboardAwareScrollView
                style={styles.inforView}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ flex: 1 }}>
                    <Text style={[styles.bigText, { fontSize: 25, fontWeight: 'bold' }]}>제목</Text>
                    <TextInput
                        style={styles.smallText}
                        placeholder='제목을 입력해주세요'
                        value={title}
                        onChangeText={(e) => { setTitle(e) }}
                        maxLength={500}
                        scrollEnabled={false}
                    />

                    <Text style={styles.bigText}>분야</Text>
                    <DropDownPicker
                        open={pickerOpen}
                        value={fieldValue}
                        items={fieldItems}
                        setOpen={setPickerOpen}
                        setValue={setFieldValue}
                        setItems={setFieldItems}
                        placeholder={savedField}
                        theme='LIGHT'
                        listMode='MODAL'
                        style={{ bottom: 5, top: 5, borderColor: '#d9d9d9', borderRadius: 15 }}
                    />



                    <Text style={styles.bigText1}>아이디어</Text>
                    <TextInput
                        style={styles.smallText}
                        placeholder='아이디어를 입력해주세요'
                        value={idea}
                        onChangeText={(e) => { setIdea(e) }}
                        maxLength={500}
                        multiline={true}
                        scrollEnabled={false}
                    />

                    <Text style={styles.bigText}>상세내역</Text>
                    <TextInput
                        style={styles.smallText}
                        placeholder='상세내역을 입력해주세요'
                        value={info}
                        onChangeText={(e) => { setInfo(e) }}
                        maxLength={500}
                        multiline={true}
                        scrollEnabled={false}
                    />

                    <Text style={styles.bigText}>복리후생</Text>
                    <TextInput
                        style={styles.smallText}
                        placeholder='복리후생을 입력해주세요'
                        value={benefit}
                        onChangeText={(e) => { setBenefit(e) }}
                        maxLength={200}
                        multiline={true}
                        scrollEnabled={false}
                    />
                </View>
            </KeyboardAwareScrollView>

            <TouchableOpacity
                style={styles.chatBtn}
                onPress={
                    async () => {
                        if (num != '' && title != '' && fieldValue != null && idea != '' && info != '' && benefit != '' && profileImg != null) {
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
                        } else {
                            alert("모든 정보를 입력했는지 확인해주세요")
                        }

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

    //프로필 세션
    profileView: {
        width: '90%',
        height: 180,
        marginTop: 10,
        alignItems: 'center',
    },

    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 30,
        margin: 10,
    },

    profileInfoView: {
        justifyContent: 'center',
    },

    imageBtn: {
        width: 90,
        height: 37,
        backgroundColor: 'white',
        borderRadius: 30,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#111111'
    },

    imageBtnText: {
        color: '#111111',
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
        marginTop: 30,
    },

    bigText: {
        color: '#111',
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 10,
    },

    bigText1: {
        color: '#111',
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 10,
        marginTop: 30,
    },

    smallText: {
        color: 'rgba(153, 153, 153, 0.60)',
        fontSize: 14,
        fontWeight: '400',
        marginBottom: 30,
        marginTop: 3,
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