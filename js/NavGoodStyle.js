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
  View,
  Dimensions
} from 'react-native';
const {ScreenWidth, ScreenHeight} = Dimensions.get('window');
// 自定义Header，覆盖系统提供的
export default class NavGoodStyle extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.leftStyle} onPress={()=>this.props.leftClick()}>
          返回
        </Text>
        <Text style={styles.titleStyle}>
          商品详情
        </Text>
        <Image style={styles.rightStyle} source={require('../resources/baichuan_btn_share_21x21_.png')}/> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:64,
    backgroundColor:'#FF4040',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
  },
  leftStyle:{
    marginTop:20,
    marginLeft:20,
    width:80,
    height:30,
    color:'white',
    fontSize:17,
  },
  titleStyle:{
    marginTop:20,
    color:'white',
    fontSize:17,
    width:ScreenWidth-200,
    height:30,
  },
  rightStyle:{
    marginTop:20,
    marginRight:20,
    width:80,
    height:30,
  }

});

