import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import {RFValue} from 'react-native-responsive-fontsize';
import {Button, TextInput} from 'react-native-paper';
import PickImage from './MakeComplaint/PickImage';

const AddFineNameModal = props => {
  const {
    closeBtn,
    dialog,
    uploadBtn,
    submitBtn,
    fineName,
    setFineName,
    fineRs,
    setFineRs,
    imageUri,
    removeImage,
    loading,
  } = props;
  return (
    <Modal
      animationType="fade"
      statusBarTranslucent
      style
      transparent
      visible={dialog}>
      <View
        style={{
          backgroundColor: 'rgba(0, 0, 0,0.4)',
          flex: 1,
          justifyContent: 'center',
        }}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={RFValue('10')}
          behavior="position">
          <View style={styles.mainContainer}>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 25,
                fontWeight: '800',
                marginTop: 10,
              }}>
              Add New Fine
            </Text>
            <TouchableOpacity
              onPress={closeBtn}
              style={{
                position: 'absolute',
                right: 0,
                margin: 4,
              }}>
              <Icon name="closesquareo" size={40} color="#0052fe" />
            </TouchableOpacity>
            <View style={{padding: 10}}>
              <TextInput
                mode="outlined"
                label="Fine Name"
                value={fineName}
                onChangeText={val => setFineName(val)}
              />
              <TextInput
                mode="outlined"
                label="Fine Payment"
                keyboardType="number-pad"
                style={{marginTop: 10}}
                value={fineRs}
                onChangeText={val => setFineRs(val)}
              />
            </View>

            <Button
              onPress={uploadBtn}
              style={{
                margin: 10,
                alignItems: 'center',
                width: RFValue('150'),
                alignSelf: 'center',
              }}
              mode="contained">
              <Text>Upload Icon</Text>
            </Button>
            {imageUri ? (
              <View style={{alignSelf: 'center'}}>
                <PickImage item={imageUri} removeImage={removeImage} />
              </View>
            ) : null}
            <Button
              loading={loading}
              onPress={submitBtn}
              disabled={loading}
              style={{margin: 10}}
              mode="contained">
              <Text style={{fontWeight: '900', fontSize: 20}}>Submit</Text>
            </Button>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    //height: 400,
    backgroundColor: '#f0f0ff',
    marginLeft: RFValue('5'),
    marginRight: RFValue('5'),
    borderRadius: 8,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
});

export default AddFineNameModal;
