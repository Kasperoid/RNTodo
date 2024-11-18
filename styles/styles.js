import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    padding: 10,
  },

  pageContainerItemCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  logInContainer: {
    justifyContent: 'space-between',
    width: '80%',
    minHeight: 300,
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
    paddingHorizontal: 20,
  },

  buttonTouchableContainer: {
    borderRadius: 15,
  },

  buttonInnerContainer: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
  },

  buttonPrimary: {
    borderColor: 'white',
    backgroundColor: '#e28533',
  },

  buttonSecondary: {
    borderColor: '#e28533',
    backgroundColor: 'white',
  },

  textButton: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 600,
  },

  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000018',
  },

  modalInnerContainer: {
    borderWidth: 1,
    justifyContent: 'space-between',
    borderColor: '#e28533',
    width: '70%',
    minHeight: 180,
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'white',
  },

  todoItemsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#e285332c',
  },

  buttonCheckedContainer: {
    borderWidth: 1,
    borderColor: '#e28533',
    borderRadius: 15,
    padding: 5,
  },

  buttonAddContainer: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 15,
    backgroundColor: '#e28533',
  },
});
