import { BarCodeScanner } from 'expo-barcode-scanner';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font'
import * as Permissions from 'expo-permissions';
import * as React from 'react';

import PersonDetailScreen from './screens/person-detail';

export default class CustomsScanner extends React.Component {
  state = {
    hasCameraPermission: null,
    hasFontsLoaded: false,
    scanned: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'alte-din': require('./assets/fonts/alte-din-regular.ttf'),
      'alte-din-bold': require('./assets/fonts/alte-din-bold.ttf'),
    });
    this.setState({ hasFontsLoaded: true });

    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  reset = () => {
    this.setState({ scanned: false });
  }

  render() {
    const mockPersonDetails = {
      access: 'granted',
      alert: 'All g',
      gender: 'Male',
      image: 'https://inlight.com.au/assets/team-photos/nic.jpg',
      message: 'Have a sweet partay!',
      name: 'Nic Gordon',
      nationality: 'Australian',
      occupation: 'Bum',
    };

    const { hasCameraPermission, hasFontsLoaded,  scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    if (hasFontsLoaded === false) {
      return <Text>Waiting for fonts to load</Text>;
    }

    return scanned ? <PersonDetailScreen reset={this.reset} {...mockPersonDetails} /> : (
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
          type={BarCodeScanner.Constants.Type.front}
        />
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
  };
}
