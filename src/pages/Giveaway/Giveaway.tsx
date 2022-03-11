import React , { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { InputContainer, InputContainer2, Body, TokenInput, InfoBox, TokenSearchContainer, FullContainer, Container12,
     HeaderContainer, OutputContainer, Hr, Vr, MathInput, InputDiv, RightSide } from '../../components/sharedComponents/styledComponents'
import { pageVariants, pageStyle, pageTransition } from '../../components/sharedComponents/FramerMotionPrompts/FramerMotionPrompts';
function Giveaway() {
    
    const [amount, setAmount] = useState(0)
    const [participants, setParticipants] = useState(0)
    const [winners, setWinners] = useState(0)
    const [outputs, setOutputs] = useState<any[]>([])
    


    function math (){
        if (amount == 0 || isNaN(amount)){
            
            return ['N/A','N/A']
        } if (participants == 0 || isNaN(participants)){
            
            return(['N/A','N/A'])
        } if (winners == 0 || isNaN(winners)){
           
            return ['N/A','N/A']
        } else {
            console.log(winners)
            console.log(winners)
            let probability =  winners / participants
            let EV = probability * amount 
            return [EV.toFixed(2), (probability* 100).toFixed(4)]
             
        }
    }
    return (
        <Body>
            <motion.div 
                initial='out'
                animate='in'
                exit='out'
                variants={pageVariants}
                transition={pageTransition}
                >
                <FullContainer>
                    <HeaderContainer>
                        <h1>Giveaway E.V.</h1>
                        <div>
                            <h3>Total Giveaway Amount</h3>
                            <h2>{'$' + amount}</h2>
                        </div>
                        <div>
                            <h3>Probability of Winning</h3>
                            <h2>{math()[1]+ '%'}</h2>
                        </div>
                        <div>
                            <h3>Expected Value</h3>
                            <h2>{'$' + math()[0]}</h2>
                        </div>
                    </HeaderContainer>
                    <hr></hr>
                    <Container12>
                        <InputContainer>
                        <InputDiv className="input">
                            <h3>Total Amount</h3>
                            <MathInput type="number" id="price1" autoComplete='off' placeholder="Giveaway Amount ($)" onChange={(e) => {setAmount(Number(e.target.value))}} />
                        </InputDiv>
                        <br></br>
                        <InputDiv className="input">
                            <h3>How many entered</h3>
                            <MathInput type="number" id="price2" autoComplete='off' placeholder="# of people eligible" onChange={(e) => {setParticipants(Number(e.target.value))}}/>
                        </InputDiv>
                        <br></br>
                        <InputDiv className="input">
                            <h3># of Winners</h3>
                            <MathInput type="number" id="investment" autoComplete='off' placeholder="# of winners" onChange={(e) => {setWinners(Number(e.target.value))}}/>
                        </InputDiv>
                        <br></br>
                        </InputContainer>
                        <RightSide>
                            <InfoBox>
                                <h3>What is Expected Value?</h3>
                                <p>
                                    Expected value is a term used in statistics to determining what the weighted average is of a particular outcome.
                                    For example if I had a 50% chance of winning $100, my expected value would be $50. In the DeFi space there is a lot of engagement
                                    around giveaways, so I thought it'd be a fun an easy way to determine how much money each silly retweet or community giveaway is actually worth. Enjoy :)
                                </p>
                            </InfoBox>
                        </RightSide>
                    </Container12>
                </FullContainer>
            </motion.div>
        </Body>
    )
}

export default Giveaway;