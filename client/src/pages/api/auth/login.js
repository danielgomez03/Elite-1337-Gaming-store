import axios from 'axios';

export default async function loginHandler(req, res) {
  try {
    // Obtener los datos de las credenciales del cuerpo de la solicitud
    const { email, password } = req.body;

    // Realizar la solicitud al backend con los datos de las credenciales
    const response = await axios.post('http://localhost:3001/login/signin', {
        email,
      password,
    });

    console.log("login", response.data)

    // Obtener los datos del usuario desde la respuesta del backend
    const user = response.data;

    // Enviar los datos del usuario como respuesta al cliente
    return res.json(user);
  } catch (error) {
    // En caso de error, enviar una respuesta de error al cliente
    return res.status(500).json({ error: 'Error de inicio de sesión' });
  }
}
