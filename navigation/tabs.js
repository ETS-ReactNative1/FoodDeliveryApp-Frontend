import React from "react";
import { View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs";
// import Svg, { Path } from "react-native-svg";

import { Home } from "../screens";

import { COLORS, icons } from '../constants';

import styles from "./styles";

const Tab = createBottomTabNavigator();

const CustomTabBar = (props) => {
    return (
        <View>
            <View style={styles.customTabBarView}>
            </View>
            <BottomTabBar {...props.props} />
        </View >
    )
}

{/* Create the bottom tab with the 4 images */ }
const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                showLabel: false,
                style: { borderTopWidth: 0, backGroundColor: "transparent", elevation: 0 }
            }}
            tabBar={(props) => (
                <CustomTabBar props={props} />
            )}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.cutlery}
                            resizeMode="contain"
                            style={{ width: 25, height: 25, tintColor: focused ? COLORS.primary : COLORS.secondary }}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Search"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.search}
                            resizeMode="contain"
                            style={{ width: 25, height: 25, tintColor: focused ? COLORS.primary : COLORS.secondary }}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Like"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.like}
                            resizeMode="contain"
                            style={{ width: 25, height: 25, tintColor: focused ? COLORS.primary : COLORS.secondary }}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="User"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.user}
                            resizeMode="contain"
                            style={{ width: 25, height: 25, tintColor: focused ? COLORS.primary : COLORS.secondary }}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs;