import {View, Text, Modal} from 'react-native';
import React, {useState} from 'react';
import {Card} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';
import {Picker} from '@react-native-picker/picker';
import {Button} from 'react-native-paper';

const PromoteDialogModel = props => {
  const {
    visible,
    onRequestClose,
    transparent,
    title,
    onPressSave,
    onPressClose,
    selectedValue,
    onValueChange,
    loading,
  } = props;

  return (
    <Modal
      visible={visible}
      statusBarTranslucent
      transparent
      animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.4)',
          justifyContent: 'center',
        }}>
        <Card
          containerStyle={{
            backgroundColor: 'rgba(257,257,257,0.8)',
            borderRadius: 6,
            padding: 2,
          }}>
          <Text
            style={{
              alignSelf: 'center',
              color: '#000',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            {title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Text>ID Type</Text>
            <View
              style={{
                width: RFValue('120'),
                borderRadius: 5,
              }}>
              <Picker
                selectedValue={selectedValue}
                mode="dropdown"
                onValueChange={onValueChange}>
                <Picker.Item label="Public" value="public" />
                <Picker.Item label="Officer" value="officer" />
              </Picker>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              padding: 5,
            }}>
            <Button
              style={{marginRight: 5}}
              mode="outlined"
              onPress={onPressClose}>
              Close
            </Button>
            <Button loading={loading} mode="contained" onPress={onPressSave}>
              Save
            </Button>
          </View>
        </Card>
      </View>
    </Modal>
  );
};

export default PromoteDialogModel;
