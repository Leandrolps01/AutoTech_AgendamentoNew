import React from "react";
import { View, Text, TextInput, TouchableOpacity, Linking, ScrollView, StyleSheet, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// Componente reutilizável de fundo com degradê
interface GradientProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const BackgroundGradient: React.FC<GradientProps> = ({ children, style }) => (
  <LinearGradient
    colors={['#1a0033', '#2d0052', '#3d1570']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={[styles.gradient, style]}
  >
    {children}
  </LinearGradient>
);

// Tela de Contato
const ContactScreen = () => {
  return (
    <BackgroundGradient>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>
          <Text style={styles.brand}>Elysium Beauty</Text>
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fale conosco</Text>
          <Text style={styles.sectionText}>
            Entre em contato para mais informações sobre nossos serviços de estética e bem-estar.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Telefone:</Text>
          <Text style={styles.sectionText}>+123-456-789</Text>
          <Text style={styles.sectionText}>+111-222-333</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Email:</Text>
          <Text style={styles.sectionText}>info@elysiumbeauty.com</Text>
          <Text style={styles.sectionText}>appointments@elysiumbeauty.com</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Instagram:</Text>
          <Text
            style={styles.link}
            onPress={() => Linking.openURL("https://www.instagram.com/elysiumbeauty")}
          >
            instagram.com/elysiumbeauty
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Facebook:</Text>
          <Text
            style={styles.link}
            onPress={() => Linking.openURL("https://www.facebook.com/elysiumbeauty")}
          >
            facebook.com/elysiumbeauty
          </Text>
        </View>

        <TextInput style={styles.input} placeholder="Nome" placeholderTextColor="#555" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#555"
        />
        <TextInput style={styles.input} placeholder="Assunto" placeholderTextColor="#555" />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Mensagem"
          multiline
          placeholderTextColor="#555"
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Enviar mensagem</Text>
        </TouchableOpacity>
      </ScrollView>
    </BackgroundGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: 'white',
  },
  brand: {
    color: "#FEB47B",
  },
  section: {
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FEB47B",
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FEB47B",
  },
  sectionText: {
    fontSize: 14,
    color: "white",
    marginTop: 5,
  },
  link: {
    fontSize: 14,
    color: "#87CEEB",
    marginTop: 5,
    textDecorationLine: "underline",
  },
  input: {
    borderWidth: 1,
    borderColor: "#FEB47B",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 14,
    color: 'white',
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#36173d",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#FEB47B',
  },
  buttonText: {
    color: "#FEB47B",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ContactScreen;
