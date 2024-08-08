import React, {createContext, useEffect, useState} from 'react';
import {database} from '../db/firebase.config';
import {ref, onValue, set, remove, update} from 'firebase/database';
import {ToastAndroid} from 'react-native';

export const AppContext = createContext();

const AppContextProvider = ({children}) => {
  const [foodItems, setFoodItems] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  const getData = () => {
    setDataLoading(true);
    const foodRef = ref(database, 'foodItems');
    onValue(foodRef, snapshot => {
      const data = snapshot.val();
      const items = data
        ? Object.keys(data).map(key => ({key, ...data[key]}))
        : [];
      setFoodItems(items);
      setDataLoading(false);
    });
  };

  function addData(data) {
    set(ref(database, `foodItems/${foodItems.length}`), data)
      .then(() => {
        ToastAndroid.show('Data saved successfully!', ToastAndroid.SHORT);
        getData();
        // console.log('Data saved successfully!');
      })
      .catch(error => {
        // console.error('Error saving data: ', error);
        ToastAndroid.show(
          'Error saving data! ' + error?.message,
          ToastAndroid.SHORT,
        );
      });
  }

  function deleteItem(itemKey) {
    const itemRef = ref(database, 'foodItems/' + itemKey);
    remove(itemRef)
      .then(() => {
        ToastAndroid.show('Item deleted successfully!', ToastAndroid.SHORT);
        // console.log('Item deleted successfully');
        getData(); // Refresh data after deletion
      })
      .catch(error => {
        ToastAndroid.show(
          'Error deleting item! ' + error?.message,
          ToastAndroid.SHORT,
        );
        // console.error('Error deleting item: ', error);
      });
  }

  function updateItem(itemKey, updatedData) {
    const itemRef = ref(database, 'foodItems/' + itemKey);
    update(itemRef, updatedData)
      .then(() => {
        ToastAndroid.show('Item updated successfully!', ToastAndroid.SHORT);
        // console.log('Item updated successfully');
        getData(); // Refresh data after update
      })
      .catch(error => {
        ToastAndroid.show(
          'Error updating item! ' + error?.message,
          ToastAndroid.SHORT,
        );
        // console.error('Error updating item: ', error);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <AppContext.Provider
      value={{foodItems, dataLoading, addData, deleteItem, updateItem}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
