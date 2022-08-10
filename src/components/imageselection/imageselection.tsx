import React from 'react';
import "./imageselection.css";
import Images from "../../database/images.json";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { currentimage } from '../../store';
import {useRecoilState, useRecoilValue} from "recoil";

const Imageselection = () => {

    const [pickedimage, setpickedimage] = useRecoilState(currentimage);

    const chooseimage = (value: any) => {
        setpickedimage({ label: value.lable, path: value.path});

    }
 

     return (
       <div className = "image-selection">
        <div className = "box">
        <img className = "space" src = {"../UI/drachenhappy.png"} height = "200px" width = "200px"/>
           {Images.map((value, index) => {
               return(
            <Button id = {index.toString()} onClick = {() => chooseimage(value)}>
                 <Link to = "/game"  style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <img src = {"../images/"+value.path} height = "250px" width = "250px"/>
                 </Link>
            </Button>) }
               )
           }
           </div>
       </div>
     )
};

export default Imageselection;