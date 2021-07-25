import config from '../../config';
import axios from 'axios'
export const getRecent = async () => {
    return await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${config.FLICKER_API}&format=json&nojsoncallback=1`)
}

export const getSearchPhoto = async (searchWord) => {
    console.log('Inside the api')
    return await axios.get(` https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${config.FLICKER_API}&text=${searchWord}&format=json&nojsoncallback=1`)

}