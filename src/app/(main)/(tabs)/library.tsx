import { TAB_BAR_HEIGHT } from "@/src/components/MyTabBar";
import { dummyBooks } from "@/src/dummy/books";
import { colors } from "@/unistyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import { StyleSheet, withUnistyles } from "react-native-unistyles";

const UniTextInput = withUnistyles(TextInput, (theme) => ({
  placeholderTextColor: theme.colors.grey500,
  cursorColor: theme.colors.primary,
  selectionColor: theme.colors.primary + "55",
  selectionHandleColor: theme.colors.primary,
}));

const LibraryScreen = () => {
  const [searchText, setSearchText] = useState("");

  const filteredData = useMemo(() => {
    if (!searchText) return dummyBooks;
    return dummyBooks.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

  const renderBookCard = ({ item }: { item: (typeof dummyBooks)[0] }) => (
    <TouchableOpacity style={styles.bookCard} activeOpacity={0.85}>
      <View style={styles.cover}>
        <Image
          source={{ uri: item.cover }}
          style={styles.coverImage}
          resizeMode="stretch"
        />
      </View>
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{item.name}</Text>
        <Text style={styles.bookPublisher}>{item.publisher}</Text>
        <Text style={styles.bookPrice}>Ksh.{item.price}</Text>
      </View>
      <TouchableOpacity style={styles.downloadButton} activeOpacity={0.8}>
        <Text style={styles.downloadButtonText}>Download</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchContainer}>
          <UniTextInput
            style={styles.searchInput}
            placeholder="Search books..."
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity
            onPress={() => searchText && setSearchText("")}
            hitSlop={10}
          >
            <MaterialCommunityIcons
              name={searchText ? "close" : "note-search"}
              size={20}
              color={searchText ? colors.grey500 : colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Animated.FlatList
        style={styles.list}
        data={filteredData}
        renderItem={renderBookCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.contentContainer}
        scrollEventThrottle={16}
        itemLayoutAnimation={LinearTransition}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  searchWrapper: {
    backgroundColor: theme.colors.surface,
    elevation: 3,
    zIndex: 1,
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
    borderWidth: 2,
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
  },

  list: {
    flex: 1,
  },

  contentContainer: {
    paddingHorizontal: theme.paddingHorizontal * 2,
    paddingTop: theme.gap(4),
    paddingBottom: rt.insets.bottom + TAB_BAR_HEIGHT * 2,
    gap: theme.gap(4),
  },

  columnWrapper: {
    gap: theme.gap(4),
    alignSelf: "center",
  },

  bookCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.sm,
    padding: theme.paddingHorizontal,
    minWidth: 150,
    outlineWidth: 2,
    outlineOffset: 5,
    outlineColor: theme.colors.primary + "20",
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  cover: {
    height: theme.gap(30),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.radii.sm,
    overflow: "hidden",
  },

  bookTitle: {
    fontFamily: "Bold",
    fontSize: theme.fontSizes.md,
    color: theme.colors.onSurface,
  },
  bookPublisher: {
    fontFamily: "Regular",
    fontSize: theme.fontSizes.sm,
    color: theme.colors.grey600,
  },
  bookPrice: {
    fontFamily: "Bold",
    fontSize: theme.fontSizes.lg,
    color: theme.colors.primary,
  },
  bookInfo: {
    gap: theme.gap(1),
    paddingVertical: theme.gap(1),
  },
  downloadButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.paddingHorizontal,
    borderRadius: theme.radii.sm,
    alignItems: "center",
    justifyContent: "center",
    outlineWidth: 1,
    outlineOffset: 2,
    outlineColor: theme.colors.primary,
  },
  downloadButtonText: {
    fontFamily: "Bold",
    fontSize: theme.fontSizes.sm,
    color: theme.colors.onPrimary,
  },
}));
