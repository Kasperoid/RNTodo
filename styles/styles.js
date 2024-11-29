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
    borderRadius: 10,
    padding: 15,
    backgroundColor: 'white',
    shadowColor: '#e28533',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17,
  },

  titleH1: {
    color: 'black',
    fontSize: 26,
    fontWeight: 600,
    marginBottom: 16,
  },

  titleH2: {
    color: 'black',
    fontWeight: 600,
    fontSize: 22,
    marginBottom: 14,
  },

  inputTextCustom: {
    borderWidth: 1,
    borderColor: '#e28533',
    borderRadius: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
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
    gap: 10,
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

  tagBtn: {
    flex: 1,
    minHeight: 50,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#e28533',
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 5,
  },

  selectTagOptionContainer: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 30,
    margin: 5,
    borderColor: '#e28533',
  },

  avatarBtnContainer: {
    backgroundColor: 'white',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },

  commonText: {
    color: 'black',
    fontWeight: 600,
    fontSize: 16,
  },

  separator: {
    height: 1,
    backgroundColor: '#e28533',
    marginVertical: 10,
    opacity: 0.4,
  },

  loadingBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
    zIndex: 2,
  },
});
