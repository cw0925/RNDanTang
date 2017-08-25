/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Setting extends Component {
  static navigationOptions = ({navigation,screenProps}) => ({
        // 这里面的属性和App.js的navigationOptions是一样的。
        header:(
            <NavStyle leftClick={()=>navigation.state.params?navigation.state.params.navigatePress():null}/>
        )
    })
   navigatePress = () => {
        const { goBack } = this.props.navigation;
        goBack();
    }
  render() {
    return (
      <View style={styles.container}></View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
