import React, { useState, useEffect } from 'react';
import { View, Alert, FlatList, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Product from './Product';
import ModalComponent from './ModalComponent';

export default function StorageComponent() {
  const [records, setRecords] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // Estado para o modal



  const fetchRecords = async () => {
    try {
      const storedRecords = await AsyncStorage.getItem('records');
      setRecords(storedRecords ? JSON.parse(storedRecords) : []);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const saveToAsyncStorage = async (quantity, productName, price) => {
    try {
      const record = { quantity, productName, price };
      const existingRecords = await AsyncStorage.getItem('records');
      const records = existingRecords ? JSON.parse(existingRecords) : [];
      records.push(record);
      await AsyncStorage.setItem('records', JSON.stringify(records));

      fetchRecords(); // Atualiza a lista de registros imediatamente
      Alert.alert('Success', 'Record saved successfully!');
    } catch (error) {
      console.error('Error saving to AsyncStorage:', error);
      Alert.alert('Error', 'An error occurred while saving data.');
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.removeItem('records'); // Remove todos os registros salvos
      setRecords([]); // Atualiza o estado para limpar a tela imediatamente
      Alert.alert('Success', 'All records have been deleted.');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
      Alert.alert('Error', 'An error occurred while clearing the records.');
    }
  };

  return (
    <View style={styles.container}>
      <Product onSaveData={saveToAsyncStorage} />
      <View style={styles.card}>
        <Text style={styles.title}>Saved Records:</Text>
        {records.length === 0 ? (
          <Text style={styles.noRecords}>No records found</Text>
        ) : (
          <FlatList
            data={records}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text>Quantity: {item.quantity}</Text>
                <Text>Product: {item.productName}</Text>
                <Text>Price: {item.price}</Text>
              </View>
            )}
          />
        )}
        <Button
          title="Clear All Records"
          onPress={() => records.length > 0 && setModalVisible(true)}
          color="red"
        />
        <ModalComponent
          setFunc={clearStorage} // Passa a função para limpar os campos
          setModalVisible={setModalVisible} // Controla a visibilidade do modal
          modalVisible={modalVisible}
          setSuccessMessage={`Dados Excluídos com sucesso!`}
        />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  card: {
    marginTop: 20,
    padding: 15,
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#f8f9fa',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  noRecords: {
    textAlign: 'center',
    color: 'gray',
  },
});
