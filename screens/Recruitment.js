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
    const [display, setDisplay] = useState('none')

    const CategorySort = () => {
        const [selectedSortButton, setSelectedSortButton] = useState(null);
        return (
            <View style={[styles.categorySortView, {height: 170, display: display}]}>
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
            <View style={{flexDirection: 'row'}}>
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
                        <TouchableOpacity onPress={() => setDisplay(display === '' ? 'none' : '')}>
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
                <View style={{flex: 1, borderTopColor: 'gray', borderTopWidth: 1.5,}}>
                    <ScrollView 
                        style={styles.listScrollView}
                        showsVerticalScrollIndicator={false}>
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate("Recruitmentinfo", {title: '리스트 1'})}
                        >
                            <View stlye={styles.listView}>
                                <View style={styles.listSubView}>
                                    <Text style={styles.listText}>리스트 1</Text>
                                </View>
                            </View>    
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View stlye={styles.listView}>
                                <View style={styles.listSubView}>
                                    <Text style={styles.listText}>리스트 1</Text>
                                </View>
                            </View>    
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View stlye={styles.listView}>
                                <View style={styles.listSubView}>
                                    <Text style={styles.listText}>리스트 1</Text>
                                </View>
                            </View>    
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View stlye={styles.listView}>
                                <View style={styles.listSubView}>
                                    <Text style={styles.listText}>리스트 1</Text>
                                </View>
                            </View>    
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View stlye={styles.listView}>
                                <View style={styles.listSubView}>
                                    <Text style={styles.listText}>리스트 1</Text>
                                </View>
                            </View>    
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View stlye={styles.listView}>
                                <View style={styles.listSubView}>
                                    <Text style={styles.listText}>리스트 1</Text>
                                </View>
                            </View>    
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View stlye={styles.listView}>
                                <View style={styles.listSubView}>
                                    <Text style={styles.listText}>리스트 1</Text>
                                </View>
                            </View>    
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View stlye={styles.listView}>
                                <View style={styles.listSubView}>
                                    <Text style={styles.listText}>리스트 1</Text>
                                </View>
                            </View>    
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View stlye={styles.listView}>
                                <View style={styles.listSubView}>
                                    <Text style={styles.listText}>리스트 1</Text>
                                </View>
                            </View>    
                        </TouchableOpacity>
                        
                    </ScrollView>
                </View>
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
        borderBottomWidth: 1.5, 
        borderBottomColor: '#bb2649',
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
        width: 90,
        height: 90,
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
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowRadius: 4.65,
        shadowOffset: {
            width: 0,
            height: -2,
        },
        elevation: -2,
    },
    categoryTitle: {
        marginTop: 30,
        marginLeft: 30,
        marginBottom: 15,
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


    //채용 리스트
    listScrollView: {
        flex: 1,
    },
    listView: {
        width: '100%',
    },
    listSubView: {
        width: '100%',
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowRadius: 4.65,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        elevation: 2
    },
    listText: {
        height: 100,
    }
})