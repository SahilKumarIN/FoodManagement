import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {AppContext} from '../context/AppContext';

const HomeScreen = () => {
  const {foodItems, dataLoading, addData, deleteItem, updateItem} =
    useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [addFoodData, setAddFoodData] = useState({
    foodName: '',
    isAvailable: true,
    foodImgUrl: '',
    foodPrice: '',
  });
  const [isUpdating, setIsUpdating] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>{'Restro Food Management'}</Text>
      <View style={styles.innerContainer}>
        <Text style={styles.secHeading}>Food Items</Text>
        {dataLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={foodItems}
            renderItem={({item, index}) => {
              return (
                <View style={styles.dataContainer}>
                  <Image
                    source={{uri: item.foodImgUrl}}
                    style={{
                      width: 128,
                      height: 128,
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      elevation: 4,
                      shadowColor: '#fff',
                      shadowOffset: 8,
                      shadowOpacity: 0.8,
                      shadowRadius: 16,
                    }}
                  />
                  <View>
                    <Text
                      style={[
                        styles.secHeading,
                        {textTransform: 'capitalize', marginBottom: 8},
                      ]}>
                      {item.foodName}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 12,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: '700',
                          fontSize: 20,
                        }}>
                        {'₹ ' + item.foodPrice}
                      </Text>
                      <Text
                        style={{
                          backgroundColor: item.isAvailable ? 'green' : 'red',
                          textAlign: 'center',
                          paddingVertical: 6,
                          paddingHorizontal: 8,
                          borderRadius: 12,
                          color: 'white',
                          fontWeight: '600',
                        }}>
                        {item.isAvailable ? 'Available' : 'Not Available'}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', gap: 12, marginTop: 8}}>
                      <TouchableOpacity
                        onPress={() => {
                          setAddFoodData({
                            foodImgUrl: item.foodImgUrl,
                            foodName: item.foodName,
                            foodPrice: item.foodPrice,
                            isAvailable: item.isAvailable,
                          });
                          setShowModal(true);
                          setIsUpdating(item.key);
                        }}
                        style={[styles.button, {backgroundColor: 'blue'}]}>
                        <Text style={styles.buttonTxt}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          deleteItem(item.key);
                        }}
                        style={[styles.button, {backgroundColor: 'red'}]}>
                        <Text style={styles.buttonTxt}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      {/* Open Add food modal Button */}
      <Pressable
        onPress={() => {
          setShowModal(true);
        }}
        style={styles.addFloatBtn}>
        <Text style={styles.addFloatBtnTxt}>{'+'}</Text>
      </Pressable>

      {/* Modal to Add/Update Food */}
      <Modal style={styles.modalContainer} transparent visible={showModal}>
        <View style={styles.addFoodFormContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowModal(false)}>
            <Text style={styles.closeButtonTxt}>{'X'}</Text>
          </TouchableOpacity>
          <Text
            style={[styles.secHeading, {textAlign: 'center', color: '#000'}]}>
            Add Food
          </Text>
          <TextInput
            placeholder="Enter the name of the food."
            autoCompleteType="off"
            value={addFoodData.foodName}
            onChangeText={txt => {
              setAddFoodData({...addFoodData, foodName: txt});
            }}
            style={styles.input}
          />
          <TextInput
            placeholder="Enter the price of the food."
            autoCompleteType="off"
            value={addFoodData.foodPrice}
            onChangeText={txt => {
              setAddFoodData({...addFoodData, foodPrice: txt});
            }}
            style={styles.input}
          />
          <TextInput
            placeholder="Enter the image url of the food."
            autoCompleteType="off"
            value={addFoodData.foodImgUrl}
            onChangeText={txt => {
              setAddFoodData({...addFoodData, foodImgUrl: txt});
            }}
            style={styles.input}
          />
          <View style={styles.inputChkBox}>
            <Text style={{color: 'black'}}>Available :</Text>
            <Switch
              value={addFoodData.isAvailable}
              onChange={() => {
                setAddFoodData({
                  ...addFoodData,
                  isAvailable: !addFoodData.isAvailable,
                });
              }}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{backgroundColor: 'black', padding: 12, borderRadius: 12}}
            onPress={() => {
              if (isUpdating) {
                updateItem(isUpdating, addFoodData);
              } else {
                addData(addFoodData);
              }
              setShowModal(false);
              setAddFoodData({
                foodImgUrl: '',
                foodName: '',
                foodPrice: '',
                isAvailable: true,
              });
              setIsUpdating(null);
            }}>
            <Text style={{textAlign: 'center', color: 'white'}}>
              {isUpdating ? 'Update Food' : 'Add Food'}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0f0f0f',
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  innerContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  secHeading: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  addFloatBtn: {
    position: 'absolute',
    bottom: 20,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 999,
    height: 42,
    width: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addFloatBtnTxt: {
    fontSize: 20,
    color: '#0f0f0f',
  },
  modalContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addFoodFormContainer: {
    backgroundColor: 'white',
    borderColor: 'white',
    borderRadius: 12,
    width: '80%',
    borderWidth: 1,
    padding: 10,
    margin: 'auto',
  },
  input: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 8,
  },
  inputChkBox: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    gap: 12,
  },
  closeButton: {
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    borderRadius: 999,
    alignSelf: 'flex-end',
  },
  closeButtonTxt: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
  dataContainer: {
    backgroundColor: 'gray',
    padding: 8,
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 8,
  },
  buttonTxt: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
});
