import {
    View,
    Text,
    Image,
    TextInput,
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
    loadUserImages,
    loadUsers,
    loadLetter,
    loadJoin,
    loadStartUps,
    deleteJoin,
    addMember,
    deleteLetter,
} from '../DB/LoadDB'


// 쪽지 용 CustomList
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
                    <Text style={styles.infoText}>{props.info.substring(0, 20)}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        props.delete()
                    }}
                >
                    <Icon name='trash-alt' size={20} color='#767676' style={[styles.icon, { right: 10, top: 50, }]} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}


//가입 확인용 CustomList
const CustomList1 = (props) => {

    const matchingStartup = props.startups.find(s => s.id === props.joinSuID);

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
                <View style={styles.listSubSubView1}>
                    <Text style={styles.nameText1}>{props.name}</Text>
                    {matchingStartup && <Text style={styles.infoText}>{matchingStartup.name}에 가입 신청</Text>}
                </View>

                <View style={styles.choiceView}>
                    <TouchableOpacity
                        onPress={() => {
                            props.add()
                            props.delete()
                            alert('승인되었습니다')
                        }}
                    >
                        <View style={styles.choiceBt}>
                            <Text style={styles.choiceYesText}>승인</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            props.delete()
                            alert('거절되었습니다')
                        }}
                    >
                        <View style={styles.choiceBt}>
                            <Text style={styles.choiceNoText}>거절</Text>
                        </View>
                    </TouchableOpacity>
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
    const [startup, setStartup] = useState([])

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
        const fetchStartUp = async () => {
            const startups = await loadStartUps()
            setStartup(startups)
        }

        fetchImage();
        fetchUserInfo();
        fetchLetter();
        fetchJoin();
        fetchStartUp()
    }, [isFocused]);



    // 가입 문서 삭제 후 배열 다시 로드
    const handleDeleteJoin = async (joinId, perID, suID) => {
        try {
            await deleteJoin(joinId, perID, suID);
            // 삭제한 후에 배열을 다시 로드
            const joins = await loadJoin();
            setJoin(joins);
        } catch (error) {
            console.error(`문서 삭제 중 오류가 발생했습니다: ${error}`);
        }
    };


    // 쪽지 문서 삭제 후 배열 다시 로드
    const handleDeleteLetter = async (letterId) => {
        try {
            alert('쪽지가 삭제되었습니다')
            await deleteLetter(letterId);
            // 삭제한 후에 배열을 다시 로드
            const letters = await loadLetter();
            setLetter(letters);
        } catch (error) {
            console.error(`문서 삭제 중 오류가 발생했습니다: ${error}`);
        }
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
                iconNameR1='notifications'
                iconNameR2='home'
                login = {num}
                titleName='알림 센터'
            />
            <View style={styles.btView}>
                <TouchableOpacity onPress={() => { setState(0) }}>
                    <View style={styles.letterView(state === 0)}>
                        <Text style={styles.letterText(state === 0)}>쪽지</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setState(1) }}>
                    <View style={styles.joinView(state === 1)}>
                        <Text style={styles.joinText(state === 1)}>가입</Text>
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
                                delete={() => handleDeleteLetter(item.id)}
                            />
                        );
                    })}
                    {state == 1 && join.filter(item => item.adminID === num).map((item, idx) => {
                        const matchingUser = user.find(u => u.id === item.perID);
                        const userName = matchingUser ? matchingUser.name : "Unknown User";

                        const userImage = imageUrl.find(img => img.name === matchingUser.perID);
                        const imageSource = userImage ? { uri: userImage.url } : require('../assets/start-solo.png');

                        return (
                            <CustomList1
                                key={idx}
                                name={userName}
                                image={imageSource}
                                joinSuID={item.suID}
                                startups={startup}
                                navi={props}
                                screen='PeopleInfo'
                                params={{
                                    num: num,
                                    id: id,
                                    pw: pw,
                                    phone: phone,
                                    name: name,
                                    email: email,
                                    image: image,
                                    people: matchingUser.id,
                                }}
                                add={async() => await addMember(item.perID, item.suID)}
                                delete={() => handleDeleteJoin(item.id, item.perID, item.suID)}
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
    listSubSubView1: {
        borderBottomWidth: 1,
        borderColor: '#E8E8E8',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: 140
    },
    nameText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    nameText1: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    infoText: {
        fontSize: 14,
        color: 'rgba(0, 0, 0, 0.60)',
    },


    btView: {
        flexDirection: 'row',
        width: '90%',
        marginBottom: 5,
        position: 'relative'
    },

    letterView: (isActive) => ({
        backgroundColor: isActive ? '#5552E2' : '#f1f1f1',
        width: 76,
        height: 34,
        borderRadius: 20,
        justifyContent: 'center'
    }),
    letterText: (isActive) => ({
        fontWeight: 'light',
        color: isActive ? 'white' : '#999999',
        textAlign: 'center',
    }),

    joinView: (isActive) => ({
        backgroundColor: isActive ? '#5552E2' : '#f1f1f1',
        width: 76,
        height: 34,
        borderRadius: 20,
        marginLeft: 10,
        justifyContent: 'center'
    }),
    joinText: (isActive) => ({
        fontWeight: 'light',
        color: isActive ? 'white' : '#999999',
        textAlign: 'center',
    }),

    choiceView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderBottomWidth: 1,
        borderColor: '#E8E8E8',
    },

    choiceBt: {
        width: 60,
        backgroundColor: 'white',
    },

    choiceYesText: {
        fontSize: 16,
        color: 'green',
        textAlign: 'right',
        marginTop: 35,
        fontWeight: 'bold',
    },

    choiceNoText: {
        fontSize: 16,
        color: 'red',
        marginLeft: 28,
        marginTop: 35,
        fontWeight: 'bold',
    },

})