import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';

//헤더
import Header from '../components/Header';

//db 로드
import {
    loadStartUpImages,
    loadStartUpSelect,
    loadUsers,
    loadUserImages,
    loadMember,
    addJoin,
} from '../DB/LoadDB'



const StartUpInfo = (props) => {
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
    const [startup, setStartup] = useState([]);
    const [user, setUser] = useState([]);
    const [userImage, setUserImage] = useState([]);
    const [member, setMember] = useState()

    const [admin, setAdmin] = useState()
    const [foundImage, setFoundImage] = useState(null);
    const [foundUser, setFoundUser] = useState(false)

    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchStartUpImage = async () => {
            const images = await loadStartUpImages()
            setImageUrl(images)
        };
        const fetchStartupInfo = async () => {
            const startups = await loadStartUpSelect(people);
            setStartup(startups);
        };
        const fetchUserInfo = async () => {
            const users = await loadUsers();
            setUser(users);
        };
        const fetchUserImage = async () => {
            const images = await loadUserImages()
            setUserImage(images)
        };
        const fetchMember = async () => {
            const members = await loadMember();
            const newMembers = []; // 새로운 멤버를 임시 저장할 배열을 생성합니다.

            members.forEach((item) => {
                if (people === item.suID) {
                    newMembers.push({ perID: item.perID, admin: item.admin }); // 조건에 맞는 suID만 임시 배열에 추가합니다.
                }
            });
            setMember(newMembers); // 상태를 한 번만 업데이트합니다.
        };

        fetchStartUpImage();
        fetchStartupInfo();
        fetchUserInfo();
        fetchUserImage();
        fetchMember()
    }, [isFocused]);

    useEffect(() => {
        if (startup.name && imageUrl.length > 0) {
            const matchImage = imageUrl.find(item => item.name === startup.name);
            setFoundImage(matchImage);
        }

    }, [imageUrl]);

    useEffect(() => {
        const fetchAdmin = () => {
            if (member && member.length > 0) {
                const adminMember = member.find(memberInfo => memberInfo.admin === 1);
                if (adminMember) {
                    setAdmin(adminMember.perID);

                }
            }
        };

        fetchAdmin();
    }, [member]);

    const getFilteredUsers = () => {
        if (!member || member.length === 0) {
            return [];
        }

        return user.filter((item) =>
            member.some(memberInfo => memberInfo.perID === item.id)
        );
    };

    // 나중에 useEffect를 사용하여 num과 일치하는 사용자가 있는지 확인
    useEffect(() => {
        const filteredUsers = getFilteredUsers();
        const foundUser = filteredUsers.some(item => item.id === num);
        setFoundUser(foundUser);
    }, [member, user, num]); // 의존성 배열에 member, user, num 포함



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
                <View style={styles.profileInfoView}>
                    <Text style={styles.nameText}>{startup.name}</Text>
                </View>
                <View style={styles.likeView}>
                    {startup.score >= 70 ? (
                        <Icon name='grin-alt' size={20} color='green' />
                    ) : startup.score >= 30 ? (
                        <Icon name='meh' size={20} color='orange' />
                    ) : (
                        <Icon name='frown' size={20} color='red' />
                    )}
                    <Text style={styles.likeText}>{startup.score}점</Text>
                </View>
            </View>
            <ScrollView
                style={styles.inforView}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ flex: 1 }}>
                    <View style={styles.imageView}>
                        <Image
                            style={styles.profileImage}
                            source={foundImage ? { uri: foundImage.url } : require('../assets/start-solo.png')}
                        />
                    </View>
                    
                    <Text style={styles.bigText}>단계</Text>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate('StartupStep', {
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
                        <View style={styles.moreView}>
                            <Text style={styles.smallText}>
                                자세히 보기
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.smallText}>{startup.step} 단계</Text>

                    <Text style={styles.bigText}>분야</Text>
                    <Text style={styles.smallText}>{startup.field}</Text>

                    <Text style={styles.bigText}>주제</Text>
                    <Text style={styles.smallText}>{startup.info}</Text>

                    <Text style={styles.bigText}>소개</Text>
                    <Text style={styles.smallText}>{startup.introduce}</Text>

                    <Text style={styles.bigText}>기술 / 스택</Text>
                    <Text style={styles.smallText}>{startup.stack}</Text>

                    <Text style={styles.bigText}>GPT 평가</Text>
                    <Text style={styles.smallText}>{startup.evaluation}</Text>

                    <Text style={styles.bigText}>멤버</Text>
                    <ScrollView
                        style={styles.memberScrollView}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {getFilteredUsers().map((item, idx) => {
                            const matchingUserImage = userImage.find(userImg => userImg.name === item.perID);

                            return (
                                <TouchableOpacity
                                    key={idx}
                                    onPress={() => {
                                        props.navigation.navigate('PeopleInfo', {
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
                                    <View style={styles.memberView}>
                                        {item.id == admin && (
                                            <Icon name='crown' color='gold' size={25} style={styles.crownView} />
                                        )}
                                        <Image
                                            style={styles.userImage}
                                            source={matchingUserImage ? { uri: matchingUserImage.url } : require('../assets/start-solo.png')}
                                        />
                                        <Text style={styles.userName}>
                                            {item.name}{'\n'}
                                            <Text style={styles.userInfo}>{item.field}</Text>
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                            );
                        })}
                    </ScrollView>
                </View>
            </ScrollView >
            {(num !== null && foundUser !== true) && (
                <View style={styles.btnView}>
                    <TouchableOpacity
                        style={[styles.chatBtn, { left: 0 }]}
                        onPress={async () => {
                            await addJoin(admin, num, people)
                            alert('가입 신청 완료되었습니다')
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
                        <Text style={styles.chatBtnText}>가입하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.chatBtn, { right: 0 }]}
                        onPress={() => {
                            props.navigation.navigate('LetterPage', {
                                num: num,
                                id: id,
                                pw: pw,
                                phone: phone,
                                name: name,
                                email: email,
                                image: image,
                                people: admin,
                            })
                        }}
                    >
                        <Text style={styles.chatBtnText}>쪽지 보내기</Text>
                    </TouchableOpacity>
                </View>
            )}
            {(num !== null && admin == num) && (
                <View style={styles.btnView}>
                    <TouchableOpacity
                        style={[styles.chatBtn, { width: '100%' }]}
                        onPress={() => {
                            props.navigation.navigate('StartUpEdit', {
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
                        <Text style={styles.chatBtnText}>수정하기</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View >
    )
}



export default StartUpInfo



const styles = StyleSheet.create({

    mainView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },

    //프로필 세션
    profileView: {
        width: '90%',
        height: 60,
        marginTop: 10,
        flexDirection: 'row',
    },

    imageView: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 30,
    },

    profileImage: {
        width: '100%',
        height: 400,
        borderRadius: 30,
    },

    profileInfoView: {
        flex: 1,
        justifyContent: 'center',
    },

    nameText: {
        fontSize: 24,
        fontWeight: 'bold',
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
        marginTop: 0,
    },

    moreView: {
        position: 'absolute',
        justifyContent: 'center',
        right: 0,
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

    //멤버
    memberScrollView: {
        flexDirection: 'row'
    },

    memberView: {
        height: 100,
        marginRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },

    userImage: {
        width: 60,
        height: 60,
        borderRadius: 100,
        marginLeft: 15,
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

    crownView: {
        position: 'absolute',
        marginLeft: 30,
        top: 0
    },

    //채팅 세션
    btnView: {
        flexDirection: 'row',
        width: '90%',
        height: 100,
    },

    chatBtn: {
        backgroundColor: '#5552E2',
        height: 60,
        width: '47%',
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    },
    
    chatBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 600,
    }
})