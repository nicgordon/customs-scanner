import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import Lottie from 'lottie-react-native';

import crossAnimation from '../../assets/animations/cross.json';

const styles = StyleSheet.create({
  passportIcon: {
    height: 100,
    width: 100,
  },
  error: {
    color: '#CD5050',
    fontFamily: 'sans-serif',
    fontSize: 12,
    marginTop: 20,
  },
});

export default class ErrorScreen extends React.Component {
  componentDidMount() {
    this.animation.play();
  }

  render() {
    const { error } = this.props;

    return (
      <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.passportIcon}>
            <Lottie
              loop={false}
              ref={animation => {
                this.animation = animation;
              }}
              source={crossAnimation}
            />
          </View>
          <Text style={styles.error}>{error}</Text>
          <Text style={styles.error}>Restart the application.</Text>
        </View>
      </View>
    );
  }
}
