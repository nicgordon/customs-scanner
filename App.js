import _ from 'lodash';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font'
import * as Permissions from 'expo-permissions';
import * as React from 'react';

import env from './environment';
import getPassengerDetails from './utils/get-passenger-details';
import PersonDetailScreen from './screens/person-detail';

export default class CustomsScanner extends React.Component {
  state = {
    error: null,
    hasCameraPermission: null,
    hasFontsLoaded: false,
    passengers: null,
    scanned: false,
    uuid: null,
  };

  async componentDidMount() {
    // Load fonts
    await Font.loadAsync({
      'alte-din': require('./assets/fonts/alte-din-regular.ttf'),
      'alte-din-bold': require('./assets/fonts/alte-din-bold.ttf'),
    });
    this.setState({ hasFontsLoaded: true });

    // Get permission to use the camera
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });

    // Load data
    try {
      const response = await fetch(env.AIRTABLE_ENDPOINT_URL, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${env.AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      const responseJson = await response.json();
      this.setState({
        passengers: _.get(responseJson, 'records'),
      });
    } catch (err) {
      console.log(err);
      this.setState({
        error: _.get(err, 'message'),
      });
    }
  }

  reset = () => {
    this.setState({ scanned: false, uuid: null });
  }

  render() {
    const { error, hasCameraPermission, hasFontsLoaded, passengers, scanned, uuid } = this.state;

    if (!_.isNull(error)) {
      return <Text>{error}</Text>;
    }

    if (_.isNull(hasCameraPermission)) {
      return <Text>Requesting for camera permission...</Text>;
    }

    if (hasCameraPermission === false) {
      return <Text>No access to camera.</Text>;
    }

    if (hasFontsLoaded === false) {
      return <Text>Waiting for fonts to load...</Text>;
    }

    if (_.isNull(passengers)) {
      return <Text>Waiting for passenger data to load...</Text>;
    }

    const passenger = scanned ? getPassengerDetails(uuid, passengers) : null;

    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden />
        {scanned
          ? <PersonDetailScreen reset={this.reset} {...passenger} />
          : (
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
              type={BarCodeScanner.Constants.Type.front}
            />
          )
        }
      </View>
    )
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true, uuid: data });
  };
}
