import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const developmentURL = "https://jobs-tracker-7o5a.onrender.com/api/v1"

axios.defaults.baseURL = developmentURL;

axios.interceptors.request.use(async function (req) {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        req.headers.authorization = `Bearer ${token}`;
        return req;
    }
  return req;
});