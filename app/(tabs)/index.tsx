import { createHomeStyles } from "@/assets/styles/home.styles";
import {
  EditTodo,
  EmptyState,
  Header,
  LoadingSpinner,
  TodoCard,
  TodoInput,
} from "@/components";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { TTodo, TTodoId } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Alert,
  FlatList,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Todos = () => {
  const { colors } = useTheme();
  const styles = createHomeStyles(colors);

  const [editingId, setEditingId] = useState<TTodoId | null>(null);
  const [editText, setEditText] = useState("");

  const todos = useQuery(api.todos.getTodos);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const updateTodo = useMutation(api.todos.updateTodo);
  const isLoading = todos === undefined;

  const handleToggleTodo = async (id: TTodoId) => {
    try {
      await toggleTodo({ id });
    } catch (error) {
      console.log("Toggle Error", error);
      Alert.alert("Error", "Failed to toggle check");
    }
  };

  const handleDeleteTodo = async (id: TTodoId) => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteTodo({ id }),
      },
    ]);
  };

  const handleEditTodo = (todo: TTodo) => {
    setEditingId(todo._id);
    setEditText(todo.text);
  };

  const handleSaveEdit = async () => {
    if (editingId) {
      try {
        await updateTodo({ id: editingId, text: editText.trim() });
        setEditingId(null);
        setEditText("");
      } catch (error) {
        console.log("Error updating Todo", error);
        Alert.alert("Error", "Failed to update Todo");
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  if (isLoading) return <LoadingSpinner />;

  const renderTodoItems = ({ item }: { item: TTodo }) => {
    const isEditing = editingId === item._id;

    return (
      <View style={styles.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
          style={styles.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity
            style={styles.checkbox}
            activeOpacity={0.7}
            onPress={() => handleToggleTodo(item._id)}
          >
            <LinearGradient
              colors={
                item.isCompleted
                  ? colors.gradients.success
                  : colors.gradients.muted
              }
              style={[
                styles.checkboxInner,
                {
                  borderColor: item.isCompleted ? "transparent" : colors.border,
                },
              ]}
            >
              {item.isCompleted && (
                <Ionicons name="checkmark" size={18} color="#fff" />
              )}
            </LinearGradient>
          </TouchableOpacity>
          {isEditing ? (
            <EditTodo
              editText={editText}
              setEditText={setEditText}
              onSave={handleSaveEdit}
              onCancel={handleCancelEdit}
            />
          ) : (
            <TodoCard
              todo={item}
              onEdit={handleEditTodo}
              onDelete={handleDeleteTodo}
            />
          )}
        </LinearGradient>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={styles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={styles.safeArea}>
        <Header />
        <TodoInput />
        <FlatList
          data={todos}
          renderItem={renderTodoItems}
          keyExtractor={(todo) => todo._id}
          style={styles.todoList}
          contentContainerStyle={styles.todoListContent}
          ListEmptyComponent={EmptyState}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Todos;
