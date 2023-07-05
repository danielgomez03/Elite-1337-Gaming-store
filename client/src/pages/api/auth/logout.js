export default async function signoutHandler(req, res) {
    try {
      // Realizar la solicitud al backend para cerrar sesión
      const response = await axios.post('http://localhost:3001/login/signout', null, {
        headers: {
          Authorization: `Bearer ${req.headers.authorization}`, // Pasar cualquier token de autenticación necesario
        },
      });
  
      // Verificar la respuesta del backend para asegurarse de que se cerró la sesión correctamente
      if (response.status === 200) {
        // Enviar una respuesta exitosa al cliente
        return res.status(200).json({ message: 'Sesión cerrada exitosamente' });
      } else {
        // Enviar una respuesta de error al cliente
        return res.status(500).json({ error: 'Error al cerrar la sesión' });
      }
    } catch (error) {
      // En caso de error, enviar una respuesta de error al cliente
      return res.status(500).json({ error: 'Error al cerrar la sesión' });
    }
  }
  