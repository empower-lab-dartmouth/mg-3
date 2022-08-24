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

    const back = () => {
        if(last.length == 0){
            console.log("triger")
            return;
        }
        var lastcopy = [...last ];
        var end = lastcopy[lastcopy.length-1];
        console.log(lastcopy);
        lastcopy.pop();
        setgamestatus(end);
        setlast(lastcopy);
    }

    return (
    <div className = "topbar">
        <Button className = "back" onClick = {() => back()}>
            <img  src = {"../UI/back.png"}  width="60px" height="30px"/>
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