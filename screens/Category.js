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
        flex: 0.5,
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
        flex: 0.5,
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




    //트랜드 뷰
    trendView: {
        flex: 0.4,
        width: '90%',
    },

    trendImageView: {
        flex: 0.7,
    },


})