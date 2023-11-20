import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { loadConnect } from '../../DB/LoadDB';

const CustomChart = () => {
    const [connect, setConnect] = useState([]);
    const [perField, setPerField] = useState({});
    const [suField, setSuField] = useState({});

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
        const colors = ['#009FFF', '#93FCF8', '#BDB2FA', '#FFA5BA'];
        return colors[index % colors.length];
    };

    const renderLegendComponent = (fieldCounts, fieldName) => {
        const pieData = convertToPieData(fieldCounts).slice(0, 4);

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






        return (
            <>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                    {pieData.map((data, index) => (
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
                            {renderDot(data.color)}
                            <Text style={{ color: 'black' }}>{`${data.label}: ${data.percentageValue}`}</Text>
                        </View>
                    ))}
                </View>
            </>
        );
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
            <View>
                <View style={{ padding: 20, alignItems: 'center' }}>
                    <PieChart
                        data={convertToPieData(calculatePerFieldCounts())}
                        donut
                        showGradient
                        sectionAutoFocus
                        radius={90}
                        innerRadius={60}
                        focusOnPress
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
                <View style={{ padding: 20, alignItems: 'center' }}>
                    <PieChart
                        data={convertToPieData(calculateSuFieldCounts())}
                        donut
                        showGradient
                        sectionAutoFocus
                        radius={90}
                        innerRadius={60}
                        focusOnPress
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
        </View>
    );
};

export default CustomChart;
