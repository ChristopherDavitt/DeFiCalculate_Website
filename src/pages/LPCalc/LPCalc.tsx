import React, { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion';
import { InputContainer2, Body, RightSide, TokenInput, InfoBox, TokenSearchContainer,
     FullContainer, Container12, HeaderContainer, OutputContainer, Hr, Vr,
      MathInput, InputDiv, Hidden } from '../../components/sharedComponents/styledComponents';
import * as FaIcons from 'react-icons/fa';
import axios from 'axios';
import { pageVariants, pageStyle, pageTransition } from '../../components/sharedComponents/FramerMotionPrompts/FramerMotionPrompts'
import coinIcon from '../../components/Assets/images/coinIcon.svg'

function LPCalc() {
    
    const [tokPrice1, setTokPrice1] = useState(0);
    const [tokPrice2, setTokPrice2] = useState(0);
    const [investment, setInvestment] = useState(0);
    const [apr, setAPR] = useState(0);
    const [fee, setFee] = useState(0);
    const [days, setDays] = useState(0);
    const [futTokPrice1, setFutTokPrice1] = useState(0);
    const [futTokPrice2, setFutTokPrice2] = useState(0);
    const [outputs, setOutputs] = useState()
    
    function calculateOutputs(){
        if (tokPrice1 > 0 || isNaN(tokPrice1) != true){
        } else{
            return [['N/A','N/A','N/A','N/A'], ['gray','gray','gray','gray']]
        } if (tokPrice2 > 0 || isNaN(tokPrice2) != true){
        } else{
            return [['N/A','N/A','N/A','N/A'], ['gray','gray','gray','gray']]
        } if (investment > 0 || isNaN(investment) != true){
        } else{
            return [['N/A','N/A','N/A','N/A'], ['gray','gray','gray','gray']]
        } if (apr > 0){
            if  (futTokPrice1 == 0 || isNaN(futTokPrice1)){
                var futurePrice1 = tokPrice1
            } else {
                var futurePrice1 = futTokPrice1
            }
            if  (futTokPrice2 == 0 || isNaN(futTokPrice2)){
                var futurePrice2 = tokPrice2
            }else {
                var futurePrice2 = futTokPrice2
            }
            let amountXBefore = investment/(2 * tokPrice1) // not fees
            let amountYBefore = investment/(2* tokPrice2) // not fees

            let amount_x = (investment - investment*(fee/100))/(2 * tokPrice1) // with fees
            let amount_y = (investment - investment*(fee/100))/(2* tokPrice2) // with fees

            let product_constant = amount_x * amount_y 
            let future_price_ratio = futurePrice1 / futurePrice2
            let future_quantity_a = (product_constant/future_price_ratio)**0.5
            let future_quantity_b = (product_constant* future_price_ratio)**0.5

            let value_before_interest = (future_quantity_a * futurePrice1) + (futurePrice2 * future_quantity_b)
            let value_plus_interest = value_before_interest*(1+(apr/36500)*(days))
            let interestAlone = (value_plus_interest-value_before_interest)

            let profit_loss = value_plus_interest - (amountXBefore*tokPrice1 + amountYBefore * tokPrice2)

            let if_held = (amount_x * futurePrice1) + (futurePrice2 * amount_y) // for impermanent loss
            let actual_if_held = (amountXBefore * futurePrice1) + (futurePrice2 * amountYBefore) // for impermanent loss
            let impermanent_loss = if_held - value_before_interest
            let difference =  actual_if_held - investment
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
            }
            let colorList = ['red', plColor, 'green', diffColor]
            return [outputList, colorList]
        } else {
            return [['N/A','N/A','N/A','N/A'], ['gray','gray','gray','gray']]
        }
    }


    // This is the segment of the Search Bar
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');

    async function fetchData1() {
        try {
            const result = await axios.get(`https://api.coingecko.com/api/v3/search?query=${value1}`)
            console.log(result.data);
            return result.data.coins.slice(0, 12)
        } catch (error) {
            console.error(error);
            
        }
    }
    async function fetchData2() {
        try {
            const result = await axios.get(`https://api.coingecko.com/api/v3/search?query=${value2}`)
            console.log(result.data);
            return result.data.coins.slice(0,12)
        } catch (error) {
            console.error(error);
        }   
    }

    const [list1, setList1] = useState<any[]>([])
    const [list2, setList2] = useState<any[]>([])
    
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
    function makeDatalist2() {
        let mounted = true;
        fetchData2()
        .then((items: React.SetStateAction<any[]>) => {
            if(mounted) {
            setList2(items)
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
    function GetImageAndPrice2(event: string) {
        for (var i = 0; i < list2.length; i++) {       
          if (list2[i].name == event) {
            // An item was selected from the list!
            // yourCallbackHere()
            console.log('getting prices')
            setTokenName2(list2[i].symbol)
            setTokenImage2(list2[i].large)
            getPrice2(list2[i].id)
            setColor2('black')
            break;
          } else {
            setTokenName2('Token 2')
            setTokenImage2(coinIcon)
            setDisplayPrice2('N/A')
            setColor2('gray')
          }
        }
      }
    async function getPrice2(id:string){
        try {
            const result = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`)
            console.log(result.data);
            setDisplayPrice2('$' + result.data[id]['usd'])
        } catch (error) {
            console.error(error);
        }  
    } 
   
    const [tokenImage1, setTokenImage1] = useState(coinIcon)
    const [tokenImage2, setTokenImage2] = useState(coinIcon)
    const [displayPrice1, setDisplayPrice1] = useState('N/A')
    const [displayPrice2, setDisplayPrice2] = useState('N/A')
    const [tokenName1, setTokenName1] = useState('Token 1')
    const [tokenName2, setTokenName2] = useState('Token 2')
    const [color2, setColor2] = useState('gray')
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
                    <img style={{transition: '550ms'}} src={tokenImage1} width='100px' alt="token1-logo" />
                    <div className="headerContent">
                        <h3 className="pricebot">{tokenName1} Price</h3>
                        <h1 style={{transition: '550ms', color: color1}} id="pricehere">{displayPrice1}</h1>
                    </div>
                    <div></div>
                    <img src={tokenImage2} width='100px' alt="token1-logo" />
                    <div className="headerContent">
                        <h3 className="pricebot">{tokenName2} Price</h3>
                        <h1 style={{transition: '550ms',color: color2}} id="pricehere">{displayPrice2}</h1>
                    </div>
                </HeaderContainer>
                <Hr></Hr>
                <Container12 className="contents">    
                    <InputContainer2 className="container inputs">
                        <InputDiv className="input">
                            <h3>Search Token 1</h3>
                            <TokenInput type="text" id="wallet" list='search1' autoComplete='off' placeholder="Find Coin" value={value1} 
                            onChange={(e) => {setValue1(e.target.value); makeDatalist1(); GetImageAndPrice1(e.target.value)}} />
                            <datalist id='search1'>
                                {list1.map(item => <option key={item.id} id={item.large} value={item.name}>{item.symbol}</option>)}
                            </datalist>
                        
                        </InputDiv>
                        <InputDiv className="input">
                            <h3>Search Token 2</h3>
                            <TokenInput type="text" list='search2' id="compound" autoComplete='off' placeholder="Find Coin" value={value2} 
                            onChange={(e) => { setValue2(e.target.value); makeDatalist2(); GetImageAndPrice2(e.target.value)}} />
                            <datalist id='search2'>
                                {list2.map(item => <option key={item.id} id={item.large} value={item.name}>{item.symbol}</option>)}
                            </datalist>

                        </InputDiv>
                        <InputDiv className="input">
                            <h3>Initial Price 1</h3>
                            <MathInput type="number" id="price1" autoComplete='off' placeholder="Initial Price ($)" onChange={e => setTokPrice1(Number(e.target.value))}/>
                        </InputDiv>
                        <InputDiv className="input">
                            <h3>Initial Price 2</h3>
                            <MathInput type="number" id="price2" autoComplete='off' placeholder="Initial Price ($)" onChange={e => setTokPrice2(Number(e.target.value))}/>
                        </InputDiv>
                        <InputDiv className="input">
                            <h3>Initial Investment</h3>
                            <MathInput type="number" id="investment" autoComplete='off' placeholder="Initial Investment ($)" onChange={e => setInvestment(Number(e.target.value))}/>
                        </InputDiv>
                        <InputDiv className="input">
                            <h3>APR (%)</h3>
                            <MathInput type="number" id="apr" autoComplete='off' placeholder="Pool APR (%)" onChange={e => setAPR(Number(e.target.value))}/>
                        </InputDiv>
                        <InputDiv className="input">
                            <h3>Days In Pool</h3>
                            <MathInput type="number" id="days" autoComplete='off' placeholder="Days planned to hold" onChange={e => setDays(Number(e.target.value))}/>
                        </InputDiv>
                        <InputDiv className="input">
                            <h3>Deposit Fee</h3>
                            <MathInput type="number" id="fee" autoComplete='off' placeholder="0%" onChange={e => setFee(Number(e.target.value))}/>
                        </InputDiv>
                        <InputDiv className="input">
                            <h3>Future Price 1</h3>
                            <MathInput type="number" id="futTokPrice1" autoComplete='off' placeholder="Future Price 1 ($)" onChange={e => setFutTokPrice1(Number(e.target.value))}/>
                        </InputDiv>
                        <InputDiv className="input">
                            <h3>Future Price 2</h3>
                            <MathInput type="number" id="futTokPrice2" autoComplete='off' placeholder="Future Price 2 ($)" onChange={e => setFutTokPrice2(Number(e.target.value))}/>
                        </InputDiv>
                    </InputContainer2>
                    <RightSide>
                        <InfoBox>
                            <h3>What to know about Liquidity Pools and Yield Farms</h3>
                            <p>
                                One of the main risks with liquidity pools (LP) is Impermanent Loss caused by a change in price between the pooled assets.
                                This aspect of liquidity pools becomes negligible when a pool's APR (calculated under Interest Earned) is high enough to offset it.
                            </p>
                        </InfoBox>
                        <OutputContainer className="outputs">
                            <div className="output">
                                <h3>Interest Earned</h3>
                                <h2 id="interest" style={{color: String(calculateOutputs()[1][2])}}>{calculateOutputs()[0][2]}</h2>
                            </div>
                            <div className="output">
                                <h3>Total Profit</h3>
                                <h2 id="profit" style={{color: String(calculateOutputs()[1][1])}}>{calculateOutputs()[0][1]}</h2>
                            </div>
                            <div className="output">
                                <h3>Impermanent Loss</h3>
                                <h2 id="impermanent-loss" style={{color: String(calculateOutputs()[1][0])}}>{calculateOutputs()[0][0]}</h2>
                            </div>
                            <div className="output">
                                <h3>If Held P&L</h3>
                                <h2 id="impermanent-loss" style={{color: String(calculateOutputs()[1][3])}}>{calculateOutputs()[0][3]}</h2>
                            </div>
                        </OutputContainer>
                    </RightSide>
                </Container12>
            </FullContainer>
            </motion.div>
        </Body>
       
    )
}

export default LPCalc