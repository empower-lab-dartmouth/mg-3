import "./main.css";
import {Button} from '../../editor/button';
import { Link } from "react-router-dom";
import React from "react";
import Stack from "@mui/material/Stack";

const Main = () =>{
    return (
        <div className="main">
            <div className = "start-button">
            <Stack spacing = {15} direction = "column">
            <Button variant="contained">
                <Link to = "/imageselection"  style={{ color: 'inherit', textDecoration: 'inherit'}}>
                Fruit
                </Link>
            </Button>
            <Button variant="contained">
                <Link to = "/imageselection"  style={{ color: 'inherit', textDecoration: 'inherit'}}>
                Disney
                </Link>
            </Button>
            <Button variant="contained">
                <Link to = "/imageselection"  style={{ color: 'inherit', textDecoration: 'inherit'}}>
                Across the World
                </Link>
            </Button>
            </Stack>
            </div>
            <div className = "danny">
                <img src = {"../UI/drachen.png"} width = "210px" height = "200px"/>
            </div>
        </div>
    )
};
export default Main;