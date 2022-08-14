import "./main.css";
import "./index.jsx";
import "./styles.css";
import {Button} from '../../editor/button';
import {ButtonSmall} from '../../editor/button-small';
import { Link } from "react-router-dom";
import React from "react";
import Stack from "@mui/material/Stack";
import {status} from "../../store";
import {useRecoilState, useRecoilValue} from "recoil";
import {READY, CHOOSING, WHEEL, BOXES, ANSWER} from "../../model/status";

const Main = () =>{
    
    const [gamestatus, setgamestatus] = useRecoilState(status);

    return (
        <div className="main">
               { gamestatus == READY &&
               <div>
            <div className = "danny">
                <img src = {"../UI/drachenispy.png"} width = "210px" height = "250px"/>
            </div>
            <div className = "askbubble">
            <div className = "content">
                    <p className = "text">
                    Let’s learn more about AI in real life. But first, let’s choose a topic!
                    </p>
                    <ButtonSmall onClick = {() => setgamestatus(CHOOSING)}>Confirm</ButtonSmall>
                </div>
                <img src = {"../UI/resbubble.png"} width = "600px" height = "600px" />
            </div>
            </div>
              }
              {
                gamestatus == CHOOSING &&
                <div>
                    <div className = "danny">
                       <img src = {"../UI/drachenthinking.png"} width = "210px" height = "250px"/>
                    </div>
                    <div className = "smallaskbubble">
                        <div className = "choosemodel">
                              <p className = "text">
                                Who is choosing today?
                              </p>  
                        </div>    
                       <img src = {"../UI/resbubble.png"} width = "400px" height = "400px" />
                    </div>  
                    <div className = "choices">
                        <Stack spacing = {10} direction = "column">
                            <Button onClick = {() => setgamestatus(WHEEL)}>DANI's Wheel</Button>
                            <Button onClick = {() => setgamestatus(BOXES)}>Me</Button>
                        </Stack>
                    </div>      
                </div>    
              }
              {     gamestatus == BOXES &&
                <div>
                   <div className = "danny">
                       <img src = {"../UI/drachensmile.png"} width = "210px" height = "250px"/>
                    </div>
                    <div className = "boxes1">
                        <Stack spacing = {10} direction = "column">
                            <Button >Technical Safety</Button>
                            <Button>Transparency and Privacy</Button>
                            <Button>Machine Learning Bias</Button>
                            <Button>AI-powered Addiction</Button>
                        </Stack>
                    </div>  
                    <div className = "boxes2">
                        <Stack spacing = {10} direction = "column">
                            <Button>Environmental Effects</Button>
                            <Button>Wealth Inequality</Button>
                            <Button>AI Personhood</Button>
                            <Button>Unemployment</Button>
                        </Stack>
                    </div>      
                </div>   
            } 
              {/*
                gamestatus == WHEEL &&
                <body>
                <div id="wheelOfFortune">
                    <canvas id="wheel" width="300" height="300"></canvas>
                    <div id="spin">SPIN</div>
                </div>
                </body>
                   */
              }
        </div>      
    )
};
export default Main;