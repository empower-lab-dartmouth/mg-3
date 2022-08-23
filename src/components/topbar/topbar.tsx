import React from 'react';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import "./topbar.css";
import {useRecoilState, useRecoilValue} from "recoil";
import {READY, CHOOSING, WHEEL, BOXES, ANSWER} from "../../model/status";
import {status, laststep} from "../../store";


export const Topbar = () => {

    const [gamestatus, setgamestatus] = useRecoilState(status);
    const [last, setlast] = useRecoilState(laststep);

    return (
    <div className = "topbar">
        <Button className = "back">
        <Link to = "/"  style={{ color: 'inherit', textDecoration: 'inherit'}} onClick = {() => setgamestatus(last)}> 
            <img  src = {"../UI/back.png"}  width="60px" height="30px"/>
        </Link>
        </Button>
        <Button className = "home" onClick = {() => setgamestatus(READY)}>
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