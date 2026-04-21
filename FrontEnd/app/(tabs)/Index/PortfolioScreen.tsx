import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type FilterType = 'all' | 'web' | 'design' | 'photography';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
  };

  const portfolioItems = [
    { id: '1', imgSrc: require('../../../assets/images/p1.png'), category: 'web', title: 'Reparo de Motor', description: 'Restauração completa de motor com peças originais' },
    { id: '2', imgSrc: require('../../../assets/images/p2.png'), category: 'web', title: 'Pintura Completa', description: 'Repintura profissional com tinta automotiva' },
    { id: '3', imgSrc: require('../../../assets/images/p3.png'), category: 'design', title: 'Funilaria', description: 'Reparação e alinhamento de carroceria' },
    { id: '4', imgSrc: require('../../../assets/images/p4.png'), category: 'design', title: 'Reparo de Suspensão', description: 'Alinhamento e substituição de peças' },
    { id: '5', imgSrc: require('../../../assets/images/p5.png'), category: 'photography', title: 'Troca de Óleo', description: 'Manutenção preventiva completa' },
    { id: '6', imgSrc: require('../../../assets/images/p6.png'), category: 'photography', title: 'Diagnóstico Eletrônico', description: 'Varredura OBD e correção de falhas' },
  ];

  const filteredItems = portfolioItems.filter(
    (item) => activeFilter === 'all' || item.category === activeFilter
  );

  const openImageModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setIsModalVisible(true);
  };

  const closeImageModal = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e', '#0f3460']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Botões de Filtro com Scroll Horizontal */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'all' && styles.activeFilter]}
          onPress={() => handleFilterChange('all')}
        >
          <Text style={[styles.filterText, activeFilter === 'all' && styles.activeFilterText]}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'web' && styles.activeFilter]}
          onPress={() => handleFilterChange('web')}
        >
          <Text style={[styles.filterText, activeFilter === 'web' && styles.activeFilterText]}>Reparos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'design' && styles.activeFilter]}
          onPress={() => handleFilterChange('design')}
        >
          <Text style={[styles.filterText, activeFilter === 'design' && styles.activeFilterText]}>Pintura</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'photography' && styles.activeFilter]}
          onPress={() => handleFilterChange('photography')}
        >
          <Text style={[styles.filterText, activeFilter === 'photography' && styles.activeFilterText]}>Manutenção</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Grid de Cards */}
      <FlatList
        data={filteredItems}
        renderItem={({ item }) => (
          <View style={styles.portfolioItem}>
            <Image source={item.imgSrc} style={styles.image} />
            <View style={styles.content}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <TouchableOpacity style={styles.viewButton} onPress={() => openImageModal(item.imgSrc)}>
                <Text style={styles.viewButtonText}>Ampliar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
      />

      {/* Modal de Imagem Ampliada */}
      <Modal visible={isModalVisible} transparent animationType="fade" onRequestClose={closeImageModal}>
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalCloseButton} onPress={closeImageModal}>
            <Text style={styles.modalCloseText}>Fechar</Text>
          </TouchableOpacity>
          {selectedImage && (
            <Image
              source={typeof selectedImage === 'string' ? { uri: selectedImage } : selectedImage}
              style={styles.modalImage}
            />
          )}
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  filters: {
    flexDirection: 'row',
    marginBottom: 16,
    maxHeight: 45,
    paddingVertical: 4,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FEB47B',
    minWidth: 95,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeFilter: {
    backgroundColor: '#36173d',
    borderColor: '#FEB47B',
  },
  filterText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
  },
  activeFilterText: {
    color: '#FEB47B',
  },
  portfolioItem: {
    flex: 1,
    margin: 6,
    backgroundColor: 'rgba(54, 23, 61, 0.7)',
    borderRadius: 10,
    overflow: 'hidden',
    maxWidth: '31%',
    borderWidth: 1,
    borderColor: 'rgba(254, 180, 123, 0.3)',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    elevation: 4,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginHorizontal: 4,
  },
  image: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  content: {
    padding: 10,
    justifyContent: 'space-between',
    height: 160,
    backgroundColor: 'rgba(50, 20, 60, 0.8)',
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FEB47B',
  },
  description: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 16,
  },
  viewButton: {
    marginTop: 8,
    backgroundColor: '#36173d',
    paddingVertical: 6,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FEB47B',
  },
  viewButtonText: {
    color: '#FEB47B',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
  }, 
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    padding: 10,
    backgroundColor: '#36173d',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#FEB47B',
  },
  modalCloseText: {
    color: '#FEB47B',
    fontSize: 16,
    fontWeight: '600',
  },
  modalImage: {
    width: '90%',
    height: '80%',
    resizeMode: 'contain',
  },
});

export default Portfolio;
