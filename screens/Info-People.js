import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Linking,
    ScrollView,
    StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';


//헤더
import Header from '../components/Header';


//db 로드
import {
    loadUserImages,
    loadUserSelect,
    loadMember,
    loadStartUps,
    loadStartUpImages,
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
    const people = params ? params.people : null;




    //db
    const [imageUrl, setImageUrl] = useState([]);
    const [user, setUser] = useState([])
    const [startupImage, setStartupImage] = useState([]);
    const [startup, setStartup] = useState([]);
    const [foundImage, setFoundImage] = useState(null);
    const [member, setMember] = useState()

    const [admin, setAdmin] = useState([]);

    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchImage = async () => {
            const images = await loadUserImages();
            setImageUrl(images);
        };
        const fetchUserInfo = async () => {
            const users = await loadUserSelect(people);
            setUser(users);
        };
        const fetchStartUpImage = async () => {
            const images = await loadStartUpImages()
            setStartupImage(images)
        };
        const fetchStartupInfo = async () => {
            const startups = await loadStartUps();
            setStartup(startups);
        };





        const fetchMember = async () => {
            const members = await loadMember();
            const newMembers = []; // 새로운 멤버를 임시 저장할 배열을 생성합니다.

            members.forEach((item) => {
                if (people === item.perID) {
                    newMembers.push({ suID: item.suID, admin: item.admin }); // 조건에 맞는 suID만 임시 배열에 추가합니다.
                }
            });
            setMember(newMembers); // 상태를 한 번만 업데이트합니다.
        };

        fetchImage()
        fetchUserInfo()
        fetchMember()
        fetchStartUpImage()
        fetchStartupInfo()
    }, [isFocused]);

    useEffect(() => {
        if (user.perID && imageUrl.length > 0) {
            const matchImage = imageUrl.find(item => item.name === user.perID);
            setFoundImage(matchImage);
        }
    }, [user, imageUrl]);



    useEffect(() => {
        const fetchAdmins = () => {
            if (member && member.length > 0) {
                const adminMembers = member.filter(memberInfo => memberInfo.admin === 1);
                const adminIDs = adminMembers.map(adminMember => adminMember.suID);
                setAdmin(adminIDs);
            }
        };

        fetchAdmins();
    }, [member]);




    const getFilteredStartups = () => {
        if (!member || member.length === 0) {
            return []; // 빈 배열을 반환하거나 이 경우를 적절히 처리하세요.
        }

        return startup.filter((item) =>
            member.some(memberInfo => memberInfo.suID === item.id)
        );
    };
















    return (
        <View style={styles.mainView}>
            <Header
                navi = {props}
                params = {{
                    num: num,
                    id: id,
                    pw: pw,
                    phone: phone,
                    name: name,
                    email: email,
                    image: image,
                }}
                iconNameL1='arrow-back-outline'
                iconNameR1='notifications-outline'
                iconNameR2='home-outline'
                login = {num}
            />
            <View style={styles.profileView}>
                <Image
                    style={styles.profileImage}
                    source={foundImage ? { uri: foundImage.url } : require('../assets/start-solo.png')}
                />
                <View style={styles.profileInfoView}>
                    <Text style={styles.nameText}>{user.name}</Text>
                </View>
                <View style={styles.likeView}>
                    <Icon name='heart' size={20} color='red' />
                    <Text style={styles.likeText}>{user.score}점</Text>
                </View>
            </View>
            <ScrollView 
                style={styles.inforView}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ flex: 1 }}>

                    <Text style={styles.bigText}>분야</Text>
                    <Text style={styles.smallText}>{user.field}</Text>

                    <Text style={styles.bigText}>직종</Text>
                    <Text style={styles.smallText}>{user.info}</Text>

                    <Text style={styles.bigText}>설명</Text>
                    <Text style={styles.smallText}>{user.infoIntroduce}</Text>

                    <Text style={styles.bigText}>경력</Text>
                    <Text style={styles.smallText}>{user.infoCareer}</Text>

                    <Text style={styles.bigText}>프로젝트</Text>
                    <TouchableOpacity
                        onPress={() => {
                            Linking.openURL(user.infoProject);
                        }}
                    >
                        <Text style={[styles.smallText, { color: 'lightskyblue' }]}>{user.infoProject}</Text>
                    </TouchableOpacity>

                    <Text style={styles.bigText}>GPT 평가</Text>
                    <Text style={styles.smallText}>{user.evaluation}</Text>

                    <Text style={styles.bigText}>소속 스타트업</Text>
                    <ScrollView
                        style={styles.memberScrollView}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {getFilteredStartups().map((item, idx) => {
                            const matchingStartupImage = startupImage.find(startupImg => startupImg.name === item.name);
                            const isAdmin = admin.includes(item.id);

                            return (
                                <TouchableOpacity 
                                    key={idx}
                                    onPress={() => {
                                        props.navigation.navigate('StartUpInfo', {
                                            num: num,
                                            id: id,
                                            pw: pw,
                                            phone: phone,
                                            name: name,
                                            email: email,
                                            image: image,
                                            people: item.id,
                                        })
                                    }}
                                >
                                    <View style={[styles.memberView, { borderColor: isAdmin ? 'gold' : 'rgba(0, 0, 0, 0.05)' }]}>
                                        {isAdmin && (
                                            <Icon name='star' color='gold' size={25} style={{ marginLeft: 15 }} />
                                        )}
                                        <Image
                                            style={styles.userImage}
                                            source={matchingStartupImage ? { uri: matchingStartupImage.url } : require('../assets/start-solo.png')}
                                        />
                                        <Text style={styles.userName}>
                                            {item.name}{'\n'}
                                            <Text style={styles.userInfo}>{item.info}</Text>
                                        </Text>
                                    </View>    
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>
            </ScrollView>
            {num !== null && (
                <TouchableOpacity
                    style={styles.chatBtn}
                    onPress={() => {
                        props.navigation.navigate('LetterPage', {
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
                    <Text style={styles.chatBtnText}>쪽지 보내기</Text>
                </TouchableOpacity>
            )}
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
        marginBottom: 40,
    },
    infoText: {
        fontSize: 14,
        color: 'rgba(153, 153, 153, 0.60)',
        marginTop: 25,
    },
    likeView: {
        position: 'absolute',
        right: 10,
        top: 20,
        flexDirection: 'row',
    },
    likeText: {
        lineHeight: 20,
        paddingLeft: 5,
        color: 'rgba(153, 153, 153, 0.60)',
        marginTop: 1
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
        marginBottom: 15,
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



    //소속 스타트업
    memberScrollView: {
        flexDirection: 'row'
    },
    memberView: {
        height: 100,
        marginRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.05)',
        marginBottom: 30,
    },
    userImage: {
        width: 60,
        height: 60,
        borderRadius: 100,
        marginLeft: 5,
    },
    userName: {
        marginLeft: 10,
        marginRight: 15,
        fontWeight: 500,
        fontSize: 20,
    },
    userInfo: {
        color: 'rgba(0, 0, 0, 0.60)',
        fontSize: 12,
        fontWeight: 400,
        lineHeight: 23,
    },

})