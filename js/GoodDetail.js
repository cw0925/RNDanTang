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
  WebView
} from 'react-native';

import NavStyle from './NavStyle.js';


export default class GoodDetail extends Component {
 static navigationOptions = ({navigation,screenProps}) => ({
        // 这里面的属性和App.js的navigationOptions是一样的。
        header:(
            <NavStyle  
            text = '商品详情'  
            img = {require('../resources/baichuan_btn_share_21x21_.png')} 
            leftClick={()=>navigation.state.params.navigatePress()} 
            rightClick={()=>navigation.state.params.sharePress()}/>
        )
    })
    componentDidMount(){
        // 通过在componentDidMount里面设置setParams将title的值动态修改
        this.props.navigation.setParams({
            navigatePress:this.navigatePress,
            sharePress:this.sharePress
        });
        //console.log('传智:'+this.props.navigation.state.params.url)
    }
    //返回按钮事件
    navigatePress = () => {
        const { goBack } = this.props.navigation;
        goBack();
    }
    //分享按钮
    sharePress = ()=> {
      console.log('分享')
    }
  render() {
    let DEFAULT_URL = 'http://s.click.taobao.com/t?e=m%3D2%26s%3D8N0BZT7eXOAcQipKwQzePOeEDrYVVa64XoO8tOebS%2BdRAdhuF14FMf64W7KM76lUMMgx22UI05atgmtnxDX9deVMA5qBABUs5mPg1WiM1P5OS0OzHKBZzW1e2y4p13L5rx%2FwKrFYo7fIxY5wLH5bMgGN48BBbVHSxgxdTc00KD8%3D' 
    return (
      <View style={styles.container}>
      <WebView 
                    source={{uri: DEFAULT_URL}}//新版本中的写法
                    startInLoadingState={true}
                    domStorageEnabled={true}//开启dom存贮
                    javaScriptEnabled={true}//开启js
                    style={styles.webview_style}/>
  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  webview_style:{
        backgroundColor:'white',
    }
});
