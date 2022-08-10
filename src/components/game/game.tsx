import "./game.css";
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import {useRecoilState, useRecoilValue} from "recoil";
import React from "react";
import {ButtonSmall} from '../../editor/button-small';
import {READY,GAMING,END} from "../../models/status";
import {status, currentimage } from "../../store";

 
const Game = () => {

    const [gamestatus, setgamestatus] = useRecoilState(status);
    const selectedimage = useRecoilValue(currentimage);

    const next = () => {
       setgamestatus(END);
    }

    return(
        <div className = "game">
            {   gamestatus==GAMING &&
                <div className = "gaming">
             <img className = "danny" src = "../UI/drachenispy.png" height = "250px" width = "200px"/>
             <div className = "bubble">
             <img  src = "../UI/conver.png" height = "500px" width = "1000px" />
             <div className = "content">
                  <p className = "question">Is your fruit red?</p>
                  <div className = "button-area">
                  <Stack spacing = {10} direction = "row">
                    <ButtonSmall onClick = {() => next()} >
                        Yes
                    </ButtonSmall>
                    <ButtonSmall sx={{backgroundColor: "rgba(244, 81, 109, 0.51)"}}>
                        No
                    </ButtonSmall>
                    </Stack>
                  </div>
             </div>
             </div>
             </div>
            }
            {
                gamestatus == END &&
                <div className = "result">
                    <img className = "dannyend" src = "../UI/drachenhappy.png" height = "250px" width = "200px"/>
                    <div className = "bubbleend">
                        <img src = "../UI/resultbubble.png" height = "400px" width = "400px" />
                        <div className = "answerbox">
                              <p className = "answer">Your fruit is: Apple!  </p>
                        </div>      
                    </div>
                    <img className = "resultimage" src = {"../images/"+selectedimage.path} height = "400px" width = "450px" />   
                </div>
            }
        </div>
    )
};

export default Game;