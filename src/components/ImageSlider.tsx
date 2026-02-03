import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

type ImageSliderProp = {
  imageLists: string[];
};

const ImageSlider = ({ imageLists }: ImageSliderProp) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // ส่วนของการ Render ภาพแต่ละใบ
  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.imageWrapper}>
      <Image
        source={{ uri: item }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );

  return (
    <View style={styles.imageSliderContainer}>
      <Carousel
        loop
        width={width}
        height={290}
        autoPlay={true}
        autoPlayInterval={5000}
        data={imageLists}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => setActiveIndex(index)}
        renderItem={renderItem}
        style={styles.sliderContainer}
      />

      {/* Custom Pagination Dots */}
      <View style={styles.dotContainer}>
        {imageLists.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index ? styles.activeDot : styles.inactiveDot
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default ImageSlider;

const styles = StyleSheet.create({
  imageSliderContainer: {
    position: 'relative',
    paddingBottom: 20, // เปลี่ยนจาก paddingBlockEnd เพื่อความชัวร์ในหลายเวอร์ชัน
  },
  sliderContainer: {
    width: width,
    justifyContent: 'center',
  },
  imageWrapper: {
    flex: 1,
    paddingHorizontal: 10, // ระยะขอบซ้ายขวา
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10, // เท่ากับ radius เดิมของคุณ
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'blue',
  },
  inactiveDot: {
    backgroundColor: 'silver',
  },
});