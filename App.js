import _ from 'lodash';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font'
import * as Permissions from 'expo-permissions';
import * as React from 'react';

import env from './environment';
import getPassengerDetails from './utils/get-passenger-details';
import LoadingScreen from './screens/loading';
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

  getLoadingMessage = () => {
    const { hasCameraPermission, hasFontsLoaded, passengers } = this.state;

    if (_.isNull(hasCameraPermission)) {
      return 'Requesting for camera permission...';
    }

    if (hasFontsLoaded === false) {
      return 'Waiting for fonts to load...';
    }

    if (_.isNull(passengers)) {
      return 'Waiting for passenger data to load...';
    }

    return null;
  }

  reset = () => {
    this.setState({ scanned: false, uuid: null });
  }

  render() {
    const { error, hasCameraPermission, hasFontsLoaded, passengers, scanned, uuid } = this.state;

    if (!_.isNull(error)) {
      return <Text>{error}</Text>;
    }

    const loadingMessage = this.getLoadingMessage();
    if (!_.isNull(loadingMessage)) {
      return <LoadingScreen message={loadingMessage} />;
    }

    if (hasCameraPermission === false) {
      return <Text>No access to camera.</Text>;
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
