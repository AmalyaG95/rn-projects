import { createHomeStyles } from "@/assets/styles/home.styles";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { Dispatch, SetStateAction } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

type TEditTodo = {
  editText: string;
  setEditText: Dispatch<SetStateAction<string>>;
  onSave: () => void;
  onCancel: () => void;
};

const EditTodo = ({ editText, setEditText, onSave, onCancel }: TEditTodo) => {
  const { colors } = useTheme();
  const styles = createHomeStyles(colors);

  return (
    <View style={styles.editContainer}>
      <TextInput
        style={styles.editInput}
        placeholder="Edit your Todo..."
        placeholderTextColor={colors.textMuted}
        value={editText}
        onChangeText={setEditText}
        autoFocus
        multiline
      />
      <View style={styles.editButtons}>
        <TouchableOpacity onPress={onSave} activeOpacity={0.8}>
          <LinearGradient
            colors={colors.gradients.success}
            style={styles.editButton}
          >
            <Ionicons name="checkmark" size={16} color="#ffffff" />
            <Text style={styles.editButtonText}>Save</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={onCancel} activeOpacity={0.8}>
          <LinearGradient
            colors={colors.gradients.muted}
            style={styles.editButton}
          >
            <Ionicons name="close" size={16} color="#ffffff" />
            <Text style={styles.editButtonText}>Cancel</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditTodo;
