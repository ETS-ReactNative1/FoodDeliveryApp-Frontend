import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import { COLORS, FONTS, icons, SIZES, GOOGLE_API_KEY } from '../../constants';

import styles from './styles';

const OrderDelivery = ({ route, navigation }) => {

    const mapView = React.useRef();

    const [restaurant, setRestaurant] = React.useState(null);
    const [streetName, setStreetName] = React.useState("");
    const [fromLocation, setFromLocation] = React.useState(null);
    const [toLocation, setToLocation] = React.useState(null);
    const [region, setRegion] = React.useState(null);
    const [duration, setDuration] = React.useState(0);
    const [isReady, setIsReady] = React.useState(false);
    const [angle, setAngle] = React.useState(0);

    {/* Setting the locations for Google maps */ }
    React.useEffect(() => {
        let { restaurant, currentLocation } = route.params

        let fromLoc = currentLocation.gps
        let toLoc = restaurant.location
        let street = currentLocation.streetName

        let mapRegion = {
            latitude: (fromLoc.latitude + toLoc.latitude) / 2,
            longitude: (fromLoc.longitude + toLoc.longitude) / 2,
            latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
            longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2
        }

        setRestaurant(restaurant)
        setStreetName(street)
        setFromLocation(fromLoc)
        setToLocation(toLoc)
        setRegion(mapRegion)
    }, [])

    {/* Function that calculates the angle that will be used in order for the car icon to stay on direction */ }
    function calculateAngle(coordinates) {
        let startLat = coordinates[0]["latitude"]
        let startLng = coordinates[0]["longitude"]
        let endLat = coordinates[1]["latitude"]
        let endLng = coordinates[1]["longitude"]
        let dx = endLat - startLat
        let dy = endLng - startLng

        return Math.atan2(dy, dx) * 180 / Math.PI
    }

    {/* Used by zoom in button */ }
    function zoomIn() {
        let newRegion = {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta / 2,
            longitudeDelta: region.longitudeDelta / 2
        }

        setRegion(newRegion)
        mapView.current.animateToRegion(newRegion, 200)
    }

    {/* Used by zoom out button */ }
    function zoomOut() {
        let newRegion = {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta * 2,
            longitudeDelta: region.longitudeDelta * 2
        }

        setRegion(newRegion)
        mapView.current.animateToRegion(newRegion, 200)
    }

    function renderMap() {
        {/* Marker is used to render the destination icon, the car icon */ }
        const destinationMarker = () => (
            <Marker
                coordinate={toLocation}
            >
                <View style={styles.renderMapView1} >
                    <View style={styles.renderMapView2} >
                        <Image
                            source={icons.pin}
                            style={{ width: 25, height: 25, tintColor: COLORS.white }}
                        />
                    </View>
                </View>
            </Marker >
        )

        const carIcon = () => (
            <Marker
                coordinate={fromLocation}
                anchor={{ x: 0.5, y: 0.5 }}
                flat={true}
                rotation={angle}
            >
                <Image
                    source={icons.car}
                    style={{ width: 40, height: 40 }}
                />
            </Marker>
        )

        return (
            <View style={{ flex: 1 }}>
                {/* Initializing Google Maps */}
                <MapView
                    ref={mapView}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={region}
                    style={{ flex: 1 }}
                >
                    <MapViewDirections
                        origin={fromLocation}
                        destination={toLocation}
                        apikey={GOOGLE_API_KEY}
                        strokeWidth={5}
                        strokeColor={COLORS.primary}
                        optimizeWayPoints={true}
                        onReady={result => {
                            setDuration(result.duration)

                            if (!isReady) {
                                mapView.current.fitToCoordinates(result.coordinates, {      // fit the route into the screen
                                    edgePadding: {
                                        right: (SIZES.width / 20),
                                        bottom: (SIZES.height / 4),
                                        left: (SIZES.width / 20),
                                        top: (SIZES.height / 8)
                                    }
                                })

                                let nextLoc = {                                         // reposition the car
                                    latitude: result.coordinates[0]["latitude"],
                                    longitude: result.coordinates[0]["longitude"]
                                }

                                if (result.coordinates.length >= 2) {
                                    let angle = calculateAngle(result.coordinates)
                                    setAngle(angle)
                                }

                                setFromLocation(nextLoc)
                                setIsReady(true)
                            }
                        }}
                    />
                    {destinationMarker()}
                    {carIcon()}
                </MapView>
            </View>
        )
    }

    {/* Create the header with street name and total duration */ }
    function renderDestinationHeader() {
        return (
            <View style={styles.renderDestinationHeaderView1} >
                <View style={styles.renderDestinationHeaderView2} >
                    <Image
                        source={icons.red_pin}
                        style={{ width: 30, height: 30, marginRight: SIZES.padding }}
                    />

                    <View style={{ flex: 1 }}>
                        <Text style={{ ...FONTS.body3 }}>{streetName}</Text>
                    </View>

                    <Text style={{ ...FONTS.body3 }}>{Math.ceil(duration)} mins</Text>
                </View>
            </View>
        )
    }

    {/* Create courier 'profile' */ }
    function renderDeliveryInfo() {
        return (
            <View style={styles.renderDeliveryInfoView1} >
                <View style={styles.renderDeliveryInfoView2} >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={restaurant?.courier.avatar}
                            style={{ width: 50, height: 50, borderRadius: 25 }}
                        />

                        <View style={{ flex: 1, marginLeft: SIZES.padding }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ ...FONTS.h4 }}>{restaurant?.courier.name}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image
                                        source={icons.star}
                                        style={{ width: 18, height: 18, tintColor: COLORS.primary, marginRight: SIZES.padding }}
                                    />
                                    <Text style={{ ...FONTS.body3 }}>{restaurant?.rating}</Text>
                                </View>
                            </View>

                            <Text style={{ color: COLORS.darkgray, ...FONTS.body4 }}>{restaurant?.name}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: SIZES.padding * 2, justifyContent: 'space-between' }} >
                        <TouchableOpacity
                            style={styles.renderDeliveryInfoButton1}
                            onPress={() => navigation.navigate("Home")}
                        >
                            <Text style={{ ...FONTS.h4, color: COLORS.white }}>Call</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.renderDeliveryInfoButton2}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={{ ...FONTS.h4, color: COLORS.white }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    {/* Create zoom in and zoom out buttons */ }
    function renderButtons() {
        return (
            <View style={styles.renderButtonsView} >
                <TouchableOpacity
                    style={styles.renderButtonsButton}
                    onPress={() => zoomIn()}
                >
                    <Text style={{ ...FONTS.body1 }}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.renderButtonsButton}
                    onPress={() => zoomOut()}
                >
                    <Text style={{ ...FONTS.body1 }}>-</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            {renderMap()}
            {renderDestinationHeader()}
            {renderDeliveryInfo()}
            {renderButtons()}
        </View>
    )
}

export default OrderDelivery;