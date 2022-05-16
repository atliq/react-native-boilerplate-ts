/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {
  Animated,
  View,
  StyleSheet,
  Easing,
  ViewStyle,
  StyleProp,
} from 'react-native';
import LinearGradient, {
  LinearGradientProps,
} from 'react-native-linear-gradient';

const GRADIENT_START = { x: 0, y: 0 };
const GRADIENT_END = { x: 1, y: 0 };

interface SimmerProps {
  /**
   * Determines component's children.
   */
  children: JSX.Element | JSX.Element[];
  /**
   * Determines the color of placeholder. By default is #E1E9EE
   */
  backgroundColor?: string;
  /**
   * Determines the highlight color of placeholder. By default is #F2F8FC
   */
  highlightColor?: string;
  /**
   * Determines the animation speed in milliseconds. By default is 800
   */
  speed?: number;
}

export default function Simmer({
  children,
  backgroundColor,
  speed,
  highlightColor,
}: SimmerProps): JSX.Element {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: speed,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ).start();
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-350, 350],
  });

  const absoluteTranslateStyle = React.useMemo(
    () => ({ ...StyleSheet.absoluteFillObject, transform: [{ translateX }] }),
    [translateX],
  );
  const gradientColors = React.useMemo<LinearGradientProps['colors']>(
    () => [
      backgroundColor as string,
      highlightColor as string,
      backgroundColor as string,
    ],
    [backgroundColor, highlightColor],
  );
  const viewStyle = React.useMemo<StyleProp<ViewStyle>>(
    () => ({ backgroundColor, overflow: 'hidden' }),
    [backgroundColor],
  );

  const getChildren = React.useCallback(
    (element: JSX.Element | JSX.Element[]) => {
      return React.Children.map(
        element,
        (child: JSX.Element, index: number) => {
          if (!child) {
            return null;
          }

          let style = {};
          if (child.type && child.type.displayName === 'SkeletonItem') {
            const { children, ...styles } = child.props;
            style = styles;
          } else if (child.props && child.props.style) {
            style = child.props.style;
          }

          if (child.props && child.props.children) {
            return (
              <View key={index} style={style}>
                {getChildren(child.props.children)}
              </View>
            );
          } else {
            return (
              <View key={index} style={styles.childContainer}>
                <View style={[style, viewStyle]}>
                  <Animated.View
                    style={[
                      StyleSheet.absoluteFill,
                      {
                        transform: [{ translateX }],
                      },
                    ]}>
                    <LinearGradient
                      style={styles.gradient}
                      colors={gradientColors}
                      start={GRADIENT_START}
                      end={GRADIENT_END}
                    />
                  </Animated.View>
                </View>
              </View>
            );
          }
        },
      );
    },
    [viewStyle, absoluteTranslateStyle, gradientColors],
  );

  return <React.Fragment>{getChildren(children)}</React.Fragment>;
}

interface SimmerItemInterface extends ViewStyle {
  children?: JSX.Element | JSX.Element[];
}

Simmer.Item = ({ children, ...style }: SimmerItemInterface): JSX.Element => (
  <View style={style}>{children}</View>
);

//@ts-ignore
Simmer.Item.displayName = 'SkeletonItem';

Simmer.defaultProps = {
  backgroundColor: '#E1E9EE',
  highlightColor: '#F2F8FC',
  speed: 800,
};

const styles = StyleSheet.create({
  childContainer: {
    position: 'relative',
  },
  gradient: {
    flex: 1,
  },
});
