import {
    Modal,
    View,
    Image,
    StyleSheet,
} from 'react-native'



// 로딩 컴포넌트를 화면 전체에 표시하는 함수
export const renderFullScreenLoading = (isLoading) => {
    return (
        <Modal
            visible={isLoading}
            transparent={true}
            animationType="none"
        >
            <View style={styles.fullScreenLoadingContainer}>
                <Image
                    source={require('../assets/loading/loading-robot.gif')}
                    style={styles.fullScreenLoadingImage}
                />
            </View>
        </Modal>
    );
};



const styles = StyleSheet.create({
    
    //로딩이벤트
    fullScreenLoadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
    },

    fullScreenLoadingImage: {
        width: 250,
        height: 250
    },
})