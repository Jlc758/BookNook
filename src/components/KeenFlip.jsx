import { useState } from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import placeholder from "../images/BookCover.jpg";
import cover from "../images/BookCover.png";

const KeenFlip = () => {
  const [rotation, setRotation] = useState(0);
  const [lastProgress, setLastProgress] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(1);

  const [sliderRef] = useKeenSlider({
    slides: 2,
    detailsChanged(s) {
      const progress = s.track.details.progress;
      const delta = lastProgress - progress;
      setLastProgress(progress);
      setRotation(delta * 360);

      // Update image opacity based on progress
      setImageOpacity(progress < 0.5 ? 1 - progress * 2 : (progress - 0.5) * 2);
    },
    loop: true,
  });

  return (
    <>
      <div>Drag to view more books</div>

      <div
        style={{
          backgroundImage: `linear-gradient(${rotation}deg, black 0px, black 50%, white 50%, white 100%)`,
          height: "180px",
          width: "100%",
        }}
        className="background-rotation"
        ref={sliderRef}
      >
        <div
          className="background-rotation__inner"
          style={{
            backgroundImage: `linear-gradient(${rotation}deg, yellow 0px, yellow 50%, pink 50%, pink 100%)`,
            height: "100%",
            width: "100%",
            display: "flex",
          }}
        >
          <img
            src={placeholder}
            height="180px"
            alt="Placeholder"
            style={{
              position: "relative",
              opacity: 1 - imageOpacity,
              transition: "opacity 0.3s",
            }}
          />
          <img
            src={cover}
            height="180px"
            alt="Cover"
            style={{
              position: "relative",
              opacity: imageOpacity,
              transition: "opacity 0.3s",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default KeenFlip;
