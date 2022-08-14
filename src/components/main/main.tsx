import "./main.css";
import "./index.jsx";
import "./styles.css";
import {Button} from '../../editor/button';
import {ButtonSmall} from '../../editor/button-small';
import { Link } from "react-router-dom";
import React, { useEffect, useRef, useLayoutEffect }  from "react";
import Stack from "@mui/material/Stack";
import {status, words} from "../../store";
import {useRecoilState, useRecoilValue} from "recoil";
import {READY, CHOOSING, WHEEL, BOXES, ANSWER} from "../../model/status";
import { intro1, introlist } from "../database/introductions";

const Main = () =>{
    
    const [gamestatus, setgamestatus] = useRecoilState(status);
    const [speakwords, setspeakwords] = useRecoilState(words);
    const message = new SpeechSynthesisUtterance();
    message.text = speakwords;

    const setethics = (group: number, index: number) => {
        setgamestatus(ANSWER);
    }

    const isFirst = useRef(true);

    useEffect(() => {
         window.speechSynthesis.speak(message);
    },[speakwords])

    useEffect(() => {
        if(gamestatus == ANSWER){
            const words = document.getElementById("chatbox1")!.innerHTML +  document.getElementById("chatbox2")!.innerHTML;
            setspeakwords(words);
        }
        else if(gamestatus != WHEEL && gamestatus != BOXES){
        const words = document.getElementById("chatbox")!.innerHTML
       setspeakwords(words);
       }
    }, [gamestatus]);

    return (
        <div className="main">
               { gamestatus == READY &&
               <div>
            <div className = "danny">
                <img src = {"../UI/drachenispy.png"} width = "210px" height = "250px"/>
            </div>
            <div className = "askbubble">
            <div className = "content">
                    <p id = "chatbox" className = "text">
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
                              <p id = "chatbox" className = "text">
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
                            {
                            introlist[0].map((value, index) => {
                                return (
                                <Button onClick = {() => setethics(1, index)}>{value}</Button>
                                )
                            })
                        }
                           
                        </Stack>
                    </div>  
                    <div className = "boxes2">
                        <Stack spacing = {10} direction = "column">
                        {
                        introlist[1].map((value, index) => {
                            return(
                                <Button onClick = {() => setethics(2,index)}>{value}</Button>
                            )
                            })
                        }
                        </Stack>
                    </div>      
                </div>   
            } 
            {
                gamestatus == ANSWER &&
                   <div>
                         <div className = "danny">
                       <img src = {"../UI/drachenispy.png"} width = "210px" height = "250px"/>
                        </div>
                        <div className = "introbubble">
                            <div className = "title">
                               <p id = "chatbox1" className = "text">
                                   {introlist[0][2]}
                                </p> 
                            </div>    
                            <div className = "introtexts">
                                <p id = "chatbox2" className = "smalltext">
                                    {intro1}
                                </p>
                             </div>   
                        <img src = {"../UI/conver.png"} width = "1200px" height = "550px"/>
                         </div>   
                   </div>
                   
            }
            {
                gamestatus == WHEEL &&
                <div>
                     <div className = "dannywheel">
                       <img src = {"../UI/drachensmile.png"} width = "150px" height = "180px"/>
                        </div>
                        <div className = "spin">
                        <Button>Spin</Button>
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