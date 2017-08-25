import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    SectionList,
    Image,
    TouchableOpacity
} from 'react-native';

var Dimensions = require('Dimensions');
var {width} = Dimensions.get('window');
var itemW = width/4
//var fansArr = require('./js/fansArr.json')
//var fansArr = []

export default class Category extends Component {

constructor(props) {
        super(props);
        this.state = {
            dataSource: null,
        }
    }

componentDidMount(){
    console.log('组件加载完成，开始网络请求');
    this.get();
  }
    //网络请求
  get() {
        fetch('http://api.dantangapp.com/v1/channel_groups/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())//1
            .then((jsonData) => {//2
              var fansArr = []
              var  items = jsonData.data.channel_groups;
              for (var i = 0; i < items.length; i++) {
                var row = [];
                var element = items[i].channels;
                for (var j = 0; j < element.length; j++) {
                
                  row[j] = {img:element[j].icon_url,name:element[j].name,id:element[j].id};
                };
                
                fansArr.push({data:[row],title:items[i].name,key:items[i].name})
                
              };
              this.setState({
                
                dataSource: fansArr
            });

            });
    }

    _extraUniqueKey = (item ,index) => (item+index+'index')// 给每个Item设置key
    _renderItem = ({item})=>{
        {/*
            map()是JavaScript数组对象的属性;
            通过指定函数处理数组的每个元素，并返回处理后的数组。
        */}
        return (
            <View style={styles.ItemStyle}>
                { item.map((item, i) => this.renderExpenseItem(item, i))}
            </View>
        )
    };
    renderExpenseItem(item, i) {

        return <TouchableOpacity key={i} onPress={this._pressRow.bind(this,item)} underlayColor="transparent">
            <View style={styles.row}>
                 < Image style={styles.itemimage} source={{uri:item.img}}/>
                
                 <Text style={{marginTop:10}}>{item.name}</Text>
                
            </View>
        </TouchableOpacity>;
    }
    _pressRow(item) {
        const { navigate } = this.props.navigation;
        navigate('CategoryDetail',{
            id:item.id,
            desc:item.name
        });
    }

    _sectionComp = ({section})=>{
        return(
             <Text style={styles.header}>{section.key}</Text>
            
        )
    }
    render() {
      if (!this.state.dataSource) {
            return (
                <View></View>
            );
        }
      //console.log(fansArr);
      // let fansArr = [{key:'风格',data:[[{img:'a',name:'创意'},{img:'a',name:'创意'},{img:'a',name:'创意'},{img:'a',name:'创意'},{img:'a',name:'创意'}]]},
      // {key:'品类',data:[[{img:'a',name:'创意'},{img:'a',name:'创意'},{img:'a',name:'创意'}]]}];
        return (
           <View style={{ flex: 1,backgroundColor:'white' }}>
            <SectionList
                contentContainerStyle={styles.containerStyle}
               // sections={fansArr}
                sections={ // 不同section渲染相同类型的子组件
                            this.state.dataSource
                        }
                stickySectionHeadersEnabled ={false}
                renderItem={this._renderItem}
                renderSectionHeader={this._sectionComp}
                keyExtractor = {this._extraUniqueKey} />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    containerStyle:{

        backgroundColor:'white'
    },
    ItemStyle:{
        flexDirection:'row',
        flexWrap:'wrap',
       // backgroundColor:'red'
    },
    row:{
        //height:itemW,
        width:itemW,
        alignItems:'center',
        marginTop:8,
        marginBottom:8
    },
    header:{
        margin:10,
        height:30,
        fontSize:17,
    },
    itemimage:{
        width:itemW-20,
        height:itemW-20,
    }

});