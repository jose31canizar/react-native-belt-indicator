import type {Node} from 'react';
import React, {useState} from 'react';
import {Dimensions, SafeAreaView, StatusBar, Text} from 'react-native';
import Animated, {useSharedValue} from 'react-native-reanimated';
import {default as BeltIndicator} from './src/BeltIndicator';
import Slider from './src/Slider';
const {width} = Dimensions.get('window');

const BG_COLOR = '#111111';

const App: () => Node = () => {
  const progress = useSharedValue(0);
  const [currentIndex, changeIndex] = useState(0);

  return (
    <SafeAreaView style={{flex: 1, width: '100%'}}>
      <StatusBar />

      <Slider scrollX={progress} onChanged={changeIndex}>
        {[...Array(5).keys()].map((_, i) => (
          <Animated.View
            style={{
              flex: 1,
              width: '100%',
              backgroundColor: BG_COLOR,
              height: '100%',
            }}>
            <Text style={{color: 'white'}}>page {i}</Text>
          </Animated.View>
        ))}
      </Slider>
      <Animated.View
        style={{
          width: '100%',
          height: 100,
          backgroundColor: '#888891',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <BeltIndicator
          progress={progress}
          size={16}
          count={5}
          indicatorColor="white"
          sliderWidth={width}
          currentIndex={currentIndex}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

export default App;
