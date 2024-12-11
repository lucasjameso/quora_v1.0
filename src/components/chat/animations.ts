export const slideTransition = {
  type: 'spring',
  damping: 25,
  stiffness: 120
};

export const fadeTransition = {
  type: 'tween',
  duration: 0.2
};

export const messageContainerVariants = {
  initial: {
    x: '100%',
    opacity: 0
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: slideTransition
  },
  exit: {
    x: '-100%',
    opacity: 0,
    transition: fadeTransition
  }
};

export const welcomeScreenVariants = {
  initial: {
    opacity: 1,
    y: 0
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: fadeTransition
  }
};

export const messageItemVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3
    }
  }
};