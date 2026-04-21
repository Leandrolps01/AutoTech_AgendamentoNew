import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const AboutScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e', '#0f3460']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image 
            source={require('../../../assets/images/Elysium.png')} 
            style={styles.image} 
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Elysium Beautiful</Text>

          <View style={styles.infoContainer}>
            <Text style={styles.info}>Fundação: <Text style={styles.highlight}>2010</Text></Text>
            <Text style={styles.info}>Especialidade: <Text style={styles.highlight}>Estética e Bem-Estar</Text></Text>
            <Text style={styles.info}>Idiomas: <Text style={styles.highlight}>Português, Inglês</Text></Text>
            <Text style={styles.info}>Localização: <Text style={styles.highlight}>São Paulo, Brasil</Text></Text>
            <Text style={styles.info}>Disponibilidade: <Text style={styles.highlight}>De Segunda a Sábado</Text></Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Conheça Mais</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>14+</Text>
            <Text style={styles.statText}>Anos de Experiência</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>1000+</Text>
            <Text style={styles.statText}>Clientes Satisfeitos</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>2000+</Text>
            <Text style={styles.statText}>Procedimentos Realizados</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>50+</Text>
            <Text style={styles.statText}>Prêmios e Reconhecimentos</Text>
          </View>
        </View>

        {/* Modal de Saiba Mais */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Sobre a Elysium</Text>
              <Text style={styles.modalDescription}>
                Na Elysium, nos dedicamos a proporcionar tratamentos estéticos faciais e corporais de alta qualidade, focados no
                bem-estar e na beleza de nossos clientes. Com anos de experiência e uma equipe altamente qualificada, estamos aqui para
                oferecer um serviço excepcional e personalizado.
              </Text>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    width: '100%',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    borderRadius: 90,
    borderWidth: 2,
    borderColor: '#FEB47B',
  },
  content: {
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 15,
  },
  infoContainer: {
    marginBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 12,
    borderRadius: 10,
  },
  info: {
    fontSize: 14,
    color: 'white',
    marginBottom: 6,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#FEB47B',
  },
  button: {
    backgroundColor: '#36173d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FEB47B',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
  },
  statBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 12,
    margin: 6,
    borderRadius: 10,
    alignItems: 'center',
    width: '43%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FEB47B',
  },
  statText: {
    fontSize: 12,
    textAlign: 'center',
    color: 'white',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 12,
    alignItems: 'center',
    maxHeight: '80%',
    overflow: 'scroll',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#36173d',
    marginBottom: 12,
  },
  modalDescription: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
    lineHeight: 20,
  },
  modalButton: {
    backgroundColor: '#36173d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FEB47B',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default AboutScreen;
