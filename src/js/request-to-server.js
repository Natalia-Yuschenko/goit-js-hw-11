import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api';
const MY_KEY = 'key=27501018-280f7326145f69a8502ff1e13';

export async function requestToServer(value, page) {
  return await axios(
    `?${MY_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`,
  );
}