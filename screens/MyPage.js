import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';


//헤더
import Header from '../components/Header';


//db 로드
import { 
    userImages,

    loadUserSelect
} from '../DB/LoadDB'



const MyPage = (props) => {
    //로그인 확인
    const { params } = props.route;
    const num = params ? params.num : null;
    const id = params ? params.id : null;
    const pw = params ? params.pw : null;
    const name = params ? params.name : null;
    const email = params ? params.email : null;
    const phone = params ? params.phone : null;
    const image = params ? params.image : null;




    //db
    const [imageUrl, setImageUrl] = useState([]);
    const [user, setUser] = useState([])


    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchDB = async () => {
            setImageUrl(userImages);
        };
        const fetchUser = async () => {
            const users = await loadUserSelect(num)
            setUser(users)
        }

        fetchDB();
        fetchUser()
    }, [isFocused]);


    const [foundImage, setFoundImage] = useState(null);

    useEffect(() => {
        if (imageUrl.length > 0) {
            const matchImage = imageUrl.find(item => item.name === id);
            setFoundImage(matchImage);
        }
    }, [imageUrl]);




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
                    <Text style={styles.nameText}>{name}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        {user.score >= 70 ? (
                            <Icon name='grin-alt' size={20} color='green' />
                        ) : user.score >= 30 ? (
                            <Icon name='meh' size={20} color='orange' />
                        ) : (
                            <Icon name='frown' size={20} color='red' />
                        )}
                        <Text style={styles.scoreText}>{user.score}점</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity
                style={styles.profileBtn}
                onPress={() => {
                    props.navigation.navigate('MyProfile', {
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
                <Text style={styles.profileBtnText}>프로필 보기</Text>
            </TouchableOpacity>
            <View style={styles.btnListView}>
                <TouchableOpacity
                    style={styles.btnListSubView}
                    onPress={() => {
                        props.navigation.navigate('MyPageInfo', {
                            num: num,
                            id: id,
                            pw: pw,
                            phone: phone,
                            name: name,
                            email: email,
                            image: image,
                            people: num,
                        })
                    }}
                >
                    <Icon name='user-alt' size={20} color='black' />
                    <Text style={styles.btnListText}>내 페이지 보기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btnListSubView}
                    onPress={() => {
                        props.navigation.navigate('EditPeopleInfo', {
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
                    <Icon name='pencil-alt' size={20} color='black' />
                    <Text style={styles.btnListText}>내 페이지 수정</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btnListSubView}
                    onPress={() => {
                        props.navigation.navigate('StartUpMore', {
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
                    <Icon name='briefcase' size={20} color='black' />
                    <Text style={styles.btnListText}>내 스타트업</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btnListSubView}
                    onPress={() => {
                        props.navigation.navigate('Help', {
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
                    <Icon name='question' size={20} color='black'/>
                    <Text style={styles.btnListText}>도움말</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.logoutBtn}
                onPress={() => {
                    props.navigation.navigate('Category')
                    alert('로그아웃 되었습니다!')
                }}
            >
                <Text style={styles.logoutBtnText}>로그아웃</Text>
            </TouchableOpacity>
        </View>
    )
}



export default MyPage





const styles = StyleSheet.create({

    //메인 뷰
    mainView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },


    //프로필 뷰
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



    //프로필 보기 버튼
    profileBtn: {
        width: '90%',
        height: 50,
        backgroundColor: '#5552E2',
        borderRadius: 30,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileBtnText: {
        fontSize: 16,
        fontWeight: 600,
        color: 'white'
    },


    //버튼 리스트 뷰
    btnListView: {
        width: '90%',
        marginTop: 30,
        borderColor: '#DDD',
        borderBottomWidth: 1
    },
    btnListSubView: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    btnListText: {
        fontSize: 14,
        fontWeight: 600,
        lineHeight: 22,
        marginLeft: 10,
    },



    //로그아웃
    logoutBtn: {
        width: '90%',
        marginTop: 30,
    },
    logoutBtnText: {
        fontSize: 14,
        fontWeight: 600,
    },


    scoreText: {
        marginLeft: 5,
        marginTop: 3
    }
})