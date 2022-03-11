import React, { useState, useRef } from 'react'
import axios from 'axios';
import { motion } from 'framer-motion';
import { InputContainer2, Body, TokenInput, InfoBox, TokenSearchContainer, FullContainer, Container12, HeaderContainer, OutputContainer, Hr, Vr, MathInput, InputDiv, RightSide } from '../../components/sharedComponents/styledComponents'
import { pageStyle, pageTransition, pageVariants} from '../../components/sharedComponents/FramerMotionPrompts/FramerMotionPrompts'
import AtlasLogo from '../../components/Assets/images/logoBlue.png' 
import coinIcon from '../../components/Assets/images/coinIcon.svg'

function NodeCalc(){
    const [nodeCount, setNodeCount] = useState(0)
    const [baseRewards, setRewards] = useState(0)
    const [price, setPrice] = useState(0)
    const [nodeCost, setNodeCost] = useState(0)
    const [profitGoal, setProfitGoal] = useState(0)
    const [compoundTo, setCompoundTo] = useState(0)
    const [investment, setInvestment] = useState(0)
    const [wallet, setWallet] = useState(0)
    const [pendingRewards, setPendingRewards] = useState(0)
    const [outputs, setOutputs] = useState<any[]>([['N/A','N/A','N/A','N/A'], ['gray','gray','gray','gray']])

    function range(start: number, end: number) {
        return Array(end - start + 1).fill(0).map((_, idx) => (nodeCost/baseRewards)/(start + idx))
    }

    function math() {
        console.log('calculating')
        console.log(nodeCost)
        if (profitGoal <= 0 || isNaN(profitGoal) == true){
            return [['N/A','N/A','N/A','N/A'], ['gray','gray','gray','gray']]
            
        }if (nodeCount <= 0 || isNaN(nodeCount) == true){
            return [['N/A','N/A','N/A','N/A'], ['gray','gray','gray','gray']]
            
        }if (compoundTo <= 0 || isNaN(compoundTo) == true){
            return [['N/A','N/A','N/A','N/A'], ['gray','gray','gray','gray']]
            
        }if (baseRewards <= 0 || isNaN(baseRewards) == true){
            return [['N/A','N/A','N/A','N/A'], ['gray','gray','gray','gray']]
            
        }if (price <= 0 || isNaN(price) == true){
            return [['N/A','N/A','N/A','N/A'], ['gray','gray','gray','gray']]
            
        }if (nodeCost <= 0 || isNaN(nodeCost) == true){
            return [['N/A','N/A','N/A','N/A'], ['gray','gray','gray','gray']]
            
        } if (compoundTo > 1000) {
            return [['Compound Goal Too High','Compound Goal Too High','Compound Goal Too High','Compound Goal Too High'], ['red','red','red','red']]
        }
        else{
            let total = pendingRewards + wallet
            let dailyRewards  = nodeCount * baseRewards * price
            let daysToNextNode = (nodeCost - total) / (nodeCount * baseRewards)
            if (daysToNextNode <= 0){
                daysToNextNode = 0
            }
            let newNodes = nodeCount + 2
            if (newNodes == compoundTo - 1){
                var daysUntilGoal = daysToNextNode
                var daysUntilProfitGoal = profitGoal/(compoundTo * baseRewards * price) + daysUntilGoal
                return [[daysToNextNode.toFixed(0), daysUntilGoal.toFixed(0), daysUntilProfitGoal.toFixed(0), dailyRewards.toFixed(2)],['black','black','black','black' ]]
                
            } else if (newNodes > compoundTo -1){
                var daysUntilGoal = 0
                var daysUntilProfitGoal = (profitGoal + investment - (price*(wallet+pendingRewards)))/(price*baseRewards*nodeCount)
                return [[daysToNextNode.toFixed(0), daysUntilGoal.toFixed(0), daysUntilProfitGoal.toFixed(0), dailyRewards.toFixed(2)],['black','black','black','black' ]]
                
            } else{
                let result = range(newNodes, compoundTo); // [9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
                var daysUntilGoal = daysToNextNode
                var daysInList = result.reduce((a,b) => a+b, 0)
                daysUntilGoal += daysInList
                console.log(daysUntilGoal)
                var daysUntilProfitGoal = profitGoal/(compoundTo * 0.1 * price) + daysUntilGoal
       
                return [[daysToNextNode.toFixed(0), daysUntilGoal.toFixed(0), daysUntilProfitGoal.toFixed(0), dailyRewards.toFixed(2)],['black','black','black','black' ]]
            }
            
        }
    }       
    
   

    async function fetchData1() {
        try {
            const result = await axios.get(`https://api.coingecko.com/api/v3/search?query=${value1}`)
            console.log(result.data);
            return result.data.coins.slice(0, 12)
        } catch (error) {
            console.error(error);
            
        }
    }
    

    const [list1, setList1] = useState<any[]>([])
    
    
    function makeDatalist1() {
        let mounted = true;
        fetchData1()
        .then((items: React.SetStateAction<any[]>) => {
            if(mounted) {
            setList1(items)
            }
        })
        return () => mounted = false;
    }

    function GetImageAndPrice1(event: string) {
        for (var i = 0; i < list1.length; i++) {
            if (list1[i].name == event) {
                // An item was selected from the list!
                // yourCallbackHere()
                setTokenName1(list1[i].symbol)
                setTokenImage1(list1[i].large);
                getPrice1(list1[i].id)
                setColor1('black')
                break;
            } else {
                setTokenName1('Token 1')
                setTokenImage1(coinIcon)
                setDisplayPrice1('N/A')
                setColor1('gray')
            }
        }
    }
    async function getPrice1(id:string){
        try {
            const result = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`)
            console.log(result.data);
            setDisplayPrice1('$' + result.data[id]['usd'])
        } catch (error) {
            console.error(error);
        }  
    } 
    
    const [value1, setValue1] = useState('')
    const [tokenImage1, setTokenImage1] = useState(coinIcon)
   
    const [displayPrice1, setDisplayPrice1] = useState('N/A')
   
    const [tokenName1, setTokenName1] = useState('Token')
    
    const [color1, setColor1] = useState('gray')
   

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
                <HeaderContainer className="header">
                    <img src={ tokenImage1 } width='100px' alt="altas-logo" />

                    <div className="headerContent">
                        <h3 className="yourNodes">Your Nodes</h3>
                        <h1 id="yournodes">{nodeCount}</h1>
                    </div>

                    <div className="headerContent">
                        <h3 className="pending">Pending Rewards</h3>
                        <h1 id="yourpending">{pendingRewards}</h1>
                    </div>
                    <div className="headerContent">
                        <h3 className="pricebot">Current Price</h3>
                        <h1 id="pricehere" style={{color: color1}}>{displayPrice1}</h1>
                    </div>
                    
                </HeaderContainer>
                <Hr></Hr>
                <Container12 className="contents">    
                    <InputContainer2 className="container inputs">
                        
                        <InputDiv className="input">
                            <h3>Search Token</h3>
                            <TokenInput className="wallet" type="text" list='search1' autoComplete='off' id="wallet" placeholder="Search Token" 
                             onChange={(e) => {setValue1(e.target.value); makeDatalist1(); GetImageAndPrice1(e.target.value)}}/>
                             <datalist id='search1'>
                                {list1.map(item => <option key={item.id} id={item.large} value={item.name}>{item.symbol}</option>)}
                            </datalist>
                        </InputDiv>
                        <InputDiv className="input">
                            <h3>{tokenName1} Price</h3>
                            <MathInput type="number" autoComplete='off' id="compound" placeholder="Token Price ($)" onChange={(e) => {setPrice(Number(e.target.value))}}/>
                        </InputDiv>
                        <InputDiv className="input">
                            <h3>Node Count</h3>
                            <MathInput type="number" autoComplete='off' id="compound" placeholder="Your Node Count" onChange={(e) => {setNodeCount(Number(e.target.value))}}/>
                        </InputDiv>
                        <InputDiv className="input">
                            <h3>Base Rewards</h3>
                            <MathInput type="number" autoComplete='off' id="atlasWallet" placeholder="Base Rewards of Node" onChange={(e) => {setRewards(Number(e.target.value))}}/>
                        </InputDiv>
                        <InputDiv className="input">
                            <h3>Cost of Node</h3>
                            <MathInput type="number" autoComplete='off' id="wallet" placeholder="Cost of Node" onChange={(e) => {setNodeCost(Number(e.target.value))}}/>
                        </InputDiv>
                        <InputDiv className="input">
                            <h3>Compound Goal</h3>
                            <MathInput type="number" autoComplete='off' id="compound" placeholder="Goal (# of Nodes)" onChange={(e) => {setCompoundTo(Number(e.target.value))}}/>
                        </InputDiv>
                        <InputDiv className="input">
                            <h3>Profit Goal</h3>
                            <MathInput type="number" autoComplete='off' id="profit" placeholder="Your Profit Goal ($)" onChange={(e) => {setProfitGoal(Number(e.target.value))}}/>
                        </InputDiv>
                        <InputDiv className="input">
                            <h3>Initial Investment</h3>
                            <MathInput type="number" autoComplete='off' id="profit" placeholder="Initial Investment ($)" onChange={(e) => {setInvestment(Number(e.target.value))}}/>
                        </InputDiv>
                        <InputDiv className="input">
                            <h3>Pending Rewards</h3>
                            <MathInput type="number" autoComplete='off' id="profit" placeholder="Pending Rewards" onChange={(e) => {setPendingRewards(Number(e.target.value))}}/>
                        </InputDiv>
                        <InputDiv className="input">
                            <h3>Amount in Wallet</h3>
                            <MathInput type="number" autoComplete='off' id="wallet" placeholder="Tokens in your wallet" onChange={(e) => {setWallet(Number(e.target.value))}}/>
                        </InputDiv>
                    </InputContainer2>
                    <RightSide>
                        <InfoBox>
                            <h3>How Nodes Work</h3>
                            <p>
                                Nodes have become a big trend in the DeFi space. These investment types allow holders to recieve base awards depending on
                                the node type for the project you choose. This node calculator provides you with the tools to visualize your investment 
                                given the inputs that you put into the fields.
                            </p>
                        </InfoBox>
                        <OutputContainer className="outputs">
                            <div className="output">
                                <h3>Days Until next Node</h3>
                                <h2 id="nextnode" style={{color: math()[1][1]}}>{math()[0][0]}</h2>
                            </div>
                            <div className="output">
                                <h3>Days Until Compound Goal</h3>
                                <h2 id="compoundoutput" style={{color: math()[1][1]}}>{math()[0][1]}</h2>
                            </div>
                            <div className="output">
                                <h3>Days Until Profit Goal</h3>
                                <h2 id="profitgoaloutput" style={{color: math()[1][1]}}>{math()[0][2]}</h2>
                            </div>
                            <div className="output">
                                <h3>Your Daily Rewards ($)</h3>
                                <h2 id="profitgoaloutput" style={{color: math()[1][1]}}>{math()[0][3]}</h2>
                            </div>
                            
                        </OutputContainer>
                        
                    </RightSide>
                    
                </Container12>
            </FullContainer>
            </motion.div>
        </Body>
        
        
        
    )
}

export default NodeCalc;