import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    margin: 10,
  },

  pageContainerItemCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  logInContainer: {
    justifyContent: 'space-between',
    width: '80%',
    height: 250,
    boxShadow: '0px 5px 10px 2px rgba(226, 133, 51, 0.2)',
    borderRadius: 10,
    padding: 15,
  },

  titleH1: {
    fontSize: 26,
    fontWeight: 600,
  },

  inputTextCustom: {
    borderWidth: 1,
    borderColor: '#e28533',
    borderRadius: 10,
  },

  button: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },

  textButton: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 600,
  },
});
