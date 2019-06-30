import { Image, StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import Lottie from 'lottie-react-native';

import crossAnimation from '../../../../assets/animations/cross.json';
// import questionMarkAnimation from '../../../../assets/animations/question-mark.json';
import tickAnimation from '../../../../assets/animations/tick.json';

const accessColors = {
  denied: {
    background: '#ffe5e5',
    highlight: '#CD5050',
  },
  granted: {
    background: '#EFF8F2',
    highlight: '#59B189',
  },
};

const styles = StyleSheet.create({
  body: {
    flex: 4,
    paddingHorizontal: 64,
    paddingVertical: 0,
  },
  information: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 0,
    marginVertical: 64,
  },
  image: {
    height: 300,
    marginRight: 64,
    width: 250,
  },
  name: {
    fontFamily: 'alte-din-bold',
    fontSize: 32,
    marginBottom: 32,
    marginHorizontal: 0,
    marginTop: 16,
  },
  label: {
    color: '#333333',
    fontFamily: 'alte-din',
    marginBottom: 4,
  },
  detail: {
    fontFamily: 'alte-din-bold',
    fontSize: 24,
    marginBottom: 20,
  },
  result: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderRadius: 4,
    borderWidth: 3,
    display: 'flex',
    flexDirection: 'row',
    fontSize: 24,
    minHeight: 100,
    padding: 32,
  },
  resultIcon: {
    height: 70,
    marginRight: 32,
    width: 70,
  },
  alert: {
    fontFamily: 'alte-din-bold',
    fontSize: 24,
  },
  message: {
    fontFamily: 'alte-din',
    fontSize: 24,
    marginTop: 16,
  },
});

export default class Body extends React.Component {
  componentDidMount() {
    this.animation.play();
  }

  render() {
    const { access, alert, gender, image, message, name, nationality, occupation } = this.props;

    // Set colors based on passenger access
    const accessStyles = StyleSheet.create({
      body: { backgroundColor: accessColors[access].background },
      result: { borderColor: accessColors[access].highlight },
      alert: { color: accessColors[access].highlight },
    });

    const animation = access === 'granted' ? tickAnimation : crossAnimation;

    return (
      <View style={[styles.body, accessStyles.body]}>
        <View style={styles.information}>
          <Image source={{ uri: image }} style={styles.image} />
          <View>
            <Text style={styles.name}>{name}</Text>

            <Text style={styles.label}>Nationality</Text>
            <Text style={styles.detail}>{nationality}</Text>

            <Text style={styles.label}>Gender</Text>
            <Text style={styles.detail}>{gender}</Text>

            <Text style={styles.label}>Occupation</Text>
            <Text style={styles.detail}>{occupation}</Text>
          </View>
        </View>
        <View style={[styles.result, accessStyles.result]}>
          <View style={styles.resultIcon}>
            <Lottie
              loop={false}
              ref={anim => {
                this.animation = anim;
              }}
              source={animation}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.alert, accessStyles.alert]}>{alert}</Text>
            <Text style={styles.message}>{message}</Text>
          </View>
        </View>
      </View>
    );
  }
}
