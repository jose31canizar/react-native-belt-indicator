import React, {
  ReactNodeArray,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
} from 'react';
import {FlatList} from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';

const DEVICE_WIDTH = 400;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export interface SliderProps {
  scrollRef?: React.Ref<any>;
  onChanged?: (page: number) => void;
  children: React.ReactChildren | React.ReactNode;
  scrollEnabled?: boolean;
  changePage?: (val: number) => void;
  scrollX?: SharedValue<number>;
}
export default function ({
  onChanged,
  children,
  scrollEnabled = true,
  scrollRef,
  scrollX,
}: SliderProps) {
  const [invalidChildCount, setInvalidChildCount] = useState(0);
  const scroller = useRef<any>(null);

  const scrollTo = (pageIndex: number) => {
    scroller.current?.getScrollResponder()!.scrollTo({
      x: pageIndex * DEVICE_WIDTH,
      y: 0,
      animated: true,
    });
    if (onChanged) {
      onChanged(pageIndex);
    }
  };
  useImperativeHandle(scrollRef, () => ({
    changePage: value => scrollTo(value),
  }));

  const _renderItem = ({item}: any) => {
    return <Animated.View style={{width: DEVICE_WIDTH}}>{item}</Animated.View>;
  };

  const _onScrollEnd = (e: {
    nativeEvent: {contentOffset: any; layoutMeasurement: any};
  }) => {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;
    let pageNum = Math.floor(contentOffset.x / viewSize.width);
    if (onChanged) {
      onChanged(pageNum);
    }
  };

  useEffect(() => {
    const invalidChildrenCount = React.Children.map(children, child =>
      React.isValidElement(child),
    )!.filter(element => !element).length;

    if (invalidChildrenCount > 0) {
      setInvalidChildCount(invalidChildrenCount);
    }
  }, [children]);

  const items = React.Children.map(
    children,
    (
      child,
      index,
    ): string | number | boolean | {} | ReactNodeArray | null | undefined => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          onNext: () => scrollTo(index - invalidChildCount + 1),
          onBack: () => scrollTo(index - invalidChildCount - 1),
        });
      }
      return child;
    },
  );

  const scrollHandler = useAnimatedScrollHandler(
    {
      onScroll: event => {
        if (scrollX) {
          scrollX.value = event.contentOffset.x;
        }
      },
    },
    [],
  );

  return (
    <AnimatedFlatList
      ref={scroller}
      onScroll={scrollHandler}
      bounces={false}
      scrollEnabled={scrollEnabled}
      keyboardShouldPersistTaps="handled"
      data={items}
      onMomentumScrollEnd={_onScrollEnd}
      keyExtractor={item => items!.indexOf(item).toString()}
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      directionalLockEnabled
      renderItem={_renderItem}
      scrollEventThrottle={1}
    />
  );
}
