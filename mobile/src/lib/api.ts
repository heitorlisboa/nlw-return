import Constants from 'expo-constants';
import axios from 'axios';

export const api = axios.create({
  baseURL: Constants.manifest?.extra?.API_URL || 'http://localhost:4000',
});
