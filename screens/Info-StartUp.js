import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Linking,
    ScrollView,
    StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';

//db 로드
import { loadStartUpImages, loadStartUpSelect, loadUsers, loadUserImages } from '../DB/LoadDB'





const CustomPeople = (props) => {
    return (
        <View style={styles.memberView}>
            <Image style={styles.userImage} source={props.image} />
            <Text style={styles.userName}>
                {props.name}{'\n'}
                <Text style={styles.userInfo}>{props.info}</Text>
            </Text>
        </View>
    )

}

















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
    const [foundImage, setFoundImage] = useState(null);

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

        fetchStartUpImage();
        fetchStartupInfo();
        fetchUserInfo();
        fetchUserImage();
    }, [isFocused]);

    useEffect(() => {
        if (startup.name && imageUrl.length > 0) {
            const matchImage = imageUrl.find(item => item.name === startup.name);
            setFoundImage(matchImage);
        }
    }, [imageUrl]);





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
                    <Text style={styles.nameText}>{startup.name}</Text>
                    <Text style={styles.infoText}>소속 : {startup.infoGroup}</Text>
                </View>
                <View style={styles.likeView}>
                    <Icon name='heart' size={20} color='red' />
                    <Text style={styles.likeText}>100</Text>
                </View>
            </View>
            <ScrollView style={styles.inforView}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity>
                        <Text
                            style={[
                                styles.smallText,
                                {
                                    position: 'absolute',
                                    top: 30,
                                    right: 0,
                                }
                            ]}>자세히 보기 ▷</Text>
                    </TouchableOpacity>
                    <Text style={styles.bigText}>단계</Text>
                    <Text style={styles.smallText}>{startup.step} 단계</Text>

                    <Text style={styles.bigText}>주제</Text>
                    <Text style={styles.smallText}>{startup.info}</Text>

                    <Text style={styles.bigText}>소개</Text>
                    <Text style={styles.smallText}>{startup.infoIntroduce}</Text>

                    <Text style={styles.bigText}>기술 / 스택</Text>
                    <Text style={styles.smallText}>{startup.infoCareer}</Text>

                    <Text style={styles.bigText}>멤버</Text>
                    <ScrollView
                        style={styles.memberScrollView}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {user.map((userItem, idx) => {

                            const userUrl = userImage.filter((item) => item.name === userItem.perID);

                            if (userUrl.length > 0) {
                                return userUrl.map((urlItem, urlIdx) => (
                                    <CustomPeople
                                        key={idx}
                                        image={{ uri: urlItem.url }}
                                        name={userItem.name}
                                        info={userItem.info}
                                        navi={props}
                                        params={{
                                            num: num,
                                            id: id,
                                            pw: pw,
                                            phone: phone,
                                            name: name,
                                            email: email,
                                            image: image,
                                            people: userItem.id,
                                        }}
                                    />
                                ));
                            }

                            return (
                                <CustomPeople
                                    key={idx}
                                    image={require('../assets/start-solo.png')}
                                    name={userItem.name}
                                    info={userItem.info}
                                    navi={props}
                                    params={{
                                        num: num,
                                        id: id,
                                        pw: pw,
                                        phone: phone,
                                        name: name,
                                        email: email,
                                        image: image,
                                        people: userItem.id,
                                    }}
                                />
                            );
                        })}
                    </ScrollView>
                </View>
            </ScrollView>

            <TouchableOpacity
                style={styles.chatBtn}
            >
                <Text style={styles.chatBtnText}>채팅하기</Text>
            </TouchableOpacity>
        </View>
    )
}



export default StartUpInfo

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




    //멤버
    memberScrollView: {
        flexDirection: 'row'
    },
    memberView: {
        height: 100,
        marginRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.05)'
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