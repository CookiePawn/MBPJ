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
import { loadStartUpImages, loadStartUps } from '../DB/LoadDB'





const CustomList = (props) => {
    return (
        <TouchableOpacity
            onPress={() => {
                props.navi.navigation.navigate('StartUpInfo', props.params)
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
                    <View style={[styles.icon, { right: 0, bottom: 15, flexDirection: 'row', alignContent: 'flex-end' }]}>
                        {props.score >= 70 ? (
                            <Icon name='grin-alt' size={20} color='green' />
                        ) : props.score >= 30 ? (
                            <Icon name='meh' size={20} color='orange' />
                        ) : (
                            <Icon name='frown' size={20} color='red' />
                        )}
                        <Text style={styles.scoreText}>{props.score}점</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}



const StartUpList = (props) => {
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
    const [startup, setStartup] = useState([])

    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchStartUpImage = async () => {
            const images = await loadStartUpImages()
            setImageUrl(images)
        };
        const fetchStartupInfo = async () => {
            const startups = await loadStartUps();
            setStartup(startups);
        };

        fetchStartUpImage();
        fetchStartupInfo();
    }, [isFocused]);





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
                titleName='이런 스타트업은 어때요?'
            />

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
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    {startup.map((startupItem, idx) => {
                        const startupUrl = imageUrl.filter((item) => item.name === startupItem.name);


                        if (search == '') {
                            if (startupUrl.length > 0) {
                                return startupUrl.map((urlItem, urlIdx) => (
                                    <CustomList
                                        key={idx}
                                        image={{ uri: urlItem.url }}
                                        name={startupItem.name}
                                        info={startupItem.info}
                                        score={startupItem.score}
                                        navi={props}
                                        params={{
                                            num: num,
                                            id: id,
                                            pw: pw,
                                            phone: phone,
                                            name: name,
                                            email: email,
                                            image: image,
                                            people: startupItem.id,
                                        }}
                                    />
                                ));
                            }

                            return (
                                <CustomList
                                    key={idx}
                                    image={require('../assets/start-solo.png')}
                                    name={startupItem.name}
                                    info={startupItem.info}
                                    score={startupItem.score}
                                    navi={props}
                                    params={{
                                        num: num,
                                        id: id,
                                        pw: pw,
                                        phone: phone,
                                        name: name,
                                        email: email,
                                        image: image,
                                        people: startupItem.id,
                                    }}
                                />
                            );
                        } else if (startupItem.name.includes(search)) {
                            if (startupUrl.length > 0) {
                                return startupUrl.map((urlItem, urlIdx) => (
                                    <CustomList
                                        key={idx}
                                        image={{ uri: urlItem.url }}
                                        name={startupItem.name}
                                        info={startupItem.info}
                                        score={startupItem.score}
                                        navi={props}
                                        params={{
                                            num: num,
                                            id: id,
                                            pw: pw,
                                            phone: phone,
                                            name: name,
                                            email: email,
                                            image: image,
                                            people: startupItem.id,
                                        }}
                                    />
                                ));
                            }

                            return (
                                <CustomList
                                    key={idx}
                                    image={require('../assets/start-solo.png')}
                                    name={startupItem.name}
                                    info={startupItem.info}
                                    score={startupItem.score}
                                    navi={props}
                                    params={{
                                        num: num,
                                        id: id,
                                        pw: pw,
                                        phone: phone,
                                        name: name,
                                        email: email,
                                        image: image,
                                        people: startupItem.id,
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



export default StartUpList





const styles = StyleSheet.create({

    //메인 뷰
    mainView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },

    icon: {
        justifyContent: 'flex-end',
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
        flex: 1,
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
        borderRadius: 10,
        margin: 10,
        marginRight: 15,
        marginTop: 13,
        marginLeft: 'auto'
    },

    listSubSubView: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: '#E8E8E8',
        justifyContent: 'center',
        marginTop: 18
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

    scoreText: {
        marginTop: 3,
        marginLeft: 5
    }
})