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
    _ScrollView,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

//사용자 위치 가져오기
import * as Location from 'expo-location';

//위도 경도로 거리 계산하기
import * as Geolib from 'geolib';
import Icon from 'react-native-vector-icons/FontAwesome5'

//헤더
import Header from '../components/Header';

//db 로드
import { loadStartUps, loadUsers, loadUserImages, loadStartUpImages } from '../DB/LoadDB';
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

    //화면 접근 및 로딩
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(true)

    //DB에서 불러오는 정보를 저장할 변수
    const [user, setUser] = useState([]);
    const [startUp, setStartUp] = useState([]);
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
    const [followsUser, setFollowUser] = useState(true)

    //화면 하단에 띄울 카드
    const [cardList, setCardList] = useState([])

    //사용자가 선택한 마커
    const [selectMarker, setSelectMarker] = useState({
        latitude: region.latitude,
        longitude: region.longitude,
    })

    //맵 관련 변수
    let mapIndex = 0
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



    //DB에서 정보 불러오기
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



    //개인사용자 프로필 이미지 찾기
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



    //스타트업 프로필 이미지 찾기
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



    //개인 사용자를 현재 위치에서 거리순으로 정렬
    useEffect(() => {

        const distance = (user) => {
            return Geolib.getDistance(
                region,
                {
                    latitude: user.lat,
                    longitude: user.lng,
                }
            )
        };

        const sortData = () => {
            user.sort((a, b) => {
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



    //스타트업을 현재위치에서 거리별로 정렬
    useEffect(() => {
        const distance = (startUp) => {
            return Geolib.getDistance(
                region,
                {
                    latitude: startUp.lat,
                    longitude: startUp.lng,
                }
            )
        };

        const sortData = () => {
            startUp.sort((a, b) => {
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
                const coordinate = { latitude: cardList[index].lat, longitude: cardList[index].lng }
                setSelectMarker(coordinate)
                //스크롤 발생 시 카드에 해당하는 위치로 맵 이동
                _map.current.animateToRegion(
                    {
                        ...coordinate,
                        region: cardList[index].lat,
                        region: cardList[index].lng,
                    }, 350);
            }
        }, 10)
    }



    // 마커를 선택할 때 호출되는 함수
    const handleMarkerPress = (selectedMarker) => {
        // 선택한 마커의 좌표를 가져옵니다.
        const coordinate = {
            latitude: selectedMarker.lat,
            longitude: selectedMarker.lng,
        };

        setSelectMarker(coordinate)

        // 선택한 마커의 인덱스를 찾습니다.
        const selectedIndex = cardList.findIndex((card) => {
            return card.lat === coordinate.latitude && card.lng === coordinate.longitude;
        });

        if (selectedIndex !== -1) {
            // 선택한 마커의 인덱스를 기반으로 스크롤뷰를 스크롤합니다.
            _scrollView.current.scrollTo({ x: selectedIndex * SCREEN_WIDTH, animated: true });

            // 맵을 선택한 마커를 중심으로 이동합니다.
            _map.current.animateToRegion(
                {
                    ...coordinate,
                },
                350
            );
        }
    };





    return (
        <View style={{ flex: 1, backgroundColor: 'white', }}>
            {/* 데이터로드를 위한 로딩화면 */}
            {renderFullScreenLoading(isLoading)}
            <View style={styles.titleView}>
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
                    titleName='주변 기업/사람 보기'
                />
            </View>

            <MapView
                style={{ flex: 2 }}
                region={region}
                showsUserLocation={true}
                followsUserLocation={followsUser}
                ref={_map}
            >

                {/* 카드 정보에 따른 마커생성 */}
                {
                    cardList.map((cardList, index) => {
                        return (
                            <Marker
                                key={index}
                                coordinate={{
                                    latitude: cardList.lat,
                                    longitude: cardList.lng,
                                }}
                                title={cardList.name}
                                onPress={() =>
                                    handleMarkerPress(cardList)
                                }
                            >

                            </Marker>
                        )
                    })
                }

                 {/* 사용자 위치와 마커를 잇는 라인 */}
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

            {/* 개인사용자 목록 버튼 */}
            <TouchableOpacity
                style={styles.userButton}
                onPress={() => {
                    setCardList(user)
                    setFoundImage(userFoundImage)
                    setFollowUser(true)
                    _scrollView.current.scrollTo({ x: 0, animated: true })
                    setTimeout(() => {
                        setFollowUser(false)
                        setSelectMarker(region)
                        _map.current.animateToRegion(
                            {
                                latitude: region.latitude,
                                longitude: region.longitude,
                                latitudeDelta: 0.01, // 이 값을 조절하여 맵의 확대 수준을 조절할 수 있습니다.
                                longitudeDelta: 0.01,
                            },
                            350
                        );
                    }, 1000);
                }}
            >
                <Icon name='male' size={30} color='black' />
                <Text style={styles.btText}>사람</Text>
            </TouchableOpacity>

            {/* 스타트업 목록 버튼 */}
            <TouchableOpacity
                style={styles.startUpButton}
                onPress={() => {
                    setCardList(startUp)
                    setFoundImage(startUpFoundImage)
                    setFollowUser(true)
                    _scrollView.current.scrollTo({ x: 0, animated: true })
                    setTimeout(() => {
                        setFollowUser(false)
                        setSelectMarker(region)
                        _map.current.animateToRegion(
                            {
                                latitude: region.latitude,
                                longitude: region.longitude,
                                latitudeDelta: 0.01, // 이 값을 조절하여 맵의 확대 수준을 조절할 수 있습니다.
                                longitudeDelta: 0.01,
                            },
                            350
                        );
                    }, 1000);
                }}
            >
                <Icon name='building' size={30} color='black' />
                <Text style={styles.btText}>스타트업</Text>
            </TouchableOpacity>

            {/* 내 위치로 이동하는 버튼 */}
            <TouchableOpacity
                style={styles.locationButton}
                onPress={() => {
                    setFollowUser(true);
                    setTimeout(() => {
                        setFollowUser(false);
                        _map.current.animateToRegion({
                            latitude: region.latitude,
                            longitude: region.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }, 1000);
                    }, 2000);
                }}
            >
                <Icon name='map-marker-alt' size={30} color='red' />
                <Text style={styles.btText}>내 위치로 가기</Text>
            </TouchableOpacity>

            {/* 카드를 담을 스크롤뷰 */}
            <Animated.ScrollView
                horizontal
                ref={_scrollView}
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
                {/* 카드 생성 */}
                {
                    cardList.map((cardList, index) => {

                        return (
                            <TouchableOpacity key={index} style={[{ width: CARD_WIDTH }, styles.card]}
                                //개인, 스타트업 사용자 카드 클릭 시 해당 정보 페이지로 이동
                                onPress={() => {
                                    if (cardList.perID != null) {
                                        props.navigation.navigate("PeopleInfo", {
                                            num: num,
                                            id: id,
                                            pw: pw,
                                            phone: phone,
                                            name: name,
                                            email: email,
                                            image: image,
                                            people: cardList.id
                                        })
                                    } else {
                                        props.navigation.navigate("StartUpInfo", {
                                            num: num,
                                            id: id,
                                            pw: pw,
                                            phone: phone,
                                            name: name,
                                            email: email,
                                            image: image,
                                            people: cardList.id
                                        })
                                    }

                                }}
                            >
                                {/* 카드 정보 구성 */}
                                <View style={styles.cardView}>
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
                                            style={styles.cardDescription}>
                                            {cardList.field}
                                        </Text>
                                        <Text
                                            numberOfLines={5}
                                            style={styles.cardNum}>
                                            {cardList.score >= 70 ? (
                                                <Icon name='grin-alt' size={20} color='green' />
                                            ) : cardList.score >= 30 ? (
                                                <Icon name='meh' size={20} color='orange' />
                                            ) : (
                                                <Icon name='frown' size={20} color='red' />
                                            )}
                                            <View>
                                                <Text style={{ marginLeft: 5 }}>{cardList.score}점</Text>
                                            </View>
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





//스타일
const styles = StyleSheet.create({

    //아이콘 뷰
    titleView: {
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

    homeButton: {
        position: 'absolute',
        right: 40,
        bottom: 10,
    },

    userButton: {
        position: 'absolute',
        right: '20%',
        bottom: '22%',
        alignItems: 'center'
    },


    startUpButton: {
        position: 'absolute',
        right: '5%',
        bottom: '22%',
        alignItems: 'center'
    },

    locationButton: {
        position: 'absolute',
        right: '5%',
        bottom: '76%',
        alignItems: 'center'
    },

    btText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10
    },

    scrollView: {
        flex: 1,
        backgroundColor: '#00ff0000',
        position: 'absolute',
        left: 0,
        bottom: 0,
        height: '22%',
    },

    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        marginHorizontal: SCREEN_WIDTH * 0.025,
        overflow: 'hidden',
        marginTop: 10,
        marginBottom: 30,
        height: '80%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },

    cardView: {
        alignContent: 'center',
        flexDirection: 'row',
        width: '100%',
        height: '100%'
    },

    profileImage: {
        width: '25%',
        height: '70%',
        borderRadius: 30,
        marginLeft: 20,
        marginTop: 20,
        marginRight: 14
    },

    cardTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20,
    },

    cardDescription: {
        fontSize: 14,
        fontWeight: "300",
        marginTop: 14,
        color: 'gray'
    },

    cardNum: {
        fontSize: 14,
        fontWeight: "300",
        marginTop: 14,
        color: 'gray',
    },

    headerView: {
        width: SCREEN_WIDTH,
        backgroundColor: '#FFF',
        alignItems: 'flex-end',
        flexDirection: 'row'
    },

    headerText: {
        fontWeight: 'bold',
        fontSize: 23,
        textAlign: 'center',
    },

    headerIcon: {
        left: 10,
        bottom: 10,
    },

})