import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Dimensions,
} from 'react-native'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import Icon from 'react-native-vector-icons/Ionicons'
import React, { useState } from 'react'






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
                <Text style={styles.startUpNameText}>
                    {props.name}{'\n'}
                    <Text style={styles.startUpInfoText}>{props.info}</Text>
                </Text>
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
    const crn = params ? params.crn : null;



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
        <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
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
                                    } else if (num != null && crn == null) {
                                        props.navigation.navigate('PersonUser', {
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
                                    CRN: crn
                                }}
                                category="공동 참업자 모집"
                                image={require('../assets/category-it.jpg')}
                                screen='Category'
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
                                    CRN: crn
                                }}
                                category="팀원 모집"
                                image={require('../assets/category-design.jpg')}
                                screen='Category'
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
                                    CRN: crn
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
                    </View>
                    <ScrollView 
                        style={styles.peopleListScrollView}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    >
                        <CustomPeople
                            image={require('../assets/peopleImage/moohee.png')}
                            name= '김우희'
                            info= 'Backend Delveloper'
                        />
                        <CustomPeople
                            image={require('../assets/peopleImage/rlacodnjs.jpeg')}
                            name= '김채원'
                            info= 'Frontend Delveloper'
                        />
                        <CustomPeople
                            image={require('../assets/peopleImage/rnjsdmsql.jpg')}
                            name= '권은비'
                            info= 'UI/UX Designer'
                        />
                        <CustomPeople
                            image={require('../assets/peopleImage/whdbfl.jpg')}
                            name= '조유리'
                            info= 'Backend Delveloper'
                        />
                        <CustomPeople
                            image={require('../assets/peopleImage/cyeks.png')}
                            name= '쵸단'
                            info= 'Backend Delveloper'
                        />
                        <CustomPeople
                            image={require('../assets/peopleImage/sakura.jpg')}
                            name= '사쿠라'
                            info= 'Backend Delveloper'
                        />
                        <CustomPeople
                            image={require('../assets/peopleImage/tlstjdus.jpg')}
                            name= '신서연'
                            info= 'Backend Delveloper'
                        />
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
                    </View>
                    <View style={styles.startUpListView}>
                        <CustomStartUp
                            image={require('../assets/category-it.jpg')}
                            name= 'JunTech'
                            info= 'Health care application 개발'
                        />
                        <View style={styles.startUpBoreder}/>
                        <CustomStartUp
                            image={require('../assets/profile.png')}
                            name= 'Instagram'
                            info= '인재 개발'
                        />
                        <View style={styles.startUpBoreder}/>
                        <CustomStartUp
                            image={require('../assets/start-solo.png')}
                            name= 'GoMin'
                            info= '어떤거 개발할까 고민중'
                        />
                        <View style={styles.startUpBoreder}/>
                        <CustomStartUp
                            image={require('../assets/start-enter.png')}
                            name= '모트라스'
                            info= '현대 3개 차종 엔진 개발 및 생산'
                        />
                        <View style={styles.startUpBoreder}/>
                        <CustomStartUp
                            image={require('../assets/start-thinking.png')}
                            name= '숯숯'
                            info= '김우희 지갑 개발'
                        />
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
    startUpNameText: {
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 28,
    },
    startUpInfoText: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.60)',
    },
    startUpBoreder: {
        width: '90%',
        height: 1,
        borderColor: '#E8E8E8',
        borderWidth: 1,
        marginLeft: 70,
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