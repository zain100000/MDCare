export const theme = {
  colors: {
    primary: '#07BBC6',
    secondary: '#035B60',
    white: '#FFFFFF',
    black: '#000',
    error: '#Ff0000',
    warning: '#FFFF00',
    success: '#28a745',
    dark: '#101828',
    lightDark: '#1C2333',
    gray: '#D0D5DD',
  },

  typography: {
    PoppinsfontFamilyBold: 'Poppins-Bold',
    PoppinsfontFamilyMedium: 'Poppins-Medium',
    PoppinsfontFamilyRegular: 'Poppins-Regular',
    PoppinsfontFamilySemiBold: 'Poppins-SemiBold',

    MontserratfontFamilyBold: 'Montserrat-Bold',
    MontserratfontFamilyMedium: 'Montserrat-Medium',
    MontserratfontFamilyRegular: 'Montserrat-Regular',
    MontserratfontFamilySemiBold: 'Montserrat-SemiBold',

    RobotofontFamilyBold: 'Roboto-Bold',
    RobotofontFamilyMedium: 'Roboto-Medium',
    RobotofontFamilyRegular: 'Roboto-Regular',
    RobotofontFamilySemiBold: 'Roboto-SemiBold',

    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 20,
      xl: 24,
      xxl: 32,
    },
    lineHeight: {
      xs: 16,
      sm: 20,
      md: 24,
      lg: 28,
      xl: 32,
      xxl: 40,
    },
  },

  spacing: factor => factor * 8,

  gap: factor => factor * 8,

  borderRadius: {
    small: 4,
    medium: 8,
    large: 16,
    circle: 50,
  },

  elevation: {
    depth1: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    depth2: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 3},
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 6,
    },
    depth3: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 6},
      shadowOpacity: 0.4,
      shadowRadius: 10,
      elevation: 12,
    },
  },
};
