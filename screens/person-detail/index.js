import _ from 'lodash';
import { View } from 'react-native';
import * as React from 'react';

import Body from './components/body';
import Header from './components/header';

const RESET_SCREEN_DELAY = 10000;

export default class PersonDetailScreen extends React.Component {
  static defaultProps = {
    reset: _.noop,
  }

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.reset();
    }, RESET_SCREEN_DELAY);
  }

  reset = () => {
    clearTimeout(this.timeout);
    this.props.reset();
  }
  
  render() {
    return (
      <View onPress={this.reset} style={{ flex: 1 }}>
        <Header />
        <Body {...this.props} />
      </View>
    );
  }
}
