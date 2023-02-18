import React, { useDebugValue, useState, useEffect } from "react";
import styles from "../TestingSwipper/swiper.module.css";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, EffectCube } from "swiper";
import "swiper/swiper-bundle.min.css";

const slides = [
  {
    image: "src/assets/images/3.jpg",
    title: "test3",
    height: "350rem",
    styles: styles.img1,
  },
  {
    image: "src/assets/images/2.jpg",
    title: "test3",
    height: "350rem",
    styles: styles.img1,
  },
  {
    image: "src/assets/images/1.jpg",
    title: "test3",
    height: "350rem",
    styles: styles.img1,
  },
  {
    image: "src/assets/images/4.jpg",
    title: "test3",
    height: "350rem",
    styles: styles.img1,
  },
  {
    image: "src/assets/images/5.jpg",
    title: "test3",
    height: "350rem",
    styles: styles.img1,
  },
];
const TestSwiper = () => {
  return (
    <>
      <div className={styles.test2}>Test</div>
      <div className={styles.test1}>
        {/*/Set border radious here*/}
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, EffectCube]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className={styles.test3} //Set border radious here

          /*effect={"cube"}
      cubeEffect={{ //Cool effect
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      }}*/
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.image}>
              <img
                src={slide.image}
                alt={slide.title}
                height={slide.height}
                className={slide.styles}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default TestSwiper;
