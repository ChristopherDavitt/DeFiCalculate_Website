import React, { useState, Component, useEffect } from 'react'
import axios from 'axios';
import { motion } from 'framer-motion';
import { InputContainer2, Body, TokenInput, InfoBox, TokenSearchContainer, FullContainer, Container12, HeaderContainer, OutputContainer, Hr, Vr, MathInput, InputDiv, RightSide } from '../../components/sharedComponents/styledComponents'
import { pageTransition, pageVariants} from '../../components/sharedComponents/FramerMotionPrompts/FramerMotionPrompts'
import SelectSearch, { fuzzySearch } from 'react-select-search';
import coinIcon from '../../components/Assets/images/coinIcon.svg'

export default class NodeCalc extends Component<{}, {nodeCount: number, baseRewards: number, price: number, nodeCost: number, profitGoal: number
                                                    compoundTo: number, investment: number, wallet: number, pendingRewards: number, outputs: any[], value1: string, 
                                                    tokenImage1: string, displayPrice1: string, tokenName1: string, color1: string, list1: any[], list2: any[]}> {
    
    constructor(props: any){
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.math = this.math.bind(this);
        this.range = this.range.bind(this);
        
        this.state = {
            nodeCount: 0, 
            baseRewards: 0,
            nodeCost: 0,
            price: 0,
            wallet: 0,
            profitGoal: 0,
            compoundTo: 0,
            investment: 0,
            pendingRewards: 0,
            outputs: [ ['N/A','N/A','N/A','N/A'] , ['gray','gray','gray','gray'] ],
            value1 : '',
            tokenImage1: coinIcon,
            displayPrice1: 'N/A',        
            tokenName1: 'Token',
            color1: 'gray',
            list1: [],
            list2: []
        };
      }
    
    handleChange(event: any) {
    this.setState({ ...this.state, [event.target.name]: event.target.value }, this.math);
    if (event.target.name == 'value1'){
        
        this.GetImageAndPrice1(event.target.value)
    }
    }
    
    range(start: number, end: number) {
        return Array(end - start + 1).fill(0).map((_, idx) => (this.state.nodeCost/this.state.baseRewards)/(start + idx))
    }

    math() {

        if (this.state.profitGoal <= 0 || isNaN(this.state.profitGoal) == true){
            this.setState( {outputs: [['N/A','N/A','N/A','N/A'], ['gray','gray','gray','gray']] }) 
            return
            
        }else if (this.state.nodeCount <= 0 || isNaN(this.state.nodeCount) == true){
            this.setState( {outputs: [['N/A','N/A','N/A','N/A'], ['gray','gray','gray','gray']] }) 
            return            
        }else if (this.state.compoundTo <= 0 || isNaN(this.state.compoundTo) == true){
            this.setState( {outputs: [['N/A','N/A','N/A','N/A'], ['gray','gray','gray','gray']] }) 
            return            
        }else if (this.state.baseRewards <= 0 || isNaN(this.state.baseRewards) == true){
            this.setState( {outputs: [['N/A','N/A','N/A','N/A'], ['gray','gray','gray','gray']] }) 
            return            
        }else if (this.state.price <= 0 || isNaN(this.state.price) == true){
            this.setState( {outputs: [['N/A','N/A','N/A','N/A'], ['gray','gray','gray','gray']] }) 
            return            
        }else if (this.state.nodeCost <= 0 || isNaN(this.state.nodeCost) == true){
            this.setState( {outputs: [['N/A','N/A','N/A','N/A'], ['gray','gray','gray','gray']] }) 
            return            
        }else if (this.state.compoundTo > 1000) {
            this.setState( {outputs: [['Compound Goal Too High','Compound Goal Too High','Compound Goal Too High','Compound Goal Too High'], ['red','red','red','red']] }) 
            return        
        }else{
            let total = Number(this.state.pendingRewards) + Number(this.state.wallet)
            let dailyRewards  = Number(this.state.nodeCount) * Number(this.state.baseRewards) * Number(this.state.price)
            let daysToNextNode = (Number(this.state.nodeCost) - total) / (Number(this.state.nodeCount) * Number(this.state.baseRewards))
            var newNodes = Number(this.state.nodeCount) + 2
            if (Number(this.state.pendingRewards) + Number(this.state.wallet) > Number(this.state.nodeCost)){
                daysToNextNode = 0
            }
            if (newNodes == Number(this.state.compoundTo) - 1){
                var daysUntilGoal = daysToNextNode
                
                var daysUntilProfitGoal = (Number(this.state.profitGoal) + Number(this.state.investment))/(this.state.compoundTo * this.state.baseRewards * this.state.price) + daysUntilGoal
                this.setState({ outputs: [[daysToNextNode.toFixed(0), daysUntilGoal.toFixed(0), daysUntilProfitGoal.toFixed(0), dailyRewards.toFixed(2)],['black','black','black','black' ]]}) 
                return 
            } else if (newNodes > Number(this.state.compoundTo) - 1){
                var daysUntilGoal = 0
                
                var daysUntilProfitGoal = (Number(this.state.profitGoal) + Number(this.state.investment) - (Number(this.state.nodeCount) * total))/(this.state.price*this.state.baseRewards*this.state.nodeCount)
                this.setState({ outputs: [[daysToNextNode.toFixed(0), daysUntilGoal.toFixed(0), daysUntilProfitGoal.toFixed(0), dailyRewards.toFixed(2)],['black','black','black','black' ]]}) 
                return                 
            } else{
                let result = this.range(newNodes, this.state.compoundTo); // [9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
                var daysInList = result.reduce((a,b) => a+b, 0)
                
                var daysUntilGoal = daysInList + daysToNextNode
                var daysUntilProfitGoal = (Number(this.state.profitGoal) + Number(this.state.investment))/(this.state.compoundTo * 0.1 * this.state.price) + daysUntilGoal
                console.log(this.state.profitGoal + this.state.investment)
                this.setState({ outputs: [[daysToNextNode.toFixed(0), daysUntilGoal.toFixed(0), daysUntilProfitGoal.toFixed(0), dailyRewards.toFixed(2)],['black','black','black','black' ]]}) 
                return             
            }
        }
    }       
    
   
    async fetchData1() {
        try {
            const result = await axios.get(`https://api.coingecko.com/api/v3/search?query=`)
            console.log('list updated')
            return result.data.coins;
        } catch (error) {
            console.error(error);
            
        }
    }
    handleSearch1(value: any){
        this.setState({ ...this.state, value1: value})
        
    }

    UNSAFE_componentWillMount() {
        let mounted = true;
        this.fetchData1()
        .then((items : any[]) => {
            if(mounted) {
            this.setState({ list2: items })
            let optionList: any[] = []
            items.forEach(x => optionList.push({name : x.name, value: x.id, key: x.id, id: x.symbol}))
            this.setState({...this.state, list1: optionList})
            }
        })
        return () => mounted = false;
    }
    
    GetImageAndPrice1(value: string) {
            for (var i = 0; i < this.state.list2.length; i++) {
                if (this.state.list2[i].id == value) {
                    // An item was selected from the list!
                    // yourCallbackHere()
                   
                    this.getPrice1(i);
                    break;
                } 
            }
        
    }
    async getPrice1(i:number){
        var id = this.state.list2[i].id
        try {
            const result = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`)
            
            this.setState( { displayPrice1 : '$' + result.data[id]['usd'], 
                            tokenName1: this.state.list2[i].symbol,
                            tokenImage1: this.state.list2[i].large,
                            color1: 'black' } )
        } catch (error) {
            console.error(error);
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
                    <div className='header'>
                    <HeaderContainer className="header">
                        <img src={ this.state.tokenImage1 } width='100px' alt="altas-logo" />

                        <div className="headerContent">
                            <h3 className="yourNodes">Your Nodes</h3>
                            <h1 id="yournodes">{this.state.nodeCount}</h1>
                        </div>

                        <div className="headerContent">
                            <h3 className="pending">Pending Rewards</h3>
                            <h1 id="yourpending">{this.state.pendingRewards}</h1>
                        </div>
                        <div className="headerContent">
                            <h3 className="pricebot">{this.state.tokenName1} Price</h3>
                            <h1 id="pricehere" style={{color: this.state.color1}}>{this.state.displayPrice1}</h1>
                        </div>
                        
                    </HeaderContainer>
                    </div>
                    <div className='title'>
                        <h1>Node Calculator</h1>
                        <img style={{width: '45px'}} src={coinIcon} />
                    </div>
                    <Hr></Hr>
                    <Container12 className="contents">    
                        <InputContainer2 className="container inputs">
                            
                            <InputDiv className="input">
                                <h3>Search Token</h3>
                                <SelectSearch
                                    value={this.state.value1}
                                    options={this.state.list1}
                                    search
                                    onChange={x => {this.GetImageAndPrice1(String(x)); this.handleSearch1(String(x))}}
                                    placeholder="Find Coin"
                                    filterOptions={(options) => {
                                        const filter = fuzzySearch(options);

                                        return (q) => filter(q).slice(0, 12);
                                    }}
                                />
                            </InputDiv>
                            <InputDiv className="input">
                                <h3>{this.state.tokenName1} Price</h3>
                                <MathInput type="number" autoComplete='off' id="compound" placeholder="Token Price ($)" name='price' onChange={this.handleChange}/>
                            </InputDiv>
                            <InputDiv className="input">
                                <h3>Node Count</h3>
                                <MathInput type="number" autoComplete='off' id="compound" placeholder="Your Node Count" name='nodeCount' onChange={this.handleChange}/>
                            </InputDiv>
                            <InputDiv className="input">
                                <h3>Base Rewards</h3>
                                <MathInput type="number" autoComplete='off' id="atlasWallet" placeholder="Base Rewards of Node" name='baseRewards' onChange={this.handleChange}/>
                            </InputDiv>
                            <InputDiv className="input">
                                <h3>Cost of Node</h3>
                                <MathInput type="number" autoComplete='off' id="wallet" placeholder="Cost of Node" name='nodeCost' onChange={this.handleChange}/>
                            </InputDiv>
                            <InputDiv className="input">
                                <h3>Compound Goal</h3>
                                <MathInput type="number" autoComplete='off' id="compound" placeholder="Goal (# of Nodes)" name='compoundTo' onChange={this.handleChange}/>
                            </InputDiv>
                            <InputDiv className="input">
                                <h3>Profit Goal</h3>
                                <MathInput type="number" autoComplete='off' id="profit" placeholder="Your Profit Goal ($)" name='profitGoal' onChange={this.handleChange}/>
                            </InputDiv>
                            <InputDiv className="input">
                                <h3>Initial Investment</h3>
                                <MathInput type="number" autoComplete='off' id="profit" placeholder="Initial Investment ($)" name='investment' onChange={this.handleChange}/>
                            </InputDiv>
                            <InputDiv className="input">
                                <h3>Pending Rewards</h3>
                                <MathInput type="number" autoComplete='off' id="profit" placeholder="Pending Rewards" name='pendingRewards' onChange={this.handleChange}/>
                            </InputDiv>
                            <InputDiv className="input">
                                <h3>Amount in Wallet</h3>
                                <MathInput type="number" autoComplete='off' id="wallet" placeholder="Tokens in your wallet" name='wallet' onChange={this.handleChange}/>
                            </InputDiv>
                        </InputContainer2>
                        <RightSide>

                            <InfoBox className='info-box'>
                                <h3>How Nodes Work</h3>
                                <p>
                                    Nodes have become a big trend in the DeFi space. These investment types allow holders to recieve base awards depending on
                                    the node type for the project you choose. This node calculator provides you with the tools to visualize your investment 
                                    given the inputs that you put into the fields.
                                </p>
                            </InfoBox>
                            <div className='outputs-div'>
                            <OutputContainer className="outputs">
                                <div className="output">
                                    <h3>Days Until next Node</h3>
                                    <h2 id="nextnode" style={{color: this.state.outputs[1][0]}}>{this.state.outputs[0][0]}</h2>
                                </div>
                                <div className="output">
                                    <h3>Days Until Compound Goal</h3>
                                    <h2 id="compoundoutput" style={{color: this.state.outputs[1][1]}}>{this.state.outputs[0][1]}</h2>
                                </div>
                                <div className="output">
                                    <h3>Days Until Profit Goal</h3>
                                    <h2 id="profitgoaloutput" style={{color: this.state.outputs[1][2]}}>{this.state.outputs[0][2]}</h2>
                                </div>
                                <div className="output">
                                    <h3>Your Daily Rewards ($)</h3>
                                    <h2 id="dailyrewards" style={{color: this.state.outputs[1][3]}}>{this.state.outputs[0][3]}</h2>
                                </div>
                                
                            </OutputContainer></div>
                            
                        </RightSide>
                        
                    </Container12>
                </FullContainer>
                <div className='outputs-hidden'>
                <FullContainer sx={{padding: '1rem', marginTop:'1rem'}} >
                    <div className="output">
                        <h3>Days Until next Node</h3>
                        <h2 id="nextnode" style={{color: this.state.outputs[1][0]}}>{this.state.outputs[0][0]}</h2>
                    </div>
                    <div className="output">
                        <h3>Days Until Compound Goal</h3>
                        <h2 id="compoundoutput" style={{color: this.state.outputs[1][1]}}>{this.state.outputs[0][1]}</h2>
                    </div>
                    <div className="output">
                        <h3>Days Until Profit Goal</h3>
                        <h2 id="profitgoaloutput" style={{color: this.state.outputs[1][2]}}>{this.state.outputs[0][2]}</h2>
                    </div>
                    <div className="output">
                        <h3>Your Daily Rewards ($)</h3>
                        <h2 id="dailyrewards" style={{color: this.state.outputs[1][3]}}>{this.state.outputs[0][3]}</h2>
                    </div>
                </FullContainer></div>
                <div className='info-hidden'>
                <FullContainer sx={{padding: '1rem', marginTop:'1rem', marginBot: '2rem'}} >
                    <h3>How Nodes Work</h3>
                    <p>
                        Nodes have become a big trend in the DeFi space. These investment types allow holders to recieve base awards depending on
                        the node type for the project you choose. This node calculator provides you with the tools to visualize your investment 
                        given the inputs that you put into the fields.
                    </p>
                </FullContainer></div>
                </motion.div>
            </Body>
            
            
            
        )
    }
}

