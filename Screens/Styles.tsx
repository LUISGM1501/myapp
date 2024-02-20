import {StyleSheet, Dimensions} from "react-native";

/*
Azul Profundo: #1E90FF
*/ 

const styles = StyleSheet.create({
    tittle: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      color: "#6f6f6f"
    },
    ButtonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    Container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    mainContainer: {
      flex: 1,
      backgroundColor: 'white', // Cambia el color de fondo aquí
    },
    whiteText: {
      color: "#FFFFFF",
      fontSize: 20,
      textAlign: 'center', // Esto centra el texto horizontalmente
      textAlignVertical : 'center', // Esto centra el texto verticalmente
    },
    textInput: {
      borderColor: "#6f6f6f",
      color: "#000",
      fontSize: 18,
      borderWidth: 1,
      width: Dimensions.get("screen").width*0.7,
      borderRadius: 10,
      paddingLeft: 15,
      margin: 10,
    },
    inputContainer: {
      marginTop: 20,
      marginLeft: 20,
      marginRight: 20,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    Regulartext:{
      color: "#000",
      fontSize: 20,
      textAlign: 'center', // Esto centra el texto horizontalmente
      textAlignVertical : 'center', // Esto centra el texto verticalmente
    },
    text:{
      color: "#808080",
      fontSize: 15,
      padding: 15,
      margin: -10,
    },
    Subtittletext:{
      color: "#000",
      fontSize: 20,
      marginTop: 10,
      marginLeft:10, 
    },
    textDone:{
      color: "#6f6f6f",
      fontSize: 18,
      textDecorationLine: "line-through",
      paddingLeft: 15,
    },
    addButton: {
      backgroundColor: "#1E90FF",
      justifyContent: "center",
      alignItems: "center",
      width: Dimensions.get("screen").width*0.55,
      height: 45,
      borderRadius: 10,
    },
    removeButton:{
      backgroundColor: "#F33D3D",
      justifyContent: "center",
      alignItems: "center",
      width: Dimensions.get("screen").width*0.25,
      borderRadius: 10,
      paddingHorizontal: 15,
    },
    scrollContainer: {
      marginTop: 20,
    },
    itemContainer:{
      paddingVertical: 20,
      paddingLeft: 15,
      marginRight: 20,
      borderBottomColor: "#e4e4e4",
      borderBottomWidth: 1,
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });

  export default styles;