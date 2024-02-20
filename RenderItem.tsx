import React from "react";
import {View, Text, TouchableOpacity} from "react-native";
import styles from './Styles';
import {task} from './App';

export interface ItemProps{
    children: React.ReactNode;
    item: task;
    markDone: (tasks : task) => void;
    deleteFunction: (tasks : task) => void;
}

export default function renderItem({item, markDone, deleteFunction} : ItemProps){
    return (
    <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => markDone(item)}> 
            <Text style={item.done ?  styles.textDone: styles.Regulartext}> {item.tittle} </Text>
            <Text style={styles.Regulartext}> 
                {new Date(item.date).toLocaleDateString()} </Text>
        </TouchableOpacity>
        {
            item.done && // muestra el botton si se cumple la condicion 
            (
            <TouchableOpacity style={styles.removeButton} onPress={() => deleteFunction(item)}>
                <Text style={styles.whiteText}>Eliminar</Text>
            </TouchableOpacity>
            )
        }
    </View>
    );
}