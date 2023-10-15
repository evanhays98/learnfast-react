/*const basicColors = {
  yellowGradient: 'linear-gradient(180deg, #D39C39 0%, #CB9F5F 100%)',
  darkGradient: 'linear-gradient(200deg, rgba(50, 50, 38, 100) 0%, rgba(26, 26, 18, 100) 40%, rgba(0, 7, 6, 100) 100%)',
  lightGray: '#E2E2D5',
  darkGray: '#1E1E1E',
  transparentDarkGray: 'rgba(45, 45, 34, 0.33)',
  lightBeige: '#C9B27A',
  transparentYellow: '#FFD70020',
  orange: '#A77928',
  darkOrange: '#C49734',
  lightOrange: '#D5AC53',
  gold: '#d2a046',
  transparentDarkGray2: 'rgba(45, 45, 34, 0.33)',
  brown: '#784D0C',
  brownGradiant: 'linear-gradient(180deg, #784D0C 0%, #4C2D00 100%)',
  transparent: '#FFFFFF00',
  black: '#000000',
};*/
/*
const basicColors = {
  yellowGradient: 'linear-gradient(180deg, #8B5FB5 0%, #D0A9F5 100%)',
  darkGradient: 'linear-gradient(200deg, #292038 0%, #1E1E1E 40%, #000000 100%)',
  lightGray: '#dad5e2',
  darkGray: '#3B2D4F',
  transparentDarkGray: 'rgba(45, 45, 34, 0.33)',
  lightBeige: '#D0A9F5',
  transparentYellow: '#D0A9F520',
  orange: '#7B4D8B',
  darkOrange: '#9B6DA5',
  lightOrange: '#B57EBF',
  gold: '#C38FD8',
  transparentDarkGray2: 'rgba(45, 45, 34, 0.33)',
  brown: '#6C4CC4',
  brownGradiant: 'linear-gradient(180deg, #6C4CC4 0%, #6C4CC4 100%)',
  transparent: '#FFFFFF00',
  black: '#000000',
};
*/
const basicColors = {
  yellowGradient: `linear-gradient(180deg, ${'#505471'} 0%, ${'#2F283DAA'} 80%, ${'#1D1B2F22'} 100%)`, // header background
  darkGradient: `linear-gradient(200deg, ${'#29343E'} 0%, ${'#070C19'} 40%, ${'#0A042C'} 100%)`, // page background
  lightGray: '#e4ecec', // text color primary
  lightBeige: '#FF82FE', // text color secondary
  transparentYellow: 'rgba(135,175,235,0.13)', // background button color secondary
  orange: '#F66550', // strong color text
  transparentDarkGray: 'rgba(30,39,51,0.33)', // background container color primary
  brownGradiant: `linear-gradient(180deg, ${'#FFC05F'} 0%, ${'#FF7E51'} 100%)`, // background button color primary
  transparent: '#FFFFFF00', // transparent
  black: '#000000', // black
  red: '#b93333', // red
  green: '#3da23d', // green
};

/*const basicColors = {
  yellowGradient: `linear-gradient(180deg, ${'#7b1a1a'} 0%, ${'#8b0000'} 100%)`,
  darkGradient: `linear-gradient(200deg, ${'#4c0000'} 0%, ${'#2d0000'} 40%, ${'#000000'} 100%)`,
  lightGray: '#e4ecec',
  lightBeige: '#8b0000',
  transparentYellow: '#8b000020',
  orange: '#7b1a1a',
  transparentDarkGray: 'rgba(76,0,0,0.33)',
  brownGradiant: `linear-gradient(180deg, ${'#7b1a1a'} 0%, ${'#8b0000'} 100%)`,
  transparent: '#FFFFFF00',
  black: '#000000',
};*/

export type Colors = keyof typeof basicColors;
export const ColorsTest = {
  yellowGradient: 'yellowGradient' as Colors,
  darkGradient: 'darkGradient' as Colors,
  lightGray: 'lightGray' as Colors,
  darkGray: 'darkGray' as Colors,
  transparentDarkGray: 'transparentDarkGray' as Colors,
  lightBeige: 'lightBeige' as Colors,
  transparentYellow: 'transparentYellow' as Colors,
  orange: 'orange' as Colors,
  brownGradiant: 'brownGradiant' as Colors,
  transparent: 'transparent' as Colors,
  black: 'black' as Colors,
  red: 'red' as Colors,
  green: 'green' as Colors,
};

export const theme = {
  colors: basicColors,
  marginBase: 8,
  basicFlex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  boxShadow: {
    std: `0px 0px 10px 4px ${basicColors.black}38`,
  },
  icon: {
    large: 24,
    normal: 20,
    low: 16,
  },
  borderRadius: {
    std: 8,
    large: 16,
  },
  fonts: {
    h1: {
      fontFamily: 'Kodchasan, sans-serif',
      color: basicColors.lightGray,
      fontWeight: 900,
      fontSize: 44,
      lineHeight: 1.5,
    },
    h2: {
      fontFamily: 'Consolas, sans-serif',
      color: basicColors.lightGray,
      fontWeight: 900,
      fontSize: 35,
      lineHeight: 1.5,
    },
    h3: {
      fontFamily: 'Kodchasan, sans-serif',
      color: basicColors.lightGray,
      fontWeight: 900,
      fontSize: 28,
      lineHeight: 1.5,
    },
    h4: {
      fontFamily: 'Kodchasan, sans-serif',
      color: basicColors.lightGray,
      fontWeight: 700,
      fontSize: 20,
      lineHeight: 1.5,
    },
    h5: {
      fontFamily: 'Kodchasan, sans-serif',
      color: basicColors.lightGray,
      fontWeight: 700,
      fontSize: 16,
      lineHeight: 1.5,
    },
    body: {
      fontFamily: 'Kodchasan, sans-serif',
      color: basicColors.lightGray,
      fontWeight: 400,
      fontSize: 16,
      lineHeight: 1.5,
    },
    caption: {
      fontFamily: 'Kodchasan, sans-serif',
      color: basicColors.lightGray,
      fontWeight: 400,
      fontSize: 14,
      lineHeight: 1.5,
    },
    label: {
      fontFamily: 'Kodchasan, sans-serif',
      color: basicColors.lightGray,
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: 14,
    },
    calendarText: {
      fontFamily: 'Kodchasan, sans-serif',
      color: basicColors.lightGray,
      fontWeight: 400,
      fontSize: 12,
      lineHeight: 1.5,
    },
  },

};

export type Theme = typeof theme