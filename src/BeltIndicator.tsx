import React, {useEffect} from 'react';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface IndicatorProps {
  index: number;
  color?: string;
  sliderWidth: number;
  progress: SharedValue<number>;
  size: number;
}

export default function Indicator({
  index,
  progress,
  color,
  sliderWidth,
  size = 8,
}: IndicatorProps) {
  const dotStyle = useAnimatedStyle(
    () => ({
      opacity:
        progress.value < sliderWidth * index &&
        progress.value > (index - 2) * sliderWidth
          ? 0
          : 1,
    }),
    [progress],
  );

  return (
    <Animated.View style={[dotStyle]}>
      <Animated.View
        key={`restore-page-${index}`}
        style={{
          marginHorizontal: size / 2,
          borderRadius: size / 2,
          height: size,
          width: size,
          backgroundColor: color,
        }}
      />
    </Animated.View>
  );
}

interface AnimatedIndicatorProps {
  currentIndex: number;
  count: number;
  indicatorColor?: string;
  withOpacity?: boolean;
  progress?: SharedValue<number>;
  sliderWidth: number;
  size: number;
  containerStyle?: any;
}
export default function ({
  currentIndex,
  count,
  indicatorColor,
  progress,
  sliderWidth,
  size,
  containerStyle,
}: AnimatedIndicatorProps) {
  const sliderX = useSharedValue(0);

  const indexRange = useDerivedValue(() => {
    return Math.floor(progress.value / sliderWidth);
  });

  const extendedDotSlider = useAnimatedStyle(() => ({
    position: 'absolute',
    transform: [
      {
        translateX:
          size / 2 +
          (indexRange.value % 2) * size * 8 +
          Math.floor(indexRange.value / 2) * size * 4,
      },
      {translateX: -size * 2},
      {
        scaleX:
          ((indexRange.value + 1) % 2) - ((progress.value / sliderWidth) % 1),
      },
      {translateX: size * 2},
    ],
  }));

  const extendedDotSlider2 = useAnimatedStyle(() => ({
    position: 'absolute',
    transform: [
      {
        translateX:
          size * 6 +
          size / 2 -
          (indexRange.value % 2) * size * 4 +
          Math.floor(indexRange.value / 2) * size * 4,
      },
      {translateX: -size * 2},
      {
        scaleX: (indexRange.value % 2) - ((progress.value / sliderWidth) % 1),
      },
      {translateX: size * 2},
    ],
    opacity: progress.value / sliderWidth >= count - 1 ? 0 : 1,
  }));

  const dotHeadSlider = useAnimatedStyle(() => ({
    position: 'absolute',
    transform: [
      {
        translateX:
          size * 4 -
          size * 4 * ((progress.value / sliderWidth) % 1) +
          Math.ceil(indexRange.value / 2) * size * 4,
      },
    ],
  }));

  const dotHeadSlider2 = useAnimatedStyle(() => ({
    position: 'absolute',
    transform: [
      {
        translateX:
          size * 6 -
          size * 4 * ((progress.value / sliderWidth) % 1) +
          Math.floor(indexRange.value / 2) * size * 4,
      },
    ],
    opacity: progress.value / sliderWidth >= count - 1 ? 0 : 1,
  }));

  useEffect(() => {
    sliderX.value = withSpring(currentIndex * size * 2, {
      stiffness: 200,
      damping: 18,
    });
  }, [currentIndex, sliderX]);

  return (
    <Animated.View
      style={[
        {
          flexDirection: 'row',
          backgroundColor: 'transparent',
          pointerEvents: 'none',
          justifyContent: 'center',
        },
        containerStyle,
      ]}>
      <Animated.View style={{flexDirection: 'row'}}>
        {[...Array(count + 2).keys()].map((_, i) => (
          <Indicator
            key={`indicator-${i}`}
            progress={progress}
            index={i}
            color={indicatorColor}
            size={size}
            sliderWidth={sliderWidth}
          />
        ))}

        <Animated.View style={extendedDotSlider}>
          <Animated.View
            style={{
              backgroundColor: indicatorColor,
              width: size * 4,
              height: size,
              marginHorizontal: size / 2,
            }}
          />
        </Animated.View>
        <Animated.View style={extendedDotSlider2}>
          <Animated.View
            style={{
              backgroundColor: indicatorColor,
              width: size * 4,
              height: size,
              marginHorizontal: size / 2,
            }}
          />
        </Animated.View>
        <Animated.View style={dotHeadSlider}>
          <Animated.View
            style={{
              backgroundColor: indicatorColor,
              width: size,
              height: size,
              borderRadius: size / 2,
              marginHorizontal: size / 2,
            }}
          />
        </Animated.View>
        <Animated.View style={dotHeadSlider2}>
          <Animated.View
            style={{
              backgroundColor: indicatorColor,
              width: size,
              height: size,
              borderRadius: size / 2,
              marginHorizontal: size / 2,
            }}
          />
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
}
