import React from 'react';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import "./topbar.css";
import { currentimage, status } from '../../store';
import {useRecoilState, useRecoilValue} from "recoil";
import {READY,GAMING,END} from "../../models/status";


export const Topbar = () => {

    const [selectedimage, setselectedimage] = useRecoilState(currentimage);
    const [gamestatus, setgamestatus] = useRecoilState(status);

    const reset = () => {
          setgamestatus(GAMING);
          setselectedimage({
            label: "apple",
            path: "apple.jpeg",
          });
          console.log("gaming!");
    }

    return (
    <div className = "topbar">
        <Button className = "back" onClick = {() => reset()}>
        <Link to = "/imageselection"  style={{ color: 'inherit', textDecoration: 'inherit'}}> 
            <img  src = {"../UI/back.png"}  width="60px" height="30px"/>
        </Link>
        </Button>
        <Button className = "home" onClick = {() => reset()}>
        <Link to = "/"  style={{ color: 'inherit', textDecoration: 'inherit'}}> 
            <img src = {"../UI/home.png"} width = "60px" height = "45px"/>
        </Link>
        </Button>
        <Button className = "volumn" onClick = {() => reset()}>
       <img  src = {"../UI/volumn.png"} width = "60px" height = "40px"/>
         </Button>
    </div>
    );
}