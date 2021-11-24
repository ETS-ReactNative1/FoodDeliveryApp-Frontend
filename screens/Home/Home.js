import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';

import { icons, images, SIZES, COLORS, FONTS } from '../../constants';
import { initialCurrentLocation, categoryData, affordable, fairPrice, expensive, restaurantData } from '../../constants/data';

import { styles, styles2 } from './styles';

const Home = ({ navigation }) => {

    const [categories, setCategories] = React.useState(categoryData)
    const [selectedCategory, setSelectedCategory] = React.useState(null)
    const [restaurants, setRestaurants] = React.useState(restaurantData)
    const [currentLocation, setCurrentLocation] = React.useState(initialCurrentLocation)

    {/* Function that filter the restaurants when we select a food category */ }
    function onSelectCategory(category) {
        // filter restaurants
        let restaurantList = restaurantData.filter(a => a.categories.includes(category.id))
        setRestaurants(restaurantList)

        setSelectedCategory(category)
    }

    {/* Function that returns the name of a category with a given id */ }
    function getCategoryNameById(id) {
        let category = categories.filter(a => a.id === id)

        if (category.length > 0)
            return category[0].name

        return ""
    }

    {/* Create the header in the home page */ }
    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', height: 50 }}>
                <TouchableOpacity style={styles2.renderHeaderButton} >
                    <Image
                        source={icons.nearby}
                        resizeMode="contain"
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={styles2.renderHeaderView} >
                        <Text style={{ ...FONTS.h3 }}>{currentLocation.streetName}</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles2.renderHeaderButton} >
                    <Image
                        source={icons.basket}
                        resizeMode="contain"
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    {/* Create a flatlist with the main categories under 'Main Categories' */ }
    function renderMainCategories() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={[styles2.renderMainCategoriesButton, { backgroundColor: (selectedCategory?.id === item.id) ? COLORS.primary : COLORS.white }, styles.shadow]}      // The ?. operator is like the . chaining operator, except that instead of causing an error if a reference is nullish (null or undefined), the expression short-circuits with a return value of undefined
                    onPress={() => onSelectCategory(item)}
                >
                    <View style={[styles2.renderMainCategoriesView, { backgroundColor: (selectedCategory?.id === item.id) ? COLORS.white : COLORS.lightGray }]} >
                        <Image
                            source={item.icon}
                            resizeMode='contain'
                            style={{ width: 30, height: 30 }}
                        />
                    </View>
                    <Text
                        style={{
                            marginTop: SIZES.padding,
                            color: (selectedCategory?.id === item.id) ? COLORS.white : COLORS.black,
                            ...FONTS.body5
                        }}
                    >
                        {item.name}
                    </Text>
                </TouchableOpacity>
            )
        }

        return (
            <View styles={{ padding: SIZES.padding * 2 }}>
                <Text style={{ ...FONTS.h1 }}>Main</Text>
                <Text style={{ ...FONTS.h1 }}>Categories</Text>

                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
                />
            </View>
        )
    }

    {/* Create the list of restaurants under the main categories, together with the rating, price bar */ }
    function renderRestaurantList() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{ marginBottom: SIZES.padding * 2 }}
                onPress={() => navigation.navigate("Restaurant", {
                    item,
                    currentLocation
                })}
            >
                <View style={{ marginBottom: SIZES.padding }} >
                    <Image
                        source={item.photo}
                        resizeMode='cover'
                        style={{ width: '100%', height: 200, borderRadius: SIZES.radius }}
                    />
                    <View style={[styles2.renderRestaurantListView, styles.shadow]} >
                        <Text style={{ ...FONTS.h4 }}>{item.duration}</Text>
                    </View>
                </View>

                <Text style={{ ...FONTS.body2 }}>{item.name}</Text>

                <View style={{ marginTop: SIZES.padding, flexDirection: 'row' }} >
                    <Image
                        source={icons.star}
                        style={{ height: 20, width: 20, tintColor: COLORS.primary, marginRight: 10 }}
                    />
                    <Text style={{ ...FONTS.body3 }}>{item.rating}</Text>

                    {/* Render the categories and the price */}
                    <View style={{ flexDirection: 'row', marginLeft: 10 }} >
                        {
                            item.categories.map((categoryId) => {
                                return (
                                    <View style={{ flexDirection: 'row' }} key={categoryId} >
                                        <Text style={{ ...FONTS.body3 }}>{getCategoryNameById(categoryId)}</Text>
                                        <Text style={{ ...FONTS.h3, color: COLORS.darkgray }}> . </Text>
                                    </View>
                                )
                            })
                        }

                        {
                            [1, 2, 3].map((priceRating) => (
                                <Text
                                    key={priceRating}
                                    style={{ ...FONTS.body3, color: (priceRating <= item.priceRating) ? COLORS.black : COLORS.darkgray }}
                                >
                                    $
                                </Text>
                            ))
                        }

                    </View>
                </View>
            </TouchableOpacity>
        )

        return (
            <FlatList
                data={restaurants}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding * 2,
                    paddingBottom: 30
                }}
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderMainCategories()}
            {renderRestaurantList()}
        </SafeAreaView>
    )
}

export default Home;