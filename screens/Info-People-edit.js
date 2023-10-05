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
import storage from '../DB/Storage'
import db from '../DB/FireBase'
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { listAll, getDownloadURL, ref, } from '@firebase/storage';
import { useIsFocused } from '@react-navigation/native';


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
            try {
                const storageRef = ref(storage, '/userProfile');
                const result = await listAll(storageRef);
                const imageUrls = [];
                // 각 아이템의 URL과 이름을 가져와 imageUrls 배열에 저장
                for (const item of result.items) {
                    const url = await getDownloadURL(item);
                    imageUrls.push({ url, name: item.name });
                }
                setImageUrl(imageUrls);
            } catch (error) {
                console.error('이미지 로딩 오류:', error);
            }
        };
        const userDB = async () => {
            try {
                // 문서 ID인 num을 사용하여 문서 참조 생성
                const docRef = doc(db, 'userInfo', num);

                // 문서 데이터 가져오기
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    // 문서가 존재하는 경우
                    const userData = { ...docSnap.data(), id: docSnap.id };
                    setUser(userData);

                    setEInfo(userData.info || '');
                    setECareer(userData.infoCareer || '');
                    setEIntroduce(userData.infoIntroduce || '');
                    setEProject(userData.infoProject || '');
                } else {
                    console.log('해당 문서가 존재하지 않습니다.');
                }
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };
        fetchImage();
        userDB()
    }, [isFocused]);





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
                {imageUrl.map((item, idx) => {
                    tmp = true
                    if (item.name == image) {
                        return (
                            <Image
                                key={idx}
                                style={styles.profileImage}
                                source={{ uri: item.url }}
                            />
                        )
                    } else {
                        if (!tmp && idx == imageUrl.length - 1) {
                            return (
                                <Image
                                    key={idx}
                                    style={styles.profileImage}
                                    source={require('../assets/start-solo.png')}
                                />
                            )
                        }
                    }
                })}
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
                    <View style={{ flexDirection: 'row' }}>
                        <Text sttle={styles.midText}>포트폴리오 다운로드   </Text>
                        <Icon name='folder-outline' size={20} style={styles.fileicon}></Icon>
                    </View>
                </View>
            </ScrollView>

            <TouchableOpacity
                style={styles.chatBtn}
                onPress={async() => {
                    try {
                        const docRef = doc(db, 'userInfo', num);

                        await updateDoc(docRef, {
                            info: eInfo,
                            infoCareer: eCareer,
                            infoIntroduce: eIntroduce,
                            infoProject: eProject,
                        });
                        alert('정보가 수정되었습니다!')
                        props.navigation.navigate("MyPage", {
                            num: num,
                            id: id,
                            pw: pw,
                            phone: phone,
                            name: name,
                            email: email,
                            image: image,
                        })
                    } catch (error) {
                        console.error("Error fetching data:", error.message);
                    }
                }}
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