import "./main.css";
import "./index.jsx";
import "./styles.css";
import {Button} from '../../editor/button';
import {ButtonSmall} from '../../editor/button-small';
import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef }  from "react";
import Stack from "@mui/material/Stack";
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import {status, words, parentname, childname} from "../../store";
import {useRecoilState, useRecoilValue} from "recoil";
import {READY, READY2, READY3, READY4, CHOOSING, WHEEL, BOXES, CHOOSING2, 
    ANSWER, ANSWER2, ANSWER3, ANSWER4, LEARN, STORY, STORY2, STORY3, STORY4, STORY5, END,END2,END3,END4} from "../../model/status";
import { intro1, introlist } from "../database/introductions";
import { Wheel } from 'react-custom-roulette'
import useSpeechToText from 'react-hook-speech-to-text';


const Main = () =>{
    
    const [gamestatus, setgamestatus] = useRecoilState(status);
    const [speakwords, setspeakwords] = useRecoilState(words);
    const [mustSpin, setMustSpin] = useState(false);
    const [topicnumber, settopicnumber] = useState(0);
    const [spined, setspined] = useState(false);
    const [readstory, setreadstory] = useState(false);
    const parent = useRecoilValue(parentname);
    const child = useRecoilValue(childname);
    const message = new SpeechSynthesisUtterance();
    message.text = speakwords;

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });
    

    const data = [
        { option: '0', style: { backgroundColor: 'white', textColor: "white" }},
        { option: '1', style: { backgroundColor: 'red', textColor: "red" }},
        { option: '2', style: { backgroundColor: 'blue', textColor: "blue" }},
        { option: '3', style: { backgroundColor: 'yellow', textColor: "yellow" }},
      ]

    const setethics = (group: number, index: number) => {
        setgamestatus(CHOOSING2);
    }

    const spinwheel = () => {
        const newrandom = Math.floor(Math.random() * data.length);
        settopicnumber(newrandom);
        setMustSpin(true);
    }

    const start = () => {
        startSpeechToText();
    }

    const stop = () => {
        stopSpeechToText();
        let ans = (document.getElementById("feedback") as  HTMLInputElement).value;  

        results.map((result: any, index) => {
         if(result.transcript != "undefined"){
            ans = result.transcript;
        }
        return true;
       });

       (document.getElementById("feedback") as HTMLInputElement).value = ans;
       setResults([]);
       
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
            <ButtonSmall onClick = {() => setgamestatus(END)}>No</ButtonSmall>
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
                gamestatus == CHOOSING2 &&
                   <div>
                         <div className = "danny">
                       <img src = {"../UI/drachenispy.png"} width = "210px" height = "250px"/>
                        </div>
                        <div className = "askbubble-left">
                            <div className = "content-big">
                                <p id = "chatbox1" className = "text">
                                   {introlist[0][0]}
                                </p> 
                                <p id = "chatbox" className = "text-small">
                                Ok {parent}, do you think we first need to learn about this topic or should we go straight into discussing a story related to this topic?
                                </p>
                             </div>
                             <img src = {"../UI/resbubble.png"} width = "600px" height = "600px" />
                         </div>   
                         <div className = "choices-right">
                        <Stack spacing = {10} direction = "column">
                            <Button onClick = {() => setgamestatus(LEARN)}>Learn</Button>
                            <Button onClick = {() => setgamestatus(STORY)}>Story</Button>
                        </Stack>
                        </div>      
                   </div>
                   
            }
              {
                gamestatus == LEARN &&
                   <div>
                         <div className = "danny">
                       <img src = {"../UI/drachenispy.png"} width = "210px" height = "250px"/>
                        </div>
                        <div className = "askbubble-left">
                            <div className = "content-big">
                                <p id = "chatbox1" className = "text">
                                   {introlist[0][0]}
                                </p> 
                                <p id = "chatbox" className = "text-small">
                                How should we learn about this topic?
                                </p>
                             </div>
                             <img src = {"../UI/resbubble.png"} width = "600px" height = "600px" />
                         </div>   
                         <div className = "choices-right">
                        <Stack spacing = {5} direction = "column">
                            <Button onClick = {() => setgamestatus(ANSWER)}>Introductory Summary</Button>
                            <Button onClick = {() => setgamestatus(ANSWER2)}>Links to Websites</Button>
                            <Button onClick = {() => setgamestatus(ANSWER3)}>Web Search</Button>
                        </Stack>
                        </div>      
                   </div>
                   
            }
               {
                gamestatus == STORY &&
                   <div>
                         <div className = "danny">
                       <img src = {"../UI/drachenispy.png"} width = "210px" height = "250px"/>
                        </div>
                        <div className = "askbubble-left">
                            <div className = "content-big">
                                <p id = "chatbox1" className = "text">
                                   {introlist[0][0]}
                                </p> 
                                <p id = "chatbox" className = "text-small">
                                In this part of the module, we are going to listen to a story and discuss some questions related to this topic.
                                </p>
                             </div>
                             <img src = {"../UI/resbubble.png"} width = "600px" height = "600px" />
                         </div>   
                         <div className = "choices-down">
                            <Button onClick = {() => setgamestatus(STORY2)}>Confirm</Button>
                        </div>      
                   </div>    
            }
              {
                gamestatus == STORY2 &&
                   <div>
                         <div className = "danny">
                       <img src = {"../UI/drachenispy.png"} width = "210px" height = "250px"/>
                        </div>
                        <div className = "askbubble-left">
                            <div className = "content-big">
                                <p id = "chatbox1" className = "text">
                                   {introlist[0][0]}
                                </p> 
                                <p id = "chatbox" className = "text-small">
                                Ok {parent}, could you please read the story to {child} and me? Or would you prefer I read the story out loud?
                                </p>
                             </div>
                             <img src = {"../UI/resbubble.png"} width = "600px" height = "600px" />
                         </div>   
                         <div className = "choices-right">
                        <Stack spacing = {5} direction = "column">
                            <Button onClick = {() => {setgamestatus(STORY4); setreadstory(false)}}>I will read!</Button>
                            <Button onClick = {() => {setgamestatus(STORY3); setreadstory(true)}}>Dani will read!</Button>
                        </Stack>
                        </div>    
                   </div>    
            }
                {
                gamestatus == STORY4 &&
                   <div>
                         <div className = "danny">
                       <img src = {"../UI/drachenispy.png"} width = "210px" height = "250px"/>
                        </div>
                        <div className = "askbubble-left">
                            <div className = "content-big">
                            <p id = "chatbox1" className = "text">
                                   {introlist[0][0]}
                                </p> 
                                <p id = "chatbox" className = "text-small">
                                Awesome! Let's kick-off the story discussion with some questions. And feel free to take the discussions in any direction you like!
                                </p>
                             </div>
                             <img src = {"../UI/resbubble.png"} width = "600px" height = "600px" />
                         </div>   
                         <div className = "choices-down">
                            <Button onClick = {() => setgamestatus(STORY5)}>Confirm</Button>
                        </div>      
                   </div>    
            }
                    {
                gamestatus == STORY5 &&
                   <div>
                         <div className = "danny">
                       <img src = {"../UI/drachenispy.png"} width = "210px" height = "250px"/>
                        </div>
                        <div className = "askbubble-left">
                            <div className = "content">
                                <p id = "chatbox" className = "text-small">
                                Thank you for exploring {introlist[0][0]} with me! Should we explore another topic or is that enough exploration for now?
                                </p>
                             </div>
                             <img src = {"../UI/resbubble.png"} width = "600px" height = "600px" />
                         </div>   
                         <div className = "choices-right">
                        <Stack spacing = {5} direction = "column">
                            <Button onClick = {() => setgamestatus(READY4)}>Explore a new topic</Button>
                            <Button onClick = {() => setgamestatus(END)}>Exit Module</Button>
                        </Stack>
                        </div>    
                   </div>    
            }
            {
                gamestatus == ANSWER4 &&
                   <div>
                         <div className = "danny">
                       <img src = {"../UI/drachenispy.png"} width = "210px" height = "250px"/>
                        </div>
                        <div className = "askbubble-left">
                            <div className = "content-big">
                                <p id = "chatbox1" className = "text">
                                   {introlist[0][0]}
                                </p> 
                                <p id = "chatbox" className = "text-small">
                                Should we explore some other ways to learn about this topic or should we move onto the story?
                                </p>
                             </div>
                             <img src = {"../UI/resbubble.png"} width = "600px" height = "600px" />
                         </div>   
                         <div className = "choices-right">
                        <Stack spacing = {5} direction = "column">
                            <Button onClick = {() => setgamestatus(LEARN)}>Keep Learning</Button>
                            <Button onClick = {() => setgamestatus(STORY)}>Story Discussion</Button>
                            <Button onClick = {() => setgamestatus(END)}>Exit Module</Button>
                        </Stack>
                        </div>      
                   </div>    
            }
              {
                gamestatus == ANSWER3 &&
                   <div>
                         <div className = "danny">
                       <img src = {"../UI/drachenispy.png"} width = "210px" height = "250px"/>
                        </div>
                        <div className = "askbubble-left">
                            <div className = "content-big">
                                <p id = "chatbox1" className = "text">
                                   {introlist[0][0]}
                                </p> 
                                <p id = "chatbox" className = "text-small">
                                Clicking the "Search" button will open a new browser for topic exploration.
                                </p>
                             </div>
                             <img src = {"../UI/resbubble.png"} width = "600px" height = "600px" />
                         </div>   
                         <div className = "choices-right">
                        <Stack spacing = {5} direction = "column">
                            <Button onClick = {() => window.open("https://www.google.com/search?q=machine+learning+bias+&ei=hAgAY9KiB_qliLMP2deI-Ak&ved=0ahUKEwjS9MeP9NP5AhX6EmIAHdkrAp8Q4dUDCA4&uact=5&oq=machine+learning+bias+&gs_lcp=Cgdnd3Mtd2l6EAMyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEOgcIABBHELADOgYIABAeEBY6BQgAEIYDOggIABAeEA8QFkoECEEYAEoECEYYAFC8AliEBmDJCGgBcAF4AIABaIgB1wKSAQMzLjGYAQCgAQHIAQjAAQE&sclient=gws-wiz",'_blank')}>Search</Button>
                            <Button onClick = {() => setgamestatus(ANSWER4)}>Exit</Button>
                        </Stack>
                        </div>      
                   </div>    
            }
                 {
                gamestatus == ANSWER2 &&
                   <div>
                         <div className = "danny">
                       <img src = {"../UI/drachenispy.png"} width = "210px" height = "250px"/>
                        </div>
                        <div className = "askbubble-left">
                            <div className = "content-big">
                                <p id = "chatbox1" className = "text">
                                   {introlist[0][0]}
                                </p> 
                                <p id = "chatbox" className = "text-small">
                                Here are links to reputable sources about this topic! 
                                </p>
                             </div>
                             <img src = {"../UI/resbubble.png"} width = "600px" height = "600px" />
                         </div>   
                         <div className = "choices-right">
                        <Stack spacing = {3} direction = "column">
                            <Button onClick = {() => window.open("https://www.vox.com/future-perfect/22916602/ai-bias-fairness-tradeoffs-artificial-intelligence",'_blank')}>Link1</Button>
                            <Button onClick = {() => window.open("https://www.mckinsey.com/featured-insights/artificial-intelligence/tackling-bias-in-artificial-intelligence-and-in-humans",'_blank')}>Link2</Button>
                            <Button onClick = {() => window.open("https://research.aimultiple.com/ai-bias/",'_blank')}>Link3</Button>
                            <Button onClick = {() => setgamestatus(ANSWER4)}>Exit</Button>
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
                                   {introlist[0][0]}
                                </p> 
                            </div>    
                            <div className = "introtexts">
                                <p id = "chatbox2" className = "smalltext">
                                    {intro1}
                                </p>
                             </div>   
                        <img src = {"../UI/conver.png"} width = "1200px" height = "550px"/>
                         </div>  
                         <div className = "ready-confirm">
                            <ButtonSmall onClick = {() => setgamestatus(ANSWER4)}>Confirm</ButtonSmall>
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
                                 <Button onClick = {()=> setgamestatus(CHOOSING2)}>Let's Explore</Button>
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
              { gamestatus == END &&
               <div>
            <div className = "danny">
                <img src = {"../UI/drachenispy.png"} width = "210px" height = "250px"/>
            </div>
            <div className = "askbubble">
            <div className = "content">
                    <p id = "chatbox" className = "text">
                    We can explore this module again later!
                    </p>
                </div>
                <img src = {"../UI/resbubble.png"} width = "600px" height = "600px" />
            </div>
            <div className = "ready-confirm">
            <ButtonSmall onClick = {() => setgamestatus(END2)}>Confirm</ButtonSmall>
            </div>
            </div>
              }
               { gamestatus == END2 &&
               <div>
            <div className = "danny">
                <img src = {"../UI/drachenispy.png"} width = "210px" height = "250px"/>
            </div>
            <div className = "askbubble">
            <div className = "content">
                    <p id = "chatbox" className = "text">
                    Would you like to share any feedback at this time to help us improve this module?
                    </p>
                </div>
                <img src = {"../UI/resbubble.png"} width = "600px" height = "600px" />
            </div>
            <div className = "choices-right">
                        <Stack spacing = {5} direction = "column">
                            <Button onClick = {() => setgamestatus(END3)}>Yes</Button>
                            <Button onClick = {() => setgamestatus(READY)}>No</Button>
                        </Stack>
                        </div>      
            </div>
              }
               { gamestatus == END3 &&
               <div>
            <div className = "danny">
                <img src = {"../UI/drachenispy.png"} width = "210px" height = "250px"/>
            </div>
            <div className = "askbubble-left">
            <div className = "content">
                    <p id = "chatbox" className = "text">
                    Thank you! Please feel free to share any and all relevant feedback:
                    </p>
                </div>
                <img src = {"../UI/resbubble.png"} width = "600px" height = "600px" />
            </div>
            <div className = "input-box">
            <TextField
                    id="feedback"
                    multiline
                    rows={12}
                    inputProps = {{style: {fontSize: 20}}}
                    fullWidth 
                    margin = "normal"
                 />
            <Button  variant="outlined"onClick={isRecording ? stop :  start}>
              {isRecording ? 'Recording' : 'Record'}
           </Button>

            </div>
            <div className = "ready-confirm">
            <ButtonSmall onClick = {() => setgamestatus(END4)}>Confirm</ButtonSmall>
            </div>
            </div>
              }
               { gamestatus == END4 &&
               <div>
            <div className = "danny">
                <img src = {"../UI/drachenispy.png"} width = "210px" height = "250px"/>
            </div>
            <div className = "askbubble">
            <div className = "content">
                    <p id = "chatbox" className = "text">
                    We have recorded your feedback, thanks again!
                    </p>
                </div>
                <img src = {"../UI/resbubble.png"} width = "600px" height = "600px" />
            </div>
            <div className = "ready-confirm">
            <ButtonSmall onClick = {() => setgamestatus(READY)}>Confirm</ButtonSmall>
            </div>
            </div>
              }
        </div>      
    )
};
export default Main;