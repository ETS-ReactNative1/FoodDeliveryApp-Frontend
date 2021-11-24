import { StyleSheet } from 'react-native';
import { icons, images, SIZES, COLORS, FONTS } from '../../constants';

const styles = StyleSheet.create({
    renderMapView1: {
        height: 40,
        width: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white
    },
    renderMapView2: {
        height: 30,
        width: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary
    },
    renderDestinationHeaderView1: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    renderDestinationHeaderView2: {
        flexDirection: 'row',
        alignItems: 'center',
        width: SIZES.width * 0.9,
        paddingVertical: SIZES.padding,
        paddingHorizontal: SIZES.padding * 2,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white
    },
    renderDeliveryInfoView1: {
        position: 'absolute',
        bottom: 50,
        left: 20,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    renderDeliveryInfoView2: {
        width: SIZES.width * 0.9,
        paddingVertical: SIZES.padding * 3,
        paddingHorizontal: SIZES.padding * 2,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white
    },
    renderDeliveryInfoButton1: {
        flex: 1,
        height: 50,
        marginRight: 10,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    renderDeliveryInfoButton2: {
        flex: 1,
        height: 50,
        backgroundColor: COLORS.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    renderButtonsView: {
        position: 'absolute',
        bottom: SIZES.height * 0.35,
        right: SIZES.padding * 2,
        width: 60,
        height: 130,
        justifyContent: 'space-between'
    },
    renderButtonsButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default styles;