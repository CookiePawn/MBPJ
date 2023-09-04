import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Button,
    ScrollView,
    StyleSheet
} from 'react-native';
import { withSpring } from 'react-native-reanimated';
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
                    <Icon name="notifications-outline" size={30} color="white"/>
                    <Icon name="arrow-back-circle-outline" size={10} color="#bb2649"/>
                    <Icon name="settings-outline" size={30} color="white"/>
                </View>
            </View>
            <View style={styles.categoryView}>
                <View style={styles.categoryButtonView}>
                    <Button 
                        title="IT" 
                        style={styles.categoryButton}
                        onPress={() => props.navigation.navigate("Recruitment", {title: 'IT'})}
                    />
                    <Button 
                        title="디자인" 
                        style={styles.categoryButton}
                        onPress={() => props.navigation.navigate("Recruitment", {title: '디자인'})}
                    />
                </View>
                <View style={styles.categoryButtonView}>
                    <Button 
                        title="IT1" 
                        style={styles.categoryButton}
                        onPress={() => props.navigation.navigate("Recruitment", {title: 'IT'})}
                    />
                    <Button 
                        title="디자인1" 
                        style={styles.categoryButton}
                        onPress={() => props.navigation.navigate("Recruitment", {title: '디자인'})}
                    />
                </View>
                <View style={styles.categoryButtonView}>
                    <Button 
                        title="IT2"
                        style={styles.categoryButton} 
                        onPress={() => props.navigation.navigate("Recruitment", {title: 'IT'})}
                    />
                    <Button 
                        title="디자인2" 
                        style={styles.categoryButton}
                        onPress={() => props.navigation.navigate("Recruitment", {title: '디자인'})}
                    />
                </View>
                <View style={styles.categoryButtonView}>
                    <Button 
                        title="IT3" 
                        style={styles.categoryButton}
                        onPress={() => props.navigation.navigate("Recruitment", {title: 'IT'})}
                    />
                    <Button 
                        title="디자인3" 
                        style={styles.categoryButton}
                        onPress={() => props.navigation.navigate("Recruitment", {title: '디자인'})}
                    />
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
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
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