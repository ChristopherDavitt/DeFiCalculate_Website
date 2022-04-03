export const pageVariants = {
    initial: {
      opacity: 0,
      
      scale: 0.9
    },
    in: {
      opacity: 1,
      
      scale: 1
    },
    out: {
      opacity: 0,

      scale: 0.8
    }
}

export const pageTransition = {
    type: 'spring',
    ease: 'anticipate',
    duration: '.5'
}

