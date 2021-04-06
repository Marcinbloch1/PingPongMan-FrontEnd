import React from 'react';
import {Link} from 'react-router-dom';
import './SubmitInput.css';

export function SubmitInput(props) {
    return (
        <Link to={props.link}>
            <input type='submit' className={props.className} value={props.value}/>
        </Link>
    );
}