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
import { loadUserImages, loadUserSelect } from '../DB/LoadDB'


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
    const [foundImage, setFoundImage] = useState(null);

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

        fetchImage();
        fetchUserInfo();
    }, [isFocused]);

    useEffect(() => {
        if (user.image && imageUrl.length > 0) {
            const matchImage = imageUrl.find(item => item.name === user.image);
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
                <View style={styles.likeView}>
                    <Icon name='heart' size={20} color='red' />
                    <Text style={styles.likeText}>{user.infoHeart}</Text>
                </View>
            </View>
            <ScrollView style={styles.inforView}>
                <View style={{ flex: 1 }}>
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

                    <View style={{ flexDirection: 'row' }}>
                        <Text sttle={styles.midText}>포트폴리오 다운로드   </Text>
                        <Icon name='folder-outline' size={20} style={styles.fileicon}></Icon>
                    </View>
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