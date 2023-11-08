import {
    View,
    Text,
} from 'react-native'


//그래프 import
import { PieChart } from "react-native-gifted-charts";








const CustomChart = () => {

    //차트 데이터
    const pieData = [
        {
            value: 47,
            color: '#009FFF',
            gradientCenterColor: '#006DFF',
            focused: true,
        },
        { value: 40, color: '#93FCF8', gradientCenterColor: '#3BE9DE' },
        { value: 16, color: '#BDB2FA', gradientCenterColor: '#8F80F3' },
        { value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97' },
    ];


    const renderDot = color => {
        return (
            <View
                style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor: color,
                    marginRight: 10,
                }}
            />
        );
    };


    const renderLegendComponent = () => {
        return (
            <>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 10,
                        marginLeft: 50,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: 120,
                            marginRight: 20,
                        }}>
                        {renderDot('#006DFF')}
                        <Text style={{ color: 'black' }}>Excellent: 47%</Text>
                    </View>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
                        {renderDot('#8F80F3')}
                        <Text style={{ color: 'black' }}>Okay: 16%</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: 120,
                            marginRight: 20,
                            marginLeft: 50,
                        }}>
                        {renderDot('#3BE9DE')}
                        <Text style={{ color: 'black' }}>Good: 40%</Text>
                    </View>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
                        {renderDot('#FF7F97')}
                        <Text style={{ color: 'black' }}>Poor: 3%</Text>
                    </View>
                </View>
            </>
        );
    };




    return (
        <View style={{marginBottom: 50,}}>
            <View>
                <View style={{ padding: 20, alignItems: 'center', }}>
                    <PieChart
                        data={pieData}
                        donut
                        showGradient
                        sectionAutoFocus
                        radius={90}
                        innerRadius={60}
                        focusOnPress

                        centerLabelComponent={() => {
                            return (
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text
                                        style={{ fontSize: 22, color: 'black', fontWeight: 'bold' }}>
                                        47%
                                    </Text>
                                    <Text style={{ fontSize: 14, color: 'black', fontWeight: 'bold' }}>Excellent</Text>
                                </View>
                            );
                        }}
                    />
                </View>
                {renderLegendComponent()}
            </View>
        </View>
    )

}



export default CustomChart































