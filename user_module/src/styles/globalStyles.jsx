import {theme} from './theme';
import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },

  textPrimary: {
    color: theme.colors.primary,
    fontFamily: theme.typography.RobotofontFamilyRegular,
    fontSize: theme.typography.fontSize.md,
  },

  textSecondary: {
    color: theme.colors.secondary,
    fontFamily: theme.typography.RobotofontFamilyRegular,
    fontSize: theme.typography.fontSize.sm,
  },

  textWhite: {
    color: theme.colors.white,
    fontFamily: theme.typography.fontFamilyMedium,
    fontSize: theme.typography.fontSize.sm,
  },

  textBlack: {
    color: theme.colors.black,
    fontFamily: theme.typography.RobotofontFamilySemiBold,
    fontSize: theme.typography.fontSize.md,
  },

  textError: {
    color: theme.colors.error,
    fontFamily: theme.typography.fontFamilyMedium,
    fontSize: theme.typography.fontSize.sm,
  },

  buttonPrimary: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing(2),
    paddingHorizontal: theme.spacing(4),
    borderRadius: theme.borderRadius.medium,
    alignItems: 'center',
  },

  buttonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.PoppinsfontFamilySemiBold,
    top: 2,
  },

  inputContainer: {
    marginVertical: theme.spacing(1.5),
  },

  input: {
    backgroundColor: theme.colors.white,
    borderWidth: 3,
    borderColor: theme.colors.gray,
    borderRadius: theme.borderRadius.medium,
    paddingVertical: theme.spacing(1.5),
    paddingHorizontal: theme.spacing(4.5),
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamilyRegular,
    color: theme.colors.black,
  },

  inputLabel: {
    fontFamily: theme.typography.MontserratfontFamilyMedium,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.black,
  },

  card: {
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing(0.6),
    gap: theme.gap(2),
    shadowColor: theme.colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 7,
    elevation: 6,
  },

  cardTitle: {
    fontFamily: theme.typography.fontFamilyMedium,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.black,
    marginBottom: theme.spacing(1),
  },

  cardContent: {
    fontFamily: theme.typography.fontFamilyRegular,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textPrimary,
  },

  divider: {
    height: 1,
    backgroundColor: theme.colors.primary,
    marginVertical: theme.spacing(2),
  },
});
