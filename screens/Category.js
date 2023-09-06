import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Button,
    ScrollView,
    StyleSheet
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons'


const Category = (props) => {
    return (
        <View style={styles.view}>
            <View style={styles.infoView}>
                <View style={styles.toolView}>
                    <TouchableOpacity onPress={() => props.navigation.navigate("TabNavigator")}>
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
                    <TouchableOpacity onPress={() => props.navigation.navigate("TabNavigator", {screen:'User'})}>
                        <Icon name="notifications-outline" size={30} color="white"/>
                    </TouchableOpacity>
                    <Icon name="arrow-back-circle-outline" size={10} color="#bb2649"/>
                    <TouchableOpacity onPress={() => props.navigation.navigate("TabNavigator", {screen:'User'})}>
                        <Icon name="settings-outline" size={30} color="white"/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.categoryView}>
                <View style={styles.categoryButtonView}>
                    <TouchableOpacity
                        style={styles.categoryButton}
                        onPress={() => props.navigation.navigate("Recruitment", {title: 'IT'})}
                    >
                        <Image
                            style={{width: 100, height: 100,}}
                            source={require('../assets/it.jpg')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.categoryButton}
                        onPress={() => props.navigation.navigate("Recruitment", {title: '디자인'})}
                    >
                        <Image
                            style={{width: 100, height: 100,}}
                            source={require('../assets/design.jpg')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.categoryButton}
                        onPress={() => props.navigation.navigate("Recruitment", {title: '회계'})}
                    >
                        <Image
                            style={{width: 100, height: 100,}}
                            source={require('../assets/accounting.jpg')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Category

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
        width: 90,
        height: 90,
        borderRadius: 100,
    },
    nicknameText: {
        fontSize: 23,
        fontWeight: 'bold',
        color: 'white',
    },


    //카테고리

    categoryView: {
        flex: 0.75,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowRadius: 4.65,
        shadowOffset: {
            width: 0,
            height: -2,
        },
        elevation: -2,
    }, 
    categoryButtonView: {
        flex: 0.2,
        flexDirection: 'row',
    },
    categoryButton: {
        marginLeft: 5,
        marginRight: 5,
    },


})