import { TAB_BAR_HEIGHT } from "@/src/components/MyTabBar";
import { colors } from "@/unistyles";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useContext, useMemo, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  LinearTransition,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { StyleSheet, withUnistyles } from "react-native-unistyles";
import { TabScrollYContext } from "./_layout";

const classesData = Array.from({ length: 30 }, (_, i) => ({
  id: (i + 1).toString(),
  name: `Form ${i + 1} Class`,
  subjects: Math.floor(Math.random() * 5) + 1,
}));

type ClassItem = (typeof classesData)[0] & {
  pinned: boolean;
  originalIndex: number;
};

const CIRCLE_SIZE = 52;
const EXPANDED_WIDTH = 120;

const UniTextInput = withUnistyles(TextInput, (theme) => ({
  placeholderTextColor: theme.colors.grey500,
  cursorColor: theme.colors.primary,
  selectionColor: theme.colors.primary + "55",
  selectionHandleColor: theme.colors.primary,
}));

const Classes = () => {
  const scrollY = useContext(TabScrollYContext);

  const [data, setData] = useState<ClassItem[]>(
    classesData.map((item, index) => ({
      ...item,
      pinned: false,
      originalIndex: index,
    }))
  );

  const [searchText, setSearchText] = useState("");

  // Filtered list based on search
  const filteredData = useMemo(() => {
    if (!searchText) return data;
    return data.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, data]);

  // Animation values
  const fabTranslateY = useSharedValue(TAB_BAR_HEIGHT);
  const fabScale = useSharedValue(0);
  const fabWidth = useSharedValue(CIRCLE_SIZE);
  const fabTextOpacity = useSharedValue(0);

  useFocusEffect(
    useCallback(() => {
      // Phase 1: slide + zoom in (circle only)
      fabTranslateY.value = withTiming(0, { duration: 350 });
      fabScale.value = withTiming(1, { duration: 350 });

      // Phase 2: expand to the left after settle
      setTimeout(() => {
        fabWidth.value = withTiming(EXPANDED_WIDTH, { duration: 300 });
        fabTextOpacity.value = withTiming(1, { duration: 200 });
      }, 380);

      return () => {
        fabTranslateY.value = TAB_BAR_HEIGHT;
        fabScale.value = 0;
        fabWidth.value = CIRCLE_SIZE;
        fabTextOpacity.value = 0;
      };
    }, [])
  );

  const fabAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: fabTranslateY.value }, { scale: fabScale.value }],
    width: fabWidth.value,
  }));

  const fabTextStyle = useAnimatedStyle(() => ({
    opacity: fabTextOpacity.value,
    width: interpolate(fabTextOpacity.value, [0, 1], [0, 110], "clamp"),
  }));

  const togglePin = (id: string) => {
    setData((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, pinned: !item.pinned } : item
      );

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

  const scrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.value = event.nativeEvent.contentOffset.y;
  };

  return (
    <>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <UniTextInput
          style={styles.searchInput}
          placeholder="Search class..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity
          onPress={() => {
            if (searchText) setSearchText("");
          }}
        >
          <Feather
            name={searchText ? "x" : "search"}
            size={20}
            color={searchText ? "grey" : colors.primary} // primary color when empty or active
          />
        </TouchableOpacity>
      </View>

      <Animated.FlatList
        style={styles.container}
        numColumns={2}
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainerStyle}
        columnWrapperStyle={styles.columnWrapperStyle}
        showsVerticalScrollIndicator={false}
        itemLayoutAnimation={LinearTransition}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      />

      {/* Animated FAB */}
      <Animated.View style={[styles.fabStyle, fabAnimatedStyle]}>
        <Feather name="plus" size={20} color="white" />
        <Animated.Text style={[styles.fabText, fabTextStyle]}>
          Add Class
        </Animated.Text>
      </Animated.View>
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
    paddingBottom: rt.insets.bottom + TAB_BAR_HEIGHT * 2,
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
    flexDirection: "row",
    alignItems: "center",
    gap: theme.gap(2),
    justifyContent: "flex-start",
    paddingHorizontal: theme.paddingHorizontal,
    backgroundColor: theme.colors.primary,
    height: theme.spacing["2xl"],
    position: "absolute",
    bottom: rt.insets.bottom + TAB_BAR_HEIGHT,
    right: theme.paddingHorizontal * 2,
    borderRadius: theme.radii.sm,
    outlineWidth: 1,
    outlineOffset: 3,
    outlineColor: theme.colors.primary,
    overflow: "hidden",
  },
  fabText: {
    fontFamily: "SemiBold",
    fontSize: theme.fontSizes.sm,
    color: theme.colors.onPrimary,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: theme.paddingHorizontal * 2,
    marginVertical: theme.gap(2),
    paddingHorizontal: theme.paddingHorizontal,
    height: theme.spacing["3xl"],
    borderRadius: theme.radii.sm,
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.grey300,
    gap: theme.gap(2),
  },
  searchInput: {
    flex: 1,
    fontSize: theme.fontSizes.md,
    color: theme.colors.onSurface,
    fontFamily: "Regular",
    includeFontPadding: false,
    textAlignVertical: "center",
    verticalAlign: "middle",
  },
}));
