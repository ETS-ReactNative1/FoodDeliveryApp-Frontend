import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Animated } from 'react-native';

import { icons, COLORS, SIZES, FONTS } from '../../constants';

import styles from './styles';

const Restaurant = ({ route, navigation }) => {

    const scrollX = new Animated.Value(0)
    const [restaurant, setRestaurant] = React.useState(null);
    const [currentLocation, setCurrentLocation] = React.useState(null);
    const [orderItems, setOrderItems] = React.useState([]);

    React.useEffect(() => {
        let { item, currentLocation } = route.params;
        setRestaurant(item)
        setCurrentLocation(currentLocation)
    })

    {/* Function called by - and + buttons, add or remove items from order */ }
    function editOrder(action, menuId, price) {
        let orderList = orderItems.slice()
        let item = orderList.filter(a => a.menuId === menuId)

        if (action === "+") {
            if (item.length > 0) {
                let newQty = item[0].qty + 1
                item[0].qty = newQty
                item[0].total = item[0].qty * price
            } else {
                const newItem = {
                    menuId: menuId,
                    qty: 1,
                    price: price,
                    total: price
                }
                orderList.push(newItem)
            }

            setOrderItems(orderList)
        } else {
            if (item.length > 0) {
                if (item[0]?.qty > 0) {
                    let newQty = item[0].qty - 1
                    item[0].qty = newQty
                    item[0].total = newQty * price
                }
            }

            setOrderItems(orderList)
        }
    }

    {/* Get the total quantity of the actual order */ }
    function getOrderQty(menuId) {
        let orderItem = orderItems.filter(a => a.menuId === menuId)

        if (orderItem.length > 0) {
            return orderItem[0].qty
        }

        return 0
    }

    {/* Get the total number of items in the basket */ }
    function getBasketItemCount() {
        let itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0)

        return itemCount
    }

    {/* Calculate the total sum */ }
    function sumOrder() {
        let total = orderItems.reduce((a, b) => a + (b.total || 0), 0)

        return total.toFixed(2)
    }

    {/* Create the header with the name of the restaurant, back button */ }
    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={{ width: 50, paddingLeft: SIZES.padding * 2, justifyContent: 'center' }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.back}
                        resizeMode='contain'
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                    <View style={styles.renderHeaderView} >
                        <Text style={{ ...FONTS.h3 }}>{restaurant?.name}</Text>
                    </View>
                </View>

                <TouchableOpacity style={{ width: 50, paddingRight: SIZES.padding * 2, justifyContent: 'center' }} >
                    <Image
                        source={icons.list}
                        resizeMode='contain'
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    {/* Create the food info view, using an animated scrollview for pictures */ }
    function renderFoodInfo() {
        return (
            <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEventThrottle={16}
                snapToAlignment='center'
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { x: scrollX } } }
                ], { useNativeDriver: false })}
            >
                {
                    restaurant?.menu.map((item, index) => (
                        <View
                            key={`menu-${index}`}
                            style={{ alignItems: 'center' }}
                        >
                            <View style={{ height: SIZES.height * 0.35 }}>
                                <Image
                                    source={item.photo}
                                    resizeMode='cover'
                                    style={{ width: SIZES.width, height: '100%' }}
                                />

                                <View style={styles.renderFoodInfoView1} >
                                    <TouchableOpacity
                                        style={styles.renderFoodInfoButton1}
                                        onPress={() => editOrder("-", item.menuId, item.price)}
                                    >
                                        <Text style={{ ...FONTS.body1 }}>-</Text>
                                    </TouchableOpacity>

                                    <View style={styles.renderFoodInfoView2} >
                                        <Text style={{ ...FONTS.h2 }}>{getOrderQty(item.menuId)}</Text>
                                    </View>

                                    <TouchableOpacity
                                        style={styles.renderFoodInfoButton2}
                                        onPress={() => editOrder("+", item.menuId, item.price)}
                                    >
                                        <Text style={{ ...FONTS.body1 }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.renderFoodInfoView3} >
                                <Text style={{ marginVertical: 10, textAlign: 'center', ...FONTS.h2 }}>{item.name}-{item.price.toFixed(2)}</Text>
                                <Text style={{ ...FONTS.body3 }}>{item.description}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 10 }} >
                                <Image
                                    source={icons.fire}
                                    style={{ width: 20, height: 20, marginRight: 10 }}
                                />
                                <Text style={{ ...FONTS.body3, color: COLORS.darkgray }}>{item.calories.toFixed(2)} cal</Text>
                            </View>
                        </View>
                    ))
                }
            </Animated.ScrollView>
        )
    }

    {/* Dots for the animated scroll view */ }
    function renderDots() {

        const dotPosition = Animated.divide(scrollX, SIZES.width)

        return (
            <View style={{ height: 30 }}>
                <View style={styles.renderDotsView} >
                    {restaurant?.menu.map((item, index) => {

                        const opacity = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: "clamp"
                        })

                        const dotSize = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
                            extrapolate: "clamp"
                        })

                        const dotColor = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
                            extrapolate: "clamp"
                        })

                        return (
                            <Animated.View
                                key={`dot-${index}`}
                                opacity={opacity}
                                style={{
                                    borderRadius: SIZES.radius,
                                    marginHorizontal: 6,
                                    width: dotSize,
                                    height: dotSize,
                                    backgroundColor: dotColor
                                }}
                            />
                        )
                    })}
                </View>
            </View>
        )
    }

    {/* Create the cart and location view under the dots, as well as the order button */ }
    function renderOrder() {
        return (
            <View>
                {
                    renderDots()
                }
                <View style={{ backgroundColor: COLORS.white, borderTopRightRadius: 40, borderTopLeftRadius: 40 }} >
                    <View style={styles.renderOrderView1} >
                        <Text style={{ ...FONTS.h3 }}>{getBasketItemCount()} items in Cart</Text>
                        <Text style={{ ...FONTS.h3 }}>${sumOrder()}</Text>
                    </View>

                    <View style={styles.renderOrderView2} >
                        <View style={{ flexDirection: 'row' }} >
                            <Image
                                source={icons.pin}
                                resizeMode="contain"
                                style={{ width: 20, height: 20, tintColor: COLORS.darkgray }}
                            />
                            <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4 }}>Location</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }} >
                            <Image
                                source={icons.master_card}
                                resizeMode='contain'
                                style={{ width: 20, height: 20, tintColor: COLORS.darkgray }}
                            />
                            <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4 }}>8888</Text>
                        </View>
                    </View>

                    <View style={{ padding: SIZES.padding * 2, alignItems: 'center', justifyContent: 'center' }} >
                        <TouchableOpacity
                            style={styles.renderOrderButton}
                            onPress={() => navigation.navigate("OrderDelivery", {
                                restaurant: restaurant,
                                currentLocation: currentLocation
                            })}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Order</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderFoodInfo()}
            {renderOrder()}
        </SafeAreaView>
    )
}

export default Restaurant;