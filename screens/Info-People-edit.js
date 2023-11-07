import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    Linking,
    ScrollView,
    StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';

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
    const [eInfo, setEInfo] = useState('')
    const [eIntroduce, setEIntroduce] = useState('')
    const [eCareer, setECareer] = useState('')
    const [eProject, setEProject] = useState('')


    //db
    const [imageUrl, setImageUrl] = useState([]);
    const [user, setUser] = useState([])
    let tmp = false

    const isFocused = useIsFocused();

    useEffect(() => {

        const fetchImage = async () => {
            const images = await loadUserImages();
            setImageUrl(images);
        };
        const fetchUserInfo = async () => {
            const users = await loadUserSelect(num);
            setUser(users);

            setEInfo(users.info || '');
            setECareer(users.infoCareer || '');
            setEIntroduce(users.infoIntroduce || '');
            setEProject(users.infoProject || '');

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
                <Image
                    style={styles.profileImage}
                    source={foundImage ? { uri: foundImage.url } : require('../assets/start-solo.png')}
                />
                <View style={styles.profileInfoView}>
                    <Text style={styles.nameText}>{user.name}</Text>
                    <Text style={styles.infoText}>소속 : {user.infoGroup}</Text>
                </View>
            </View>
            <ScrollView style={styles.inforView}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.bigText}>직종</Text>
                    <TextInput
                        style={styles.smallText}
                        placeholder='직종을 입력해주세요'
                        value={eInfo}
                        onChangeText={(e) => { setEInfo(e) }}
                        maxLength={30}
                    />

                    <Text style={styles.bigText}>설명</Text>
                    <TextInput
                        style={styles.smallText}
                        placeholder='설명을 입력해주세요'
                        value={eIntroduce}
                        onChangeText={(e) => { setEIntroduce(e) }}
                        maxLength={500}
                        multiline={true}
                    />

                    <Text style={styles.bigText}>경력</Text>
                    <TextInput
                        style={styles.smallText}
                        placeholder='경력을 입력해주세요'
                        value={eCareer}
                        onChangeText={(e) => { setECareer(e) }}
                        maxLength={500}
                        multiline={true}
                    />

                    <Text style={styles.bigText}>프로젝트</Text>
                    <TextInput
                        style={styles.smallText}
                        placeholder='프로젝트 링크를 입력해주세요'
                        value={eProject}
                        onChangeText={(e) => { setEProject(e) }}
                        maxLength={200}
                        multiline={true}
                    />
                </View>
            </ScrollView>

            <TouchableOpacity
                style={styles.chatBtn}
                onPress={
                    async () => {
                        await updateUserProject(num, eInfo, eCareer, eIntroduce, eProject);
                        props.navigation.navigate("MyPage", {
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



export default PersonInfo

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