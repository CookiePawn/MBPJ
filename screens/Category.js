import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Dimensions,
} from 'react-native'
import {
    PieChart,
} from "react-native-chart-kit";
import Icon from 'react-native-vector-icons/Ionicons'
import React, { useState, useEffect } from 'react'
import storage from '../DB/Storage'
import db from '../DB/FireBase'
import { collection, getDocs, } from 'firebase/firestore';
import { listAll, getDownloadURL, ref, } from '@firebase/storage';
import { useIsFocused } from '@react-navigation/native';






const CustomCategory = (props) => {
    return (
        <View style={styles.categoryListSubView}>
            <View style={styles.categoryListSubSubView}>
                <TouchableOpacity 
                    style={styles.categoryButton}
                    onPress={()=>{
                        props.navi.navigation.navigate(`${props.screen}`, props.params)
                    }}
                >
                    <Image
                        style={styles.categoryButtonImage}
                        source={props.image}
                    />
                    <Text style={styles.categoryButtonText}>{props.category}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const CustomPeople = (props) => {
    return(
        <TouchableOpacity>
            <View style={styles.peopleListView}>
                <Image
                    style={styles.peopleListImage}
                    source={props.image}
                />
                <Text style={styles.peopleListNameText}>{props.name}</Text>
                <Text style={styles.peopleListInfoText}>{props.info}</Text>
            </View>    
        </TouchableOpacity>
    ) 
}


const CustomStartUp = (props) => {
    return(
        <TouchableOpacity>
            <View style={styles.startUpListSubView}>
                <Image
                    style={styles.startUpListImage}
                    source={props.image}
                />
                <View style={styles.startUpInfoTextView}>
                    <Text style={styles.startUpNameText}>
                        {props.name}{'\n'}
                        <Text style={styles.startUpInfoText}>{props.info}</Text>
                    </Text>    
                </View>
            </View>   
        </TouchableOpacity>
    )
}






const Category = (props) => {

    //로그인 확인
    const { params } = props.route;
    const num = params ? params.num : null;
    const id = params ? params.id : null;
    const pw = params ? params.pw : null;
    const name = params ? params.name : null;
    const email = params ? params.email : null;
    const phone = params ? params.phone : null;

    //db
    const [userImage, setUserImage] = useState([]);
    const [startupImage, setStartupImage] = useState([]);
    const [user, setUser] = useState([])
    const [startup, setStartup] = useState([])

    const isFocused = useIsFocused();

    useEffect(() => {
        const userImage = async () => {
            try {
                const storageRef = ref(storage, '/userProfile');
                const result = await listAll(storageRef);
                const imageUrls = [];
                // 각 아이템의 URL과 이름을 가져와 imageUrls 배열에 저장
                for (const item of result.items) {
                    const url = await getDownloadURL(item);
                    imageUrls.push({ url, name: item.name });
                }
                setUserImage(imageUrls);
            } catch (error) {
                console.error('이미지 로딩 오류:', error);
            }
        };
        const startupImage = async () => {
            try {
                const storageRef = ref(storage, '/startupProfile');
                const result = await listAll(storageRef);
                const imageUrls = [];
                // 각 아이템의 URL과 이름을 가져와 imageUrls 배열에 저장
                for (const item of result.items) {
                    const url = await getDownloadURL(item);
                    imageUrls.push({ url, name: item.name });
                }
                setStartupImage(imageUrls);
            } catch (error) {
                console.error('이미지 로딩 오류:', error);
            }
        };
        const userDB = async () => {
            try {
                const data = await getDocs(collection(db, 'userInfo'));
                let tempArray = [];
                data.forEach((doc) => {
                    tempArray.push({ ...doc.data(), id: doc.id });
                });
                setUser(tempArray);
            } catch (error) {
                console.log("Error fetching data:", error.message);
            }
        };
        const startupDB = async () => {
            try {
                const data = await getDocs(collection(db, 'startupInfo'));
                let tempArray = [];
                data.forEach((doc) => {
                    tempArray.push({ ...doc.data(), id: doc.id });
                });
                setStartup(tempArray);
            } catch (error) {
                console.log("Error fetching data:", error.message);
            }
        };
        userImage();
        startupImage();
        userDB();
        startupDB();
    }, [isFocused]);





    const data = [
        {
          name: "Java",
          population: 21500000,
          color: "rgba(131, 167, 234, 1)",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Toronto",
          population: 2800000,
          color: "#F00",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Beijing",
          population: 527612,
          color: "red",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "New York",
          population: 8538000,
          color: "#ffffff",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Moscow",
          population: 11920000,
          color: "rgb(0, 0, 255)",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        }
      ];

      const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };




    return (
        <ScrollView 
            style={{flex: 1, backgroundColor: 'white'}}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}    
        >
            <View style={styles.mainView}>
                <View style={styles.categoryView}>
                    <View style={styles.categoryTitleView}>
                        <View style={styles.categoryTitleTextView}>
                            <Text style={styles.categoryTitleText}>
                                카테고리{'\n'}
                                <Text style={styles.categoryTitleSubText}>카테고리를 선택하세요</Text>
                            </Text>
                        </View>
                        <View style={styles.categoryTitleIconView}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (num == null) {
                                        props.navigation.navigate('PersonLogin')
                                    } else if (num != null) {
                                        props.navigation.navigate('MyPage', {
                                            num: num,
                                            id: id,
                                            pw: pw,
                                            phone: phone,
                                            name: name,
                                            email: email,
                                        })
                                    }
                                }}
                            >
                                <Icon name="person" size={25} color="black" style={[styles.icon, { marginLeft: 60 }]} />
                            </TouchableOpacity>
                            <Icon name="notifications-outline" size={30} color="black" style={styles.icon} />
                        </View>
                    </View>
                    <View style={styles.categoryListView}>
                        <ScrollView 
                            style={styles.categoryListScrollView}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                        >
                            <CustomCategory
                                navi={props}
                                params={{
                                    num: num,
                                    id: id,
                                    pw: pw,
                                    phone: phone,
                                    name: name,
                                    email: email,
                                }}
                                category="공동 참업자 모집"
                                image={require('../assets/category-it.jpg')}
                                screen='Cofounder'
                            />
                            <CustomCategory
                                navi={props}
                                params={{
                                    num: num,
                                    id: id,
                                    pw: pw,
                                    phone: phone,
                                    name: name,
                                    email: email,
                                }}
                                category="팀원 모집"
                                image={require('../assets/category-design.jpg')}
                                screen='Team'
                            />
                            <CustomCategory
                                navi={props}
                                params={{
                                    num: num,
                                    id: id,
                                    pw: pw,
                                    phone: phone,
                                    name: name,
                                    email: email,
                                }}
                                category="주변 개입/기업 보기"
                                image={require('../assets/category-maps.jpg')}
                                screen='Map'
                            />
                        </ScrollView>
                    </View>
                </View>
                <View style={styles.peopleView}>
                    <View style={styles.categoryTitleView}>
                        <View style={styles.categoryTitleTextView}>
                            <Text style={styles.categoryTitleText}>
                                이런 사람은 어때요?{'\n'}
                                <Text style={styles.categoryTitleSubText}>필요한 사람을 직접 찾아보세요</Text>
                            </Text>
                        </View>
                        <View style={styles.categoryTitleIconView}>
                            <TouchableOpacity
                                onPress={() => {
                                    props.navigation.navigate('People', {
                                        num: num,
                                        id: id,
                                        pw: pw,
                                        phone: phone,
                                        name: name,
                                        email: email,
                                    })
                                }}
                            >
                                <Text style={styles.moreText}>더보기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView 
                        style={styles.peopleListScrollView}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    >
                        {user.map((userItem, idx) => {
                            if (idx >= 7) return null;

                            const userUrl = userImage.filter((item) => item.name === userItem.image);

                            if (userUrl.length > 0) {
                                return userUrl.map((urlItem, urlIdx) => (
                                    <CustomPeople
                                        key={idx}
                                        image={{ uri: urlItem.url }}
                                        name={userItem.name}
                                        info={userItem.info}
                                    />
                                ));
                            }
                            
                            return (
                                <CustomPeople
                                    key={idx}
                                    image={require('../assets/start-solo.png')}
                                    name={userItem.name}
                                    info={userItem.info}
                                />
                            );
                        })}
                    </ScrollView>
                </View>
                <View style={styles.startUpView}>
                    <View style={styles.categoryTitleView}>
                        <View style={styles.categoryTitleTextView}>
                            <Text style={styles.categoryTitleText}>
                                이런 스타트업은 어때요?{'\n'}
                                <Text style={styles.categoryTitleSubText}>다양한 스타트업을 확인해보세요</Text>
                            </Text>
                        </View>
                        <View style={styles.categoryTitleIconView}>
                            <TouchableOpacity
                                onPress={() => {
                                    props.navigation.navigate('Team', {
                                        num: num,
                                        id: id,
                                        pw: pw,
                                        phone: phone,
                                        name: name,
                                        email: email,
                                    })
                                }}
                            >
                                <Text style={styles.moreText}>더보기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.startUpListView}>
                        {startup.map((startupItem, idx) => {
                            if (idx >= 5) return null;

                            const startupUrl = startupImage.filter((item) => item.name === startupItem.image);

                            if (startupUrl.length > 0) {
                                return startupUrl.map((urlItem, urlIdx) => (
                                    <CustomStartUp
                                        key={idx}
                                        image={{ uri: urlItem.url }}
                                        name={startupItem.name}
                                        info={startupItem.info}
                                    />
                                ));
                            }
                            
                            return (
                                <CustomStartUp
                                    key={idx}
                                    image={require('../assets/start-solo.png')}
                                    name={startupItem.name}
                                    info={startupItem.info}
                                />
                            );
                        })}
                    </View>
                </View>



                <View style={styles.trendView}>
                    <View style={styles.categoryTitleView}>
                        <View style={styles.categoryTitleTextView}>
                            <Text style={styles.categoryTitleText}>
                                요즘 트렌드{'\n'}
                                <Text style={styles.categoryTitleSubText}>카테고리</Text>
                            </Text>
                        </View>
                    </View>
                    <View style={styles.trendImageView}>
                        <PieChart
                            data={data}
                            width={Dimensions.get("window").width}
                            height={220}
                            chartConfig={chartConfig}
                            accessor={"population"}
                            backgroundColor={"transparent"}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
        
    )
}


export default Category




const styles = StyleSheet.create({

    //카테고리
    mainView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },

    //카테고리 뷰
    categoryView: {
        flex: 0.4,
        width: '90%',
        margin: 50,
    },
    categoryTitleView: {
        flex: 0.3,
        flexDirection: 'row',
    },
    categoryTitleTextView: {
        flex: 0.71,
        justifyContent: 'center',
    },
    categoryTitleText: {
        marginTop: 20,
        lineHeight: 25,
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold'
    },
    categoryTitleSubText: {
        marginTop: 10,
        color: 'rgba(153, 153, 153, 0.60)',
        fontSize: 16,
        fontWeight: 400,
    },
    categoryTitleIconView: {
        flex: 0.29,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginLeft: 10,
        marginRight: 10,
    },


    categoryListView: {
        flex: 1,
        marginTop: 20,
    },
    categoryListScrollView: {
        flex: 1,
        flexDirection: 'row',
    },
    categoryListSubView: {
        flex: 1,
        flexDirection: 'row',
    },
    categoryListSubSubView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryButton: {
        width: 230,
        height: 230,
        marginRight: 24,
        backgroundColor: '#D9D9D9',
        borderRadius: 12,
        alignItems: 'center',
        overflow: 'hidden',
    },
    categoryButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        position: 'absolute',
        top: 17,
        left: 17,
    },
    categoryButtonImage: {
        width: '100%',
        height: '100%',
    },




    //사람 추천 뷰
    peopleView:{
        flex: 0.4,
        width: '90%',
        marginTop: 20,
        marginBottom: 94,
    },
    moreText: {
        color: '#999',
        fontSize: 12,
        position: 'absolute',
    },  
    peopleListScrollView: {
        marginTop: 20,
        flexDirection: 'row',
    },
    peopleListView: {
        width: 158,
        height: 222,
        marginTop: 20,
        marginRight: 15,
        borderColor: '#DDD',
        borderRadius: 12,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    peopleListImage: {
        width: 94,
        height: 94,
        borderRadius: 100,
    },
    peopleListNameText: {
        marginTop: 15,
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 34,
    },
    peopleListInfoText: {
        color: 'rgba(0, 0, 0, 0.60)',
        fontSize: 12,
    },




    //스타트업 추천 뷰
    startUpView: {
        flex: 0.7,
        width: '90%',
        marginBottom: 80,
        overflow: 'hidden',
    },
    startUpListView: {
        marginTop: 30,
    },
    startUpListSubView: {
        width: '100%',
        height: 80,
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    startUpListImage: {
        width: 55,
        height: 55,
        borderRadius: 10,
        marginRight: 10,
    },
    startUpInfoTextView: {
        flex: 1,
        height: 80,
        borderBottomWidth: 1,
        borderColor: '#E8E8E8',
    },
    startUpNameText: {
        paddingTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 28,
    },
    startUpInfoText: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.60)',
    },







    //트랜드 뷰
    trendView: {
        flex: 0.4,
        width: '90%',
        marginBottom: 30,
    },

    trendImageView: {
        flex: 0.7,
    },


})