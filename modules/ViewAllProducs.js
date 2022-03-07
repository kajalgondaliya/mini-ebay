import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from 'expo-checkbox';
import { Image, Pressable } from 'react-native';
import AddProductModal from '../components/AddProductModal';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native';

export default function ViewAllProducs() {

  const [comment, _comment] = useState('')

  const updateComment = async (id) => {
    let userDetail = await AsyncStorage.getItem('userDetail');
    userDetail = JSON.parse(userDetail);
    AllProducts.forEach((item)=>{
      if (item.id === id) {
        console.log("match");
        item.comments.push(`${userDetail.name}:- ${comment}`);
      }
    })
    // setTimeout( async () => {
      await AsyncStorage.setItem('productsList', JSON.stringify(AllProducts));
    // }, 500);
    refreshProducts()
    _comment('')
  }

  return (
    <View style={{ flexDirection: 'row', padding: 5, flexWrap: 'wrap', justifyContent: 'space-around' }}>
      {AllProducts?.map((item) => {
        return item.visible ? (
          <View key={item.id} style={styles.card}>
            <Image
              source={{
                uri: 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-1_large.png?format=webp&v=1530129113',
              }}
              style={{ width: 300, height: 200 }}
            />
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
            <Text style={styles.productDesc}>{item.description}</Text>
            <View style={{ padding: 10, margin: 10, borderWidth: 1 }}>
              <Text>Comments:</Text>
              {item?.comments?.map((c, i) => {
                return <Text key={i}>{c}</Text>;
              })}
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TextInput
                style={styles.input}
                placeholder='Add Comment...'
                onChangeText={(value) => _comment(value)}
                style={{ width: '70%' }}
                defaultValue={comment}
              />
              <Pressable style={[styles.button, styles.buttonClose]} onPress={() => updateComment(item.id)}>
                <Text style={styles.textStyle}>Add</Text>
              </Pressable>
            </View>
          </View>
        ) : null;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  headingTitle: {
    fontSize: 20,
    textAlign: 'left',
    marginBottom: 20,
  },
  card: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: '100%',
    margin: 5,
  },
  stretch: {
    width: 50,
    height: 200,
    resizeMode: 'stretch',
  },
  productTitle: {
    fontSize: 22,
  },
  productPrice: {
    fontSize: 18,
    color: 'rgba(0,0,0,0.8)',
  },
  productDesc: {
    color: 'rgba(0,0,0,0.7)',
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    width: '100%',
  },
});
