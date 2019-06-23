import { Button, Image, StyleSheet, Text, View } from 'react-native';
import * as React from 'react';

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: '#0E4C73',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 64,
    paddingVertical: 0,
  },
  icon: {
    alignItems: 'center',
    backgroundColor: '#f2c341',
    borderRadius: 4,
    display: 'flex',
    height: 80,
    justifyContent: 'center',
    marginRight: 32,
    width: 80,
  },
  image: {
    height: 70,
    width: 70,
  },
  foreign: {
    color: '#ffffff',
    fontFamily: 'alte-din',
    fontSize: 24,
  },
  local: {
    color: '#f2c341',
    fontFamily: 'alte-din-bold',
    fontSize: 36,
  },
});

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.header}>
        <View style={styles.icon}>
          <Image source={require('../../../../assets/images/arrival-icon.png')} style={styles.image} />
        </View>
        <View>
          <Text style={styles.foreign}>Llegadas</Text>
          <Text style={styles.local}>Arrivals</Text>
        </View>
      </View>
    );
  }
}
