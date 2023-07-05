import axios from 'axios';

export default async function getSessionHandler(req, res) {
    try {
      // Realizar la solicitud al backend para obtener la sesión
      const response = await axios.get('http://localhost:3001/login/session', {
        headers: {
          Authorization: `Bearer ${req.headers.authorization}`, // Pasar cualquier token de autenticación necesario
        },
      });
  
      // Obtener los datos de la sesión desde la respuesta del backend
      const session = response.data;
  
      // Enviar los datos de la sesión como respuesta al cliente
      return res.json(session);
    } catch (error) {
      // En caso de error, enviar una respuesta de error al cliente
      return res.status(500).json({ error: 'Error al obtener la sesión' });
    }
  }
  