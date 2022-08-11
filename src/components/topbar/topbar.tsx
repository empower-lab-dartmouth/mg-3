import React from 'react';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import "./topbar.css";
import {useRecoilState, useRecoilValue} from "recoil";


export const Topbar = () => {

    return (
    <div className = "topbar">
        <Button className = "back">
        <Link to = "/imageselection"  style={{ color: 'inherit', textDecoration: 'inherit'}}> 
            <img  src = {"../UI/back.png"}  width="60px" height="30px"/>
        </Link>
        </Button>
        <Button className = "home">
        <Link to = "/"  style={{ color: 'inherit', textDecoration: 'inherit'}}> 
            <img src = {"../UI/home.png"} width = "60px" height = "45px"/>
        </Link>
        </Button>
        <Button className = "volumn">
       <img  src = {"../UI/volumn.png"} width = "60px" height = "40px"/>
         </Button>
    </div>
    );
}