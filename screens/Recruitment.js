import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'


const Recruitment = (props) => {
    const {params} = props.route;
    const title = params? params.title:null;




    //정렬

    const sortButtons = ['최신순', '평점순', '거리순'];
    const [height, setHeight] = useState(0)

    const CategorySort = () => {
        const [selectedSortButton, setSelectedSortButton] = useState(null);
        return (
            <View style={[styles.categorySortView, {height: height}]}>
                <Text 
                    style={{
                        fontSize: 30, fontWeight: 'bold', color: 'black', margin: 30
                    }}>
                    옵션
                </Text>
                <View style= {{flexDirection: 'row'}}>
                    {sortButtons.map((button, index) => {
                        return [
                            <TouchableOpacity 
                            key={button} 
                            onPress={() => setSelectedSortButton(button)}
                            >
                                <Text style={{color: selectedSortButton === button ? '#bb2649' : 'gray', fontWeight: 'bold', fontSize: 15}}>
                                    {button}
                                </Text>
                            </TouchableOpacity>,
                            index !== sortButtons.length - 1 && <Text key={index} style={{color: 'gray', fontWeight: 'bold', fontSize: 15}}>  |  </Text> 
                        ]
                    })}
                </View>
                
            </View>
        )
    }



    //카테고리 리스트

    const categoryButtons = ['JAVA', 'C', 'C++', 'C#', 'python', 'HTML', 'EJS', 'JS', 'RN','React','JSON','yml','lock'];

    const ButtonGroup = () => {
        const [selectedCategoryButton, setSelectedCategoryButton] = useState(null);
      
        return (
            <View style={{flexDirection: 'row', borderBottomWidth: 1.5, borderBottomColor: '#bb2649', borderTopWidth: 1.5, borderTopColor: '#bb2649'}}>
                {categoryButtons.map((button) => (
                    <TouchableOpacity 
                    key={button} 
                    onPress={() => setSelectedCategoryButton(button)}
                    >
                        <Text style={[styles.categoryScrollViewButton, {color: selectedCategoryButton === button ? '#bb2649' : 'gray'}]}>
                            {button}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };



    //메인

    return (
        <View style={styles.view}>
            <View style={styles.infoView}>
                <View style={styles.toolView}>
                    <TouchableOpacity onPress={() => props.navigation.navigate("Category")}>
                        <Icon name="arrow-back-circle-outline" size={30} color="white"/>
                    </TouchableOpacity>
                    <Icon name="arrow-back-circle-outline" size={30} color="#bb2649"/>
                </View>
                <View style={styles.profileView}>
                    <Image
                        style={styles.profile}
                        source={require('../assets/profile.png')}
                    />
                    <Text style={styles.nicknameText}>김우희 님</Text>
                </View>
                <View style={styles.toolView}> 
                    <Icon name="notifications-outline" size={30} color="white"/>
                    <Icon name="arrow-back-circle-outline" size={10} color="#bb2649"/>
                    <Icon name="settings-outline" size={30} color="white"/>
                </View>
            </View>
            <View style={styles.categoryView}>
                <View style={{width: '100%', flexDirection: 'row'}}>
                    <View style={{width: '85%'}}>
                        <Text style={styles.categoryTitle}>{title}</Text>
                    </View>
                    <View style={{width: '15%'}}>
                        <TouchableOpacity onPress={() => setHeight(height === 0 ? 170 : 0)}>
                            <Icon name="options-outline" size={33} color="black" style={{marginTop: 30, marginRight: 30}}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <CategorySort/>
                <View style={styles.categoryScrollView}>
                    <ScrollView 
                        style={{marginLeft: 0}}
                        horizontal={true}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}>
                        <ButtonGroup/>
                    </ScrollView>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>

                </ScrollView>
            </View>
        </View>
    )
}

export default Recruitment

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#bb2649',
    },
    
    




    //프로필

    infoView: {
        flex: 0.25,
        display: 'flex',
        flexDirection: 'row',
    },
    toolView: {
        flex: 0.25,
        position: 'relative',
        bottom: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileView: {
        flex: 0.5,
        display: 'flex',
        position: 'relative',
        top: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profile: {
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    nicknameText: {
        fontSize: 23,
        fontWeight: 'bold',
        color: 'white',
    },


    //카테고리 정렬
    categorySortView: {
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
    },




    //카테고리

    categoryView: {
        flex: 0.75,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        backgroundColor: 'white',
    },
    categoryTitle: {
        marginTop: 30,
        marginLeft: 30,
        marginBottom: 25,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#bb2649',
    },
    categoryScrollView: {
        width: '100%',
        height: 50,
    },
    categoryScrollViewButton: {
        margin: 10,
        marginTop: 15,
        marginBottom: 15,
        fontWeight: 'bold',
        fontSize: 15,
    },
})