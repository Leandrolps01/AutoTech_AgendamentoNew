import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#D2B48C',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 20,
    borderRadius: 50,
    alignSelf: 'center',
  },
  tableHeader: {
    backgroundColor: '#A67B5B', // Marrom mais escuro para o cabeçalho
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  columnHeader: {
    width: 200,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnHeaderText: {
    fontWeight: 'bold',
  },
  columnCell: {
    width: 200,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  modalContent: {
    alignItems: 'center',
  },
  modalHeader: {
    width: '100%',
    backgroundColor: '#D2B48C',
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  modalText: {
    marginVertical: 15,
    textAlign: 'center',
  },
  gridContainer: {
    width: '100%',
    gap: 10,
    marginTop: 10,
  },
  gridItem: {
    width: '100%',
  },
  modalFooter: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#D2B48C',
    paddingVertical: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    width: '100%',
  },
  bold: {
    fontWeight: 'bold',
  },
  menuButton: {
    width: 340, // Largura do botão
    marginBottom: 12, // Espaço entre o botão e o campo de valor
    marginTop: 12, // Espaço entre o botão e o campo de valor

    backgroundColor: 'white', // Cor de fundo do botão
    borderWidth: 1, // Espessura da borda
    borderColor: '#ccc', // Cor da borda (pode ser qualquer cor)
    borderRadius: 8,
    color: 'black' // Arredondamento dos cantos (opcional)
  },
  // Se necessário, adicione um fundo branco no menu para manter a consistência de estilo
  menuItem: {
    color: 'black', // Garante que os itens do menu sejam brancos
  },
  inputField: {
    borderRadius: 8, // Adiciona borderRadius semelhante ao "tiposervico"
    textAlign: 'center', // Centraliza o texto
    height: 50, // Ajuste opcional de altura, se necessário
  },
  searchInput: {
    marginVertical: 10, // Espaçamento vertical para o campo de pesquisa
    borderWidth: 1, // Largura da borda
    borderColor: '#ccc', // Cor da borda padrão
    borderRadius: 50, // Bordas arredondadas
    padding: 10, // Espaçamento interno
    backgroundColor: '#fff', // Cor de fundo
    elevation: 2, // Sombra para dar um efeito de elevação
    height: 20, // Defina a altura desejada
  },
  titleContainer: {
    backgroundColor: '#C19A6B', // Cor de fundo do título
    borderWidth: 1, // Largura da borda
    borderColor: '#A67B5B', // Cor da borda
    borderRadius: 5, // Bordas arredondadas
    padding: 10, // Espaçamento interno
    marginBottom: 10, // Espaçamento abaixo do título
  },
  tableTitle: {
    fontSize: 15, // Tamanho da fonte
    fontWeight: 'bold', // Negrito
    color: 'white', // Cor do texto
    textAlign: 'left', // Centraliza o texto
  },
  counterText: {
    marginTop: 10, // Espaçamento acima do contador
    fontSize: 16, // Tamanho da fonte
    fontWeight: 'bold', // Negrito
    textAlign: 'left', // Centraliza o texto
    color: 'white',
  },
  agendamentoButton: {
    backgroundColor: '#A67B5B', // Cor marrom (ou o tom que preferir)
  },
  dataTable: {
    minWidth: 600,
  },
  scrollContainer: {
    flexDirection: 'row',
    maxWidth: '100%',
  },
  verticalScroll: {
    maxHeight: 400,
  },
   zebraRowEven: {
    backgroundColor: '#f9f1e7', // Marrom bem clarinho
  },
  zebraRowOdd: {
    backgroundColor: '#fffaf3', // Outra variação de tom claro
  },
});
