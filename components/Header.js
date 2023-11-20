import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'



const Header = (props) => {
    return (
        <View style={styles.titleView}>
            <TouchableOpacity
                style={[styles.icon, { left: 0, }]}
                onPress={() => {
                    props.navi.navigation.goBack()
                }}
            >
                <Icon name={props.iconNameL1} size={25} color='black' />
            </TouchableOpacity>
            <Text style={styles.titleText}>
                {props.titleName}
            </Text>
            <TouchableOpacity
                style={[styles.icon, { right: 0, }]}
                onPress={() => {
                    if (props.login == null) {
                        props.navi.navigation.navigate('PersonLogin')
                    } else if (props.login != null) {
                        props.navi.navigation.navigate('AlertPage', props.params)
                    }
                }}
            >
                <Icon name={props.iconNameR1} size={25} color='black' />
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.icon, { right: 40, }]}
                onPress={() => {
                    props.navi.navigation.navigate('Category', props.params)
                }}
            >
                <Icon name={props.iconNameR2} size={25} color='black' />
            </TouchableOpacity>
        </View>
    )
}



export default Header



const styles = StyleSheet.create({
    //content
    titleView: {
        width: '90%',
        height: 100,
        alignItems: 'center',
        marginBottom: 20,
    },
    icon: {
        position: 'absolute',
        bottom: 0,
    },
    titleText: {
        position: 'absolute',
        bottom: 0,
        fontSize: 23,
        fontWeight: 'bold',
    },
})

