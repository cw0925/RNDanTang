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
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';
const {ScreenWidth, ScreenHeight} = Dimensions.get('window');
// 自定义Header，覆盖系统提供的
export default class NavStyle extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.leftStyle} onPress={()=>this.props.leftClick()}>
          返回
        </Text>
        <Text style={styles.titleStyle}>
          {this.props.text}
        </Text>
        <TouchableOpacity onPress={()=>this.props.rightClick()}>
          <Image style={styles.rightStyle} source={this.props.img} /> 
        </TouchableOpacity>
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
    width:40,
    height:30,
    color:'white',
    fontSize:17,
    //backgroundColor:'green',
  },
  titleStyle:{
    marginTop:20,
    color:'white',
    fontSize:17,
    width:ScreenWidth-200,
    height:30,
    //backgroundColor:'green',
  },
  rightStyle:{
    marginTop:10,
    marginRight:20,
    width:20,
    height:20,
    //backgroundColor:'green',
  }

});

