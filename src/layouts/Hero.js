import React from 'react';
import { Link } from 'react-router-dom';
import TypewriterEffect from './../styles/TypeWriterEffect';

const Hero = ({ props, children }) => {
  const {
    button,
    title,
    subtitle,
    // searchPlaceholder,
    backgroundGradient,
    titleColor,
    subtitleColor,
    mainImageSrc,
    mainImageAlt,
    // onSearch 
  } = { ...props };

  const styles = {
    /* containers */
    section: "relative w-full lg:h-[90vh] sm:h-[500px] z-[0] gap-10 mb-[16px]",
    container: "w-full h-full bg-white text-center flex justify-center text-tighter",

    gradientOverlay: "inset-0 bg-gradient-to-b opacity-50",
    gradientClipPath: { clipPath: "polygon(0 0, 100% 0, 100% 70%, 0 100%)" },

    /* textbox */
    title: "text-h1 tracking-tight font-black lg:text-[56px] sm:text-[38px]",
    subtitle: "text-h2 tracking-tight mb-8 text-[28px]",
    contentWrapper: "absolute w-full z-10 mx-auto top-[7%] mt-section-top-margin max-w-[660px] px-4",

    /* background image */
    imageContainer: `mt-image-container-top-margin flex justify-center w-full h-full hover:scale-110`,
    image: "object-contain sm:object-cover max-w-[1440px]",

    /* partime job button */
    button: "border rounded-[100px] bg-[#A9EBFF] w-fit px-[18px] py-[5px] text-[#375761] drop-shadow-lg ",

    /* components */
    form: "relative mx-[20px]",
    input:
      "w-full py-3 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-80",
    searchButton: "absolute right-3 top-1/2 transform -translate-y-1/2",
    searchIcon: "h-5 w-5 text-gray-400 z-[0]",
  };

  return (
    <section className={`${styles.section} ${backgroundGradient}`}>
      <div className={styles.container}>
        <div
          className={`${styles.gradientOverlay} `}
          style={styles.gradientClipPath}
        />
        <div className={styles.contentWrapper}>
          <h1 className={`${styles.title} ${titleColor}`}><TypewriterEffect text={title}/></h1>
          <p className={`${styles.subtitle} ${subtitleColor}`}>{subtitle}</p>

          {button && (
            <Link to="/list/job">
              <button className={`${styles.button}`}>{button}</button>
            </Link>
          )}
          {children}
        </div>
        <div className={styles.imageContainer}>
          <img
            src={mainImageSrc}
            alt={mainImageAlt}
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
