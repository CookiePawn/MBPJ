import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'



const RecruitmentInfo = (props) => {
    const {params} = props.route;
    const title = params? params.title:null;

    return (
        <View style={styles.backgroundView}>
            <View style={styles.infoView}>
                <View style={styles.toolView}>
                    <TouchableOpacity onPress={() => props.navigation.navigate("Recruitment")}>
                        <Icon name="arrow-back-circle-outline" size={30} color="white"/>
                    </TouchableOpacity>
                    <Icon name="arrow-back-circle-outline" size={30} color="#bb2649"/>
                </View>
                <View style={styles.profileView}>

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
            <View style={styles.backgroundSubView}>
                <Text>
                    채용 정보 페이지입니다.
                </Text>
                <Text>{title}</Text>
            </View>
        </View>   
    )
    
}


export default RecruitmentInfo



const styles = StyleSheet.create({
    backgroundView: {
        flex: 1,
        backgroundColor: '#bb2649',
    },
    backgroundSubView: {
        flex: 0.85,
        backgroundColor: 'white',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 4.65,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        alignItems: 'center',
        justifyContent: 'center',
    },



    infoView: {
        flex: 0.15,
        display: 'flex',
        flexDirection: 'row',
    },
    toolView: {
        flex: 0.25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1.5, 
        borderBottomColor: '#bb2649',
    },
    profileView: {
        flex: 0.5,
    },
})