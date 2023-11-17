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
    loadStartUpImages,
    loadStartUps,
    loadTeam,
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
                        <Icon name='heart-outline' size={20} color='red' />
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
        const fetchStartUpImage = async () => {
            const images = await loadStartUpImages()
            setStartupImage(images)
        };
        const fetchStartUps = async () => {
            const startups = await loadStartUps()
            setStartup(startups)
        }
        const fetchTeams = async () => {
            const teams = await loadTeam()
            setTeam(teams)
        }


        fetchStartUpImage()
        fetchStartUps()
        fetchTeams()

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
                    팀원 모집
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
                                            <View style={[styles.icon, { right: 0, bottom: 15, flexDirection: 'row', alignContent:'flex-end' }]}>
                                                <Icon name='heart' size={20} color='red' />
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
    },






    //스타트업 리스트
    listView: {
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