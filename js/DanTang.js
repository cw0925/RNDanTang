import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity
} from 'react-native';

import Swiper from 'react-native-swiper';

const {ScreenWidth, ScreenHeight} = Dimensions.get('window');
var data = [];
var scrollData = [];

export default class DanTang extends Component {
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
       // alert(item.key)
        const { navigate } = this.props.navigation;
        navigate('HomeDetail',{
          url:item.contenturl
        });
    }
    //头视图
    headerView() {
      let datas = [ 'http://7fvaoh.com3.z0.glb.qiniucdn.com/image/150806/kzp5acor6.jpg-w720',
  'http://7fvaoh.com3.z0.glb.qiniucdn.com/image/150717/9q1g2knxa.jpg-w720',
  'http://7fvaoh.com3.z0.glb.qiniucdn.com/image/150809/3uoh780w5.jpg-w720' ]
        return <View style={styles.topsroll}>
                  <Swiper height={200} // 指定高度 
                loop={true} // 是否开启循环
                showsButtons={false} // 设置控制按钮(左右两侧的箭头)是否可见 
                index={0} 
                autoplayTimeout = {5} //每个页面自动滑动停留的时间  
                autoplay={true} // 是否自动跳转
                dotColor = 'gray'          //非当前圆点的样式（可自定义）
                activeDotColor = 'red'  //当前圆点的样式（可自定义）
                horizontal={true}> 
                {
                  datas.map((item,index)=>{
                    return(
                            
                            <Image  style={{width:ScreenWidth,height:200}} source={{uri:item}}/>
                            
                             );
                         })
                }
                </Swiper>
        </View>

    }

  componentDidMount(){
    console.log('组件加载完成，开始网络请求');
    this.get();
    this.getScrollData();
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
                    }}
                />
      </View>
    );
  }
  
  //首页内容网络请求
  get() {
        fetch('http://api.dantangapp.com/v1/channels/4/items?gender=1&generation=1&limit=20&offset=0', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())//1
            .then((jsonData) => {//2
              var items = [];
              //var data = [];
                items = jsonData.data.items;
                for (var i = 0; i < items.length; i++) {
                  data[i] = {key:i,title:items[i].title,image:items[i].cover_image_url,contenturl:items[i].content_url}
                  console.log(data[i]);
                };
          
            });
    }
    //轮播图数据
    getScrollData() {
        fetch('http://api.dantangapp.com/v1/banners', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())//1
            .then((jsonData) => {//2
              var items = [];
              //var data = [];
                items = jsonData.data.banners;
                for (var i = 0; i < items.length; i++) {
                  //scrollData.push(items[i].image_url)
                  scrollData[i] = {key:i,image:items[i].image_url}
                };
          
            });
    }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white', 
    flex: 1,
    justifyContent: 'center'
  },
  list:{
    backgroundColor: 'white', 
    flex: 1, 
  },
  item:{
    flex: 1, 
  },
  itemContent:{
    flex: 1,
    margin: 5,
    //marginBottom: 5
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
  topsroll:{
    flex:1,
    width:ScreenWidth,
    height:200,
    alignItems:'center',
    backgroundColor:'white'
  }
});

