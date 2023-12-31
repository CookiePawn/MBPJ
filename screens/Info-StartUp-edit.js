import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
    StyleSheet,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//이미지 선택
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync } from 'expo-image-manipulator';

//헤더
import Header from '../components/Header';

//로딩 이벤트
import { renderFullScreenLoading } from '../components/Loading'

//db 로드
import {
    loadStartUpImages,
    loadStartUpSelect,
    updateStartUpProject,
    updateStartUpImage,
} from '../DB/LoadDB'

//주소변환
import getAddressCoordinates from '../components/GeoCoding'



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

    const [isLoading, setIsLoading] = useState(false);

    //db
    const [imageUrl, setImageUrl] = useState([]);
    const [user, setUser] = useState([])

    const isFocused = useIsFocused();

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

            if (users.field != null) {
                setSavedField(users.field || '');
                setFieldValue(users.field || '')
            }

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

        if (props.route.params?.address) {
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
            {renderFullScreenLoading(isLoading)}
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
            <KeyboardAwareScrollView
                style={styles.inforView}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ flex: 1 }}>
                    <Text style={styles.bigText}>단계</Text>
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
                        <View style={styles.retryView}>
                            <Text style={styles.smallText}>
                                단계 재설정
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.smallText}>{eStep} 단계</Text>


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


                    <Text style={styles.bigText1}>주제</Text>
                    <TextInput
                        style={styles.smallText}
                        placeholder='주제를 입력해주세요'
                        value={eInfo}
                        onChangeText={(e) => { setEInfo(e) }}
                        maxLength={500}
                        multiline={true}
                        scrollEnabled={false}
                    />

                    <Text style={styles.bigText}>소개</Text>
                    <TextInput
                        style={styles.smallText}
                        placeholder='소개를 입력해주세요'
                        value={eIntroduce}
                        onChangeText={(e) => { setEIntroduce(e) }}
                        maxLength={500}
                        multiline={true}
                        scrollEnabled={false}
                    />

                    <Text style={styles.bigText}>기술 / 스택</Text>
                    <TextInput
                        style={styles.smallText}
                        placeholder='기술 및 스택을 입력해주세요'
                        value={eStack}
                        onChangeText={(e) => { setEStack(e) }}
                        maxLength={200}
                        multiline={true}
                        scrollEnabled={false}
                    />
                    <Text style={styles.bigText}>주소 추가</Text>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate("DaumPost", {
                                num: num,
                                id: id,
                                pw: pw,
                                phone: phone,
                                name: name,
                                email: email,
                                image: image,
                                people: people,
                                screen: "StartUpEdit",
                            })
                        }}
                    >
                        <Text style={styles.smallText}>{location}</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>

            <TouchableOpacity
                style={styles.chatBtn}
                onPress={
                    async () => {
                        if (people != '' && fieldValue != null && eInfo != '' && eIntroduce && eStack != '' && location != '') {
                            if(location != user.location) {
                                setIsLoading(true)
                                try {
                                    // 주소를 좌표로 변환
                                    const coordinates = await getAddressCoordinates(location);
                                    if (coordinates) {
                                        const lat = coordinates.lat;
                                        const lng = coordinates.lng;
                                        //addStartUp에 좌표 정보도 함께 전달
                                        await updateStartUpProject(people, fieldValue, eInfo, eIntroduce, eStack, location, lat, lng);
                                        
                                    } else {
                                        alert('스타트업 변경을 실패했습니다!');
                                    }
                                } catch (error) {
                                    console.error('Error:', error);
                                }

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
                            } else {
                                alert('스타트업이 변경되었습니다!');
                                await updateStartUpProject(people, fieldValue, eInfo, eIntroduce, eStack, location, user.lat, user.lng);
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
                        } else {
                            alert("입력하지 않은 것이 있는지 확인해주세요")
                        }
                    }
                }
            >
                {isLoading ? (
                    <ActivityIndicator size="small" color="white" /> // 로딩 중에는 로딩 아이콘 표시
                ) : (
                    <Text style={styles.chatBtnText}>저장하기</Text>
                )}
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
        height: 200,
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

    retryView:{
        position: 'absolute',
        justifyContent: 'center',
        right: 0,
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
        marginBottom: 35,
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
    },

    //로딩이벤트
    fullScreenLoadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
    },
    
    fullScreenLoadingImage: {
        width: 250,
        height: 250,
        borderRadius: 100,
        opacity: 1,
    },
})