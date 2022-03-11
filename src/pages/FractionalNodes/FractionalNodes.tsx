import React, { useState } from 'react'
import { InputContainer, Body, TokenInput, InfoBox, TokenSearchContainer, FullContainer, Container12, HeaderContainer, OutputContainer, Hr, Vr, MathInput, InputDiv, RightSide } from '../../components/sharedComponents/styledComponents'
import AtlasLogo from '../../components/Assets/images/logoBlue.png' 

function FractionalNodes(){
    return (
        <Body>
            <FullContainer>
                <HeaderContainer className="header">
                    <img src={ AtlasLogo } width='100px' alt="altas-logo" />

                    <div className="headerContent">
                        <h3 className="totalNodes">Total Nodes</h3> 
                        <h1 id="totalnodes">...</h1>
                    </div>

                    <div className="headerContent">
                        <h3 className="yourNodes">Your Nodes</h3>
                        <h1 id="yournodes">0/100</h1>
                    </div>
                    
                    <div className="headerContent">
                        <h3 className="pending">Pending Rewards</h3>
                        <h1 id="yourpending">0</h1>
                    </div>

                    <div className="headerContent">
                        <h3 className="pricebot">Atlas Price</h3>
                        <h1 id="pricehere">...</h1>
                    </div>
                    
                </HeaderContainer>
                <Hr></Hr>
                <Container12 className="contents">    
                    <InputContainer className="container inputs">
                        <InputDiv className="input">
                            <h3>Search Token</h3>
                            <TokenInput className="wallet" type="text" id="wallet" placeholder="Paste Here">
                                
                            </TokenInput>
                        </InputDiv>
                        <InputDiv className="input">
                            <h3>Node Goal</h3>
                            <MathInput type="number" id="compound" placeholder="# of Nodes Goal" />
                        </InputDiv>
                        <InputDiv className="input">
                            <h3>Atlas in Wallet</h3>
                            <MathInput type="number" id="atlasWallet" placeholder="# of Atlas Tokens" />
                        </InputDiv>
                        <InputDiv className="input">
                            <h3>Profit Goal</h3>
                            <MathInput type="number" id="profit" placeholder="Your Profit Goal ($)" />
                        </InputDiv>
                    </InputContainer>
                    <RightSide>
                        <InfoBox>
                            <h3>Hello This is the Title</h3>
                            <p>
                                Hello This is dummy text to show where I want to put my Info
                            </p>
                        </InfoBox>
                        <OutputContainer className="outputs">
                            <div className="output">
                                <h3>Days Until next Node</h3>
                                <h2 id="nextnode">N/A</h2>
                            </div>
                            <div className="output">
                                <h3>Days Until Compound Goal</h3>
                                <h2 id="compoundoutput">N/A</h2>
                            </div>
                            <div className="output">
                                <h3>Days Until Profit Goal</h3>
                                <h2 id="profitgoaloutput">N/A</h2>
                            </div>
                        </OutputContainer>
                        
                    </RightSide>
                    
                </Container12>
            </FullContainer>
        </Body>
        
        
    )
}

export default FractionalNodes;