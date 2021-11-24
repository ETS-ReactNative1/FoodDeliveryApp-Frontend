import { StyleSheet } from 'react-native';
import { icons, images, SIZES, COLORS, FONTS } from '../../constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray2
    },
    renderHeaderView: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SIZES.padding * 3,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray3
    },
    renderFoodInfoView1: {
        position: 'absolute',
        bottom: -20,
        width: SIZES.width,
        height: 50,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    renderFoodInfoButton1: {
        width: 50,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25
    },
    renderFoodInfoView2: {
        width: 50,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center'
    },
    renderFoodInfoButton2: {
        width: 50,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomRightRadius: 25,
        borderTopRightRadius: 25
    },
    renderFoodInfoView3: {
        width: SIZES.width,
        alignItems: 'center',
        marginTop: 15,
        paddingHorizontal: SIZES.padding * 2
    },
    renderDotsView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: SIZES.padding
    },
    renderOrderView1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: SIZES.padding * 2,
        paddingHorizontal: SIZES.padding * 3,
        borderBottomColor: COLORS.lightGray2,
        borderBottomWidth: 1
    },
    renderOrderView2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: SIZES.padding * 2,
        paddingHorizontal: SIZES.padding * 3
    },
    renderOrderButton: {
        width: SIZES.width * 0.9,
        padding: SIZES.padding,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        borderRadius: SIZES.radius
    }
});

export default styles;