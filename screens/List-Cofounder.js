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
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native';


//DB
import {
    loadCofounder,
    loadUsers,
    loadCofounderImages,
} from '../DB/LoadDB'








const Cofounder = (props) => {
    //로그인 확인
    const { params } = props.route;
    const num = params ? params.num : null;
    const id = params ? params.id : null;
    const pw = params ? params.pw : null;
    const name = params ? params.name : null;
    const email = params ? params.email : null;
    const phone = params ? params.phone : null;
    const image = params ? params.image : null;


    //검색
    const [search, setSearch] = useState('')


    //DB
    const [cofounder, setCofounder] = useState([])
    const [imageUrls, setImageurl] = useState([])
    const [user, setUser] = useState([])


    const isFocused = useIsFocused();



    useEffect(() => {
        const fetchCofounder = async () => {
            const cofounders = await loadCofounder();
            setCofounder(cofounders);
        };
        const fetchImage = async () => {
            const images = await loadCofounderImages()
            setImageurl(images)
        }

        fetchCofounder()
        fetchImage()
    }, [isFocused])


    useEffect(() => {
        const fetchUser = async () => {
            const users = await loadUsers();
            setUser(users);
        };
        fetchUser()
    }, [cofounder])








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
                    공동 창업자 모집
                </Text>
                <TouchableOpacity
                    style={[styles.icon, { right: 0, }]}
                    onPress={() => {
                        if (num == null) {
                            props.navigation.navigate('PersonLogin')
                        } else if (num != null) {
                            props.navigation.navigate('AlertPage', {
                                num: num,
                                id: id,
                                pw: pw,
                                phone: phone,
                                name: name,
                                email: email,
                                image: image,
                            })
                        }
                    }}
                >
                    <Icon name='notifications-outline' size={25} color='black' />
                </TouchableOpacity>

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
            <View style={styles.searchView}>
                <TextInput
                    style={styles.searchTextinput}
                    placeholder='검색어를 입력하세요'
                    placeholderTextColor='#777'
                    value={search}
                    onChangeText={(e) => { setSearch(e) }}
                    maxLength={20}
                />
            </View>
            <View style={styles.createView}>
                {num !== null && (
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate('CofounderEdit', {
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
                        <Text style={{ textAlign: 'right', fontWeight: 'bold', color: '#767676' }}>글 작성하기</Text>
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.listView}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    {cofounder.map((cofounderItem, idx) => {
                        // cofounderItem의 perID와 일치하는 user의 id를 찾음
                        const matchingUser = user.find((userItem) => userItem.id === cofounderItem.perID);
                        // matchingUser가 존재한다면, 해당 user의 name을 사용
                        const cofounderName = matchingUser ? matchingUser.name : '사용자 없음';

                        // imageUrls 배열에서 name이 cofounderItem의 id와 일치하는 이미지 URL을 찾음
                        const matchingImageUrl = imageUrls.find((imageUrlItem) => imageUrlItem.name === cofounderItem.id);
                        // matchingImageUrl이 존재한다면 해당 URL을 사용, 그렇지 않으면 'start-solo.png'를 사용
                        const cofounderImage = matchingImageUrl ? { uri: matchingImageUrl.url } : require('../assets/start-solo.png');

                        return (
                            <TouchableOpacity
                                key={idx}
                                onPress={() => {
                                    props.navigation.navigate('CofounderInfo', {
                                        num: num,
                                        id: id,
                                        pw: pw,
                                        phone: phone,
                                        name: name,
                                        email: email,
                                        image: image,
                                        people: cofounderItem.id,
                                    })
                                }}
                            >
                                <View style={styles.listSubView}>
                                    <Image
                                        style={styles.profileImage}
                                        source={cofounderImage}
                                    />
                                    <View style={styles.listSubSubView}>
                                        <Text style={styles.nameText}>{cofounderItem.title}</Text>
                                        <Text style={styles.infoText}>{cofounderName}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>
        </View>
    )
}



export default Cofounder




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


    //검색창
    searchView: {
        width: '90%',
        height: 50,
        backgroundColor: '#F6F6F6',
        borderRadius: 20,
        flexDirection: 'row',
        marginBottom: 20,
    },
    searchTextinput: {
        flex: 1,
        backgroundColor: '#F6F6F6',
        borderRadius: 20,
        paddingLeft: 10,
        marginLeft: 5
    },




    //글 작성하기 버튼
    createView: {
        width: '90%',
        marginBottom: 10
    },




    //스타트업 리스트
    listView: {
        flex: 1,
        width: '90%',
    },
    listSubView: {
        width: '100%',
        height: 110,
        flexDirection: 'row',
    },
    profileImage: {
        width: 85,
        height: 85,
        borderRadius: 10,
        margin: 10,
        marginRight: 20,
    },
    listSubSubView: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: '#E8E8E8',
    },
    nameText: {
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 40,
        marginTop:5
    },
    infoText: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.60)',
        position: 'absolute',
        bottom: 10,
        marginBottom: 10
    },
})