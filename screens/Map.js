import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    ScrollView,
    Dimensions,
    Platform
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
//사용자 위치 가져오기
import * as Location from 'expo-location';
//위도 경도로 거리 계산하기
import * as Geolib from 'geolib';
import Icon from 'react-native-vector-icons/Ionicons'
//import { Polyline } from 'react-native-svg';


//api 키
import { googleKey } from '../keys/Key'



//db 로드
import { userDBs } from '../DB/LoadDB';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

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

    const [user, setUser] = useState([]);

    //위치 정보
    const [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
    });

    const [km, setKm] = useState(0)
    const [followsUser, setFollowUser] = useState(true)

    const [state, setState] = useState([])

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
        const fetchDB = async () => {
            setUser(userDBs);
        };

        fetchDB();

    }, [isFocused]);

    useEffect(() => {

        const filteredUsers = user.filter(user => user.location);

      getAddressCoordinates(filteredUsers.map(user => user.location)).then(coordinates => {
        const markerUsers = filteredUsers.map((user, index) => ({
            ...user,
            coordinate : {
                latitude : coordinates[index].lat,
                longitude : coordinates[index].lng,
            }
        }))

        const distance = (marker) => {
            return Geolib.getDistance(
                region,
                {
                    latitude: marker.coordinate.latitude,
                    longitude: marker.coordinate.longitude,
                }
        )};

        const sortData = () => {
            markerUsers.sort((a,b) => {
                const userA = distance(a)
                const userB = distance(b)
                return userA - userB
            })
        }

        sortData()

        if (markerUsers.length > 0) {
            setState(markerUsers)
        }

    }) 

    }, [user])

    
    const getAddressCoordinates = async (address) => {
        try {
          const requests = address.map(address => 
                axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleKey}`)
          );

            const responses = await Promise.all(requests)

            const coordinates = responses.map((response, index) => {
                if (response.data.status === 'OK' && response.data.results.length > 0) {

                    const location = response.data.results[0].geometry.location;
                    return { ...address[index], lat : location.lat, lng : location.lng };

                  } else {
                    return null;
                  }}
                );

            return coordinates;

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };


    //스크롤 이벤트 발생 시 실행
    const handleOnScroll = event => {
        let index = parseInt(event.nativeEvent.contentOffset.x / Dimensions.get('window').width)
        if (index >= state.length) {
            index = state.length - 1
        }
        if (index <= 0) {
            index = 0
        }

        const regionTimeout = setTimeout(() => {
            if (mapIndex != index || (mapIndex == 0 && index == 0)) {
                mapIndex = index
                const { coordinate } = state[index]
                setSelectMarker(state[index].coordinate)
                _map.current.animateToRegion(
                    {
                        ...coordinate,
                        region: state[index].coordinate.latitude,
                        region: state[index].coordinate.longitude,
                    }, 350);
            }
        }, 10)
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white', }}>
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
                    state.map((markerUsers, index) => {
                        return (
                            <Marker
                                key={index}
                                coordinate={markerUsers.coordinate}
                                title={markerUsers.name}
                                onPress={() => {
                                    const distance = Geolib.getDistance(
                                        region,
                                        {
                                            latitude: markerUsers.coordinate.latitude,
                                            longitude: markerUsers.coordinate.longitude,
                                        }
                                    );
                                    setKm(distance)
                                    console.log(distance)
                                    setSelectMarker(markerUsers.coordinate)
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


            <Animated.ScrollView
                horizontal
                scrollEventThrottle={3}
                showsHorizontalScrollIndicator={false}
                style={styles.scrollView}
                contentContainerStyle={[{ width: `${state.length * 100}%` }]}
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
                    state.map((markerUsers, index) => {
                        return (
                            <TouchableOpacity key={index} style={[{ width: CARD_WIDTH }, styles.card]}>
                                <Text
                                    numberOfLines={1}
                                    style={styles.cardTitle}
                                >
                                    {markerUsers.name}
                                </Text>
                                <Text
                                    numberOfLines={1}
                                    style = {styles.cardTitle}>
                                        {markerUsers.infoCareer}
                                    </Text>
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
        right : 10,
        bottom : 10,
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
        alignItems: 'center',
        backgroundColor: "#fff",
        marginHorizontal: SCREEN_WIDTH * 0.025,
        overflow: 'hidden',
        marginTop: 10,
        height: '90%',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },

    cardTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 16,
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