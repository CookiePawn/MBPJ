import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';

//db 로드
import {
    loadUserImages,
    loadUsers,
    loadLetter,
    loadJoin,
} from '../DB/LoadDB'



const CustomList = (props) => {
    return (
        <TouchableOpacity
            onPress={() => {
                props.navi.navigation.navigate(props.screen, props.params)
            }}
        >
            <View style={styles.listSubView}>
                <Image
                    style={styles.profileImage}
                    source={props.image}
                />
                <View style={styles.listSubSubView}>
                    <Text style={styles.nameText}>{props.name}</Text>
                    <Text style={styles.infoText}>{props.info}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}





const AlertPage = (props) => {
    //로그인 확인
    const { params } = props.route;
    const num = params ? params.num : null;
    const id = params ? params.id : null;
    const pw = params ? params.pw : null;
    const name = params ? params.name : null;
    const email = params ? params.email : null;
    const phone = params ? params.phone : null;
    const image = params ? params.image : null;

    const [state, setState] = useState(0);


    //db
    const [imageUrl, setImageUrl] = useState([]);
    const [user, setUser] = useState([]);
    const [letter, setLetter] = useState([]);
    const [join, setJoin] = useState([]);

    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchImage = async () => {
            const images = await loadUserImages();
            setImageUrl(images);
        };
        const fetchUserInfo = async () => {
            const users = await loadUsers();
            setUser(users);
        };
        const fetchLetter = async () => {
            const letters = await loadLetter();
            setLetter(letters);
        }
        const fetchJoin = async () => {
            const joins = await loadJoin();
            setJoin(joins);
        }

        fetchImage();
        fetchUserInfo();
        fetchLetter();
        fetchJoin();
    }, [isFocused]);

    const [selectedButton, setSelectedButton] = useState(0); // 0: 쪽지, 1: 기업

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
                <Text style={styles.titleText}>
                    알림 센터
                </Text>
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

            <View style={styles.btView}>
                <TouchableOpacity onPress={() => { setState(0) }}>
                    <View style={styles.letterView}>
                        <Text style={styles.letterText}>쪽지</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setState(1) }}>
                    <View style={styles.joinView}>
                        <Text style={styles.letterText}>가입</Text>
                    </View>
                </TouchableOpacity>


            </View>

            <View style={styles.listView}>
                <ScrollView
                    style={{ marginBottom: 150, }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    {state == 0 && letter.filter(item => item.fromID === num).map((item, idx) => {

                        const matchingUser = user.find(u => u.id === item.toID);
                        const userName = matchingUser ? matchingUser.name : "Unknown User";

                        const userImage = imageUrl.find(img => img.name === matchingUser.perID);
                        const imageSource = userImage ? { uri: userImage.url } : require('../assets/start-solo.png'); // Replace with your default image path

                        return (
                            <CustomList
                                key={idx}
                                name={userName}
                                info={item.content}
                                image={imageSource}
                                navi={props}
                                screen='LetterInfo'
                                params={{
                                    num: num,
                                    id: id,
                                    pw: pw,
                                    phone: phone,
                                    name: name,
                                    email: email,
                                    image: image,
                                    people: item.id,
                                }}
                            />
                        );
                    })}
                    {state == 1 && join.filter(item => item.adminID === num).map((item, idx) => {
                        const matchingUser = user.find(u => u.id === item.perID);
                        const userName = matchingUser ? matchingUser.name : "Unknown User";

                        const userImage = imageUrl.find(img => img.name === matchingUser.perID);
                        const imageSource = userImage ? { uri: userImage.url } : require('../assets/start-solo.png'); // Replace with your default image path

                        return (
                            <CustomList
                                key={idx}
                                name={userName}
                                image={imageSource}
                                navi = {props}
                                screen = 'PeopleInfo'
                                params = {{
                                    num: num,
                                    id: id,
                                    pw: pw,
                                    phone: phone,
                                    name: name,
                                    email: email,
                                    image: image,
                                    people: matchingUser.id,
                                }}
                            />
                        );
                    })}
                </ScrollView>
            </View>
        </View>
    )
}



export default AlertPage




const styles = StyleSheet.create({

    //메인 뷰
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
        marginBottom: 30,
    },
    icon: {
        position: 'absolute',
        bottom: 0,
    },
    titleText: {
        position: 'absolute',
        bottom: 0,
        fontSize: 23,
        fontWeight: 'bold',
    },

    //사람 목록
    listView: {
        width: '90%',
    },
    listSubView: {
        width: '100%',
        height: 90,
        flexDirection: 'row',
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 100,
        margin: 10,
        marginRight: 20,
        marginTop: 13
    },
    listSubSubView: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: '#E8E8E8',
        justifyContent: 'center',
    },
    nameText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15
    },
    infoText: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.60)'
    },

    btView: {
        flexDirection: 'row',
        width: '90%',
        marginBottom: 5
    },

    letterView: {
        backgroundColor: '#f1f1f1',
        width: 76,
        height: 34,
        borderRadius: 20,
    },
    letterText: {
        fontWeight: 'light',
        color: '#999999',
        textAlign: 'center',
        marginTop: 10,
    },

    joinView: {
        backgroundColor: '#f1f1f1',
        width: 76,
        height: 34,
        borderRadius: 20,
        marginLeft: 10,
    }
})