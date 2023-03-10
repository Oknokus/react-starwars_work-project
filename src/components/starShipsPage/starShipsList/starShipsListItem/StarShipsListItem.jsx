import { useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import starShipsImg from "./imgStarShips/starShipsImg.png";


import styles from './StarShipsListItem.module.css';


const StarShipsListItem = ({ starShip }) => {
    const {
        name, 
        id,
        img } = starShip;

    const imgRef = useRef(null);

    const handleClick = () => {
        imgRef.current.src = starShipsImg;
    }
    
    return (
        <li className={ styles.list__item } key={ id }>
            <Link to={ `/starships/${ id }` }>
            <img ref={ imgRef } onError={ handleClick } className={ styles.person__photo } src={ img } alt={ name } />
            <p>Name: { name }</p>          
            </Link>            
        </li>       
    )
}

StarShipsListItem.propTypes = {
    starShip: PropTypes.object
};

export default StarShipsListItem;