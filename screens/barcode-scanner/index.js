import { BarCodeScanner } from 'expo-barcode-scanner';
import { StyleSheet, View } from 'react-native';
import * as React from 'react';

import Header from '../../components/header';
import passportControlImage from '../../assets/images/passport-control.png';

export default ({ onBarCodeScanned, scanned }) => (
  <View style={{ flex: 1 }}>
    <Header foreignText="Control de pasaportes" image={passportControlImage} localText="Passport control" />
    <View style={{ flex: 4 }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : onBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        type={BarCodeScanner.Constants.Type.front}
      />
    </View>
  </View>
);
