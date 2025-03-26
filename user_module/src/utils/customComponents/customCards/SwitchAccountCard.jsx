import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {theme} from '../../../styles/theme';

const {width, height} = Dimensions.get('screen');

const SwitchAccountCard = ({onAccountPress, accounts, activeAccountId}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>SWITCH ACCOUNT</Text>

      <View style={styles.accountsContainer}>
        {accounts.map(account => (
          <TouchableOpacity
            key={account.id}
            style={styles.accountItem}
            onPress={() => onAccountPress(account.id)}
            activeOpacity={0.8}>
            <Image
              source={
                account.image ||
                require('../../../assets/placeHolder/default_avatar.png')
              }
              style={[
                styles.accountImage,
                account.id === activeAccountId && styles.activeAccountImage,
              ]}
            />
            {account.id === activeAccountId && (
              <View style={styles.activeIndicator} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default SwitchAccountCard;

const styles = StyleSheet.create({
  container: {
    padding: width * 0.04,
    borderWidth: 4,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.large,
    backgroundColor: theme.colors.white,
  },
  label: {
    fontSize: width * 0.06,
    fontFamily: theme.typography.MontserratfontFamilySemiBold,
    color: theme.colors.primary,
    textTransform: 'uppercase',
    marginBottom: height * 0.02,
    textAlign: 'center',
  },
  accountsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: width * 0.06,
  },
  accountItem: {
    alignItems: 'center',
  },
  accountImage: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: width * 0.06,
    borderWidth: 2,
    borderColor: theme.colors.lightGray,
  },
  activeAccountImage: {
    borderColor: theme.colors.primary,
  },
  activeIndicator: {
    width: width * 0.12,
    height: 4,
    backgroundColor: theme.colors.primary,
    marginTop: height * 0.01,
    borderRadius: 2,
  },
});
