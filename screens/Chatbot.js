import React, { Component } from "react";
import { View, Text, SafeAreaView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const botAvatar = require('../assets/peopleImage/moohee.png')

const BOT = {
    _id: 2,
    name: 'Mr.Bot',
    avatar: botAvatar
}

class Chatbot extends Component {

    state = {
        messages: [{
            _id: 2, text: 'My name is Mr. Bot', createdAt: new Date(),
            user: BOT
        }, {
            _id: 1, text: 'Hi', createdAt: new Date(),
            user: BOT
        }],
        id: 1,
        name: '',
    };

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <GiftedChat messages={this.state.messages}
                    onSend={(messages) => this.onSend(message)}
                    onQuickReply={(quickReply) => this.onQuickReply
                        (quickReply)}
                    user={{ _id: 1 }}
                />

            </View>
        )
    }
}

export default Chatbot;