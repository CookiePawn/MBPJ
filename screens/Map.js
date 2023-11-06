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


const Map = (props) => {
    //로그인 확인
    const { params } = props.route;
    const num = params ? params.num : null;
    const id = params ? params.id : null;
    const pw = params ? params.pw : null;
    const name = params ? params.name : null;
    const email = params ? params.email : null;
    const phone = params ? params.phone : null;
    const crn = params ? params.crn : null;

    //위치 정보
    const [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
    });

    const [km, setKm] = useState(0)
    const [followsUser, setFollowUser] = useState(true)

    //마커 위치 및 이름 데이터
    const marker = [
        {
            coordinate: {
                latitude: 36.800280020840844,
                longitude: 127.07498548034647,
            },
            title: "선문대학교 아산캠퍼스"
        },
        {
            coordinate: {
                latitude: 36.77195296845993,
                longitude: 127.06000439331741,
            },
            title: "백지환 집"
        },
        {
            coordinate: {
                latitude: 36.83040711295872,
                longitude: 127.18970055646777,
            },
            title: "김우희 집"
        },
        {
            coordinate: {
                latitude: 36.78893051067183,
                longitude: 127.01613316976758,
            },
            title: "안준철 집"
        },
    ]

    const [state, setState] = useState(marker)

    const [selectMarker, setSelectMarker] = useState({
        latitude: region.latitude,
        longitude: region.longitude,
    })

    let mapIndex = 0
    let mapAnimation = new Animated.Value(0)
    const _map = useRef(null)
    const _scrollView = React.useRef(null)
    const CARD_WIDTH = Dimensions.get('window').width * 0.95
    const SPACING_CARD = Dimensions.get('window').width * 0.025

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


    //스크롤 이벤트 발생 시 실행
    const handleOnScroll = event => {
        let index = parseInt(event.nativeEvent.contentOffset.x / Dimensions.get('window').width)
        if (index >= marker.length) {
            index = marker.length - 1
        }
        if (index <= 0) {
            index = 0
        }

        const regionTimeout = setTimeout(() => {
            if (mapIndex != index || (mapIndex == 0 && index == 0)) {
                mapIndex = index
                const { coordinate } = marker[index]
                setSelectMarker(marker[index].coordinate)
                _map.current.animateToRegion(
                    {
                        ...coordinate,
                        region: marker[index].latitude,
                        region: marker[index].longitude,
                    }, 350);
            }
        }, 10)
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <MapView
                style={{ flex: 2 }}
                region={region}
                showsUserLocation={true}
                followsUserLocation={followsUser}
                ref={_map}
            >

                {
                    state.map((marker, index) => {
                        return (
                            <Marker
                                key={index}
                                coordinate={marker.coordinate}
                                title={marker.title}
                                onPress={() => {
                                    const distance = Geolib.getDistance(
                                        region,
                                        {
                                            latitude: marker.coordinate.latitude,
                                            longitude: marker.coordinate.longitude,
                                        }
                                    );
                                    setKm(distance)
                                    setSelectMarker(marker.coordinate)
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
                        '#FF1234',
                        '#50bcdf'
                    ]}
                    strokeWidth={6}
                />

            </MapView>

            <TouchableOpacity
                style={styles.homeButton}
                onPress={() => {
                    props.navigation.navigate('Category', {
                        num: num,
                        id: id,
                        pw: pw,
                        phone: phone,
                        name: name,
                        email: email,
                        CRN: crn,
                    })
                }}
            >
                <Icon name="home-outline" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.userButton}
                onPress={() => {
                    setFollowUser(true)
                    setTimeout(() => {
                        setFollowUser(false)
                    }, 1000);
                }}
            >
                <Icon name="location-outline" size={30} color="black" />
            </TouchableOpacity>

            <Animated.ScrollView
                horizontal
                scrollEventThrottle={3}
                showsHorizontalScrollIndicator={false}
                style={styles.scrollView}
                contentContainerStyle={[{ width: `${state.length * 100}%` }]}
                pagingEnabled
                onScroll={e => handleOnScroll(e)}
                snapToAlignment='center'
                contentInset={{
                    top: 0,
                    bottom: 0,
                    left: SPACING_CARD,
                    right: SPACING_CARD,
                }}
            >
                {
                    state.map((marker, index) => {
                        return (
                            <TouchableOpacity key={index} style={[{ width: CARD_WIDTH }, styles.card]}>
                                <Text
                                    numberOfLines={1}
                                    style={styles.cardTitle}
                                >
                                    {marker.title}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </Animated.ScrollView>

            <Text style={styles.distanceText}>
                {`현재 위치로부터 ${Number(km / 1000).toFixed(2)} km`}
            </Text>
        </View>
    );
};

export default Map



const styles = StyleSheet.create({
    homeButton: {
        position: 'absolute',
        bottom: 210,
        right: 80,
        backgroundColor: 'white',
        borderRadius: 10,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.45,
        shadowRadius: 10,
    },

    userButton: {
        position: 'absolute',
        bottom: 210,
        right: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.45,
        shadowRadius: 10,
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
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        overflow: 'hidden',
        marginTop: 10,
        height: '90%',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },

    cardTitle: {
        fontSize: 20,
        fontWeight: "bold"
    },

})