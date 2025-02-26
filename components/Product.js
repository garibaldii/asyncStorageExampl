import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export default function Product({ onSaveData }) {
  const [quantity, setQuantity] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');

  const handleSave = () => {
    if (quantity && productName && price) {
      onSaveData(quantity, productName, price);
      clearFields();
    } else {
      Alert.alert('Error', 'Please fill in all fields.');
    }
  };

  const clearFields = () => {
    setQuantity('');
    setProductName('');
    setPrice('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Quantity:</Text>
        <TextInput
          value={quantity}
          onChangeText={setQuantity}
          style={[styles.input, { width: '25%' }]}
          maxLength={6}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Product:</Text>
        <TextInput
          value={productName}
          onChangeText={setProductName}
          style={styles.input}
          placeholder="Product Name"
          maxLength={20}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Price:</Text>
        <TextInputMask
          type={'money'}
          value={price}
          onChangeText={setPrice}
          style={styles.input}
          placeholder="Product Price"
          maxLength={10}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputRow}>
        <Button title="Clear" onPress={clearFields} />
        <Button title="Save" onPress={handleSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff3',
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: 25,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 10,
    width: '100%',
    justifyContent: 'flex-end',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc3',
    padding: 10,
    width: '80%',
    marginBottom: -10,
    marginLeft: 5,
    borderRadius: 5,
    marginTop: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  button: {
    marginTop: 20,
  },
});
