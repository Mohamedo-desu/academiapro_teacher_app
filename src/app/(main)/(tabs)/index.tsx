import { TAB_BAR_HEIGHT } from "@/src/components/MyTabBar";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AnimatedFAB } from "react-native-paper";
import Animated, { LinearTransition } from "react-native-reanimated";
import { StyleSheet } from "react-native-unistyles";

const classesData = Array.from({ length: 15 }, (_, i) => ({
  id: (i + 1).toString(),
  name: `Form ${i + 1} Class`,
  subjects: Math.floor(Math.random() * 5) + 1,
}));

type ClassItem = (typeof classesData)[0] & {
  pinned: boolean;
  originalIndex: number;
};

const Classes = () => {
  const [isExtended, setIsExtended] = useState(true);
  const [visible, setVisible] = useState(true);

  const [data, setData] = useState<ClassItem[]>(
    classesData.map((item, index) => ({
      ...item,
      pinned: false,
      originalIndex: index,
    }))
  );

  const togglePin = (id: string) => {
    setData((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, pinned: !item.pinned } : item
      );

      // Pinned items first, then original order
      return updated.sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return a.originalIndex - b.originalIndex;
      });
    });
  };

  const renderItem = ({ item }: { item: ClassItem }) => (
    <Animated.View style={styles.classCard(item.pinned)}>
      {item.pinned && (
        <TouchableOpacity
          style={styles.pinButton}
          onPress={() => togglePin(item.id)}
          activeOpacity={0.8}
        >
          <AntDesign name="pushpin" size={15} color="white" />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.pressable}
        onPress={() => console.log("Pressed:", item.name)}
        onLongPress={() => togglePin(item.id)}
        delayLongPress={250}
        activeOpacity={0.8}
      >
        <View style={styles.classInfo}>
          <Text style={styles.classTitle}>{item.name}</Text>
          <View style={styles.subjectInfo}>
            <Text style={styles.subjectText}>
              {item.subjects} {item.subjects > 1 ? "subjects" : "subject"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    setIsExtended(yOffset <= 0); // extended only at top
    setVisible(yOffset <= 0 || yOffset < 50); // hide FAB if scrolled down
  };

  return (
    <>
      <Animated.FlatList
        style={styles.container}
        numColumns={2}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainerStyle}
        columnWrapperStyle={styles.columnWrapperStyle}
        showsVerticalScrollIndicator={false}
        itemLayoutAnimation={LinearTransition}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />

      <AnimatedFAB
        icon="plus"
        label="Add Class"
        extended={true}
        visible={true}
        onPress={() => console.log("FAB Pressed")}
        animateFrom="right"
        iconMode="dynamic"
        style={styles.fabStyle}
      />
    </>
  );
};

export default Classes;

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainerStyle: {
    paddingHorizontal: theme.paddingHorizontal * 2,
    paddingTop: theme.gap(4),
    paddingBottom: rt.insets.bottom + TAB_BAR_HEIGHT,
    gap: theme.gap(4),
  },
  columnWrapperStyle: {
    gap: theme.gap(4),
    alignSelf: "center",
  },
  classCard: (isPinned) => ({
    flex: 1,
    height: theme.gap(15),
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    outlineWidth: 1,
    outlineOffset: 5,
    borderColor: theme.colors.grey300,
    outlineColor: isPinned ? theme.colors.primary : theme.colors.primary + "22",
    position: "relative",
  }),
  pressable: {
    flex: 1,
    padding: theme.paddingHorizontal,
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
  pinButton: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  fabStyle: {
    position: "absolute",
    bottom: rt.insets.bottom + TAB_BAR_HEIGHT,
    right: theme.paddingHorizontal * 2,
  },
}));
