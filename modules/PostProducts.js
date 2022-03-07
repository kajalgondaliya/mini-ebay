import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, Pressable } from "react-native";
import AddProductModal from "../components/AddProductModal";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView, TextInput } from "react-native";

export default function PostProducts() {
  const [myProducts, _myProducts] = useState([
    {
      id: 3136535,
      title: "Product 1",
      price: 100,
      description: "This is Description",
      visible: true,
      comments: ["xyz:- Nice", "Person 1:- Good", "Person 2:- Exellent"],
      owner: "Test1",
    },
    {
      id: 9556535,
      title: "Product 2",
      price: 200,
      description: "This is Description 2",
      visible: false,
      comments: ["pqrUser:- Nice", "Person 1:- Good", "Person 2:- Exellent"],
      owner: "Test2",
    },
    {
      id: 3136155,
      title: "Product 3",
      price: 300,
      description: "This is Description 3",
      visible: true,
      comments: ["xyz:- Nice", "Person1:- Good", "xyz:- Exellent"],
      owner: "Test3",
    },
    {
      id: 313321835,
      title: "Product 4",
      price: 400,
      description: "This is Description 4",
      visible: true,
      comments: ["Person1:- Nice", "Person 1:- Good", "Person 2:- Exellent"],
      owner: "Test4",
    },
  ]);
  const [comment, _comment] = useState("");

  useEffect(() => {
    refreshProducts();
  }, []);

  const refreshProducts = async () => {
    let getProductsList = await AsyncStorage.getItem("productsList");
    getProductsList = JSON.parse(getProductsList);
    let pd = myProducts;
    pd.push(getProductsList);
    _myProducts(pd);
  };

  const updateComment = async (id) => {
    let userDetail = await AsyncStorage.getItem("userDetail");
    userDetail = JSON.parse(userDetail);
    myProducts.forEach((item) => {
      if (item.id === id) {
        console.log("match");
        item.comments.push(`${userDetail.name}:- ${comment}`);
      }
    });
    await AsyncStorage.setItem("productsList", JSON.stringify(myProducts));
    refreshProducts();
    _comment("");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <AddProductModal refreshProducts={refreshProducts} />
        {!myProducts.length ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={styles.headingTitle}>
              No Products to show try adding one
            </Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              padding: 5,
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            <Text>All Products List</Text>
            {myProducts?.map((item) => {
              return item.visible ? (
                <View key={item.id} style={styles.card}>
                  <Image
                    source={{
                      uri: "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-1_large.png?format=webp&v=1530129113",
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
                  <View style={{ flexDirection: "row" }}>
                    <TextInput
                      style={styles.input}
                      placeholder="Add Comment..."
                      onChangeText={(value) => _comment(value)}
                      style={{ width: "70%" }}
                      defaultValue={comment}
                    />
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => updateComment(item.id)}
                    >
                      <Text style={styles.textStyle}>Add</Text>
                    </Pressable>
                  </View>
                </View>
              ) : null;
            })}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  card: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: "100%",
    margin: 5,
  },
  headingTitle: {
    fontSize: 20,
    textAlign: "left",
    marginBottom: 20,
  },
  stretch: {
    width: 50,
    height: 200,
    resizeMode: "stretch",
  },
  productTitle: {
    fontSize: 22,
  },
  productPrice: {
    fontSize: 18,
    color: "rgba(0,0,0,0.8)",
  },
  productDesc: {
    color: "rgba(0,0,0,0.7)",
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    width: "100%",
  },
});
