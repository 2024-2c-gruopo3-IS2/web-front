// handlers/profileHandler.js

import { getToken } from './AuthHandler';

const API_URL = 'https://profile-microservice.onrender.com';

/**
 * Verifica la disponibilidad de un nombre de usuario.
 * @param {string} username Nombre de usuario a verificar.
 * @returns {Promise<boolean>} `true` si está disponible, `false` si ya existe.
 */
export async function checkUsernameAvailability(username) {
    try {
        const user_url = `${API_URL}/by-username?username=${encodeURIComponent(username)}`;
        const token = await getToken();

        const response = await fetch(user_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.status === 404) {
            console.log('Nombre de usuario disponible:', username);
            return true;
        } else if (response.status === 200) {
            console.log('Nombre de usuario no disponible:', username);
            return false;
        } else {
            console.log('Error al verificar disponibilidad:', await response.text());
            return false;
        }
    } catch (error) {
        console.error(error);
        return false; // Asumimos que no está disponible en caso de error
    }
}

/**
 * Crea un nuevo perfil de usuario.
 * @param {Object} profileData Datos del perfil a crear.
 * @returns {Promise<Object>} Resultado de la operación.
 */
export async function createProfile(profileData) {
    const token = getToken();
    const create_profile_url = `${API_URL}/profiles/`;

    try {
        const response = await fetch(create_profile_url, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'token': `${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData),
            mode: 'no-cors',
        });

        const data = await response.json();
        if (response.ok) {
            console.log('Perfil creado:', data);
            return { success: true };
        } else {
            console.log('Error al crear el perfil:', data);
            return { success: false, message: data.detail || 'Error al crear el perfil.' };
        }
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error al conectar con el servidor.' };
    }
}

/**
 * Obtiene el perfil del usuario autenticado.
 * @returns {Promise<Object>} Perfil del usuario.
 */
export async function getProfile() {
    const token = await getToken();
    const users_url = `${API_URL}/profiles/`;

    try {
        const response = await fetch(users_url, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'token': `${token}`,
            },
        });

        const data = await response.json();
        if (response.ok) {
            console.log('Perfil encontrado:', data);
            return { success: true, profile: data };
        } else {
            console.log('Error al obtener el perfil:', data);
            return { success: false, message: data.detail || 'Error al obtener el perfil.' };
        }
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error al conectar con el servidor.' };
    }
}

/**
 * Actualiza el perfil del usuario.
 * @param {Object} profileData Datos del perfil a actualizar.
 * @returns {Promise<Object>} Resultado de la operación.
 */
export async function updateProfile(profileData) {
    const token = await getToken();
    const update_profile_url = `${API_URL}/profiles/`;

    try {
        const response = await fetch(update_profile_url, {
            method: 'PUT',
            headers: {
                'accept': 'application/json',
                'token': `${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData)
        });

        const data = await response.json();
        if (response.ok) {
            console.log('Perfil actualizado:', data);
            return { success: true };
        } else {
            console.log('Error al actualizar el perfil:', data);
            return { success: false, message: data.detail || 'Error al actualizar el perfil.' };
        }
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error al conectar con el servidor.' };
    }
}

/**
 * Obtiene el perfil de un usuario específico por su nombre de usuario.
 * @param {string} username Nombre de usuario del perfil a obtener.
 * @returns {Promise<Object>} Perfil del usuario.
 */
export async function getUserProfile(username) {
    const user_url = `${API_URL}/profiles/by-username?username=${encodeURIComponent(username)}`;
    const token = await getToken();

    try {
        const response = await fetch(user_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        if (response.ok) {
            console.log('Usuario encontrado:', data);
            return { success: true, profile: data };
        } else {
            console.log('Error al obtener usuario:', data);
            return { success: false, message: data.detail || 'Error al obtener usuario.' };
        }
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error al conectar con el servidor.' };
    }
}

/**
 * Obtiene la lista de todos los nombres de usuario.
 * @returns {Promise<Object>} Una lista de usuarios.
 */
export async function getAllUsers() {
    const token = await getToken();
    if (!token) {
        console.error('Token de autenticación no encontrado.');
        return { success: false, message: 'Token de autenticación no encontrado.' };
    }
    const users_url = `${API_URL}/profiles/all-usernames/`;

    try {
        const response = await fetch(users_url, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
            },
        });

        const data = await response.json();
        if (response.ok) {
            console.log('Usuarios encontrados:', data);
            return { success: true, users: data };
        } else {
            console.log('Error al obtener usuarios:', data);
            return { success: false, message: data.detail || 'Error al obtener usuarios.' };
        }
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error al conectar con el servidor.' };
    }
}
