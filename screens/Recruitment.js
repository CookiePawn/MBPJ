import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'


const Recruitment = (props) => {
    return (
        <View style={styles.view}>
            <View style={styles.infoView}>
                <View style={styles.toolView}>
                    <TouchableOpacity onPress={() => props.navigation.navigate("Main")}>
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
                <Text style={styles.categoryTitle}>IT</Text>
                <Text></Text>
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


    //카테고리

    categoryView: {
        flex: 0.75,
        borderTopLeftRadius: 80,
        borderTopRightRadius: 80,
        backgroundColor: 'white',
    },
    categoryTitle: {
        marginTop: 30,
        marginLeft: 30,
        fontSize: 40,
        fontWeight: 'bold',
        color: '#bb2649'
    },
})