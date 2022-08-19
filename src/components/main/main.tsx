import "./main.css";
import "./index.jsx";
import "./styles.css";
import {Button} from '../../editor/button';
import {ButtonSmall} from '../../editor/button-small';
import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef }  from "react";
import Stack from "@mui/material/Stack";
import {status, words, parentname, childname} from "../../store";
import {useRecoilState, useRecoilValue} from "recoil";
import {READY, READY2, READY3, READY4, CHOOSING, WHEEL, BOXES, ANSWER} from "../../model/status";
import { intro1, introlist } from "../database/introductions";
import { Wheel } from 'react-custom-roulette'


const Main = () =>{
    
    const [gamestatus, setgamestatus] = useRecoilState(status);
    const [speakwords, setspeakwords] = useRecoilState(words);
    const [mustSpin, setMustSpin] = useState(false);
    const [topicnumber, settopicnumber] = useState(0);
    const [spined, setspined] = useState(false);
    const parent = useRecoilValue(parentname);
    const child = useRecoilValue(childname);
    const message = new SpeechSynthesisUtterance();
    message.text = speakwords;

    const data = [
        { option: '0', style: { backgroundColor: 'white', textColor: "white" }},
        { option: '1', style: { backgroundColor: 'red', textColor: "red" }},
        { option: '2', style: { backgroundColor: 'blue', textColor: "blue" }},
        { option: '3', style: { backgroundColor: 'yellow', textColor: "yellow" }},
      ]

    const setethics = (group: number, index: number) => {
        setgamestatus(ANSWER);
    }

    const spinwheel = () => {
        const newrandom = Math.floor(Math.random() * data.length);
        settopicnumber(newrandom);
        setMustSpin(true);
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
                    <p id = "chatbox" className = "text-small">
                    Hey there, {parent}! I'm here to offer support as you help {child} learn about and discuss important topics regarding AI Ethics.
                    </p>
                </div>
                <img src = {"../UI/resbubble.png"} width = "600px" height = "600px" />
            </div>
            <div className = "ready-confirm">
            <ButtonSmall onClick = {() => setgamestatus(READY2)}>Confirm</ButtonSmall>
            </div>
            </div>
              }
                  { gamestatus == READY2 &&
               <div>
            <div className = "danny">
                <img src = {"../UI/drachenispy.png"} width = "210px" height = "250px"/>
            </div>
            <div className = "askbubble">
            <div className = "content">
                    <p id = "chatbox" className = "text-small">
                    As we explore this learning module, I will present a few options at each step so you can guide the learning in the ways you most prefer.
                    </p>
                </div>
                <img src = {"../UI/resbubble.png"} width = "600px" height = "600px" />
            </div>
            <div className = "ready-confirm">
            <ButtonSmall onClick = {() => setgamestatus(READY3)}>Confirm</ButtonSmall>
            </div>
            </div>
              }
                    { gamestatus == READY3 &&
               <div>
            <div className = "danny">
                <img src = {"../UI/drachenispy.png"} width = "210px" height = "250px"/>
            </div>
            <div className = "askbubble">
            <div className = "content">
                    <p id = "chatbox" className = "text">
                    Ok! Are we ready to start exploring AI Ethics?
                    </p>
                </div>
                <img src = {"../UI/resbubble.png"} width = "600px" height = "600px" />
            </div>
            <div className = "ready-confirm">
            <Stack spacing = {5} direction = "column">
            <ButtonSmall onClick = {() => setgamestatus(READY4)}>Yes</ButtonSmall>
            <ButtonSmall onClick = {() => setgamestatus(READY4)}>No</ButtonSmall>
            </Stack>
            </div>
            </div>
              }
                { gamestatus == READY4 &&
               <div>
            <div className = "danny">
                <img src = {"../UI/drachenispy.png"} width = "210px" height = "250px"/>
            </div>
            <div className = "askbubble">
            <div className = "content">
                    <p id = "chatbox" className = "text">
                    Great! Ok {child}, make sure that you press the button that {parent} asks you to choose!
                    </p>
                </div>
                <img src = {"../UI/resbubble.png"} width = "600px" height = "600px" />
            </div>
            <div className = "ready-confirm">
            <ButtonSmall onClick = {() => setgamestatus(CHOOSING)}>Confirm</ButtonSmall>
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
                              <p id = "chatbox" className = "text-small">
                              How should we select the topic we are going to explore?
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
                    <div className = "smallaskbubble">
                        <div className = "choosemodel">
                              <p id = "chatbox" className = "text">
                              Please pick a topic for us to explore!
                              </p>  
                        </div>    
                       <img src = {"../UI/resbubble.png"} width = "400px" height = "400px" />
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
                        <div className = "smallaskbubble-wheel">
                        <div className = "choosemodel">
                            {   mustSpin == false && spined == false &&
                              <p id = "chatbox" className = "text-small">
                              Spin the wheel and I'll randomly pick a topic for us to explore!
                              </p>  
                            }       
                              {   mustSpin == true &&
                              <p id = "chatbox" className = "text">
                             And the topic is....
                              </p>  
                            }  
                             {   mustSpin == false && spined == true &&
                              <p id = "chatbox" className = "text">
                              And the topic is {topicnumber}
                              </p>  
                            }                      
                        </div>    
                       <img src = {"../UI/resbubble.png"} width = "400px" height = "400px" />
                    </div> 
                        <div className = "spin">
                            { spined == false &&
                        <Button onClick = {()=> spinwheel()}>Spin</Button>
                            }
                            {   spined == true &&
                               <Stack spacing = {5} direction = "row">
                                 <Button onClick = {()=> setgamestatus(ANSWER)}>Let's Explore</Button>
                                 <Button onClick = {()=> spinwheel()}>Spin Again</Button>
                               </Stack>
                            }
                        </div>
                        <div className = "wheel">
                        <Wheel
                           mustStartSpinning={mustSpin}
                           prizeNumber={3}
                           data={data}
                           backgroundColors={['#3e3e3e', '#df3428']}
                           textColors={['#ffffff']}
                           onStopSpinning={() => {
                            setMustSpin(false);
                            setspined(true);
                          }}
                        />
                        </div>
                </div>    
            }
        </div>      
    )
};
export default Main;