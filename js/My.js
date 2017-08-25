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

export default class My extends Component {
  render() {
    return (
      <View style={styles.container}>
          <Image style={styles.icon} source={require('../resources/Me_ProfileBackground.jpg')}>
          <View style={styles.navc}>
            <Image style={styles.navcleft} source={require('../resources/Me_message_20x20_.png')}/>
            <TouchableOpacity  onPress={this.rightBarClick}>
            <Image style={styles.navcright} source={require('../resources/Me_settings_20x20_.png')}/>
            </TouchableOpacity>
          </View>
            <View style={styles.headicon}>
            <Image style={styles.head} source={require('../resources/Me_AvatarPlaceholder_75x75_.png')}/>
            </View>
          </Image>
      </View>
    );
  }
  rightBarClick() {
       // alert(item.key)
        const { navigate } = this.props.navigation;
        navigate('Setting');
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  icon:{
    width:ScreenWidth,
    height:250,
  },
  navc:{
    height:64,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
  },
  navcleft:{
    marginTop:30,
    marginLeft:20,
    width:20,
    height:20
  },
  navcright:{
    marginTop:30,
    marginRight:20,
    width:20,
    height:20
  },
  headicon:{
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
  },
  head:{
    width:60,
    height:60
  }
});