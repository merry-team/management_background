import axios from 'axios';

const merryAgent = axios.create({
  baseURL: 'https://bestluci.com'
});

export default merryAgent;