import React, { useEffect, useState } from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
//사용자 위치 가져오기
import * as Location from 'expo-location';
//위도 경도로 거리 계산하기
import * as Geolib from 'geolib';
import Icon from 'react-native-vector-icons/Ionicons'


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

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        region={region}
        showsUserLocation={true}
        followsUserLocation={followsUser}
      >
        <Marker 
            coordinate={{
                latitude: 36.800280020840844,
                longitude: 127.07498548034647,
            }} 
            title="선문대학교 아산캠퍼스" 
            description={`거리: ${(Number(km) / 1000).toFixed(2)} km`}
            onPress={ () => {
                const distance = Geolib.getDistance(
                    region,
                    {latitude: 36.800280020840844,
                    longitude: 127.07498548034647,}
                );
                setKm(distance)
            }}
        />
        <Marker 
            coordinate={{
                latitude: 36.79871597276918,
                longitude: 127.07595879175446,
            }} 
            title="선문대학교 아산캠퍼스 인문대" 
        />
        <Marker 
            coordinate={{
                latitude:  36.79745361477695,
                longitude: 127.07720128122577,
            }} 
            title="선문대학교 아산캠퍼스 학생회관" 
        />
        <Marker 
            coordinate={{
                latitude:  36.78893051067183,
                longitude: 127.01613316976758,
            }} 
            title="안준철 집" 
            description={`거리: ${(Number(km) / 1000).toFixed(2)} km`}
            onPress={ () => {
                const distance = Geolib.getDistance(
                    region,
                    {latitude:  36.78893051067183,
                    longitude: 127.01613316976758,}
                );
                setKm(distance)
            }}
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
            <Icon name="home-outline" size={30} color="black"/>
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
            <Icon name="location-outline" size={30} color="black"/>
        </TouchableOpacity>
    </View>
  );
};

export default Map



const styles = StyleSheet.create({
    homeButton: {
        position: 'absolute',
        bottom: 20,
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
        bottom: 20,
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
})