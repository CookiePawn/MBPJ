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
import Icon from 'react-native-vector-icons/FontAwesome5'
import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';
import { BarChart } from 'react-native-chart-kit';


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
    const [data, setData] = useState({
        labels: [],
        datasets: [{ data: [] }],
    });

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



        if (user && user.infoGitLanguage) {
            // 객체의 키와 값을 분리하여 두 개의 배열로 만듦
            const labels = Object.keys(user.infoGitLanguage);
            const data = Object.values(user.infoGitLanguage);

            // 데이터를 내림차순으로 정렬하고, 레이블도 동일한 순서로 정렬
            const sortedIndices = data
                .map((value, index) => ({ value, index }))
                .sort((a, b) => b.value - a.value)
                .map(data => data.index);

            const sortedLabels = sortedIndices.map(index => labels[index]);
            const sortedData = sortedIndices.map(index => data[index]);

            // 차트 데이터 상태 업데이트
            setData({
                labels: sortedLabels,
                datasets: [
                    {
                        data: sortedData
                    }
                ]
            });
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
                <View style={styles.likeView}>
                    {user.score >= 70 ? (
                        <Icon name='grin-alt' size={20} color='green' />
                    ) : user.score >= 30 ? (
                        <Icon name='meh' size={20} color='orange' />
                    ) : (
                        <Icon name='frown' size={20} color='red' />
                    )}
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

                    <Text style={styles.bigText}>깃허브 닉네임</Text>
                    <Text style={styles.smallText}>{user.infoGitNickname}</Text>

                    <Text style={styles.bigText}>사용 언어</Text>
                    <BarChart
                        data={data}
                        width={350} // 가로 길이
                        height={220} // 세로 길이
                        chartConfig={{
                            backgroundColor: '#e26a00',
                            backgroundGradientFrom: '#fb8c00',
                            backgroundGradientTo: '#ffa726',
                            decimalPlaces: 0, // 소수점 자리 수
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            }
                        }}
                        verticalLabelRotation={30}
                    />

                    <Text style={styles.bigText}>프로젝트</Text>
                    {
            
                        user.infoProject && user.infoProject.map((item, idx) => {
                            return (
                                <TouchableOpacity
                                    key={idx}
                                    onPress={() => {
                                        Linking.openURL(`https://github.com/${user.infoGitNickname}/${item}`);
                                    }}
                                >
                                    <Text style={[styles.smallText, { color: 'lightskyblue' }]}>https://github.com/{user.infoGitNickname}/{item}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }

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
                                    <View style={styles.memberView}>
                                        {isAdmin && (
                                            <Icon name='crown' color='gold' size={25} style={styles.crownView} />
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

})