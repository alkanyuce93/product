import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { useProductContext, ProductProvider } from "@/context/productContext";
import { ProductCard } from "@/components/product";
import { useNavigation, useFocusEffect, Link } from "expo-router";
import { InnerHeader } from "@/components/common";
import { useCategoryContext } from "@/context/categoryContext";
import { CategoryApi } from "@/services/api/categories";
import { useTranslation } from "react-i18next";

const { height } = useWindowDimensions();

export default function CategoriesScreen() {
  const { t } = useTranslation();

  const { selectedProducts } = useProductContext();
  const [products, setProducts] = useState(selectedProducts?.products || []);
  const { selectedCategory } = useCategoryContext();
  const [id, setId] = useState<Number>();

  const { data: categoryProducts, isLoading: loadingCategoryProducts } =
    CategoryApi.useGetCategoryProductsQuery(selectedCategory);

  console.log("categoryProducts", categoryProducts);

  useEffect(() => {
    setProducts(categoryProducts?.products || []);
  }, [categoryProducts]);

  return (
    <View style={styles.container}>
      <InnerHeader headerTitle={t(selectedCategory)} />
      {loadingCategoryProducts ? (
        <Text>{t("loading")}</Text>
      ) : (
        <FlatList
          key={id?.toString()}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          horizontal={false}
          data={products}
          renderItem={({ item }) => (
            <Link href={`/home/detail/${item.id}`} asChild>
              <ProductCard
                onPress={() => {
                  setId(item?.id);
                }}
                product={item}
              />
            </Link>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: height * 0.06,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  productItem: {
    backgroundColor: "#999A9B",
    height: 40,
    marginHorizontal: 5,
    borderRadius: 30,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  productTitle: {
    color: "#ffffff",
  },
});
