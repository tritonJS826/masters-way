import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {Navigation, Pagination, Scrollbar} from "swiper/modules";
import {Swiper, SwiperProps, SwiperSlide} from "swiper/react";
import "swiper/css";
import "src/component/slider/Slider.scss";

const DEFAULT_AMOUNT_SLIDER = 3;
const DEFAULT_GAP_SLIDER = 24;

/**
 * Slider settings
 */
interface SliderSettings {

  /**
   * Navigation settings
   */
  navigation?: SwiperProps["navigation"];

  /**
   * Pagination settings
   */
  pagination?: SwiperProps["pagination"];

  /**
   * Scrollbar settings
   */
  scrollbar?: SwiperProps["scrollbar"];

  /**
   * Loop settings
   */
  loop?: SwiperProps["loop"];
}

/**
 * Slider item
 */
export interface SliderItem {

  /**
   * Item id
   */
  id: number;

  /**
   * Item content
   */
  content: React.ReactNode;
}

/**
 * Slider props
 */
interface SliderProps {

  /**
   * Slider items
   */
  sliderItems: SliderItem[];

  /**
   * Data attributes for cypress testing
   */
  cy?: string;

  /**
   * Custom class for the Slider.
   */
  className?: string;

  /**
   * Amount slider items
   * @default Number 3
   */
  amountSlider?: number;

  /**
   * Gap between slider items
   * @default Number 24
   */
  gap?: number;

  /**
   * Slider settings
   */
  settings?: SliderSettings;
}

/**
 * Slider component
 */
export const Slider = (props: SliderProps) => {

  const defaultSettings: SliderSettings = {
    navigation: true,
    pagination: {clickable: true},
    loop: true,
  };

  const processedSettings = {...defaultSettings, ...props?.settings};

  return (
    <Swiper
      slidesPerView={props.amountSlider ?? DEFAULT_AMOUNT_SLIDER}
      spaceBetween={props.gap ?? DEFAULT_GAP_SLIDER}
      modules={[Navigation, Pagination, Scrollbar]}
      className={props.className}
      breakpoints={{
        320: {slidesPerView: 1},
        600: {slidesPerView: 2},
        1100: {slidesPerView: 3},
      }}
      {...processedSettings}
    >
      {props.sliderItems.map((slider) => (
        <SwiperSlide key={slider.id}>
          {slider.content}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
