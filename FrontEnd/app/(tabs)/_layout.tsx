import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import LoginScreen from '../(tabs)/usuario/Login';
import RegistroUser from '../(tabs)/usuario/RegistroUser';
import GerenciamentoServico from '../(tabs)/servico/GerenciamentoServico';
import HomeScreen from './index';
import AboutScreen from './Index/AboutScreen';
import ServiceScreen from './Index/ServiceScreen';
import PortfolioScreen from './Index/PortfolioScreen';
import TestimonialScreen from './Index/TestimonialScreen';
import BlogScreen from './Index/BlogScreen';
import ContactScreen from './Index/ContactScreen';
import { RouteProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import CadastroAtendimento from './agendamento/CadastroAtendimento';
import GerenciamentoUser from '../(tabs)/usuario/GerenciamentoUser';
import GerenciamentoAgendamentoUser from '../(tabs)/agendamento/GerenciamentoAgendamentoUser';
import GerenciamentoAgendamento from '../(tabs)/agendamento/GerenciamentoAgendamento';
import Relatorio from '../(tabs)/agendamento/Relatorio';
import AlterarSenhaScreen from '../(tabs)/usuario/AlterarSenha';
import RedefinirSenhaScreen from '../(tabs)/usuario/RedefinirSenha';
import { View, Text, Image, StyleSheet } from 'react-native';
import CustomDrawerContent from './CustomDrawerContent';
type ColorScheme = 'light' | 'dark';

const DrawerNavigator = createDrawerNavigator();
const TabNavigator = createBottomTabNavigator();
const Stack = createStackNavigator();

function Tabs() {
  const colorScheme = useColorScheme();

  return (
    <TabNavigator.Navigator
      initialRouteName="Home"
      screenOptions={({ route }: { route: RouteProp<any, any> }) => ({
        tabBarIcon: ({ color, size }: { color: string; size: number }) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              return <MaterialIcons name="home" size={size} color={color} />;
            case 'Sobre nos':
              iconName = 'info';
              return <MaterialIcons name="info" size={size} color={color} />;
            case 'Nossos serviços':
              return <FontAwesome5 name="tools" size={size} color={color} />;
            case 'Portfolio':
              return <MaterialIcons name="work" size={size} color={color} />;
            case 'Depoimentos':
              return <FontAwesome5 name="comments" size={size} color={color} />;
            case 'Noticias sobre nossos serviços':
              return <MaterialIcons name="article" size={size} color={color} />;
            case 'Contate -me':
              return <MaterialIcons name="contact-page" size={size} color={color} />;
            default:
              return <MaterialIcons name="home" size={size} color={color} />;
          }
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
        },
        headerBackground: () => (
          <LinearGradient
            colors={['#A67B5B', '#5C4033']}
            style={styles.headerGradient}
            start={[0, 0]}
            end={[1, 0]}
          />
        ),
        tabBarLabel: ({ focused, color }) => (
          <Text style={{ color, textAlign: 'center', fontSize: 12 }}>
            {route.name}
          </Text>
        ),
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          paddingBottom: 10,
        },
      })}
    >
      <TabNavigator.Screen name="Home" component={HomeScreen} options={{ title: 'Página Inicial' }} />
      <TabNavigator.Screen name="Sobre nos" component={AboutScreen} options={{ title: 'Sobre Nós' }} />
      <TabNavigator.Screen name="Nossos serviços" component={ServiceScreen} options={{ title: 'Nossos Serviços' }} />
      <TabNavigator.Screen name="Portfolio" component={PortfolioScreen} options={{ title: 'Portfólio' }} />
      <TabNavigator.Screen name="Depoimentos" component={TestimonialScreen} options={{ title: 'Depoimentos' }} />
      <TabNavigator.Screen name="Noticias sobre nossos serviços" component={BlogScreen} options={{ title: 'Notícias' }} />
      <TabNavigator.Screen name="Contate -me" component={ContactScreen} options={{ title: 'Contato' }} />
    </TabNavigator.Navigator>
  );
}

export default function DrawerLayout() {
  const colorScheme = useColorScheme() as ColorScheme;
  const [userType, setUserType] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [nome, setNome] = useState<string | null>(null);
  const [user, setUser] = useState<{ email: string; userType: string; photo?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail');
        const userTypeStored = await AsyncStorage.getItem('userType');
        const photo = await AsyncStorage.getItem('userPhoto');
        const id = await AsyncStorage.getItem('userId');
        const nomeCompleto = await AsyncStorage.getItem('nome');

        if (email && userTypeStored) {
          setUser({ email, userType: userTypeStored, photo: photo || undefined });
        }

        if (userTypeStored) {
          setUserType(userTypeStored);
        }

        if (id) {
          setUserId(id);
        }

        if (nomeCompleto) {
          setNome(nomeCompleto);
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      setUserType(null);
      setUserEmail(null);
      setUserPhoto(null);
      setUserId(null);
      setNome(null);
      setUser(null);
    } catch (error) {
      console.error('Erro ao remover dados do usuário:', error);
    }
  };

  const loadUserData = async () => {
    try {
      const [
        userTypeStored,
        emailStored,
        photoStored,
        userIdStored,
        nomeStored,
      ] = await Promise.all([
        AsyncStorage.getItem('userType'),
        AsyncStorage.getItem('userEmail'),
        AsyncStorage.getItem('userPhoto'),
        AsyncStorage.getItem('userId'),
        AsyncStorage.getItem('nome'),
      ]);

      setUserType(userTypeStored);
      setUserEmail(emailStored);
      setUserPhoto(photoStored);
      setUserId(userIdStored);
      setNome(nomeStored);

      if (emailStored && userTypeStored) {
        setUser({ email: emailStored, userType: userTypeStored, photo: photoStored || undefined });
      }
      setLoading(false);
    } catch (error) {
      console.error('Erro ao obter dados do AsyncStorage:', error);
      setLoading(false);
    }
  };

  return (
    <DrawerNavigator.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        drawerStyle: {
          backgroundColor: '#d2b48c',
          width: 240,
        },
        drawerActiveTintColor: Colors[colorScheme].tint,
        drawerInactiveTintColor: Colors[colorScheme].text,
        
        headerLeft: () => (
          <Pressable
            onPress={async () => {
              await loadUserData();
              navigation.toggleDrawer();
            }}
            style={{ marginLeft: 15 }}
          >
            <MaterialIcons name="menu" size={28} color={Colors[colorScheme ?? 'light'].tint} />
          </Pressable>
        ),
      })}
    >
      <DrawerNavigator.Screen
        name="Home"
        component={Tabs}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('../../assets/images/Elysium.png')}
                style={{
                  width: 40,
                  height: 40,
                  marginRight: 8,
                  borderRadius: 20,
                }}
                resizeMode="contain"
              />
              <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
                Elysium Beautiful
              </Text>
            </View>
          ),
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerBackground: () => (
            <LinearGradient
              colors={['#A67B5B', '#5C4033']}
              style={{ flex: 1 }}
              start={[0, 0]}
              end={[1, 0]}
            />
          ),
          drawerIcon: ({ color }) => (
            <MaterialIcons name="home" size={28} color={color} />
          ),
        }}
      />

      {userType !== '0' && userType !== '1' && (
        <>
          <DrawerNavigator.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: 'Login',
              headerBackground: () => (
                <LinearGradient
                  colors={['#A67B5B', '#5C4033']}
                  style={{ flex: 1 }}
                  start={[0, 0]}
                  end={[1, 0]}
                />
              ),
              headerTintColor: '#fff',
              drawerIcon: ({ color }) => (
                <MaterialIcons name="login" size={28} color={color} />
              ),
            }}
          />

          <DrawerNavigator.Screen
            name="RegistroUser"
            component={RegistroUser}
            options={{
              title: 'Cadastro de Usuário',
              headerBackground: () => (
                <LinearGradient
                  colors={['#A67B5B', '#5C4033']}
                  style={{ flex: 1 }}
                  start={[0, 0]}
                  end={[1, 0]}
                />
              ),
              headerTintColor: '#fff',
              drawerIcon: ({ color }) => (
                <MaterialIcons name="person-add" size={28} color={color} />
              ),
            }}
          />
        </>
      )}

      {userType === '0' && (
        <>
          <DrawerNavigator.Screen
            name="GerenciamentoUser"
            component={GerenciamentoUser}
            options={{
              title: 'Gerenciamento de Usuários',
              headerBackground: () => (
                <LinearGradient
                  colors={['#A67B5B', '#5C4033']}
                  style={{ flex: 1 }}
                  start={[0, 0]}
                  end={[1, 0]}
                />
              ),
              headerTintColor: '#fff',
              drawerIcon: ({ color }) => (
                <FontAwesome5 name="users-cog" size={28} color={color} />
              ),
            }}
          />
          <DrawerNavigator.Screen
            name="GerenciamentoAgendamento"
            component={GerenciamentoAgendamento}
            options={{
              title: 'Gerenciamento de Agendamento',
              headerBackground: () => (
                <LinearGradient
                  colors={['#A67B5B', '#5C4033']}
                  style={{ flex: 1 }}
                  start={[0, 0]}
                  end={[1, 0]}
                />
              ),
              headerTintColor: '#fff',
              drawerIcon: ({ color }) => (
                <MaterialCommunityIcons name="calendar-edit" size={28} color={color} />
              ),
            }}
          />

          <DrawerNavigator.Screen
            name="GerenciamentoServico"
            component={GerenciamentoServico}
            options={{
              title: 'Gerenciamento de Serviço',
              headerBackground: () => (
                <LinearGradient
                  colors={['#A67B5B', '#5C4033']}
                  style={{ flex: 1 }}
                  start={[0, 0]}
                  end={[1, 0]}
                />
              ),
              headerTintColor: '#fff',
              drawerIcon: ({ color }) => (
                <FontAwesome5 name="concierge-bell" size={28} color={color} />
              ),
            }}
          />
          <DrawerNavigator.Screen
            name="Relatorio"
            component={Relatorio}
            options={{
              title: 'Relatório',
              headerBackground: () => (
                <LinearGradient
                  colors={['#A67B5B', '#5C4033']}
                  style={{ flex: 1 }}
                  start={[0, 0]}
                  end={[1, 0]}
                />
              ),
              headerTintColor: '#fff',
              drawerIcon: ({ color }) => (
                <MaterialIcons name="analytics" size={28} color={color} />
              ),
            }}
          />
          <DrawerNavigator.Screen
            name="AlterarSenha"
            component={AlterarSenhaScreen}
            options={{
              title: 'Alterar Senha',
              headerBackground: () => (
                <LinearGradient
                  colors={['#A67B5B', '#5C4033']}
                  style={{ flex: 1 }}
                  start={[0, 0]}
                  end={[1, 0]}
                />
              ),
              headerTintColor: '#fff',
              drawerIcon: ({ color }) => (
                <MaterialIcons name="password" size={28} color={color} />
              ),
            }}
          />

          <DrawerNavigator.Screen
            name="RedefinirSenha"
            component={RedefinirSenhaScreen}
            options={{
              title: 'Redefinir Senha',
              headerBackground: () => (
                <LinearGradient
                  colors={['#A67B5B', '#5C4033']}
                  style={{ flex: 1 }}
                  start={[0, 0]}
                  end={[1, 0]}
                />
              ),
              headerTintColor: '#fff',
              drawerIcon: ({ color }) => (
                <MaterialIcons name="lock-reset" size={28} color={color} />
              ),
            }}
          />
          <DrawerNavigator.Screen
            name="Sair"
            options={{
              title: 'Sair',
              drawerIcon: ({ color }) => (
                <MaterialIcons name="logout" size={28} color={color} />
              ),
            }}
            component={() => null}
            listeners={({ navigation }) => ({
              focus: () => {
                handleLogout();
                navigation.closeDrawer();
              },
            })}
          />
        </>
      )}

      {userType === '1' && (
        <>
          <DrawerNavigator.Screen
            name="GerenciamentoAgendamentoUser"
            component={GerenciamentoAgendamentoUser}
            options={{
              title: 'Gerenciamento de Agendamento',
              headerBackground: () => (
                <LinearGradient
                  colors={['#A67B5B', '#5C4033']}
                  style={{ flex: 1 }}
                  start={[0, 0]}
                  end={[1, 0]}
                />
              ),
              headerTintColor: '#fff',
              drawerIcon: ({ color }) => (
                <MaterialCommunityIcons name="calendar-check" size={28} color={color} />
              ),
            }}
          />
          <DrawerNavigator.Screen
            name="CadastroAtendimento"
            component={CadastroAtendimento}
            options={{
              title: 'CadastroAtendimento',
              headerBackground: () => (
                <LinearGradient
                  colors={['#A67B5B', '#5C4033']}
                  style={{ flex: 1 }}
                  start={[0, 0]}
                  end={[1, 0]}
                />
              ),
              headerTintColor: '#fff',
              drawerIcon: ({ color }) => (
                <FontAwesome5 name="calendar-plus" size={28} color={color} />
              ),
            }}
          />
          <DrawerNavigator.Screen
            name="AlterarSenha"
            component={AlterarSenhaScreen}
            options={{
              title: 'Alterar Senha',
              headerBackground: () => (
                <LinearGradient
                  colors={['#A67B5B', '#5C4033']}
                  style={{ flex: 1 }}
                  start={[0, 0]}
                  end={[1, 0]}
                />
              ),
              headerTintColor: '#fff',
              drawerIcon: ({ color }) => (
                <MaterialIcons name="password" size={28} color={color} />
              ),
            }}
          />
          <DrawerNavigator.Screen
            name="RedefinirSenha"
            component={RedefinirSenhaScreen}
            options={{
              title: 'Redefinir Senha',
              headerBackground: () => (
                <LinearGradient
                  colors={['#A67B5B', '#5C4033']}
                  style={{ flex: 1 }}
                  start={[0, 0]}
                  end={[1, 0]}
                />
              ),
              headerTintColor: '#fff',
              drawerIcon: ({ color }) => (
                <MaterialIcons name="lock-reset" size={28} color={color} />
              ),
            }}
          />
          <DrawerNavigator.Screen
            name="Sair"
            options={{
              title: 'Sair',
              drawerIcon: ({ color }) => (
                <MaterialIcons name="logout" size={28} color={color} />
              ),
            }}
            listeners={{
              focus: () => {
                console.log('userType:', userType);
                handleLogout();
              },
            }}
            component={() => null}
          />
        </>
      )}
    </DrawerNavigator.Navigator>
  );
}

const styles = StyleSheet.create({
  headerGradient: {
    flex: 1,
  },
  headerTitleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  headerTitleText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});