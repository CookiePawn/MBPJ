import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { loadConnect } from '../../DB/LoadDB';
import Swiper from 'react-native-swiper/src'
const { width } = Dimensions.get('window')


const CustomChart = () => {
    const [connect, setConnect] = useState([]);
    const [perField, setPerField] = useState({});
    const [suField, setSuField] = useState({});
    const [chartList, setChartList] = useState([])

    useEffect(() => {
        const fetchConnect = async () => {
            const connects = await loadConnect();
            setConnect(connects);
        };
        fetchConnect();
    }, []);

    useEffect(() => {
        const perFieldCounts = calculatePerFieldCounts();
        const suFieldCounts = calculateSuFieldCounts();

        const perFieldMax = findMaxValue(convertToPieData(perFieldCounts));
        const suFieldMax = findMaxValue(convertToPieData(suFieldCounts));

        setPerField({ maxKey: perFieldMax.maxKey, maxValue: perFieldMax.maxValue.toFixed(2) });
        setSuField({ maxKey: suFieldMax.maxKey, maxValue: suFieldMax.maxValue.toFixed(2) });
    }, [connect]);
    
    
    const handlePieChartPress = (data, name) => {
        // 포커스된 데이터의 value 값을 출력
        if (name == 'perField') {
            setPerField({maxKey: data.label, maxValue: data.value.toFixed(2)})
        } else if (name == 'suField') {
            setSuField({maxKey: data.label, maxValue: data.value.toFixed(2)})
        }
    };


    const calculatePerFieldCounts = () => {
        const perFieldCounts = {};

        connect.forEach((data) => {
            const { perField } = data;

            if (perFieldCounts[perField]) {
                perFieldCounts[perField]++;
            } else {
                perFieldCounts[perField] = 1;
            }
        });

        return perFieldCounts;
    };

    const calculateSuFieldCounts = () => {
        const suFieldCounts = {};

        connect.forEach((data) => {
            const { suField } = data;

            if (suFieldCounts[suField]) {
                suFieldCounts[suField]++;
            } else {
                suFieldCounts[suField] = 1;
            }
        });

        return suFieldCounts;
    };

    const convertToPieData = (fieldCounts) => {
        const pieData = Object.keys(fieldCounts).map((key, index) => {
            const value = fieldCounts[key];
            const percentage = (value / connect.length) * 100;

            return {
                value: percentage,
                color: getColor(index),
                label: key,
                gradientCenterColor: '#FF7F97',
                focused: true,
                percentageValue: `${percentage.toFixed(2)}%`,
            };
        });

        return pieData;
    };

    const getColor = (index) => {
        const colors = ['#009FFF', '#93FCF8', '#BDB2FA', '#FFA5BA', 'yellow', 'lightgreen'];
        return colors[index % colors.length];
    };

    const renderLegendComponent = (fieldCounts, fieldName) => {
        const pieData1 = convertToPieData(fieldCounts).slice(0, 2);
        const pieData2 = convertToPieData(fieldCounts).slice(2, 4);
        const pieData3 = convertToPieData(fieldCounts).slice(4, 6);

        let maxKey, maxValue;
        if (fieldName === 'perField') {
            maxKey = perField.maxKey;
            maxValue = perField.maxValue;
        } else if (fieldName === 'suField') {
            maxKey = suField.maxKey;
            maxValue = suField.maxValue;
        }


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
                    {pieData1.map((data, index) => (
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 30 }}>
                            {renderDot(data.color)}
                            <Text style={{ color: 'black' }}>{`${data.label}: ${data.percentageValue}`}</Text>
                        </View>
                    ))}
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginBottom: 10,
                    marginLeft: 50,
                }}>
                    {pieData2.map((data, index) => (
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 30 }}>
                            {renderDot(data.color)}
                            <Text style={{ color: 'black' }}>{`${data.label}: ${data.percentageValue}`}</Text>
                        </View>
                    ))}
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    {pieData3.map((data, index) => (
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 30 }}>
                            {renderDot(data.color)}
                            <Text style={{ color: 'black' }}>{`${data.label}: ${data.percentageValue}`}</Text>
                        </View>
                    ))}
                </View>
            </>
        );


        //여기에 pieData를 돌면서 chartList 배열에 저장하고싶다
    };

    const findMaxValue = (fieldCounts) => {
        let maxValue = 0;
        let maxKey = null;

        Object.keys(fieldCounts).forEach((key) => {
            const value = fieldCounts[key].value;
            if (value > maxValue) {
                maxValue = value;
                maxKey = fieldCounts[key].label; // 수정된 부분
            }
        });

        return { maxValue, maxKey };
    };

    const renderDot = (color) => {
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

    return (
        <View style={{ marginBottom: 50 }}>
            <Swiper
                style={{ height: 450 }}
                loop={false}
                dotStyle={{ backgroundColor: '#D9D9D9' }}
                activeDotStyle={{ width: 30, backgroundColor: '#5552E2' }}
            >
                <View>
                    <Text>개인 트렌드</Text>
                    <View style={{ padding: 20, alignItems: 'center' }}>
                        <PieChart
                            data={convertToPieData(calculatePerFieldCounts())}
                            donut
                            showGradient
                            sectionAutoFocus
                            radius={90}
                            innerRadius={60}
                            focusOnPress
                            onPress={(data) => handlePieChartPress(data, 'perField')}
                            centerLabelComponent={() => (
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 22, color: 'black', fontWeight: 'bold' }}>{perField.maxValue}%</Text>
                                    <Text style={{ fontSize: 14, color: 'black', fontWeight: 'bold' }}>{perField.maxKey}</Text>
                                </View>
                            )}
                        />
                    </View>
                    {renderLegendComponent(calculatePerFieldCounts(), 'perField')}
                </View>

                <View>
                    <Text>스타트업 트렌드</Text>
                    <View style={{ padding: 20, alignItems: 'center' }}>
                        <PieChart
                            data={convertToPieData(calculateSuFieldCounts())}
                            donut
                            showGradient
                            sectionAutoFocus
                            radius={90}
                            innerRadius={60}
                            focusOnPress
                            onPress={(data) => handlePieChartPress(data, 'suField')}
                            centerLabelComponent={() => (
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 22, color: 'black', fontWeight: 'bold' }}>{suField.maxValue}%</Text>
                                    <Text style={{ fontSize: 14, color: 'black', fontWeight: 'bold' }}>{suField.maxKey}</Text>
                                </View>
                            )}
                        />
                    </View>
                    {renderLegendComponent(calculateSuFieldCounts(), 'suField')}
                </View>
            </Swiper>
        </View >
    );
};

export default CustomChart;
