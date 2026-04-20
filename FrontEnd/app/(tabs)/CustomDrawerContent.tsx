import React, { useEffect, useState } from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Modal,
  TextInput,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDrawerStatus } from '@react-navigation/drawer';
import { IconButton } from 'react-native-paper';

interface UserData {
  email: string;
  userType: string;
  photo?: string;
}

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [nome, setNome] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [nomeEditado, setNomeEditado] = useState('');
  const [loading, setLoading] = useState(false); // 🔄 estado do loader

  const isDrawerOpen = useDrawerStatus();
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (isDrawerOpen === 'open') {
      (async () => {
        try {
          const [email, userType, photo, id, nomeCompleto] = await Promise.all([
            AsyncStorage.getItem('userEmail'),
            AsyncStorage.getItem('userType'),
            AsyncStorage.getItem('userPhoto'),
            AsyncStorage.getItem('userId'),
            AsyncStorage.getItem('nome'),
          ]);

          if (email && userType) {
            setUser({ email, userType, photo: photo || undefined });
          } else {
            setUser(null);
          }

          setUserId(id);
          const nomeValido = nomeCompleto?.trim();
          setNome(nomeValido && nomeValido !== '' ? nomeValido : null);
        } catch (e) {
          console.error('Erro ao carregar dados do usuário:', e);
        }
      })();
    }
  }, [isDrawerOpen]);

  useEffect(() => {
    if (!user) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [user]);

  const handleSalvarEdicao = async () => {
    try {
      await AsyncStorage.setItem('nome', nomeEditado);
      setNome(nomeEditado);
      setModalVisible(false);
    } catch (e) {
      console.error('Erro ao salvar nome:', e);
    }
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.header}>
        {user && (
          <IconButton
            icon="pencil"
            size={22}
            onPress={() => setModalVisible(true)}
            style={styles.topLeftIcon}
            accessibilityLabel="Editar nome"
          />
        )}

        {user ? (
          <>
            <View style={{ position: 'relative' }}>
              {loading && (
                <ActivityIndicator
                  size="small"
                  color="#000"
                  style={styles.loader}
                />
              )}
              <Image
                source={
                  user.photo
                    ? { uri: user.photo }
                    : require('../../assets/images/user-placeholder.png')
                }
                style={[styles.avatar, loading && { opacity: 0.3 }]}
                resizeMode="cover"
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
              />
            </View>
            <Text style={styles.name}>{nome ? nome : 'Nome não disponível'}</Text>
            <Text style={styles.info}>E-mail: {user.email}</Text>
            <Text style={styles.info}>Tipo de usuário: {user.userType}</Text>
            <Text style={styles.info}>ID do usuário: {userId ?? 'N/D'}</Text>
          </>
        ) : (
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={styles.loggedOutText}>❌ Usuário não logado</Text>
          </Animated.View>
        )}
      </View>

      <View style={{ flex: 1 }}>
        <DrawerItemList {...props} />
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              Editar Nome
            </Text>
            <TextInput
              value={nomeEditado}
              onChangeText={setNomeEditado}
              placeholder="Digite o novo nome"
              style={styles.input}
            />
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
              <Button title="Salvar" onPress={handleSalvarEdicao} />
              <Button
                title="Cancelar"
                color="gray"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: '#d2b48c',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
    backgroundColor: '#eee',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 14,
    color: '#444',
    marginTop: 2,
  },
  loggedOutText: {
    fontSize: 16,
    color: '#a00',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topLeftIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    padding: 0,
    margin: 0,
  },
  loader: {
    position: 'absolute',
    top: '30%',
    left: '40%',
    zIndex: 10,
  },
});
