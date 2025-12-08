import { Feather } from "@expo/vector-icons";
import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { StyleSheet, withUnistyles } from "react-native-unistyles";

const UniIcon = withUnistyles(Feather, (theme) => ({
  color: theme.colors.grey400,
}));

// Test data: array of classes
const classesData = Array.from({ length: 15 }, (_, i) => ({
  id: (i + 1).toString(),
  name: `Form ${i + 1} Class`,
  subjects: Math.floor(Math.random() * 5) + 1,
}));

const Classes = () => {
  const renderItem = ({ item }: { item: (typeof classesData)[0] }) => (
    <Pressable
      style={({ pressed }) => [styles.classCard, pressed && { opacity: 0.7 }]}
      onPress={() => {
        console.log("Pressed:", item.name);
      }}
    >
      {/* Left Section: Class Info */}
      <View style={styles.classInfo}>
        <Text style={styles.classTitle}>{item.name}</Text>

        <View style={styles.subjectInfo}>
          <UniIcon name="book" size={18} />
          <Text style={styles.subjectText}>
            {item.subjects} {item.subjects > 1 ? "subjects" : "subject"}
          </Text>
        </View>
      </View>

      {/* Right Section: Chevron */}
      <UniIcon name="chevron-right" size={24} />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={classesData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 16 }}
      />
    </View>
  );
};

export default Classes;

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.paddingHorizontal * 2,
    paddingTop: theme.gap(4),
    paddingBottom: rt.insets.bottom + theme.gap(2),
  },
  classCard: {
    width: "100%",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.gap(3),
    borderWidth: 1,
    borderColor: theme.colors.grey300,
  },
  classInfo: {
    gap: theme.gap(1),
  },
  classTitle: {
    fontSize: theme.fontSizes.lg,
    fontFamily: "Bold",
    color: theme.colors.onSurface,
  },
  subjectInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.gap(1),
  },
  subjectText: {
    fontSize: theme.fontSizes.md,
    fontFamily: "Regular",
    color: theme.colors.grey700,
  },
}));
