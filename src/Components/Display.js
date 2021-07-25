import React, { useState, useEffect , useCallback} from 'react'
import { getRecent, getSearchPhoto } from './apiService/api';
import ImageContainer from './ImageContainer'
import { debounce } from 'lodash';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import nextId from "react-id-generator";
import '../Components/Display.css'
const Display = () => {

    const [photos, setPhotos] = useState([]);
   // const [searchWord, setSearchWord] = useState('');
    const getPhotos = () => {
        getRecent()
            .then(response => setPhotos(
                [...response.data.photos.photo]
            ))
    }
    useEffect(() => {
        // console.log(getPhotos());
        getPhotos();
    }, []);

    const debouncedFn= useCallback(debounce((searchWord) => {

        let searchedValues = JSON.parse(localStorage.getItem('searched'));
        if(searchedValues){
            const id = nextId();
            localStorage.setItem('searched', JSON.stringify([...searchedValues, {id: id, name: searchWord}]))
        }
        else{
            const id = nextId();
            localStorage.setItem('searched', JSON.stringify([{id: id, name: searchWord}]))
        }

        getSearchPhoto(searchWord)
        .then(response => setPhotos(
            [...response.data.photos.photo]
        ))
     }, 500),[])

    const handleChange = (event) => {

		debouncedFn(event);
    }
   let items = [];
   if(localStorage.getItem('searched')){
    items = JSON.parse(localStorage.getItem('searched'))
   }
   console.log(items)
    // const items = [
    //     {
    //       id: 0,
    //       name: 'Cobol'
    //     },
    //     {
    //       id: 1,
    //       name: 'JavaScript'
    //     },
    //     {


      const handleOnSelect = (item) => {
        // the item selected
        debouncedFn(item.name);
      }
    //const callChange = handleChange();
    return (
        <>
            <div className='bg-dark header'>
                <h2 className='pt-4 pb-2 text-white'>Search Photos</h2>
                <div className= 'w-50 align-items-center'>
                <ReactSearchAutocomplete
            items={items}
            onSearch={handleChange}
            onSelect={handleOnSelect}
            autoFocus
            styling={{borderRadius: "5px",width: '50px'}}
          />
          </div>
                {/* <input type="search" className="w-50 p-1 rounded mb-2"
                    onChange={handleChange} /> */}

            </div>
            <div className='gridDisplay'>
                {photos.map(photo => {
                    return (<div key={photo.id} >
                        <ImageContainer photo={photo} />
                    </div>
                    )
                })}

            </div>
        </>
    )
}

export default Display