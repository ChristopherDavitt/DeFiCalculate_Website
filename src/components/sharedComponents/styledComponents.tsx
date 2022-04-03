import React from 'react';
import { positions, styled } from '@mui/system';

interface Props{
    title: string;
}
export const Body = styled('div')({
    width: '100vw',
    height: '100vh',
})
export const FullContainer = styled('div')({
    border: 'solid 1px black',
    backgroundColor: 'white',
    boxShadow: '10px 10px #060b26',
    maxWidth: '1000px',
    margin: 'auto',
    justifyContent: 'center'
})
export const Container12 = styled('div')({
    
    margin: 'auto',
    paddingTop: '.5rem'
});
export const InputContainer = styled('div')({
    padding: '1rem',
    justifyContent: 'center',
    
});
export const InputContainer2 = styled('div')({
    padding: '1rem',
    justifyContent: 'center',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem'
});
export const OutputContainer = styled('div')({
    padding: '1rem',
    
    alignItems: 'center',
    margin: 'auto'
});
export const RightSide = styled('div')({
    display: 'block',
    marginBottom: 'auto',
})
export const TokenSearchContainer = styled('div')({
    display: 'inline',
    justifyContent: 'center',
});
export const HeaderContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-around',
    gap: '2rem',
    alignItems: 'center',
    padding: '1.5rem',
});
export const InputDiv = styled('div')({
    display: 'grid',
    justifyContent: 'center'
})
export const LogoImg = styled('img')({
    maxWidth: '100px'
})
export const Hr = styled('hr')({
    width: '100%',
    backgroundColor: 'linear-gradient(to right, white, black, white)',
    height: '2px'
})
export const Vr = styled('hr')({
    backgroundImage: 'linear-gradient(rgb(230, 230, 230), rgba(0, 0, 0, 0.75), rgba(240, 240, 240))',
    width: '1px',
    height: '100%',
    display: 'inline-block'
});
export const MathInput = styled('input')({
    border: 'solid 1px black',
    height: '35px',
    fontWeight: 'bold',
    paddingLeft: '.5rem',
    color: 'rgb(58, 58, 58)'
});
export const TokenInput = styled('input')({
    border: 'solid 1px black',
    height: '35px',
    fontWeight: 'bold',
    paddingLeft: '.5rem',
    color: 'rgb(58, 58, 58)'
});
export const InfoBox = styled('div')({
    margin: '1rem',
    marginRight: '2rem',
    padding: '.5rem',
    border: 'solid 1px black',
    boxShadow: '.3rem .3rem black',
    minHeight: '150px',
    backgroundColor: '#EAE8DA',
})
export const Hidden = styled('span')({
    display: 'none',
    visibility: 'hidden'
})