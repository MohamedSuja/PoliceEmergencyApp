import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import React, {useCallback, useMemo, useRef} from 'react';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import {RFValue} from 'react-native-responsive-fontsize';
import {TouchableRipple} from 'react-native-paper';
import ImageCropPicker from 'react-native-image-crop-picker';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

const SCREEN_WIDTH = Dimensions.get('window').width;

const PickerSheetModal = props => {
  const {sheetRef, pickFromCamara, pickImage} = props;

  const snapPoints = useMemo(() => [RFValue('170')], []);

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        style={{flex: 1, zIndex: 1000}}
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior={'close'}
        opacity={0.3}
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      // enablePanDownToClose
      backgroundStyle={{backgroundColor: '#ffffff', flex: 1}}
      ref={sheetRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      // onChange={handleSheetChanges}
    >
      <View style={{flex: 1, alignItems: 'center', zIndex: 1000}}>
        <Text style={styles.BottomSheeTitle}>Add Photo</Text>
        <TouchableRipple
          rippleColor="rgba(0, 0, 0, .32)"
          onPress={() => pickFromCamara()}>
          <View style={styles.BottomSheetSelectButton}>
            <Image
              style={styles.BottomSheetSelectButtonIcon}
              source={require('../assets/icon/camera.png')}
            />
            <Text style={styles.BottomSheetSelectButtonText}>Take a Photo</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple
          rippleColor="rgba(0, 0, 0, .32)"
          onPress={() => pickImage()}>
          <View style={styles.BottomSheetSelectButton}>
            <Image
              style={styles.BottomSheetSelectButtonIcon}
              source={require('../assets/icon/photos.png')}
            />
            <Text style={styles.BottomSheetSelectButtonText}>
              Upload from Photos
            </Text>
          </View>
        </TouchableRipple>
      </View>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  BottomSheeTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  BottomSheetSelectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    width: SCREEN_WIDTH - 20,
    // height: 100,
  },
  BottomSheetSelectButtonIcon: {
    height: RFValue(40),
    width: RFValue(40),
    resizeMode: 'contain',
  },
  BottomSheetSelectButtonText: {
    marginLeft: RFValue(50),
    fontSize: 16,
    fontWeight: '700',
  },
});

export default PickerSheetModal;
