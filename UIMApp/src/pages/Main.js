import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View,
    Button
} from 'react-native';
import Proxy from '../util/Proxy';
import Environment from '../../Environment'
import Pie from '../charts/Pie';
import Theme from '../theme';

// var data = {

//     alarmSummary: [
//         //         {'number':10,'name':'critical'},
//         // {'number':20,'name':'info'},
//         // {'number':30,'name':'warning'},
//         // {'number':10,'name':'rasds'},
//         // {'number':40,'name':'error'}
//     ],

//     //   {
//     //     "clear": "0",
//     //     "critical": "14",
//     //     "information": "0",
//     //     "major": "15",
//     //     "minor": "9",
//     //     "warning": "3"
//     // }
// };

export default class Main extends Component {
    state = {
        activeIndex: 0,
        alarmSummary: []
    };

    constructor() {
        super();
        this.getAlarms();
    }
    getAlarms() {
        var uri = Environment.CLIENT_API + 'alarms/summary';

        var prox = new Proxy();
        prox.get(uri)
            .then((response) => {
                console.log(response);
                //response = response.json();
                var total = 0;
                Object.keys(response).map(function (keyName, keyIndex) {
                    total = total + Number(response[keyName]);
                });

                var alarms = [];
                Object.keys(response).map(function (keyName, keyIndex) {
                    var val = 0;
                    if (response[keyName] != '0') {
                        val = Number(response[keyName]) / total;
                        val = val * 100;
                    }
                    alarms.push({ 'name': keyName, 'number': val.toFixed(2) });

                });

                this.setState({ alarmSummary: alarms });
                console.log(this.state.alarmSummary);
            })
            .catch(err => {
                this.setState({ message: err.message });
            });
    }
     _onPieItemSelected(newIndex){
         this.setState({ activeIndex: newIndex });
    }    
    render() {
        const height = 200;
        const width = 500;

        return (
            <ScrollView style={{ padding: 20 }}>
                <Text
                    style={{ fontSize: 27 }}>
                    Welcome {this.props.username}!!!
                </Text>
                <View style={styles.container} >
                    <Pie
                        pieWidth={150}
                        pieHeight={150}
                        onItemSelected={(newIndex)=>this.setState({ activeIndex: newIndex })}
                        colors={Theme.colors}
                        width={width}
                        height={height}
                        data={this.state.alarmSummary} />
                    {/* <Text style={styles.chart_title}>Spending per year in {data.spendingsLastMonth[this.state.activeIndex].name}</Text>  */}
                </View>
                {/* <Button
                    onPress={this.props.onLogoutPress}
                    title="Logout"
                /> */}
            </ScrollView>
        )
    }
}

const styles = {
    container: {
        backgroundColor: 'whitesmoke',
        marginTop: 21,
    },
    chart_title: {
        paddingTop: 15,
        textAlign: 'center',
        paddingBottom: 5,
        paddingLeft: 5,
        fontSize: 18,
        backgroundColor: 'white',
        color: 'grey',
        fontWeight: 'bold',
    }
}