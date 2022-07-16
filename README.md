# React Native Belt Indicator 🥋

## Smooth page dot indicator animation for your flows.

https://user-images.githubusercontent.com/10779399/179361243-a47f8421-8cea-43e1-a3b7-86f543feafdb.mp4

## Props

| Prop | Description  | Type  |
| :---:   | :-: | :-: |
| progress | A reanimated value given by whatever ScrollView, FlatList, etc. that you decide to use | SharedValue<number> |
| size | The size of the dots | number |
| indicatorColor | The color of each dot | string |
| sliderWidth | The width of each slide/page | number |
| currentIndex | The current index of each page | number |


## Example Usage

```import type {Node} from 'react';
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
```
