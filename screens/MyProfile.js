import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    ScrollView,
    StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';


import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync } from 'expo-image-manipulator';



//db 로드
import { loadUserImages, updateUserProfile, updateUserImage, loadUserSelect } from '../DB/LoadDB'




const MyProfile = (props) => {
    //로그인 확인
    const { params } = props.route;
    const num = params ? params.num : null;
    const id = params ? params.id : null;
    const pw = params ? params.pw : null;
    const name = params ? params.name : null;
    const email = params ? params.email : null;
    const phone = params ? params.phone : null;
    const image = params ? params.image : null;

    //개인정보 수정
    const [rePw, setRePw] = useState('')
    const [profileImg, setProfileImg] = useState(null)
    const [location, setLocation] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    //db
    const [imageUrl, setImageUrl] = useState([]);
    const [user, setUser] = useState([]);

    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchImage = async () => {
            const images = await loadUserImages();
            setImageUrl(images);
        };
        const fetchUser = async () => {
            const users = await loadUserSelect(num);
            setUser(users);
            if (props.route.params?.address) {
                setLocation(props.route.params.address);
            } else {
                setLocation(users.location)
            }
        };
        fetchImage()
        fetchUser();

    }, [isFocused]);

    useEffect(() => {
        // route.params가 변경되면 상태를 업데이트합니다.

        if (props.route.params?.address) {
            setLocation(props.route.params.address);
        }

    }, [props.route.params.address]); // 의존성 배열에 route.params를 추가합니다.



    const [foundImage, setFoundImage] = useState(null);

    useEffect(() => {
        if (imageUrl.length > 0) {
            const matchImage = imageUrl.find(item => item.name === id);
            setFoundImage(matchImage);
        }
    }, [imageUrl]);





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
            updateUserImage(resizedImage.uri, id);
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
                <Text style={styles.titleText}>
                    내 프로필
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
            <View style={styles.profileView}>
                {
                    // profileImg가 null이 아니면 바로 profileImg를 사용하고,
                    // 그렇지 않을 경우 기존의 imageUrl 배열을 순회합니다.
                    profileImg ? (
                        <Image
                            style={styles.image}
                            source={{ uri: profileImg }}
                        />
                    ) : (
                        <Image
                            style={styles.image}
                            source={foundImage ? { uri: foundImage.url } : require('../assets/start-solo.png')}
                        />
                    )
                }
                <TouchableOpacity
                    style={styles.imageBtn}
                    onPress={pickImage}
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
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.navigate("DaumPost", {
                            num: num,
                            id: id,
                            pw: rePw,
                            phone: phone,
                            name: name,
                            email: email,
                            image: image,
                            screen: "MyProfile",
                        })
                    }}>
                    <View style={styles.changeProfileSubView}>
                        <Text style={styles.changeProfileSubTitle}> 주소 </Text>
                        <Text style={styles.changeProfileSubInfo}> {location} </Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.changeProfileTitle}>비밀번호 변경</Text>
                <View style={styles.changeProfileSubView}>
                    <Text style={styles.changeProfileSubTitle}>아이디</Text>
                    <Text style={styles.changeProfileSubInfo}>{id}</Text>
                </View>
                <View style={styles.changeProfileSubView}>
                    <Text style={styles.changeProfileSubTitle}>비밀번호</Text>
                    <TextInput
                        style={styles.changeProfileSubTextInput}
                        placeholder={rePw}
                        placeholderTextColor='#777'
                        value={rePw}
                        onChangeText={(e) => { setRePw(e) }}
                        maxLength={20}
                    />
                </View>
                <View style={{alignItems:'center'}}>
                    <TouchableOpacity
                        style={styles.saveBtn}
                        onPress={async () => {
                            if (rePw != '') {
                                setIsLoading(true)
                                await updateUserProfile(num, rePw, location)

                                alert('개인정보가 변경되었습니다!')
                                props.navigation.navigate('MyPage', {
                                    num: num,
                                    id: id,
                                    pw: rePw,
                                    phone: phone,
                                    name: name,
                                    email: email,
                                    image: image,
                                })
                            } else {
                                alert('비밀번호를 입력해주세요')
                            }

                        }}
                    >
                        {isLoading ? (
                            <ActivityIndicator size="small" color="white" /> // 로딩 중에는 로딩 아이콘 표시
                        ) : (
                            <Text style={styles.saveBtnText}>저장하기</Text>
                        )}
                    </TouchableOpacity>    
                </View>
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




    //개인정보 변경 뷰
    changeProfileView: {
        width: '100%',
        marginTop: 20,
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
        backgroundColor: '#5552E2',
        height: 60,
        width: '90%',
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveBtnText: {
        fontSize: 16,
        fontWeight: 600,
        color:'white',
    },
})