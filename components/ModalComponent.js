import React from 'react';
import { Modal, View, Text, Button, StyleSheet, Alert } from 'react-native';

export default function ModalComponent({ setFunc, setModalVisible, modalVisible, setSuccessMessage }) {

    
    // Função para lidar com a resposta "Sim"
    const handleYes = () => {
        console.log("olá")
        setFunc(); // Chama a função passada como prop
        setModalVisible(false); // Fecha o modal após a resposta
    };

    // Função para lidar com a resposta "Não"
    const handleNo = () => {
        Alert.alert("Você escolheu Não!");
        setModalVisible(false); // Fecha o modal após a resposta
    };

    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={modalVisible} // Visibilidade controlada pelo pai
            onRequestClose={() => setModalVisible(false)} // Fecha o modal quando pressionado o botão de voltar
        >
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Você tem certeza que deseja continuar?</Text>

                <View style={styles.modalButtons}>
                    <Button title='Sim' onPress={handleYes} />
                    <Button title='Não' onPress={handleNo} />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});
