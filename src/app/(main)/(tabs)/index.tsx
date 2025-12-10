import { TAB_BAR_HEIGHT } from "@/src/components/MyTabBar";
import { colors } from "@/unistyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import { StyleSheet, withUnistyles } from "react-native-unistyles";

const UniTextInput = withUnistyles(TextInput, (theme) => ({
  placeholderTextColor: theme.colors.grey500,
  cursorColor: theme.colors.primary,
  selectionColor: theme.colors.primary + "55",
  selectionHandleColor: theme.colors.primary,
}));

export const dummyBooks = [
  {
    id: "1",
    name: "Physics Form 3",
    pages: 256,
    edition: "KICD Approved",
    condition: "used",
    price: 850,
    size: "520g",
    cover: "",
    author: "KLB Editorial Board",
    publisher: "Kenya Literature Bureau",
    publishedDate: "2019-01-10",
    uploadedDate: "2024-11-01",
    formats: ["pdf"],
  },
  {
    id: "2",
    name: "Mathematics Form 2",
    pages: 320,
    edition: "KICD Approved",
    condition: "new",
    price: 950,
    size: "630g",
    cover: "",
    author: "J. Mwangi",
    publisher: "Mentor Educational",
    publishedDate: "2020-03-15",
    uploadedDate: "2024-11-01",
    formats: ["pdf"],
  },
  {
    id: "3",
    name: "English Form 4",
    pages: 280,
    edition: "Revised Edition",
    condition: "used",
    price: 700,
    size: "480g",
    cover: "",
    author: "W. Ochieng",
    publisher: "Longhorn Kenya",
    publishedDate: "2018-06-12",
    uploadedDate: "2024-11-02",
    formats: ["pdf"],
  },
  {
    id: "4",
    name: "Biology Form 1",
    pages: 240,
    edition: "KICD Approved",
    condition: "new",
    price: 900,
    size: "510g",
    cover: "",
    author: "P. Kamau",
    publisher: "Oxford University Press EA",
    publishedDate: "2021-02-20",
    uploadedDate: "2024-11-03",
    formats: ["pdf"],
  },
  {
    id: "5",
    name: "Chemistry Form 2",
    pages: 290,
    edition: "Revised Edition",
    condition: "used",
    price: 800,
    size: "550g",
    cover: "",
    author: "R. Otieno",
    publisher: "Longhorn Kenya",
    publishedDate: "2019-09-10",
    uploadedDate: "2024-11-03",
    formats: ["pdf"],
  },
  {
    id: "6",
    name: "Geography Form 3",
    pages: 260,
    edition: "KICD Approved",
    condition: "new",
    price: 750,
    size: "500g",
    cover: "",
    author: "S. Wanjiru",
    publisher: "East African Educational Publishers",
    publishedDate: "2020-05-22",
    uploadedDate: "2024-11-04",
    formats: ["pdf"],
  },
  {
    id: "7",
    name: "History & Government Form 4",
    pages: 310,
    edition: "Revised Edition",
    condition: "used",
    price: 850,
    size: "600g",
    cover: "",
    author: "A. Abdi",
    publisher: "Kenya Literature Bureau",
    publishedDate: "2017-07-01",
    uploadedDate: "2024-11-04",
    formats: ["pdf"],
  },
  {
    id: "8",
    name: "CRE Form 2",
    pages: 180,
    edition: "KICD Approved",
    condition: "new",
    price: 600,
    size: "400g",
    cover: "",
    author: "M. Kilonzo",
    publisher: "Longhorn Kenya",
    publishedDate: "2021-01-17",
    uploadedDate: "2024-11-05",
    formats: ["pdf"],
  },
  {
    id: "9",
    name: "Business Studies Form 3",
    pages: 270,
    edition: "Revised Edition",
    condition: "used",
    price: 780,
    size: "530g",
    cover: "",
    author: "J. Njoroge",
    publisher: "Mentor Educational",
    publishedDate: "2019-08-08",
    uploadedDate: "2024-11-05",
    formats: ["pdf"],
  },
  {
    id: "10",
    name: "Agriculture Form 1",
    pages: 230,
    edition: "KICD Approved",
    condition: "new",
    price: 720,
    size: "470g",
    cover: "",
    author: "T. Kariuki",
    publisher: "EAEP",
    publishedDate: "2020-03-14",
    uploadedDate: "2024-11-06",
    formats: ["pdf"],
  },
  {
    id: "11",
    name: "Computer Studies Form 4",
    pages: 210,
    edition: "Revised Edition",
    condition: "used",
    price: 950,
    size: "450g",
    cover: "",
    author: "D. Kimani",
    publisher: "Longhorn Kenya",
    publishedDate: "2018-10-04",
    uploadedDate: "2024-11-06",
    formats: ["pdf"],
  },
  {
    id: "12",
    name: "Kiswahili Form 1",
    pages: 260,
    edition: "KICD Approved",
    condition: "new",
    price: 650,
    size: "500g",
    cover: "",
    author: "H. Mwende",
    publisher: "Kenya Literature Bureau",
    publishedDate: "2021-02-15",
    uploadedDate: "2024-11-07",
    formats: ["pdf"],
  },
  {
    id: "13",
    name: "French Level 1",
    pages: 190,
    edition: "Revised Edition",
    condition: "used",
    price: 880,
    size: "430g",
    cover: "",
    author: "P. Laurent",
    publisher: "Oxford EA",
    publishedDate: "2017-05-09",
    uploadedDate: "2024-11-07",
    formats: ["pdf"],
  },
  {
    id: "14",
    name: "Home Science Form 2",
    pages: 220,
    edition: "KICD Approved",
    condition: "new",
    price: 700,
    size: "500g",
    cover: "",
    author: "N. Achieng",
    publisher: "EAEP",
    publishedDate: "2020-11-21",
    uploadedDate: "2024-11-08",
    formats: ["pdf"],
  },
  {
    id: "15",
    name: "Islamic Religious Education (IRE) Form 3",
    pages: 210,
    edition: "Revised Edition",
    condition: "used",
    price: 600,
    size: "450g",
    cover: "",
    author: "S. Hassan",
    publisher: "Longhorn Kenya",
    publishedDate: "2019-04-03",
    uploadedDate: "2024-11-08",
    formats: ["pdf"],
  },
  {
    id: "16",
    name: "Life Skills Education",
    pages: 170,
    edition: "KICD Approved",
    condition: "new",
    price: 500,
    size: "390g",
    cover: "",
    author: "KICD",
    publisher: "KICD",
    publishedDate: "2021-09-13",
    uploadedDate: "2024-11-09",
    formats: ["pdf"],
  },
  {
    id: "17",
    name: "Primary English Grade 6",
    pages: 200,
    edition: "CBC Edition",
    condition: "new",
    price: 550,
    size: "420g",
    cover: "",
    author: "KICD",
    publisher: "Kenya Literature Bureau",
    publishedDate: "2022-01-01",
    uploadedDate: "2024-11-09",
    formats: ["pdf"],
  },
  {
    id: "18",
    name: "Mathematics Grade 7",
    pages: 240,
    edition: "CBC Edition",
    condition: "new",
    price: 650,
    size: "500g",
    cover: "",
    author: "J. Wambui",
    publisher: "Longhorn Kenya",
    publishedDate: "2022-01-05",
    uploadedDate: "2024-11-10",
    formats: ["pdf"],
  },
  {
    id: "19",
    name: "Integrated Science Grade 8",
    pages: 260,
    edition: "CBC Edition",
    condition: "new",
    price: 700,
    size: "520g",
    cover: "",
    author: "KICD",
    publisher: "Mentor Educational",
    publishedDate: "2022-02-02",
    uploadedDate: "2024-11-10",
    formats: ["pdf"],
  },
  {
    id: "20",
    name: "Social Studies Grade 5",
    pages: 180,
    edition: "CBC Edition",
    condition: "used",
    price: 480,
    size: "400g",
    cover: "",
    author: "A. Kibet",
    publisher: "EAEP",
    publishedDate: "2021-06-18",
    uploadedDate: "2024-11-11",
    formats: ["pdf"],
  },
];

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
        <MaterialCommunityIcons
          name="book-open-page-variant"
          size={40}
          color={colors.primary}
        />
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.bookTitle} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.bookAuthor}>{item.author}</Text>

        <View style={styles.row}>
          <View
            style={[
              styles.badge,
              {
                backgroundColor:
                  item.price > 0 ? colors.primary : colors.success,
              },
            ]}
          >
            <Text style={styles.badgeText}>
              {item.price > 0 ? `KSh ${item.price}` : "Free"}
            </Text>
          </View>

          {item.formats.includes("pdf") && (
            <MaterialCommunityIcons
              name="file-pdf-box"
              size={20}
              color={colors.error}
              style={{ marginLeft: 8 }}
            />
          )}
        </View>
      </View>
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
    height: theme.gap(50),
    outlineWidth: 2,
    outlineOffset: 5,
    outlineColor: theme.colors.primary + "20",
  },
  cover: {
    height: 100,
    borderRadius: theme.radii.sm,
    backgroundColor: theme.colors.grey200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.gap(2),
  },
  cardContent: {},
  bookTitle: {
    fontFamily: "Bold",
    fontSize: theme.fontSizes.md,
    color: theme.colors.onSurface,
  },
  bookAuthor: {
    fontFamily: "Regular",
    fontSize: theme.fontSizes.sm,
    color: theme.colors.grey600,
    marginVertical: theme.gap(1),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: theme.gap(1),
  },
  badge: {
    paddingHorizontal: theme.gap(2),
    paddingVertical: theme.gap(0.5),
    borderRadius: theme.radii.lg,
  },
  badgeText: {
    fontFamily: "Bold",
    fontSize: theme.fontSizes.sm,
    color: theme.colors.onPrimary,
    includeFontPadding: false,
  },
}));
