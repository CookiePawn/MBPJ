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
import { useIsFocused } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker'


import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync } from 'expo-image-manipulator';

//db 로드
import {
    loadStartUpImages,
    loadStartUpSelect,
    updateStartUpProject,
    updateStartUpImage,
} from '../DB/LoadDB'


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
    const people = params ? params.people : null;



    //정보 수정
    const [eStep, setEStep] = useState('')
    const [eInfo, setEInfo] = useState('')
    const [eIntroduce, setEIntroduce] = useState('')
    const [eStack, setEStack] = useState('')
    const [location, setLocation] = useState('')

    const [profileImg, setProfileImg] = useState(null)


    //db
    const [imageUrl, setImageUrl] = useState([]);
    const [user, setUser] = useState([])

    const isFocused = useIsFocused();


    //DropDownPicker 관련
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label : 'IT', value : 'IT'},
        {label : 'Education', value : 'Education'},
        {label : 'F&B', value : 'F&B'},
        {label : 'Creative', value : 'Creative'},
    ])

    useEffect(() => {

        const fetchImage = async () => {
            const images = await loadStartUpImages();
            setImageUrl(images);
        };
        const fetchUserInfo = async () => {
            const users = await loadStartUpSelect(people);
            setUser(users);

            setEStep(users.step || '');
            setEInfo(users.info || '');
            setEIntroduce(users.introduce || '');
            setEStack(users.stack || '');
            
            if (props.route.params?.address) {
                setLocation(props.route.params.address)
            } else {
                setLocation(users.location)
            }
            
        };

        fetchImage();
        fetchUserInfo();

    }, [isFocused]);




    const [foundImage, setFoundImage] = useState(null);

    useEffect(() => {
        if (user.name && imageUrl && imageUrl.length > 0) {
            const matchImage = imageUrl.find(item => item.name === user.name);
            setFoundImage(matchImage);
        }
    }, [user, imageUrl]);


    useEffect(() => {

        if(props.route.params?.address) {
            setLocation(props.route.params.address)
        }

    }, [props.route.params.address]); // 의존성 배열에 route.params를 추가합니다.




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
            updateStartUpImage(resizedImage.uri, user.name);
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
                            source={foundImage ? { uri: foundImage.url } : require('../assets/start-solo.png')}
                        />
                    )
                }
                <View style={styles.profileInfoView}>
                    <Text style={styles.nameText}>{user.name}</Text>
                </View>
                <TouchableOpacity
                    style={styles.imageBtn}
                    onPress={pickImage}
                >
                    <Text style={styles.imageBtnText}>사진 변경</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.inforView}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate('StartupServey', {
                                num: num,
                                id: id,
                                pw: pw,
                                phone: phone,
                                name: name,
                                email: email,
                                image: image,
                                people: people,
                            })
                        }}
                    >
                        <Text
                            style={[
                                styles.smallText,
                                {
                                    position: 'absolute',
                                    top: 20,
                                    right: 0,
                                }
                            ]}>단계 재설정 ▷</Text>
                    </TouchableOpacity>
                    <Text style={styles.bigText}>단계</Text>
                    <Text style={styles.smallText}>{eStep} 단계</Text>


                    <Text style={styles.bigText}>분야</Text>
                    <DropDownPicker
                        open = {open}
                        value = {value}
                        items = {items}
                        setOpen = {setOpen}
                        setValue = {setValue}
                        setItems = {setItems}
                        theme = 'LIGHT'
                        listMode='MODAL'
                        style = {{bottom : 5}}
                    />


                    <Text style={styles.bigText}>주제</Text>
                    <TextInput
                        style={styles.smallText}
                        placeholder='주제를 입력해주세요'
                        value={eInfo}
                        onChangeText={(e) => { setEInfo(e) }}
                        maxLength={500}
                        multiline={true}
                    />

                    <Text style={styles.bigText}>소개</Text>
                    <TextInput
                        style={styles.smallText}
                        placeholder='소개를 입력해주세요'
                        value={eIntroduce}
                        onChangeText={(e) => { setEIntroduce(e) }}
                        maxLength={500}
                        multiline={true}
                    />

                    <Text style={styles.bigText}>기술 / 스택</Text>
                    <TextInput
                        style={styles.smallText}
                        placeholder='기술 및 스택을 입력해주세요'
                        value={eStack}
                        onChangeText={(e) => { setEStack(e) }}
                        maxLength={200}
                        multiline={true}
                    />
                    <Text style = {styles.bigText}>주소추가</Text>
                    <TouchableOpacity
                        onPress = {() => {
                            props.navigation.navigate("DaumPost", {
                                num: num,
                                id: id,
                                pw: pw,
                                phone: phone,
                                name: name,
                                email: email,
                                image: image,
                                people : people,
                                screen: "StartUpEdit",
                            })
                        }}
                        >
                        <Text style = {styles.smallText}>{location}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <TouchableOpacity
                style={styles.chatBtn}
                onPress={
                    async () => {
                        await updateStartUpProject(people, eInfo, eIntroduce, eStack, location);
                        props.navigation.navigate("StartUpInfo", {
                            num: num,
                            id: id,
                            pw: pw,
                            phone: phone,
                            name: name,
                            email: email,
                            image: image,
                            people: people,
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
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 100,
        margin: 10,
        marginLeft: 0,
        marginRight: 20,
    },
    profileInfoView: {
        flex: 1,
        justifyContent: 'center',
    },
    imageBtn: {
        width: 80,
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
    smallText: {
        color: 'rgba(153, 153, 153, 0.60)',
        fontSize: 14,
        fontWeight: '400',
        marginBottom: 30,
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