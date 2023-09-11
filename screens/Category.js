import {
    View,
    Text,
    Image,
    TouchableOpacity,
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
                <TouchableOpacity style={styles.categoryButton}>
                    <Image
                        style={styles.categoryButtonImage}
                        source={props.image1}
                    />
                    <Text style={styles.categoryButtonText}>{props.category1}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.categoryListSubSubView}>
                <TouchableOpacity style={styles.categoryButton}>
                    <Image
                        style={styles.categoryButtonImage}
                        source={props.image2}
                    />
                    <Text style={styles.categoryButtonText}>{props.category2}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.categoryListSubSubView}>
                <TouchableOpacity 
                    style={styles.categoryButton}
                    onPress={()=>{
                        props.navi.navigation.navigate(`${props.screen}`, props.params)
                    }}
                >
                    <Image
                        style={styles.categoryButtonImage}
                        source={props.image3}
                    />
                    <Text style={styles.categoryButtonText}>{props.category3}</Text>
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



    const data = {
        labels: ["IT", "디자인", "미디어"], // optional
        data: [1.93, 0.23, 0.67]
    };

    const chartConfig = {
        backgroundGradientFrom: "white",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "white",
        backgroundGradientToOpacity: 1,
        color: (opacity = 1) => `rgba(135, 206, 250, ${opacity})`,
        strokeWidth: 3, // optional, default 3
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
                                    props.navigation.navigate('LoginGuide')
                                } else if (num != null && crn == null) {
                                    props.navigation.navigate('PersonUser', {
                                        num: num,
                                        id: id,
                                        pw: pw,
                                        phone: phone,
                                        name: name,
                                        email: email,
                                    })
                                } else if (num != null && crn != null) {
                                    props.navigation.navigate('CompanyUser', {
                                        num: num,
                                        id: id,
                                        pw: pw,
                                        phone: phone,
                                        name: name,
                                        email: email,
                                        CRN: crn
                                    })
                                }
                            }}
                        >
                            <Icon name="person" size={25} color="black" style={[styles.icon, { marginLeft: 60 }]} />
                        </TouchableOpacity>
                        <Icon name="notifications-outline" size={30} color="black" style={styles.icon} />
                        <Icon name="settings-outline" size={30} color="black" style={styles.icon} />
                    </View>
                </View>
                <View style={styles.categoryListView}>
                    <CustomCategory
                        category1="인기 / 추천"
                        image1={require('../assets/category-best.jpg')}
                        category2="IT"
                        image2={require('../assets/category-it.jpg')}
                        category3="회계"
                        image3={require('../assets/category-accounting.jpg')}
                    />
                    <CustomCategory
                        category1="디자인"
                        image1={require('../assets/category-design.jpg')}
                        category2="법률"
                        image2={require('../assets/category-theLaw.jpg')}
                        category3="미디어"
                        image3={require('../assets/category-media.jpg')}
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
                        category1="마케팅"
                        image1={require('../assets/category-marketing.jpg')}
                        category2="기획"
                        image2={require('../assets/category-planning.jpg')}
                        category3="내 주변 기업"
                        image3={require('../assets/category-maps.jpg')}
                        screen='Map'
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
                    <ProgressChart
                        data={data}
                        width={Dimensions.get("window").width * 0.9}
                        height={220}
                        strokeWidth={16}
                        radius={32}
                        chartConfig={chartConfig}
                        hideLegend={false}
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
        flex: 0.6,
        width: '90%',
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
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold'
    },
    categoryTitleSubText: {
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
        flex: 0.7,
    },
    categoryListSubView: {
        flex: 0.333333,
        flexDirection: 'row',
    },
    categoryListSubSubView: {
        flex: 0.3333333,
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryButton: {
        width: '92%',
        height: '92%',
        backgroundColor: '#D9D9D9',
        borderRadius: 12,
        alignItems: 'center',
        overflow: 'hidden',
    },
    categoryButtonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 500,
        position: 'absolute',
        bottom: 10,
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