import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Base design dimensions ( iPhone 16 Pro = 430x932)
const guidelineBaseWidth = 402;
const guidelineBaseHeight = 874;

const scale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;
const responsiveFontSize = (size: number) => {
  const scaled = scale(size);
  return Math.floor(Math.min(scaled, size * 1.8));
};

const font = (size: number) => responsiveFontSize(size);

const moderateVerticalScale = (size: number, factor = 0.5) =>
  size + (verticalScale(size) - size) * factor;

export { scale, verticalScale, moderateScale, moderateVerticalScale, font };
