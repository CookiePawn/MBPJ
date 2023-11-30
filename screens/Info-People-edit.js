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
import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

//헤더
import Header from '../components/Header';

//로딩 이벤트
import { renderFullScreenLoading } from '../components/Loading'

//db 로드
import {
    loadUserImages,
    loadUserSelect,
    updateUserProject,
} from '../DB/LoadDB'




const PersonInfo = (props) => {
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
    const [eIntroduce, setEIntroduce] = useState('')
    const [eCareer, setECareer] = useState('')
    const [eProject, setEProject] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    //db
    const [imageUrl, setImageUrl] = useState([]);
    const [user, setUser] = useState([])

    const isFocused = useIsFocused();


    //DropDownPicker 관련
    const [pickerOpen, setPickerOpen] = useState(false);
    const [fieldValue, setFieldValue] = useState(null);
    const [fieldItems, setFieldItems] = useState([
        { label: 'Frontend Developer', value: 'Frontend Developer' },
        { label: 'Backend Developer', value: 'Backend Developer' },
        { label: 'Full-Stack Developer', value: 'Full-Stack Developer' },
        { label: 'UI/UX Designer', value: 'UI/UX Designer' },
    ])
    const [savedField, setSavedField] = useState('Choose Your Field');



    useEffect(() => {

        const fetchImage = async () => {
            const images = await loadUserImages();
            setImageUrl(images);
        };
        const fetchUserInfo = async () => {
            const users = await loadUserSelect(num);
            setUser(users);

            setECareer(users.infoCareer || '');
            setEIntroduce(users.infoIntroduce || '');
            setEProject(users.infoGitNickname || '');

            if (users.field != null) {
                setSavedField(users.field || '');
                setFieldValue(users.field || '')
            }

        };

        fetchImage();
        fetchUserInfo();

    }, [isFocused]);




    const [foundImage, setFoundImage] = useState(null);

    useEffect(() => {
        if (user.perID && imageUrl.length > 0) {
            const matchImage = imageUrl.find(item => item.name === user.perID);
            setFoundImage(matchImage);
        }
    }, [user, imageUrl]);



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
                <Image
                    style={styles.profileImage}
                    source={foundImage ? { uri: foundImage.url } : require('../assets/start-solo.png')}
                />
                <View style={styles.profileInfoView}>
                    <Text style={styles.nameText}>{user.name}</Text>
                </View>
            </View>
            <KeyboardAwareScrollView
                style={styles.inforView}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
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

                <Text style={styles.bigText1}>설명</Text>
                <TextInput
                    style={styles.smallText}
                    placeholder='설명을 입력해주세요'
                    value={eIntroduce}
                    onChangeText={(e) => { setEIntroduce(e) }}
                    maxLength={500}
                    multiline={true}
                    scrollEnabled={false}
                />

                <Text style={styles.bigText}>경력</Text>
                <TextInput
                    style={styles.smallText}
                    placeholder='경력을 입력해주세요'
                    value={eCareer}
                    onChangeText={(e) => { setECareer(e) }}
                    maxLength={500}
                    multiline={true}
                    scrollEnabled={false}
                />

                <Text style={styles.bigText}>깃허브 닉네임</Text>
                <TextInput
                    style={styles.smallText}
                    placeholder='깃허브 닉네임을 입력해주세요'
                    value={eProject}
                    onChangeText={(e) => { setEProject(e) }}
                    maxLength={200}
                    scrollEnabled={false}
                />
            </KeyboardAwareScrollView >

            <TouchableOpacity
                style={styles.chatBtn}
                onPress={
                    async () => {
                        if (num != '' && fieldValue != null && eCareer != '' && eIntroduce != '' && eProject != '') {
                            setIsLoading(true)
                            await updateUserProject(num, fieldValue, eCareer, eIntroduce, eProject);
                            props.navigation.navigate("MyPage", {
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
                {isLoading ? (
                    <ActivityIndicator size="small" color="white" /> // 로딩 중에는 로딩 아이콘 표시
                ) : (
                    <Text style={styles.chatBtnText}>저장하기</Text>
                )}
            </TouchableOpacity>
        </View >
    )
}



export default PersonInfo

const styles = StyleSheet.create({

    mainView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },






    //프로필 세션
    profileView: {
        width: '90%',
        height: 100,
        marginTop: 10,
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
    nameText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 40
    },
    infoText: {
        fontSize: 14,
        color: 'rgba(153, 153, 153, 0.60)',
        marginTop: 25,
    },


    // 정보 세션
    inforView: {
        width: '90%',
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




})