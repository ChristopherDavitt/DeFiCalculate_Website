import React , { useState, useRef, Component } from 'react'
import { motion } from 'framer-motion'
import { InputContainer, InputContainer2, Body, TokenInput, InfoBox, TokenSearchContainer, FullContainer, Container12,
     HeaderContainer, OutputContainer, Hr, Vr, MathInput, InputDiv, RightSide } from '../../components/sharedComponents/styledComponents'
import { pageVariants, pageTransition } from '../../components/sharedComponents/FramerMotionPrompts/FramerMotionPrompts';
import coinIcon from '../../components/Assets/images/coinIcon.svg'


export default class Giveaway extends Component<{}, {amount: number, participants: number, winners: number, outputs: any[]}> {
    
    constructor(props: any){
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.math = this.math.bind(this)
        this.state = {
            amount: 0,
            winners: 0,
            participants: 0,
            outputs: [['N/A', 'N/A'], ['gray', 'gray']]
        };
      }
    
    handleChange(event: any) {
        this.setState({ ...this.state, [event.target.name]: event.target.value }, this.math);
    }

    math (){
        if (this.state.amount <= 0 || isNaN(this.state.amount)){
            this.setState({ outputs:  [['N/A','N/A'], ['gray']] })
            
        } else if (this.state.participants <= 0 || isNaN(this.state.participants)){
            this.setState({ outputs:  [['N/A','N/A'] , ['gray']]})
            
        } else if (this.state.winners <= 0 || isNaN(this.state.winners)){
            this.setState({ outputs:  [['N/A','N/A'] , ['gray']]})
            
        } else {
            let probability =  this.state.winners / this.state.participants
            let EV = probability * this.state.amount 
            this.setState({ outputs: [['$' + EV.toFixed(2), (probability* 100).toFixed(4) + '%'], ['black']] })
            
        }
    }

    render(){
        return (
            <Body className='calc-body'>
                <motion.div 
                    initial='initial'
                    animate='in'
                    exit='out'
                    variants={pageVariants}
                    transition={pageTransition}
                
                    >
                    <FullContainer className='full-container'>
                        <div className='title'>
                            <h1>Giveaway E.V.</h1>
                            <img style={{width: '45px'}} src={coinIcon}></img>
                        </div>
                        <Hr></Hr>

                        
                        <HeaderContainer>
                            <h1 className='remove-one'>Giveaway E.V.</h1>
                            <div>
                                <h3>Giveaway Amount</h3>
                                <h2>{'$ ' + this.state.amount}</h2>
                            </div>
                            <div>
                                <h3>Probability of Win</h3>
                                <h2 style={{color: this.state.outputs[1][0]}}>{this.state.outputs[0][1]}</h2>
                            </div>
                            <div>
                                <h3>Expected Value</h3>
                                <h2 style={{color: this.state.outputs[1][0]}}>{this.state.outputs[0][0]}</h2>
                            </div>
                        </HeaderContainer>
                        <Hr></Hr>
                        

                        <Container12 className='contents'>
                            <InputContainer className='input-container'>
                            <InputDiv className="input">
                                <h3>Total Amount</h3>
                                <MathInput type="number" id="price1" autoComplete='off' placeholder="Giveaway Amount ($)" name='amount' onChange={this.handleChange} />
                            </InputDiv>
                            <br></br>
                            <InputDiv className="input">
                                <h3>How many entered</h3>
                                <MathInput type="number" id="price2" autoComplete='off' placeholder="# of people eligible" name='participants' onChange={this.handleChange}/>
                            </InputDiv>
                            <br></br>
                            <InputDiv className="input">
                                <h3># of Winners</h3>
                                <MathInput type="number" id="investment" autoComplete='off' placeholder="# of winners" name='winners' onChange={this.handleChange}/>
                            </InputDiv>
                            <br></br>
                            </InputContainer>
                            <RightSide>
                                <InfoBox className='info-box-2'>
                                    <h3>What is Expected Value?</h3>
                                    <p>
                                        Expected value is a term used in statistics to determining what the weighted average is of a particular outcome.
                                        For example if I had a 50% chance of winning $100, my expected value would be $50. In the DeFi space there is a lot of engagement
                                        around giveaways, so I thought it'd be a fun an easy way to determine how much money each silly retweet or community giveaway is statistically worth. Enjoy :)
                                    </p>
                                </InfoBox>
                            </RightSide>
                        </Container12>
                    </FullContainer>
                    <div className='info-hidden-2'>
                    <FullContainer sx={{padding: '1rem', marginTop:'1rem', marginBot: '2rem'}} >
                        <h3>What is Expected Value?</h3>
                        <p>
                            Expected value is a term used in statistics to determining what the weighted average is of a particular outcome.
                            For example if I had a 50% chance of winning $100, my expected value would be $50. In the DeFi space there is a lot of engagement
                            around giveaways, so I thought it'd be a fun an easy way to determine how much money each silly retweet or community giveaway is statistically worth. Enjoy :)
                        </p>
                    </FullContainer></div>
                </motion.div>
            </Body>
        )
    }
}