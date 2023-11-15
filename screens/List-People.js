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
import { loadUserImages, loadUsers } from '../DB/LoadDB'



const CustomList = (props) => {
    return (
        <TouchableOpacity
            onPress={() => {
                props.navi.navigation.navigate('PeopleInfo', props.params)
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
                    <Icon name='heart-outline' size={20} color='red' style={[styles.icon, { right: 10, bottom: 15, }]} />
                </View>
            </View>
        </TouchableOpacity>
    )
}





const People = (props) => {
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


    //db
    const [imageUrl, setImageUrl] = useState([]);
    const [user, setUser] = useState([])

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

        fetchImage();
        fetchUserInfo();
    }, [isFocused]);









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
                    이런 사람은 어때요?
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
            <View style={styles.listView}>
                <ScrollView
                    style={{ marginBottom: 150, }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    {user.map((userItem, idx) => {
                        const userUrl = imageUrl.filter((item) => item.name === userItem.perID);



                        if (search == '') {
                            if (userUrl.length > 0) {
                                return userUrl.map((urlItem, urlIdx) => (
                                    <CustomList
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
                                <CustomList
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
                        } else if (userItem.name.includes(search)) {
                            if (userUrl.length > 0) {
                                return userUrl.map((urlItem, urlIdx) => (
                                    <CustomList
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
                                <CustomList
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
                        }

                    })}
                </ScrollView>
            </View>
        </View>
    )
}



export default People




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
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15
    },
    infoText: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.60)'
    },
})