import api from './index';

/**
 * Reservations API Service
 */
const reservationsService = {
  /**
   * Get all reservations (admin only)
   * @param {Object} params - Query parameters for filtering
   * @returns {Promise} Response from API with reservations data
   */
  getReservations: async (params = {}) => {
    try {
      const response = await api.get('/reservations', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao buscar reservas' };
    }
  },

  /**
   * Get user's reservations
   * @returns {Promise} Response from API with user's reservations
   */
  getMyReservations: async () => {
    try {
      const response = await api.get('/reservations/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao buscar suas reservas' };
    }
  },

  /**
   * Get reservation by ID
   * @param {String} id - Reservation ID
   * @returns {Promise} Response from API with reservation data
   */
  getReservationById: async (id) => {
    try {
      const response = await api.get(`/reservations/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao buscar reserva' };
    }
  },

  /**
   * Create a new reservation
   * @param {Object} reservationData - Reservation data
   * @returns {Promise} Response from API
   */
  createReservation: async (reservationData) => {
    try {
      const response = await api.post('/reservations', reservationData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao criar reserva' };
    }
  },

  /**
   * Update reservation status (admin only)
   * @param {String} id - Reservation ID
   * @param {Object} statusData - Status data with status field
   * @returns {Promise} Response from API
   */
  updateReservationStatus: async (id, statusData) => {
    try {
      const response = await api.put(`/reservations/${id}`, statusData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao atualizar status da reserva' };
    }
  },

  /**
   * Delete a reservation (admin only)
   * @param {String} id - Reservation ID
   * @returns {Promise} Response from API
   */
  deleteReservation: async (id) => {
    try {
      const response = await api.delete(`/reservations/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao excluir reserva' };
    }
  }
};

export default reservationsService;
