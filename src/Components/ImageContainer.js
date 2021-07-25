import React from 'react'
import ModalImage from "react-modal-image";
const ImageContainer = (props) => {

    const handleModel = () => {

    }

    let src = 'https://farm' + props.photo.farm + '.staticflickr.com/' + props.photo.server + '/' + props.photo.id + '_' + props.photo.secret + '.jpg';
    return (
        <div >
            {/* <img src={src} alt={props.photo.id} /> */}
            <ModalImage
                small={src}
                large={src}
                alt={props.photo.id}
            />;
        </div>
    )

}

export default ImageContainer