import {
    View,
    Text,
    TextInput,
    Image,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/FontAwesome5'

import { useIsFocused } from '@react-navigation/native'

import React, { useState, useEffect } from 'react'


//로딩 이벤트
import { renderFullScreenLoading } from '../../components/Loading'

//DB
import {
    addStartUp,
    loadStartUps,
    loadStartUpImages,
    loadMember,
} from '../../DB/LoadDB'

//픽커
import DropDownPicker from 'react-native-dropdown-picker'

//주소-좌표 변환
import getAddressCoordinates from '../GeoCoding'



//스타트업 생성
export const Stat0 = (props) => {

    //로그인 확인
    const params = props.params
    const num = params ? params.num : null;
    const id = params ? params.id : null;
    const pw = params ? params.pw : null;
    const name = params ? params.name : null;
    const email = params ? params.email : null;
    const phone = params ? params.phone : null;
    const image = params ? params.image : null;

    const [suName, setSuName] = useState('')
    const [title, setTitle] = useState('')
    const [introduce, setIntroduce] = useState('')
    const [stack, setStack] = useState('')
    const [location, setLocation] = useState('주소를 입력해주세요')

    const [isLoading, setIsLoading] = useState(false);

    const isFocused = useIsFocused();

    //DaumPost에서 받아온 주소 출력 없으면 기본텍스트
    useEffect(() => {
        const address = props.params.location

        if (address != null && address != '') {
            setLocation(address)
        } else {
            setLocation('주소를 입력해주세요')
        }

    }, [isFocused, props.params.location]);

    //DropDownPicker 관련
    const [pickerOpen, setPickerOpen] = useState(false);
    const [fieldValue, setFieldValue] = useState(null);
    const [fieldItems, setFieldItems] = useState([
        { label: 'IT', value: 'IT' },
        { label: 'Education', value: 'Education' },
        { label: 'F&B', value: 'F&B' },
        { label: 'Creative', value: 'Creative' },
    ])



    return (
        <View style={styles.mainView}>
            {renderFullScreenLoading(isLoading)}
            <KeyboardAwareScrollView
                style={{ height: '100%' }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <Text style={[styles.title, { fontSize: 24 }]}>이름</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder='이름을 입력해주세요'
                    value={suName}
                    onChangeText={(e) => setSuName(e)}
                    maxLength={20}
                    scrollEnabled={false}
                />

                <Text style={styles.title}>분야</Text>
                <DropDownPicker
                    open={pickerOpen}
                    value={fieldValue}
                    items={fieldItems}
                    setOpen={setPickerOpen}
                    setValue={setFieldValue}
                    setItems={setFieldItems}
                    placeholder='분야를 선택해주세요'
                    theme='LIGHT'
                    listMode='MODAL'
                    style={{ bottom: 5, top: 5, borderColor: '#d9d9d9', borderRadius: 15 }}
                />

                <Text style={styles.title}>스타트업 단계</Text>
                <TouchableOpacity
                    onPress={() => {
                        props.navi.navigation.navigate('StartupStep', props.params)
                    }}
                >
                    <Text style={[styles.textInput, { color: '#999' }]}>초기 단계는 준비입니다. {'\n'}이후 등급 재설정을 통해 등급을 정할 수 있습니다.{'\n'}{'\n'}자세한 내용은 클릭 후 확인 가능합니다.</Text>
                </TouchableOpacity>

                <Text style={styles.title}>주제</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder='주제를 입력해주세요'
                    value={title}
                    onChangeText={(e) => setTitle(e)}
                    maxLength={30}
                    scrollEnabled={false}
                />
                <Text style={styles.title}>소개</Text>
                <TextInput
                    style={styles.textInput1}
                    placeholder='소개를 입력해주세요'
                    value={introduce}
                    onChangeText={(e) => setIntroduce(e)}
                    maxLength={1000}
                    multiline={true}
                    scrollEnabled={false}
                />
                <Text style={styles.title}>기술 / 스택</Text>
                <TextInput
                    style={styles.textInput1}
                    placeholder='기술 및 스택을 입력해주세요'
                    value={stack}
                    onChangeText={(e) => setStack(e)}
                    maxLength={1000}
                    multiline={true}
                    scrollEnabled={false}
                />

                <Text style={styles.title}>주소</Text>
                <TouchableOpacity
                    onPress={() => {
                        props.navi.navigation.navigate("DaumPost", {
                            num: num,
                            id: id,
                            pw: pw,
                            phone: phone,
                            name: name,
                            email: email,
                            image: image,
                            screen: "StartUpMore"
                        })
                    }}>
                    <Text style={styles.smallText}>{location}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.saveBtn}
                    onPress={async () => {
                        if (suName != '' && title != '' && introduce != '' && stack != '' && location != '주소를 입력해주세요' && fieldValue != null && props.perID != null) {
                            setIsLoading(true)
                            try {
                                // 주소를 좌표로 변환
                                const coordinates = await getAddressCoordinates(location);
                                console.log(coordinates)
                                if (coordinates) {
                                    const lat = coordinates.lat;
                                    const lng = coordinates.lng;
                                    //addStartUp에 좌표 정보도 함께 전달
                                    await addStartUp(suName, fieldValue, title, introduce, stack, location, lat, lng, props.perID)
                                    alert('스타트업이 저장되었습니다!');
                                } else {
                                    alert('스타트업 저장을 실패했습니다!');
                                }
                            } catch (error) {
                                console.error('Error:', error);
                            }
                            props.navi.navigation.navigate('Category', props.params)
                        } else {
                            alert("모든 정보를 입력했는지 확인해주세요")

                        }
                    }}
                >
                    {isLoading ? (
                        <ActivityIndicator size="small" color="white" /> // 로딩 중에는 로딩 아이콘 표시
                    ) : (
                        <Text style={styles.saveBtnText}>저장하기</Text>
                    )}
                </TouchableOpacity>
            </KeyboardAwareScrollView>

        </View>

    )
}











//소속 스타트업
export const Stat1 = (props) => {

    const [imageUrl, setImageUrl] = useState([])
    const [startup, setStartup] = useState([])
    const [member, setMember] = useState([])

    const [admin, setAdmin] = useState([]);

    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchStartUpImage = async () => {
            const images = await loadStartUpImages()
            setImageUrl(images)
        };
        const fetchStartups = async () => {
            const startups = await loadStartUps()
            setStartup(startups)
        };
        const fetchMember = async () => {
            const members = await loadMember();
            const newMembers = []; // 새로운 멤버를 임시 저장할 배열을 생성합니다.

            members.forEach((item) => {
                if (props.perID === item.perID) {
                    newMembers.push({ suID: item.suID, admin: item.admin }); // 조건에 맞는 suID만 임시 배열에 추가합니다.
                }
            });
            setMember(newMembers); // 상태를 한 번만 업데이트합니다.
        };


        fetchStartUpImage()
        fetchStartups()
        fetchMember()
    }, [isFocused])

    //소속 스타트업 찾아내기
    const getFilteredStartups = () => {
        if (!member || member.length === 0) {
            return [];
        }

        return startup.filter((item) =>
            member.some(memberInfo => memberInfo.suID === item.id)
        );
    };

    //본인이 팀장인 스타트업 찾기
    useEffect(() => {
        const fetchAdmins = () => {
            if (member && member.length > 0) {
                const adminMembers = member.filter(memberInfo => memberInfo.admin === 1);
                const adminIDs = adminMembers.map(adminMember => adminMember.suID);
                setAdmin(adminIDs);
            }
        };

        fetchAdmins();
    }, [member]);



    return (
        <ScrollView 
            style={styles.mainView}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
        >
            <View style={{ flex: 1 }}>
                {/* 배열로 이루어진 소속 스타트업 출력 */}
                {getFilteredStartups().map((item, idx) => {
                    const matchingStartupImage = imageUrl.find(startupImg => startupImg.name === item.name);
                    const isAdmin = admin.includes(item.id);

                    return (
                        <TouchableOpacity
                            key={idx}
                            onPress={() => {
                                props.navi.navigation.navigate('StartUpInfo',
                                    {
                                        ...props.params,
                                        people: item.id
                                    }
                                )
                            }}
                        >

                            <View style={styles.startupView}>
                                {/* 팀장일 경우 왕관 아이콘 출력 */}
                                {isAdmin && (
                                    <Icon name='crown' color='gold' size={25} style={styles.crownView} />
                                )}
                                <Image
                                    style={styles.profileImage}
                                    source={matchingStartupImage ? { uri: matchingStartupImage.url } : require('../../assets/start-solo.png')}
                                />
                                <Text style={styles.startupName}>
                                    {item.name}{'\n'}
                                    <Text style={styles.startupInfo}>{item.info}</Text>
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </ScrollView>
    );
}





const styles = StyleSheet.create({
    mainView: {
        width: '90%',
        height: '80%',
    },

    //스타트업 생성 스타일  
    title: {
        fontSize: 20,
        fontWeight: 600,
        marginTop: 40,
        marginBottom: 10,
    },

    textInput: {
        fontSize: 16,
        marginTop: 5
    },

    textInput1: {
        fontSize: 16,
    },

    smallText: {
        color: 'rgba(153, 153, 153, 0.60)',
        fontSize: 16,
        fontWeight: '400',
        marginBottom: 30,
        marginTop: 5
    },

    saveBtn: {
        backgroundColor: '#5552E2',
        height: 60,
        width: '100%',
        marginBottom: 20,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },

    saveBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 600,
    },

    //로딩이벤트
    fullScreenLoadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
    },

    fullScreenLoadingImage: {
        width: 250,
        height: 250
    },

    //소속 스타트업 스타일
    startupView: {
        height: 100,
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },

    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 10,
        marginLeft: 15,
        marginRight: 15,
    },

    startupName: {
        fontSize: 20,
        fontWeight: 600,
    },

    startupInfo: {
        fontSize: 16,
        fontWeight: 400,
        color: 'rgba(0, 0, 0, 0.3)',
        lineHeight: 25,
    },
    
    crownView:{
        position:'absolute',
        marginLeft: 35,
        top: -5
    },

})




