import React from 'react';
import LottieView from 'lottie-react-native';

export default function StarterAnimation() {
  return (
    <LottieView source={require('../assets/Animations/opening.json')} autoPlay loop />
  );
}