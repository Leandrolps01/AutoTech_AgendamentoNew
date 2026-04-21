import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

// Importa suas telas filhas
import Login from '../usuario/Login';
import CadastroAtendimento from '../agendamento/CadastroAtendimento';
import GerenciamentoAgendamento from '../agendamento/GerenciamentoAgendamento';

interface ServiceItemProps {
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  title: string;
  description: string;
}

type ViewKey = 'services' | 'login' | 'cadastro' | 'gerenciamento' | null;

export default function ServicesScreen() {
  const [modalView, setModalView] = useState<ViewKey>(null);

  const handleAgendar = async () => {
    const userType = await AsyncStorage.getItem('userType');

    // Fecha o modal atual (caso esteja aberto)
    setModalView(null);

    // Aguarda 300ms para garantir que o modal anterior se feche
    setTimeout(() => {
      if (userType === '1') setModalView('cadastro');
      else if (userType === '0') setModalView('gerenciamento');
      else setModalView('login');
    }, 300);
  };

  const renderModalContent = () => {
    switch (modalView) {
      case 'login':
        return <Login />;
      case 'cadastro':
        return <CadastroAtendimento />;
      case 'gerenciamento':
        return <GerenciamentoAgendamento />;
      default:
        return null;
    }
  };

  return (
    <>
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460']}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.serviceContainer}>
          <View style={styles.serviceContainer}>
            <ServiceItem
              icon="wrench"
              title="Manutenção Preventiva"
              description="Inspecção completa do veículo, revisão de fluídos, limpeza de filtros, verificação de correia de distribuição e ajustes preventivos para manter seu carro em perfeitas condições."
            />
            <ServiceItem
              icon="hammer"
              title="Reparos Mecânicos"
              description="Reparo de motor, câmbio, suspensão, freios, embreagem e todos os sistemas mecânicos. Utilizamos peças de qualidade e técnicos especializados."
            />
            <ServiceItem
              icon="tint"
              title="Troca de Óleo e Filtros"
              description="Troca de óleo do motor, filtro de ar, filtro de combustível e filtro de cabine. Utilizamos óleos de qualidade superior para melhor desempenho."
            />
            <ServiceItem
              icon="sliders-h"
              title="Alinhamento e Balanceamento"
              description="Alinhamento de suspensão com equipamento de precisão, balanceamento de pneus e ajuste de camber, caster e toe para maior segurança."
            />
            <ServiceItem
              icon="microchip"
              title="Diagnóstico Eletrônico"
              description="Varredura completa do sistema OBD, diagnóstico de falhas de sensores, injeção eletrônica e sistemas de controle de motor com equipamento de última geração."
            />
            <ServiceItem
              icon="paint-brush"
              title="Pintura e Funilaria"
              description="Reparação de amassados, soldagem, preparação de superfícies e pintura com tinta automotiva de qualidade profissional com garantia de acabamento."
            />
          </View>          
        </ScrollView>
        
        <View style={styles.fixedButtonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleAgendar}>
              <Text style={styles.buttonText}>Agendar</Text>
            </TouchableOpacity>
          </View>
      </LinearGradient>

      <Modal
        visible={modalView !== null}
        animationType="slide"
        onRequestClose={() => setModalView(null)}
      >
        <View style={{ flex: 1 }}>
          {/* Botão de Voltar */}
          <TouchableOpacity
            style={{
              padding: 12,
              backgroundColor: '#36173d',
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => setModalView(null)}
          >
            <FontAwesome name="arrow-left" size={20} color="#FEB47B" />
            <Text style={{ color: '#FEB47B', marginLeft: 10, fontSize: 16 }}>Voltar</Text>
          </TouchableOpacity>

          {/* Conteúdo do Modal */}
          <View style={{ flex: 1 }}>{renderModalContent()}</View>
        </View>
      </Modal>

    </>
  );
}

// Componente ServiceItem separado, se precisar
export function ServiceItem({ icon, title, description }: ServiceItemProps) {
  return (
    <LinearGradient
      colors={['rgba(50, 20, 60, 0.9)', 'rgba(30, 15, 40, 0.95)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.serviceItem}
    >
      <FontAwesome name={icon} size={40} color="#FEB47B" style={styles.icon} />
      <Text style={styles.serviceTitle}>{title}</Text>
      <Text style={styles.serviceDescription}>{description}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  serviceContainer: {
    padding: 16,
    paddingBottom: 100,
    alignItems: 'center',
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#36173d',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#FEB47B',
  },
  buttonText: {
    color: '#FEB47B',
    fontWeight: 'bold',
    fontSize: 16,
  },
  serviceItem: {
    padding: 18,
    marginBottom: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 8,
    width: '90%',
    maxWidth: 340,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 4 },
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(254, 180, 123, 0.3)',
  },
  icon: {
    marginBottom: 15,
    backgroundColor: 'rgba(254, 180, 123, 0.2)',
    padding: 12,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#FEB47B',
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  serviceDescription: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 20,
  },
});
