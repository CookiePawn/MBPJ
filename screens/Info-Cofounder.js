import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';

//헤더
import Header from '../components/Header';

//db 로드
import {
    loadCofounderSelect,
    loadUserSelect,
    loadCofounderImages,
    loadUserImages,
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
    const [cofounderImg, setCofounderImg] = useState([]);
    const [userImg, setUserImg] = useState([])
    const [cofounder, setCofounder] = useState([])
    const [user, setUser] = useState([])

    const [foundUserImage, setFoundUserImage] = useState(null)
    const [foundCofounderImage, setFoundCofounderImage] = useState(null)

    const isFocused = useIsFocused();


    useEffect(() => {
        const fetchCofounder = async () => {
            const cofounder = await loadCofounderSelect(people)
            setCofounder(cofounder)
        }

        const fetchCofounderImg = async () => {
            const images = await loadCofounderImages()
            setCofounderImg(images)
        }

        const fetchUserImg = async () => {
            const images = await loadUserImages()
            setUserImg(images)
        }


        fetchCofounder()
        fetchCofounderImg()
        fetchUserImg()
    }, [isFocused]);



    useEffect(() => {
        const fetchUser = async () => {
            if (cofounder.perID) {
                const user = await loadUserSelect(cofounder.perID);
                setUser(user);
            }
        };
        fetchUser()
    }, [cofounder])



    useEffect(() => {
        if (user.perID && userImg.length > 0) {
            const matchImage = userImg.find(item => item && item.name === user.perID);
            setFoundUserImage(matchImage);
        }
        
        if (cofounder.id && cofounderImg.length > 0) {
            const matchImage = cofounderImg.find(item => item && item.name === cofounder.id);
            setFoundCofounderImage(matchImage);
        }
    }, [user, userImg, cofounder, cofounderImg]);



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
                iconNameR1='notifications'
                iconNameR2='home'
                login = {num}
            />
            <ScrollView
                style={styles.inforView}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ flex: 1 }}>
                    <View style={styles.imageView}>
                        {foundCofounderImage ? (
                            <Image
                                style={styles.profileImage}
                                source={{ uri: foundCofounderImage.url }}
                            />
                        ) : (
                            <Image
                                style={styles.profileImage}
                                source={require('../assets/start-solo.png')}
                            />
                        )}
                    </View>
                    <Text style={[styles.TitleText, { marginBottom: 40 }]}>{cofounder.title}</Text>

                    <Text style = {styles.bigText}>분야</Text>
                    <Text style = {styles.smallText}>{cofounder.field}</Text>

                    <Text style={styles.bigText}>아이디어</Text>
                    <Text style={styles.smallText}>{cofounder.idea}</Text>

                    <Text style={styles.bigText}>상세 내역</Text>
                    <Text style={styles.smallText}>{cofounder.info}</Text>

                    <Text style={styles.bigText}>복리후생</Text>
                    <Text style={styles.smallText}>{cofounder.benefit}</Text>

                    <Text style={styles.bigText}>공고자</Text>

                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate('PeopleInfo', {
                                num: num,
                                id: id,
                                pw: pw,
                                phone: phone,
                                name: name,
                                email: email,
                                image: image,
                                people: user.id,
                            })
                        }}
                    >

                        <View style={styles.memberView}>
                            {foundUserImage ? (
                                <Image
                                    style={styles.userImage}
                                    source={{ uri: foundUserImage.url }}
                                />
                            ) : (
                                <Image
                                    style={styles.userImage}
                                    source={require('../assets/start-solo.png')}
                                />
                            )}
                            <Text style={styles.userName}>
                                {user.name}{'\n'}
                                <Text style={styles.userInfo}>{user.field}</Text>
                            </Text>
                        </View>    
                    </TouchableOpacity>
                </View>
            </ScrollView >

            {num !== null && (
                <View style={styles.btnView}>
                    <TouchableOpacity
                        style={[styles.chatBtn, { width: '100%' }]}
                        onPress={() => {
                            props.navigation.navigate('LetterPage', {
                                num: num,
                                id: id,
                                pw: pw,
                                phone: phone,
                                name: name,
                                email: email,
                                image: image,
                                people: cofounder.perID,
                            })
                        }}
                    >
                        <Text style={styles.chatBtnText}>쪽지 보내기</Text>
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
        marginTop: 10,
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
        marginTop: 0,
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
        width: '100%',
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
        marginLeft: 15,
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
    },
    
    TitleText: {
        color: '#111',
        fontSize: 24,
        fontWeight: '500',
        marginBottom: 15,
        fontWeight: 'bold'
    }
})