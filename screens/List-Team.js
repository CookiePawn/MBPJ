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
    startupImages,
    startupDBs,
    teamDBs,
} from '../DB/LoadDB'





const CustomList = (props) => {
    return (
        <TouchableOpacity>
            <View style={styles.listSubView}>
                <Image
                    style={styles.profileImage}
                    source={props.image}
                />
                <View style={styles.listSubSubView}>
                    <Text style={styles.nameText}>{props.info}</Text>
                    <Text style={styles.infoText}>{props.name}</Text>
                    <View style={[styles.icon, { right: 10, bottom: 15, flexDirection: 'row' }]}>
                        {props.score >= 70 ? (
                            <Icon name='grin-alt' size={20} color='green' />
                        ) : props.score >= 30 ? (
                            <Icon name='meh' size={20} color='orange' />
                        ) : (
                            <Icon name='frown' size={20} color='red' />
                        )}
                        <Text>{props.score}점</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}







const Team = (props) => {
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
    const [startupImage, setStartupImage] = useState([]);
    const [startup, setStartup] = useState([])
    const [team, setTeam] = useState([])

    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchDB = async () => {
            setStartup(startupDBs)
            setStartupImage(startupImages)
            setTeam(teamDBs)
        };

        fetchDB()
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
                titleName='팀원 모집'
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
            <View style={styles.createView}>
                {num !== null && (
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate('TeamEdit', {
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
                        <Text style={{ textAlign: 'right' }}>글 작성하기</Text>
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.listView}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    {startup.map((startupItem, idx) => {
                        const matchingTeam = team.find((teamItem) => teamItem.suID === startupItem.id);
                        if (matchingTeam) {
                            const matchingImage = startupImage.find((imageItem) => imageItem.name === startupItem.name);
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
                                            people: startupItem.id,
                                        })
                                    }}
                                >
                                    <View style={styles.listSubView}>
                                        <Image
                                            style={styles.profileImage}
                                            source={matchingImage ? { uri: matchingImage.url } : require('../assets/start-solo.png')}
                                        />
                                        <View style={styles.listSubSubView}>
                                            <Text style={styles.nameText}>{startupItem.name}</Text>
                                            <Text style={styles.infoText}>{startupItem.info}</Text>
                                            <View style={[styles.icon, { right: 0, bottom: 15, flexDirection: 'row', alignContent: 'flex-end' }]}>
                                                {startupItem.score >= 70 ? (
                                                    <Icon name='grin-alt' size={20} color='green' />
                                                ) : startupItem.score >= 30 ? (
                                                    <Icon name='meh' size={20} color='orange' />
                                                ) : (
                                                    <Icon name='frown' size={20} color='red' />
                                                )}
                                                <Text style={styles.scoreText}>{startupItem.score}점</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        }
                        return null; // team과 매치되지 않는 경우 아무것도 렌더링하지 않음
                    })}
                </ScrollView>


            </View>
        </View>
    )
}



export default Team




const styles = StyleSheet.create({

    //메인 뷰
    mainView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },

    icon: {
        justifyContent: 'flex-end',
        marginTop: 45
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
        marginTop: 5
    },
    infoText: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.60)',
        position: 'absolute',
        bottom: 10,
        marginBottom: 10
    },

    scoreText: {
        marginTop: 3,
        marginLeft: 5
    }
})