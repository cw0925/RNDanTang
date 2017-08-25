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
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';

import NavStyle from './NavStyle.js';

var data = []

export default class CategoryDetail extends Component {
  static navigationOptions = ({navigation,screenProps}) => ({
        // 这里面的属性和App.js的navigationOptions是一样的。
        header:(
            <NavStyle  text = {navigation.state.params.desc} leftClick={()=>navigation.state.params?navigation.state.params.navigatePress():null}/>
        )
    })

    navigatePress = () => {
        const { goBack } = this.props.navigation;
        goBack();
    }
   //item
  _renderItemView = (item) => {
        return (
            <View style={styles.item}>
              <View style={styles.itemContent}>
              <TouchableOpacity key={item.key}  onPress={this.clickItem.bind(this,item)} activeOpacity={1}>
                <Image style = {styles.itemImg} source={{uri:item.image}}>
                  <Text style={styles.itemText}>{item.title} </Text>
                </Image>
              </TouchableOpacity>
              </View>
            </View>
        )
    };
    //点击列表点击每一行
    clickItem(item) {
        const { navigate } = this.props.navigation;
        navigate('HomeDetail',{
          url:item.contenturl
        });
    }
  render() {
    return (
      <View style={styles.container}>
      <FlatList ref={(flatList)=>this._flatList = flatList} style={styles.list}
                          data={data}
                          renderItem={({item}) => this._renderItemView(item)}
                          ListHeaderComponent={this.headerView}
                          onViewableItemsChanged={(info)=>{
                          console.log(info);
                    }}/>
      </View>
    );
  }
  componentDidMount(){
    this.props.navigation.setParams({
            navigatePress:this.navigatePress
        });
    console.log('组件加载完成，开始网络请求');
    console.log('标题'+this.props.navigation.state.params.desc)
    this.get();
  }
  //首页内容网络请求
  get() {
    //let url = 'http://api.dantangapp.com/v1/channels/12/items?limit=20&offset=0'
    let url = 'http://api.dantangapp.com/v1/channels/'+this.props.navigation.state.params.id+'/items?limit=20&offset=0'
    console.log(url)
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())//1
            .then((jsonData) => {//2
                let items = jsonData.data.items;
                for (var i = 0; i < items.length; i++) {
                  data[i] = {key:i,title:items[i].title,image:items[i].cover_image_url,contenturl:items[i].content_url}
                  // console.log(data[i]);
                };
          
            });
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  itemContent:{
    flex: 1,
    margin: 5,
    //marginBottom: 5
  },
  item:{
    flex: 1, 
  },
  itemImg:{
    flex: 1,
    // marginLeft: 5,
    // marginRight: 5,
  },
  itemText:{
    backgroundColor:'#000000',
    opacity:0.6,
    color:'white',
    height:30,
    fontSize: 17,
    textAlign:'left',
    marginTop:170,
  },
});
