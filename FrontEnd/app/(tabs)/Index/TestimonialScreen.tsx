import React, { useState } from 'react';
import {
  View, Text, Image, StyleSheet, ScrollView, Modal, TextInput,
  TouchableOpacity, KeyboardAvoidingView, Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Testimonial {
  image: any;
  comment: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    image: require('../../../assets/images/Perfil1.png'),
    comment: 'Excelente atendimento na oficina! Meu carro passou por um reparo completo e saiu perfeito. Recomendo!',
    name: 'João Silva',
    role: 'Cliente Satisfeito',
  },
  {
    image: require('../../../assets/images/Perfil2.png'),
    comment: 'Serviço de qualidade com técnicos muito competentes. Meu carro nunca esteve melhor!',
    name: 'Maria Oliveira',
    role: 'Cliente Fiel',
  },
  {
    image: require('../../../assets/images/Perfil3.png'),
    comment: 'Pintura profissional e acabamento impecável! Ficou como novo. Muito satisfeito!',
    name: 'Carlos Santos',
    role: 'Cliente Satisfeito',
  },
  {
    image: require('../../../assets/images/Perfil4.png'),
    comment: 'Profissionalismo de primeira qualidade. Diagnóstico preciso e preço justo. Voltarei com certeza!',
    name: 'Ana Costa',
    role: 'Cliente Satisfeita',
  },
  {
    image: require('../../../assets/images/Perfil5.png'),
    comment: 'Manutenção preventiva excelente! Equipe atenciosa e cordial. Melhor oficina da região!',
    name: 'Pedro Mendes',
    role: 'Cliente Satisfeito',
  },
];

const TestimonialScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [testimonialsData, setTestimonialsData] = useState(testimonials);

  const addTestimonial = () => {
    if (newName && newComment) {
      const newTestimonial: Testimonial = {
        image: require('../../../assets/images/Perfil1.png'),
        comment: newComment,
        name: newName,
        role: 'Novo Cliente',
      };
      setTestimonialsData([...testimonialsData, newTestimonial]);
      setModalVisible(false);
      setNewName('');
      setNewComment('');
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e', '#0f3460']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.testimonialList}>
        {testimonialsData.map((item, index) => (
          <View key={index} style={styles.testimonialItem}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.quoteIcon}>“</Text>
            <Text style={styles.comment}>{item.comment}</Text>
            <View style={styles.intro}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.role}>{item.role}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Adicionar Depoimento</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Compartilhar sua experiência</Text>

            <TextInput
              style={styles.input}
              placeholder="Seu nome"
              placeholderTextColor="#aaa"
              value={newName}
              onChangeText={setNewName}
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Seu depoimento"
              placeholderTextColor="#aaa"
              value={newComment}
              onChangeText={setNewComment}
              multiline
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.confirmButton} onPress={addTestimonial}>
                <Text style={styles.buttonText}>Adicionar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  testimonialList: {
    padding: 16,
    paddingBottom: 20,
    alignItems: 'center',
  },
  testimonialItem: {
    backgroundColor: 'rgba(54, 23, 61, 0.8)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    width: '95%',
    maxWidth: 360,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(254, 180, 123, 0.3)',
  },
  image: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#FEB47B',
  },
  quoteIcon: {
    fontSize: 40,
    color: '#FEB47B',
    position: 'absolute',
    top: 10,
    left: 20,
  },
  comment: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginVertical: 10,
    lineHeight: 22,
  },
  intro: {
    marginTop: 10,
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FEB47B',
  },
  role: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  addButton: {
    backgroundColor: '#36173d',
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 40,
    marginVertical: 60,
    alignItems: 'center',
    elevation: 4,
    borderWidth: 1,
    borderColor: '#FEB47B',
  },
  addButtonText: {
    color: '#FEB47B',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'rgba(54, 23, 61, 0.95)',
    borderRadius: 16,
    padding: 25,
    borderWidth: 1,
    borderColor: '#FEB47B',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FEB47B',
    textAlign: 'center',
    marginBottom: 15,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: '#FEB47B',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
    fontSize: 14,
    color: 'white',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#36173d',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FEB47B',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FEB47B',
  },
  buttonText: {
    color: '#FEB47B',
    fontWeight: '600',
  },
});

export default TestimonialScreen;
