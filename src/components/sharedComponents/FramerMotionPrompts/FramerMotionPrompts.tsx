export const pageVariants = {
    initial: {
        opacity: 0,
        y: '-100vw',
        scale: 2   
    },
    in: {
        opacity: 1,
        y:0,
        scale: 1
    },
    out: {
        opacity: 0,
        y:'-100vh',
        scale: 1.2
    }
}

export const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: '1'
}

export const pageStyle = {
    position: 'absolute'
}