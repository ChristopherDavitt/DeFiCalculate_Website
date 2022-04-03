import React, { useRef, useState, useEffect, useCallback, Component } from 'react'
import { motion } from 'framer-motion';
import { InputContainer2, Body, RightSide, TokenInput, InfoBox, TokenSearchContainer,
     FullContainer, Container12, HeaderContainer, OutputContainer, Hr, Vr,
      MathInput, InputDiv, Hidden } from '../../components/sharedComponents/styledComponents';

import axios from 'axios';
import { pageVariants, pageTransition } from '../../components/sharedComponents/FramerMotionPrompts/FramerMotionPrompts'
import coinIcon from '../../components/Assets/images/coinIcon.svg'
import SelectSearch, { fuzzySearch } from 'react-select-search'




export default class LPCalc extends Component<{}, { futTokPrice2: number, tokPrice1: number, tokPrice2: number,
                                                        investment: number, apr: number,fee: number,days: number,futTokPrice1: number,
                                                        outputs: any[],value1 : string,value2: string,tokenImage1: string,tokenImage2: string,displayPrice1: string,
                                                        displayPrice2: string,tokenName1: string,tokenName2: string,color2: string,color1: string,
                                                        list1: any[], list2: any[] }> {
  constructor(props: any){
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch1 = this.handleSearch1.bind(this);
    this.handleSearch2 = this.handleSearch2.bind(this);
    this.math = this.math.bind(this)
    this.state = {
        tokPrice1: 0, 
        tokPrice2: 0,
        investment: 0,
        apr: 0,
        fee: 0,
        days: 0,
        futTokPrice2: 0,
        futTokPrice1: 0,
        outputs: [ ['N/A','N/A','N/A','N/A'] , ['gray','gray','gray','gray'] ],
        value1 : '',
        value2: '',
        tokenImage1: coinIcon,
        tokenImage2: coinIcon,
        displayPrice1: 'N/A',
        displayPrice2: 'N/A',
        tokenName1: 'Token 1',
        tokenName2: 'Token 2',
        color2: 'gray',
        color1: 'gray',
        list1: [],
        list2: []
    };
  }

  handleChange(event: any) {
    this.setState({ ...this.state, [event.target.name]: event.target.value }, this.math);
  }

  handleSearch1(value: any){
    this.setState({ ...this.state, value1: value})
    
  }
  handleSearch2(value: any){
    this.setState({ ...this.state, value2: value})
    
  }


  math() {
    if (this.state.tokPrice1 <= 0 || isNaN(this.state.tokPrice1) == true){
        this.setState( { ...this.state, outputs : [ ['N/A','N/A','N/A','N/A'] , ['gray','gray','gray','gray'] ] } )
        return 0;
    } else if (this.state.tokPrice2 <= 0 || isNaN(this.state.tokPrice2) == true){
        this.setState( { outputs : [ ['N/A','N/A','N/A','N/A'] , ['gray','gray','gray','gray'] ] } )
        return 0
    } else if (this.state.investment <= 0 || isNaN(this.state.investment) == true){
        this.setState( { outputs : [ ['N/A','N/A','N/A','N/A'] , ['gray','gray','gray','gray'] ] } )
        return 0
    } else if (this.state.apr > 0){
        if (this.state.futTokPrice1 <= 0 || isNaN(this.state.futTokPrice1)){
            var futurePrice1 = this.state.tokPrice1
        } else {
            var futurePrice1 = this.state.futTokPrice1
        } if (this.state.futTokPrice2 <= 0 || isNaN(this.state.futTokPrice2)){
            var futurePrice2 = this.state.tokPrice2
        } else {
            var futurePrice2 = this.state.futTokPrice2
        }
        let amountXBefore = this.state.investment/(2 * this.state.tokPrice1) // not fees
        let amountYBefore = this.state.investment/(2* this.state.tokPrice2) // not fees

        let amount_x = (this.state.investment - this.state.investment*(this.state.fee/100))/(2 * this.state.tokPrice1) // with fees
        let amount_y = (this.state.investment - this.state.investment*(this.state.fee/100))/(2 * this.state.tokPrice2) // with fees

        let product_constant = amount_x * amount_y 
        let future_price_ratio = futurePrice1 / futurePrice2
        let future_quantity_a = (product_constant/future_price_ratio)**0.5
        let future_quantity_b = (product_constant* future_price_ratio)**0.5

        let value_before_interest = (future_quantity_a * futurePrice1) + (futurePrice2 * future_quantity_b)
        let value_plus_interest = value_before_interest*(1+(this.state.apr/36500)*(this.state.days))
        let interestAlone = (value_plus_interest-value_before_interest)

        let profit_loss = value_plus_interest - (amountXBefore*this.state.tokPrice1 + amountYBefore * this.state.tokPrice2)

        let if_held = (amount_x * futurePrice1) + (futurePrice2 * amount_y) // for impermanent loss
        let actual_if_held = (amountXBefore * futurePrice1) + (futurePrice2 * amountYBefore) // for impermanent loss
        let impermanent_loss = if_held - value_before_interest
        let difference =  actual_if_held - this.state.investment
        let outputList = [-impermanent_loss.toFixed(2), profit_loss.toFixed(2), interestAlone.toFixed(2), difference.toFixed(2)]
        if (profit_loss > 0){
            var plColor = 'green'
        } else if (profit_loss < 0){
            var plColor = 'red'
        } else {
            var plColor = 'gray'
        }
        if (difference > 0){
            var diffColor = 'green'
        } else if (difference < 0){
            var diffColor = 'red'
        } else {
            var diffColor = 'gray'
        }if (impermanent_loss == 0){
            var ilColor = 'gray'
        }else{
            var ilColor = 'red'
        }
        let colorList = [ilColor, plColor, 'green', diffColor]
        console.log('calculating')
        this.setState( {outputs : [ outputList , colorList ] } )
        return 0
        
    } else {
        this.setState( { outputs : [ ['N/A','N/A','N/A','N/A'] , ['gray','gray','gray','gray'] ] } )
        return 0
    }
}
    async fetchData() {
        try {
            const result = await axios.get(`https://api.coingecko.com/api/v3/search?query=`)
            console.log(result.data);
            return result.data.coins
        } catch (error) {
            console.error(error);
            
        }
    }
    
    
    
    async UNSAFE_componentWillMount() {
        let mounted = true;
        await this.fetchData()
        .then((items: any[]) => {
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
        console.log(value)
        for (var i = 0; i < this.state.list2.length; i++) {
            if (this.state.list2[i].id == value) {
                // An item was selected from the list!
                // yourCallbackHere()
                this.getPrice1(i);
                return;
            }
        }
    }
  
    async getPrice1(i:number){
        var id = this.state.list2[i].id
        try {
            const result = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`)
            console.log(result.data);
            this.setState( { ...this.state, displayPrice1 : '$' + result.data[id]['usd'], tokenName1: this.state.list2[i].symbol,
            tokenImage1: this.state.list2[i].large,
            color1: 'black' } )
        } catch (error) {
            console.error(error);
        }  
    } 
    GetImageAndPrice2(value: string) {
        console.log(value)
        
        for (var i = 0; i <  this.state.list2.length; i++) {       
            if (this.state.list2[i].id == value) {
                // An item was selected from the list!
                // yourCallbackHere()
                this.getPrice2(i);
                break;
            }
        }

    }
            
    async getPrice2(i:number){
        var id = this.state.list2[i].id
        try {
            const result = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`)
            console.log(result.data);
            this.setState( {...this.state, displayPrice2 : '$' + result.data[id]['usd'], tokenName2: this.state.list2[i].symbol,
            tokenImage2: this.state.list2[i].large,
            color2: 'black' } )
        } catch (error) {
            console.error(error);
        }  
    } 


  render() {
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
            <HeaderContainer>
                <img style={{transition: '550ms'}} src={this.state.tokenImage1} width='100px' alt="token1-logo" />
                <div className="headerContent">
                    <h3 className="pricebot">{this.state.tokenName1} Price</h3>
                    <h1 style={{transition: '550ms', color: this.state.color1}} id="pricehere">{this.state.displayPrice1}</h1>
                </div>
                <div></div>
                <img src={this.state.tokenImage2} width='100px' alt="token1-logo" />
                <div className="headerContent">
                    <h3 className="pricebot">{this.state.tokenName2} Price</h3>
                    <h1 style={{transition: '550ms',color: this.state.color2}} id="pricehere">{this.state.displayPrice2}</h1>
                </div>
            </HeaderContainer>
            </div>
            <div className='title'>
                <h1>LP Calculator</h1>
                <img style={{width: '45px'}} src={coinIcon} />
            </div>
            <Hr></Hr>
            
            <Container12 className="contents"> 
                
                <InputContainer2 className="container">
                    
                    <div className='search'>
                    <InputDiv className="input search">
                        <h3>Search Token 1</h3>
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
                    
                    </InputDiv></div>
                    <div className='search'>
                    <InputDiv className="input search">
                        <h3>Search Token 2</h3>
                        <SelectSearch
                            options={this.state.list1}
                            search
                            onChange={x => {this.GetImageAndPrice2(String(x)); this.handleSearch2(String(x))}}
                            value={this.state.value2}
                            placeholder="Find Coin"
                            filterOptions={(options) => {
                                const filter = fuzzySearch(options);

                                return (q) => filter(q).slice(0, 15);
                            }}
                        />

                    </InputDiv></div>
                    <InputDiv className="input">
                        <h3>Initial Price 1</h3>
                        <MathInput type="number" name="tokPrice1" autoComplete='off' placeholder={'Initial price ' + this.state.tokenName1 + ' ($)'} onChange={this.handleChange}/>
                    </InputDiv>
                    <InputDiv className="input">
                        <h3>Initial Price 2</h3>
                        <MathInput type="number" name="tokPrice2" autoComplete='off' placeholder={'Initial price ' + this.state.tokenName2 + ' ($)'} onChange={this.handleChange}/>
                    </InputDiv>
                    <InputDiv className="input">
                        <h3>Initial Investment</h3>
                        <MathInput type="number" name="investment" autoComplete='off' placeholder="Initial Investment ($)" onChange={this.handleChange}/>
                    </InputDiv>
                    <InputDiv className="input">
                        <h3>APR (%)</h3>
                        <MathInput type="number" name="apr" autoComplete='off' placeholder="Pool APR (%)" onChange={this.handleChange}/>
                    </InputDiv>
                    <InputDiv className="input">
                        <h3>Days In Pool</h3>
                        <MathInput type="number" name="days" autoComplete='off' placeholder="Days planned to hold" onChange={this.handleChange}/>
                    </InputDiv>
                    <InputDiv className="input">
                        <h3>Deposit Fee</h3>
                        <MathInput type="number" name="fee" autoComplete='off' placeholder="0%" onChange={this.handleChange}/>
                    </InputDiv>
                    <InputDiv className="input">
                        <h3>Future Price 1</h3>
                        <MathInput type="number" name="futTokPrice1" autoComplete='off' placeholder={'Future Price ' + this.state.tokenName1 + ' ($)'} onChange={this.handleChange}/>
                    </InputDiv>
                    <InputDiv className="input">
                        <h3>Future Price 2</h3>
                        <MathInput type="number" name="futTokPrice2" autoComplete='off' placeholder={'Future Price ' + this.state.tokenName2 + ' ($)'} onChange={this.handleChange}/>
                    </InputDiv>
                    
                </InputContainer2> 
                <RightSide>
                    <InfoBox className='info-box'>
                        <h3>What to know about Liquidity Pools and Yield Farms</h3>
                        <p>
                            One of the main risks with liquidity pools (LP) is Impermanent Loss caused by a change in price between the pooled assets.
                            This aspect of liquidity pools becomes negligible when a pool's APR (calculated under Interest Earned) is high enough to offset it.
                        </p>
                    </InfoBox>
                    <div className='outputs-div'>
                    <OutputContainer className='outputs'>
                        <div className="output">
                            <h3>Interest Earned</h3>
                            <h2 id="interest" style={{color: this.state.outputs[1][2]}}>{this.state.outputs[0][2]}</h2>
                        </div>
                        <div className="output">
                            <h3>Total Profit</h3>
                            <h2 id="profit" style={{color: this.state.outputs[1][1]}}>{this.state.outputs[0][1]}</h2>
                        </div>
                        <div className="output">
                            <h3>Impermanent Loss</h3>
                            <h2 id="impermanent-loss" style={{color: this.state.outputs[1][0]}}>{this.state.outputs[0][0]}</h2>
                        </div>
                        <div className="output">
                            <h3>If Held P&L</h3>
                            <h2 id="difference" style={{color: this.state.outputs[1][3]}}>{this.state.outputs[0][3]}</h2>
                        </div>
                    </OutputContainer></div>
                </RightSide>
            </Container12>
        </FullContainer>
        <div className='outputs-hidden'>
        <FullContainer sx={{padding: '1rem', marginTop:'1rem'}} >
            <div className="output">
                <h3>Interest Earned</h3>
                <h2 id="interest" style={{color: this.state.outputs[1][2]}}>{this.state.outputs[0][2]}</h2>
            </div>
            <div className="output">
                <h3>Total Profit</h3>
                <h2 id="profit" style={{color: this.state.outputs[1][1]}}>{this.state.outputs[0][1]}</h2>
            </div>
            <div className="output">
                <h3>Impermanent Loss</h3>
                <h2 id="impermanent-loss" style={{color: this.state.outputs[1][0]}}>{this.state.outputs[0][0]}</h2>
            </div>
            <div className="output">
                <h3>If Held P&L</h3>
                <h2 id="difference" style={{color: this.state.outputs[1][3]}}>{this.state.outputs[0][3]}</h2>
            </div>
        </FullContainer></div>
        <div className='info-hidden'>
        <FullContainer sx={{padding: '1rem', marginTop:'1rem', marginBot: '2rem'}} >
            <h3>What to know about Liquidity Pools and Yield Farms</h3>
            <p>
                One of the main risks with liquidity pools (LP) is Impermanent Loss caused by a change in price between the pooled assets.
                This aspect of liquidity pools becomes negligible when a pool's APR (calculated under Interest Earned) is high enough to offset it.
            </p>
        </FullContainer></div>
        </motion.div>
    </Body>
    )
  }
}
