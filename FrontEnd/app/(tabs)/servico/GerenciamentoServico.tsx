import * as React from 'react';
import { Provider as PaperProvider, DataTable, TextInput, Modal, Portal, IconButton, Button, Text, Menu, Icon } from 'react-native-paper';
import { SafeAreaView, StyleSheet, View, Image, ScrollView, Alert } from 'react-native';
import { styles } from './styles/GerenciamentoServiçoStyles'; // Importando os estilos isolados

import axios from 'axios';
import API_URL from '../../../conf/api'; // ajuste o caminho conforme a pasta

const GerenciamentoServico = () => {
  const [visible, setVisible] = React.useState({
    addService: false,
    editService: false,
    deleteService: false,
  });

  const [currentService, setCurrentService] = React.useState<{ id?: string; tiposervico: string; valor: string } | null>(null);
  const [services, setServices] = React.useState<{ id?: string; tiposervico: string; valor: string }[]>([]);
  const [newService, setNewService] = React.useState<{ tiposervico: string; valor: string }>({ tiposervico: '', valor: '' });
  const [visibleMenu, setVisibleMenu] = React.useState(false);
  const [campo1, setCampo1] = React.useState('');
  const options = ['Tratamentos Faciais', 'Tratamentos Corporais', 'Tratamentos Capilares', 'Podologia', 'Bem-estar e Terapias Alternativas'];
  const [searchQuery, setSearchQuery] = React.useState(''); // Estado para armazenar a pesquisa


  // Filtra os usuários com base na pesquisa
  const filteredServices = services.filter(services => {
    const query = searchQuery.toLowerCase();
    return (

      services.tiposervico.toLowerCase().includes(query) ||
      services.valor.toString().includes(query) // Converte tipoUsuario para string para comparação
    );
  });
  
  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API_URL}/servicos`);
      setServices(response.data);
    } catch (error) {
      console.error('Erro ao buscar serviços:', (error as Error).message);
    }
  };

  const addService = async () => {
    // Validação de campos obrigatórios
        if (!newService.tiposervico || !newService.valor) {
         Alert.alert(
                 "Campos Obrigatórios",
                 "Por favor, preencha todos os campos obrigatórios: tipo de serviço e valor.",
                 [{ text: "OK" }]
               );
          return; // Interrompe a execução da função se a validação falhar
        }
    try {
      await axios.post(`${API_URL}/servico/inserir`, newService);
      setNewService({ tiposervico: '', valor: '' });
      hideModal('addService');
      fetchServices();
      Alert.alert(
        "Serviço Adicionado",
        "O serviço foi adicionado com sucesso.",
        [{ text: "OK" }]
      );
    } catch (error) {
      console.error('Erro ao adicionar serviço:', (error as Error).message);
    }
  };

  const updateService = async () => {
    if (currentService?.id) {
      // Validação de campos obrigatórios
            if (!currentService.tiposervico || !currentService.valor) {
              Alert.alert(
                "Campos Obrigatorios",
                "Por favor, preencha todos os campos obrigatórios: nome, senha, email e tipo usuario.",
                 [{ text: "OK" }]
              );        
              return; // Interrompe a execução da função se a validação falhar
            }
      try {
        await axios.put(`${API_URL}/servico/atualizar/${currentService.id}`, currentService);
        setCurrentService(null);
        hideModal('editService');
        fetchServices();
        Alert.alert(
          "Serviço Atualizado",
          "O serviço foi atualizado com sucesso.",
          [{ text: "OK" }]
        );
      } catch (error) {
        console.error('Erro ao atualizar serviço:', (error as Error).message);
      }
    }
  };

  const deleteService = async () => {
    if (currentService?.id) {
      try {
        await axios.delete(`${API_URL}/servico/deletar/${currentService.id}`);
        setCurrentService(null);
        hideModal('deleteService');
        fetchServices();
         Alert.alert(
                  "Serviço Excluido",
                  "O serviço foi excluido com sucesso.",
                  [{ text: "OK" }]
                );
      } catch (error) {
        console.error('Erro ao deletar serviço:', (error as Error).message);
      }
    }
  };

  React.useEffect(() => {
    fetchServices();
  }, []);

  const showModal = (type: 'addService' | 'editService' | 'deleteService') => {
    setVisible({ ...visible, [type]: true });
  };

  const hideModal = (type: 'addService' | 'editService' | 'deleteService') => {
    setVisible({ ...visible, [type]: false });
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <Image
          source={require('../../../assets/images/Elysium.png')}
          style={styles.image}
        />
        <Button
          icon="plus"
          mode="contained"
          onPress={() => showModal('addService')}
          textColor="white"
          buttonColor="#A67B5B"
          contentStyle={{ flexDirection: 'row', alignItems: 'center' }}
          labelStyle={{ marginLeft: 12 }}
        >
          Adicionar Serviço
        </Button>

        {/* Campo de pesquisa */}
        <TextInput
          label="Pesquisar"
          mode="outlined"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
          style={styles.searchInput}
        />
        {/* Título da Tabela com fundo e borda */}
        <View style={styles.titleContainer}>
          <Text style={styles.tableTitle}>Lista de Serviços</Text>
        </View>
       <ScrollView horizontal style={styles.scrollContainer}>
  <ScrollView style={styles.verticalScroll}>
    <DataTable style={styles.dataTable}>
      <DataTable.Header style={styles.tableHeader}>
        <DataTable.Title style={styles.columnHeader}>
          <Text style={styles.columnHeaderText}>Tipo de Serviço</Text>
        </DataTable.Title>
        <DataTable.Title style={styles.columnHeader}>
          <Text style={styles.columnHeaderText}>Valor</Text>
        </DataTable.Title>
        <DataTable.Title style={styles.columnHeader}>
          <Text style={styles.columnHeaderText}>Ações</Text>
        </DataTable.Title>
      </DataTable.Header>

      {filteredServices.length > 0 ? (
        filteredServices.map((service, index) => (
          <DataTable.Row
            key={service.id}
            style={[
              index % 2 === 0
                ? styles.zebraRowEven
                : styles.zebraRowOdd
            ]}
          >
            <DataTable.Cell style={styles.columnCell}>
              <Text>{service.tiposervico}</Text>
            </DataTable.Cell>
            <DataTable.Cell style={styles.columnCell}>
              <Text>{service.valor}</Text>
            </DataTable.Cell>
            <DataTable.Cell style={styles.columnCell}>
              <IconButton
                icon="pencil"
                size={20}
                onPress={() => {
                  setCurrentService(service);
                  showModal('editService');
                }}
                iconColor="blue"
              />
              <IconButton
                icon="delete"
                size={20}
                onPress={() => {
                  setCurrentService(service);
                  showModal('deleteService');
                }}
                iconColor="red"
              />
            </DataTable.Cell>
          </DataTable.Row>
        ))
      ) : (
        <DataTable.Row>
          <DataTable.Cell>
            <Text>Nenhum serviço encontrado</Text>
          </DataTable.Cell>
        </DataTable.Row>
      )}
    </DataTable>
  </ScrollView>
</ScrollView>


        {/* Contador abaixo da tabela */}
        <Text style={styles.counterText}>
          Total de serviços: {Array.isArray(filteredServices) ? filteredServices.length : 0}
        </Text>

        {/* Modais para Serviços */}
        <Portal>
          <Modal visible={visible.addService} onDismiss={() => hideModal('addService')} contentContainerStyle={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Adicionar Serviço</Text>
            </View>
            <View style={styles.modalContent}>

              <Menu
                visible={visibleMenu}
                onDismiss={() => setVisibleMenu(false)}
                anchor={
                  <Button
                    mode="contained"
                    onPress={() => setVisibleMenu(true)}
                    style={[styles.menuButton, { width: '100%' }]} // Ajustando a largura para 100%
                    contentStyle={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} // Alinha o conteúdo
                  >
                    <Text style={{ color: 'black' }}>{campo1 || 'Escolha o Tipo de Serviço'}</Text>
                    <IconButton
                      icon="chevron-down" // Aqui usamos "chevron-down" como ícone
                      size={20}
                    />
                  </Button>
                }
              >
                {options.map((option, index) => (
                  <Menu.Item
                    key={index}
                    onPress={() => {
                      setCampo1(option);
                      setNewService(prev => ({ ...prev, tiposervico: option }));
                      setVisibleMenu(false);
                    }}
                    titleStyle={{ color: 'black' }}
                    title={option}
                  />
                ))}
              </Menu>

              <TextInput
                label="Valor"
                mode="outlined"
                value={newService.valor}
                onChangeText={text => setNewService(prev => ({ ...prev, valor: text }))}
                style={[styles.gridItem, styles.inputField, { width: 200 }]} // Ajustando largura para 340px
                theme={{ colors: { primary: '#000' } }}
                textAlign="center"
                placeholder="Insira o valor"
                placeholderTextColor="#888"
              />
            </View>
            <View style={styles.modalFooter}>
              <Button mode="contained" onPress={addService}
                style={styles.agendamentoButton}
              >Adicionar</Button>
            </View>
          </Modal>
        </Portal>

        <Portal>
          <Modal visible={visible.editService} onDismiss={() => hideModal('editService')} contentContainerStyle={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Editar Serviço</Text>
            </View>
            <View style={styles.modalContent}>
              {/* Menu para selecionar o Tipo de Serviço */}

              <Menu
                visible={visibleMenu}
                onDismiss={() => setVisibleMenu(false)}
                anchor={
                  <Button
                    mode="contained"
                    onPress={() => setVisibleMenu(true)}
                    style={[styles.menuButton, { width: '100%' }]} // Ajustando a largura para 100%
                    contentStyle={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} // Alinha o conteúdo
                  >
                    <Text style={{ color: 'black' }}>{currentService?.tiposervico || 'Escolha o Tipo de Serviço'}</Text>
                    <IconButton
                      icon="chevron-down" // Usando "chevron-down" como ícone
                      size={20}
                    />
                  </Button>
                }
              >
                {options.map((option, index) => (
                  <Menu.Item
                    key={index}
                    onPress={() => {
                      setCurrentService(prev => prev ? { ...prev, tiposervico: option } : null);
                      setVisibleMenu(false);
                    }}
                    titleStyle={{ color: 'black' }}
                    title={option}
                  />
                ))}
              </Menu>

              <TextInput
                label="Valor"
                mode="outlined"
                value={currentService?.valor || ''}
                onChangeText={text => setCurrentService(prev => prev ? { ...prev, valor: text } : null)}
                style={[styles.gridItem, styles.inputField, { width: 200 }]}
              />
            </View>
            <View style={styles.modalFooter}>
              <Button mode="contained" onPress={updateService}
                style={styles.agendamentoButton}
              >Atualizar</Button>
            </View>
          </Modal>
        </Portal>

        <Portal>
          <Modal visible={visible.deleteService} onDismiss={() => hideModal('deleteService')} contentContainerStyle={styles.modal}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Deletar Serviço</Text>
              </View>
              <Text style={styles.modalText}>
                Você tem certeza que deseja deletar o serviço <Text style={styles.bold}>{currentService?.tiposervico}</Text>?
              </Text>
              <View style={styles.modalFooter}>
                <Button mode="contained" onPress={deleteService} style={styles.deleteButton}>Deletar</Button>
              </View>
            </View>
          </Modal>
        </Portal>

      </SafeAreaView>
    </PaperProvider>
  );
};



export default GerenciamentoServico;
