import { createHomeStyles } from "@/assets/styles/home.styles";
import useTheme from "@/hooks/useTheme";
import { TTodo, TTodoId } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View } from "react-native";

type TTodoCard = {
  todo: TTodo;
  onEdit: (todo: TTodo) => void;
  onDelete: (id: TTodoId) => void;
};

const TodoCard = ({ todo, onEdit, onDelete }: TTodoCard) => {
  const { colors } = useTheme();
  const styles = createHomeStyles(colors);

  return (
    <View style={styles.todoTextContainer}>
      <Text
        style={[
          styles.todoText,
          todo.isCompleted && {
            textDecorationLine: "line-through",
            color: colors.textMuted,
            opacity: 0.6,
          },
        ]}
      >
        {todo.text}
      </Text>

      <View style={styles.todoActions}>
        <TouchableOpacity onPress={() => onEdit(todo)} activeOpacity={0.8}>
          <LinearGradient
            colors={colors.gradients.warning}
            style={styles.actionButton}
          >
            <Ionicons name="pencil" size={14} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDelete(todo._id)}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={colors.gradients.danger}
            style={styles.actionButton}
          >
            <Ionicons name="trash" size={14} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoCard;
