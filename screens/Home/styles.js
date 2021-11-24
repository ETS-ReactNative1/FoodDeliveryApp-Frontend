import { StyleSheet } from 'react-native';
import { icons, images, SIZES, COLORS, FONTS } from '../../constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    }
})

export const styles2 = StyleSheet.create({
    renderHeaderButton: {
        width: 50,
        paddingLeft: SIZES.padding * 2,
        justifyContent: 'center'
    },
    renderHeaderView: {
        width: '70%',
        height: '100%',
        backgroundColor: COLORS.lightGray3,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZES.radius
    },
    renderMainCategoriesButton: {
        padding: SIZES.padding,
        paddingBottom: SIZES.padding * 2,
        borderRadius: SIZES.radius,
        alignItems: "center",
        justifyContent: "center",
        marginRight: SIZES.padding,
    },
    renderMainCategoriesView: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    renderRestaurantListView: {
        position: 'absolute',
        bottom: 0,
        height: 50,
        width: SIZES.width * 0.3,
        backgroundColor: COLORS.white,
        borderTopRightRadius: SIZES.radius,
        borderBottomLeftRadius: SIZES.radius,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

// export default styles2;