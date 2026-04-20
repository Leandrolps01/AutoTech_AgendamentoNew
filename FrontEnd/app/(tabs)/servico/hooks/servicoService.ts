import axios from 'axios';

const API_URL = 'http://10.0.2.2:3000';

interface Service {
  id?: number;
  tiposervico: string;
  valor: string;
}

const fetchServices = async () => {
  try {
    const response = await axios.get(`${API_URL}/servicos`);
    return response.data;
  } catch (error: unknown) {
    // Verificando se o erro é uma instância de Error
    if (error instanceof Error) {
      console.error('Erro ao buscar serviços:', error.message);
    } else {
      console.error('Erro desconhecido ao buscar serviços');
    }
    throw error;
  }
};

const addService = async (newService: Service) => {
  try {
    await axios.post(`${API_URL}/servico/inserir`, newService);
  } catch (error: unknown) {
    // Verificando se o erro é uma instância de Error
    if (error instanceof Error) {
      console.error('Erro ao adicionar serviço:', error.message);
    } else {
      console.error('Erro desconhecido ao adicionar serviço');
    }
    throw error;
  }
};

const updateService = async (currentService: Service) => {
  try {
    if (!currentService.id) {
      throw new Error('ID do serviço não encontrado');
    }
    await axios.put(`${API_URL}/servico/atualizar/${currentService.id}`, currentService);
  } catch (error: unknown) {
    // Verificando se o erro é uma instância de Error
    if (error instanceof Error) {
      console.error('Erro ao atualizar serviço:', error.message);
    } else {
      console.error('Erro desconhecido ao atualizar serviço');
    }
    throw error;
  }
};

const deleteService = async (serviceId: number) => {
  try {
    await axios.delete(`${API_URL}/servico/deletar/${serviceId}`);
  } catch (error: unknown) {
    // Verificando se o erro é uma instância de Error
    if (error instanceof Error) {
      console.error('Erro ao deletar serviço:', error.message);
    } else {
      console.error('Erro desconhecido ao deletar serviço');
    }
    throw error;
  }
};

export { fetchServices, addService, updateService, deleteService };
