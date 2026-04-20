import React, { useState, useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, Text, Image, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const texts = [
  'Manutenção Preventiva',
  'Reparos Mecânicos',
  'Troca de Óleo e Filtros',
  'Alinhamento e Balanceamento',
  'Diagnóstico Eletrônico',
  'Pintura e Funilaria',
];

export default function HomeScreen() {
  const [index, setIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.delay(1500),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIndex((prevIndex) => (prevIndex + 1) % texts.length);
      });
    };

    animate();
  }, [index]);

  return (
    <ImageBackground
      source={require('../../assets/images/fundo01.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(30, 60, 114, 0.7)', 'rgba(42, 82, 152, 0.7)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.overlay}
      >
        <Image
          source={require('../../assets/images/Elysium.png')}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Bem-vindo à AutoTech!</Text>
          <Text style={styles.subtitle}>Especialistas em Manutenção Automotiva</Text>
          <LinearGradient
            colors={['#36173d', '#FEB47B']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientText}
          >
            <Animated.Text style={[styles.typingText, { opacity: fadeAnim }]}>
              {texts[index]}
            </Animated.Text>
          </LinearGradient>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: 'cover',
    marginBottom: 30,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 10,
    color: 'white',
  },
  gradientText: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  typingText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
});
