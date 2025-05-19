import { ExecException } from 'child_process';

const API_URL = 'http://localhost:3000/auth';

export const register = async(username, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { username, password });
        return response.data;
    } catch (error: unknown) {
        throw error.response.data;
    }
};