import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacityBase,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";

export default function AddProductModal(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [productTitle, _productTitle] = useState("");
  const [productPrice, _productPrice] = useState("");
  const [productDesc, _productDesc] = useState("");
  const [productVisible, _productVisible] = useState(false);

  const handleAddProduct = async () => {
    let ownerDetail = await AsyncStorage.getItem("userDetail");
    ownerDetail = JSON.parse(ownerDetail);
    const newProductObj = {
      id: Math.round(Math.random() * 10000 + 1),
      title: productTitle || "No title",
      price: productPrice || 0,
      description: productDesc || "lorem ipsum",
      visible: productVisible,
      owner: ownerDetail.name,
      comments: [],
    };

    let getProductsList = await AsyncStorage.getItem("productsList");
    getProductsList = JSON.parse(getProductsList);

    if (getProductsList) {
      getProductsList.push(newProductObj);
      AsyncStorage.setItem("productsList", JSON.stringify(getProductsList));
      setModalVisible(!modalVisible);
    } else {
      await AsyncStorage.setItem(
        "productsList",
        JSON.stringify([newProductObj])
      );
      setModalVisible(!modalVisible);
    }
    props.refreshProducts();
  };

  return (
    <View>
      {/* Add Product Modal */}
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ width: "100%" }}>
                <TextInput
                  style={styles.input}
                  placeholder="Product Title"
                  onChangeText={(value) => _productTitle(value)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Price"
                  onChangeText={(value) => _productPrice(value)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Description"
                  onChangeText={(value) => _productDesc(value)}
                />
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ marginRight: 10 }}>Visible</Text>
                  <Checkbox
                    value={productVisible}
                    onValueChange={_productVisible}
                    color={productVisible ? "#4630EB" : undefined}
                  />
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={handleAddProduct}
                >
                  <Text style={styles.textStyle}>Save</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      <TouchableOpacity
        style={styles.postCreateBtn}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.btnText}>Add New Product</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    margin: 5,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  btnText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  postCreateBtn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    marginTop: 10,
    width: 250,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
    marginHorizontal: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    width: "100%",
  },
});
