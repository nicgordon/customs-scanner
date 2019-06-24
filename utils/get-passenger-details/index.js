import _ from 'lodash';

const defaultValue = {
  access: 'granted',
  alert: 'Gatecrasher',
  gender: 'Unknown',
  image: 'http://chittagongit.com/download/162702',
  message: 'We’re going to allow it',
  name: 'Unknown',
  nationality: 'Unknown',
  occupation: 'Professional gatecrasher',
};

export default (uuid, passengers) =>
  _(passengers)
    .map('fields')
    .find({ uuid }) || defaultValue;
