import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import Lottie from 'lottie-react-native';

import passportAnimation from '../../assets/animations/passport.json';

const styles = StyleSheet.create({
  passportIcon: {
    height: 100,
    width: 100,
  },
  message: {
    fontFamily: 'sans-serif',
    fontSize: 12,
    marginTop: 20,
  },
});

export default class LoadingScreen extends React.Component {
  componentDidMount() {
    this.animation.play();
  }

  render() {
    const { message } = this.props;

    return (
      <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.passportIcon}>
            <Lottie
              ref={animation => {
                this.animation = animation;
              }}
              source={passportAnimation}
            />
          </View>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    );
  }
}
