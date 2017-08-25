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
    Button,
    WebView
} from 'react-native';

import GoodDetail from './GoodDetail.js'

import NavStyle from './NavStyle.js';
import { NavigationActions } from 'react-navigation'

const navigateAction = NavigationActions.navigate({
    routeName: 'GoodDetail',

    params: {headerTitle:'商品详情'},

    action: NavigationActions.navigate({ routeName: 'GoodDetail'})
})

export default class HomeDetail extends Component {
    static navigationOptions = ({navigation,screenProps}) => ({
        // 这里面的属性和App.js的navigationOptions是一样的。
        header:(
            <NavStyle  text = '攻略详情' leftClick={()=>navigation.state.params?navigation.state.params.navigatePress():null} rightClick={()=>navigation.state.params?navigation.state.params.navigatePress():null}/>
        )
    })

    componentDidMount(){
        // 通过在componentDidMount里面设置setParams将title的值动态修改
        this.props.navigation.setParams({
            navigatePress:this.navigatePress
        });
        //console.log('传智:'+this.props.navigation.state.params.url)
    }

    navigatePress = () => {
        const { goBack } = this.props.navigation;
        goBack();
    }

    render() {
        let DEFAULT_URL = this.props.navigation.state.params.url;
        return (
            <View style={styles.container}>
                <WebView 
                    source={{uri: DEFAULT_URL}}//新版本中的写法
                    startInLoadingState={true}
                    domStorageEnabled={true}//开启dom存贮
                    javaScriptEnabled={true}//开启js
                    style={styles.webview_style}
                    onNavigationStateChange={this._onNavigationStateChange}/>
            </View>
        );
    }
    _onNavigationStateChange = (navState) => {
        console.log(navState)
        if (navState.navigationType == 'click') {
            console.log('页面跳转')
            this.props.navigation.dispatch(navigateAction)
        };
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',//存在该属性webview不显示
        backgroundColor: '#F5FCFF',
    },
     webview_style:{
        backgroundColor:'white',
    }
});

