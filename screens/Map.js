import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    ScrollView,
    Dimensions,
    Image,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
//사용자 위치 가져오기
import * as Location from 'expo-location';
//위도 경도로 거리 계산하기
import * as Geolib from 'geolib';
import Icon from 'react-native-vector-icons/Ionicons'
//import { Polyline } from 'react-native-svg';


//db 로드
import { loadStartUps, loadUsers, loadUserImages, loadStartUpImages} from '../DB/LoadDB';
import { useIsFocused } from '@react-navigation/native';

//로딩화면
import { renderFullScreenLoading } from '../components/Loading'

const SCREEN_WIDTH = Dimensions.get('window').width
const CARD_WIDTH = Dimensions.get('window').width * 0.95
const SPACING_CARD = Dimensions.get('window').width * 0.025

const Map = (props) => {
    //로그인 확인
    const { params } = props.route;
    const num = params ? params.num : null;
    const id = params ? params.id : null;
    const pw = params ? params.pw : null;
    const name = params ? params.name : null;
    const email = params ? params.email : null;
    const phone = params ? params.phone : null;
    const image = params ? params.image : null;

    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(true)

    const [user, setUser] = useState([]);
    const [startUp, setStartUp] = useState([]);
    const [userImage, setUserImage] = useState(null);
    const [startUpImage, setStartUpImage] = useState(null);
    const [userImageUrl, setUserImageUrl] = useState([]);
    const [startUpImageUrl, setStartUpImageUrl] = useState([]);
    const [foundImage, setFoundImage] = useState(null);
    const [userFoundImage, setUserFoundImage] = useState(null);
    const [startUpFoundImage, setStartUpFoundImage] = useState(null);

    //위치 정보
    const [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
    });

    const [km, setKm] = useState(0)
    const [followsUser, setFollowUser] = useState(true)

    const [cardList, setCardList] = useState([])

    const [selectMarker, setSelectMarker] = useState({
        latitude: region.latitude,
        longitude: region.longitude,
    })

    let mapIndex = 0
    let mapAnimation = new Animated.Value(0)
    const _map = useRef(null)
    const _scrollView = React.useRef(null)

    //사용자 위치 받기
    useEffect(() => {

        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                let location = await Location.getCurrentPositionAsync({});
                // 위치를 가져온 후에 region을 업데이트합니다.
                setRegion({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });
                setTimeout(() => {
                    setFollowUser(false)
                }, 2000);
            }
        })();

    }, []); // 빈 배열을 전달하여 componentDidMount와 같이 처음 한 번만 실행


    useEffect(() => {

        const fetchUserImage = async () => {
            const images = await loadUserImages();
            setUserImageUrl(images);
        };

        const fetchStartUpImage = async () => {
            const images = await loadStartUpImages();
            setStartUpImageUrl(images);
        };

        const fetchUser = async () => {
            const users = await loadUsers();
            const filteredUsers = users.filter((item) => 'lat' in item);
            setUser(filteredUsers);
        };

        const fetchStartUp = async () => {
            const startUps = await loadStartUps();
            const filteredStartUps = startUps.filter((item) => 'lat' in item);
            setStartUp(filteredStartUps);

        }

        fetchUserImage();
        fetchStartUpImage();
        fetchUser();
        fetchStartUp();

        setTimeout(() => {
            setIsLoading(false)
        }, 5000)

    }, [isFocused]);

    useEffect(() => {
        if (user && userImageUrl && userImageUrl.length > 0) {
            const matchedImages = user.map((user, index) => {
                const matchedImage = userImageUrl.find((item) => item.name === user.perID);
                return {
                    ...matchedImage,
                }
            });
            setUserFoundImage(matchedImages);
            setFoundImage(matchedImages);
        }
    }, [user, userImageUrl]);

    useEffect(() => {
        if (startUp && startUpImageUrl && startUpImageUrl.length > 0) {
            const matchedImages = startUp.map((startUp, index) => {
                const matchedImage = startUpImageUrl.find((item) => item.name === startUp.name);
                return {
                    ...matchedImage,
                }
            });
            setStartUpFoundImage(matchedImages);
        }

    }, [startUp, startUpImageUrl]);
    



    useEffect(() => {

        const distance = (user) => {
            return Geolib.getDistance(
                region,
                {
                    latitude: user.lat,
                    longitude: user.lng,
                }
        )};

        const sortData = () => {
            user.sort((a,b) => {
                const userA = distance(a)
                const userB = distance(b)
                return userA - userB
            })
        }

        sortData()

        if (user.length > 0) {
            setCardList(user)
        }

    }, [user])



    useEffect(() => {

        const distance = (startUp) => {
            return Geolib.getDistance(
                region,
                {
                    latitude: startUp.lat,
                    longitude: startUp.lng,
                }
        )};

        const sortData = () => {
            startUp.sort((a,b) => {
                const startUpA = distance(a)
                const startUpB = distance(b)
                return startUpA - startUpB
            })
        }

        sortData()

    }, [startUp])
    
    


    //스크롤 이벤트 발생 시 실행
    const handleOnScroll = event => {
        let index = parseInt(event.nativeEvent.contentOffset.x / Dimensions.get('window').width)
        if (index >= cardList.length) {
            index = cardList.length - 1
        }
        if (index <= 0) {
            index = 0
        }

        const regionTimeout = setTimeout(() => {
            if (mapIndex != index || (mapIndex == 0 && index == 0)) {
                mapIndex = index
                const coordinate = {latitude : cardList[index].lat, longitude : cardList[index].lng}
                setSelectMarker(coordinate)
                _map.current.animateToRegion(
                    {
                        ...coordinate,
                        region: cardList[index].lat,
                        region: cardList[index].lng,
                    }, 350);
            }
        }, 10)
    }



    return (
        <View style={{ flex: 1, backgroundColor: 'white', }}>
            {renderFullScreenLoading(isLoading)}
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
                    내 주변 기업 찾기
                </Text>
                <TouchableOpacity
                    style={[styles.icon, {right: 0,}]}
                    onPress={() => {
                        setFollowUser(true)
                        setTimeout(() => {
                            setFollowUser(false)
                        }, 1000);
                    }}
                >
                    <Icon name="location-outline" size={25} color="black" />
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

            <MapView
                style={{ flex: 2 }}
                region={region}
                showsUserLocation={true}
                followsUserLocation={followsUser}
                ref={_map}
            >

                { 
                    cardList.map((cardList, index) => {
                        return (
                            <Marker
                                key={index}
                                coordinate={{
                                    latitude : cardList.lat,
                                    longitude : cardList.lng,
                                }}
                                title={cardList.name}
                                onPress={() => {
                                    const distance = Geolib.getDistance(
                                        region,
                                        {
                                            latitude: cardList.lat,
                                            longitude: cardList.lng,
                                        }
                                    );
                                    setKm(distance)
                                    setSelectMarker({
                                        latitude : cardList.lat,
                                        longitude : cardList.lng,
                                    })
                                }}
                            >

                            </Marker>
                        )
                    })
                }


                <Polyline
                    coordinates={[
                        { latitude: region.latitude, longitude: region.longitude },
                        { latitude: selectMarker.latitude, longitude: selectMarker.longitude },
                    ]}
                    strokeColor="#000"
                    strokeColors={[
                        '#000000',
                    ]}
                    strokeWidth={4}
                />

            </MapView>


            <TouchableOpacity
                style = {styles.userButton}
                onPress={() => {
                    setCardList(user)
                    setSelectMarker(region)
                    setFoundImage(userFoundImage)
                    setFollowUser(true)
                        setTimeout(() => {
                            setFollowUser(false)
                        }, 1000);
                }}
                >
                <Icon name='person-outline' size={40} color='black' />
            </TouchableOpacity>


            <TouchableOpacity
                style = {styles.startUpButton}
                onPress={() => {
                    setCardList(startUp)
                    setSelectMarker(region)
                    setFoundImage(startUpFoundImage)
                    setFollowUser(true)
                        setTimeout(() => {
                            setFollowUser(false)
                        }, 1000);
                }}
                >
                <Icon name='business-outline' size={40} color='black' />
            </TouchableOpacity>


            <Animated.ScrollView
                horizontal
                scrollEventThrottle={3}
                showsHorizontalScrollIndicator={false}
                style={styles.scrollView}
                contentContainerStyle={[{ width: `${cardList.length * 100}%` }]}
                pagingEnabled
                onScroll={e => handleOnScroll(e)}
                snapToAlignment="center"
                contentInset={{
                    top: 0,
                    bottom: 0,
                    left: SPACING_CARD,
                    right: SPACING_CARD,
                }}
            >
                {
                    cardList.map((cardList, index) => {
                        return (
                            <TouchableOpacity key={index} style={[{ width: CARD_WIDTH }, styles.card]}
                                onPress = {() => {
                                    if(cardList.perID != null) {
                                        props.navigation.navigate("PeopleInfo", {
                                            num: num,
                                            id: id,
                                            pw: pw,
                                            phone: phone,
                                            name: name,
                                            email: email,
                                            image: image,
                                            people : cardList.id
                                        })
                                    } else {
                                        props.navigation.navigate("StartUpInfo", {
                                            num: num,
                                            id: id,
                                            pw : pw,
                                            phone: phone,
                                            name: name,
                                            email: email,
                                            image: image,
                                            people : cardList.id
                                        })
                                    }
                                    
                                }}
                                >
                                <View style = {styles.cardView}>
                                           <Image
                                               style={styles.profileImage}
                                               source={foundImage ? { uri: foundImage[index].url } : require('../assets/start-solo1.png')}
                                           />
                                    <View>
                                        <Text
                                            numberOfLines={1}
                                            style={styles.cardTitle}
                                        >
                                            {cardList.name}
                                        </Text>
                                        <Text
                                            numberOfLines={3}
                                            style = {styles.cardDescription}>
                                                {cardList.infoCareer || cardList.info}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </Animated.ScrollView>

        </View>
    );
};

export default Map



const styles = StyleSheet.create({

    //아이콘 뷰
    titleView: {
        width: '90%',
        height: 100,
        alignItems: 'center',
        marginBottom: 30,
        marginLeft: 16,
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

    homeButton: {
        position : 'absolute',
        right : 40,
        bottom : 10,
    },

    userButton: {
        position : 'absolute',
        right : '15%',
        bottom : '25%',
        borderRadius : 5,
        backgroundColor : 'white',
    },


    startUpButton : {
        position : 'absolute',
        right : '3%',
        bottom : '25%',
        borderRadius : 5,
        backgroundColor : 'white',
    },



    distanceText: {
        position: 'absolute',
        top: 50,
        left: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 5,
        shadowColor: 'black',
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.45,
        shadowRadius: 10,
    },

    scrollView: {
        flex: 1,
        backgroundColor: '#00ff0000',
        position: 'absolute',
        left: 0,
        bottom: 10,
        height: 200,
    },

    card: {
        backgroundColor: "#fff",
        marginHorizontal: SCREEN_WIDTH * 0.025,
        overflow: 'hidden',
        marginTop: 10,
        height: '90%',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },

    cardView : {
        alignContent : 'center',
        flexDirection : 'row',
        width : '100%',
        height : '100%'
    },

    profileImage: {
        width: '40%',
        height: '90%',
        borderRadius: 30,
        margin: 10,
    },

    cardTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 16,
    },

    cardDescription : {
        fontSize : 15,
        fontWeight : "300",
        marginTop : 14,
        color : 'gray'
    },

    headerView : {
        width : SCREEN_WIDTH,
        backgroundColor : '#FFF',
        alignItems : 'flex-end',
        flexDirection : 'row'
    },

    headerText : {
        fontWeight : 'bold',
        fontSize : 23,
        textAlign: 'center',
    },

    headerIcon : {
        left : 10,
        bottom : 10,
    },

})