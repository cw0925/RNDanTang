import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';

var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;
var data = [];
export default class DanPin extends Component {
  //item
  _renderItemView = (item) => {
        return (
          <TouchableOpacity key={item.key}  onPress={this.clickItem.bind(this,item)}>
            <View style={styles.item}>
              <Image style = {styles.itemImg} source={{uri:item.image}}/>
              <Text style={styles.itemText} numberOfLines={1}>{item.title} </Text>
            </View>
            </TouchableOpacity>
        )
    };
    //点击列表点击每一行
    clickItem(item) {
       // alert(item.key)
        const { navigate } = this.props.navigation;
        navigate('HomeDetail',{
          url:item.contenturl
        });
    }
  componentDidMount(){
    console.log('组件加载完成，开始网络请求');
    this.get();
  }
  render() {
    return (
      <View style={styles.container}>
                <FlatList ref={(flatList)=>this._flatList = flatList} style={styles.list}
                          data={data}
                          renderItem={({item}) => this._renderItemView(item)}
                    onViewableItemsChanged={(info)=>{
                         console.log(info);
                    }}
                    numColumns ={2}
                />
      </View>
    );
  }
   //网络请求
  get() {
        fetch('http://api.dantangapp.com/v2/items?gender=1&generation=1&limit=20&offset=0', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())//1
            .then((jsonData) => {//2
              let items = jsonData.data.items;
                for (var i = 0; i < items.length; i++) {
                  data[i] = {key:i,title:items[i].data.name,image:items[i].data.cover_image_url,contenturl:items[i].data.url}
                  //console.log(data[i]);
                };
          
            });
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  list:{
    backgroundColor: 'white', 
    flex: 1, 
  },
  item:{
    width:(ScreenWidth-40)/2,
    height:170,
    margin:10 
  },
  itemImg:{
    width:(ScreenWidth-40)/2,
    height:140
  },
  itemText:{
    backgroundColor:'white',
    width:(ScreenWidth-40)/2,
    color:'black',
    height:30,
    fontSize: 15,
    textAlign:'center',
    marginTop:5
  },
});