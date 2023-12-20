import {useState, useEffect} from 'react'

interface CircularProgressProps {
  progress: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ progress }) => {
  const size = 95; // 100% of the SVG element size
  const radius = size / 2 - 2.5; // Radius of the circle (10 is the stroke width)
  const innerRadius = radius - 2.5; // Radius for the inner circle (10 is the stroke width)
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const strokeDashoffset = circumference - (progress / 100) * circumference; // Calculate the stroke-dashoffset based on the progress
  const gradientAngle = (progress / 100) * 360 - 90; // Calculate the angle for the gradient

  const loadImages = ["./assets/load_img.png", "./assets/load_img_2.png", "./assets/load_img_3.png", "./assets/load_img_4.png", "./assets/load_img_5.png", "./assets/load_img_6.png","./assets/load_img_7.png","./assets/load_img_8.png"];
  const [selectedImage, setSelectedImage] = useState("");
  
  function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * loadImages.length);
    return loadImages[randomIndex];
  }
 
 useEffect(() => {
    const randomImage = getRandomImage();
    setSelectedImage(randomImage);
  }, []);
   
  return (
    <svg width="50%" height="50%" viewBox={`0 0 ${size} ${size}`}> {/* Set width and height to 100% and add viewBox for responsiveness */}
      <defs>
        <linearGradient id="gradient" gradientTransform={`rotate(${gradientAngle})`}> {/* Define the gradient */}
          <stop offset="0%" stopColor="rgba(31,115,133,1)" />
          <stop offset="41%" stopColor="rgba(77,213,142,1)" />
          <stop offset="46%" stopColor="rgba(81,221,143,1)" />
          <stop offset="50%" stopColor="rgba(87,233,144,1)" />
          <stop offset="52%" stopColor="rgba(68,210,163,1)" />
          <stop offset="53%" stopColor="rgba(73,205,141,1)" />
          <stop offset="55%" stopColor="rgba(68,195,140,1)" />
          <stop offset="60%" stopColor="rgba(63,184,139,1)" />
          <stop offset="65%" stopColor="rgba(59,174,138,1)" />
          <stop offset="70%" stopColor="rgba(55,166,137,1)" />
          <stop offset="75%" stopColor="rgba(51,158,136,1)" />
          <stop offset="80%" stopColor="rgba(45,145,135,1)" />
          <stop offset="85%" stopColor="rgba(39,133,134,1)" />
          <stop offset="90%" stopColor="rgba(35,123,133,1)" />
          <stop offset="100%" stopColor="rgba(22,95,132,1)" />
        </linearGradient>
        <pattern id="image" patternUnits="userSpaceOnUse" width={innerRadius * 3} height={innerRadius * 3}>
        <image href={selectedImage} x="0" y="0" width="99%" height="99%" preserveAspectRatio="xMidYMid meet" /> {/* Add the image */}
        </pattern>
        <pattern id="overlay" patternUnits="userSpaceOnUse" width={innerRadius * 3} height={innerRadius * 3}>
          <image  href="./assets/loaderTex.png" x="0" y="0" width="-100%" height="100%" />
        </pattern>
        <filter id="rough">
        
             <feTurbulence
      type="turbulence"
      baseFrequency="0.05"
      numOctaves="2"
      result="turbulence" />
    <feDisplacementMap
      in2="turbulence"
      in="SourceGraphic"
      scale="2"
      xChannelSelector="R"
      yChannelSelector="G" />
       </filter>
      </defs>
      <circle
        stroke="tan"
        fill="transparent"
        strokeWidth="2.5"
        r={radius}
        cx={size / 2}
        cy={size / 2} 
        opacity={0.5}
        filter="url(#rough)"
      />

      <circle
       stroke="url(#overlay)"
        fill="transparent"
        strokeWidth="4"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        r={radius}
        cx={size / 2}
        cy={size / 2} 
        style={{ transition: 'stroke-dashoffset 0.35s' }}
        filter="url(#rough)"
      />
      <circle
        fill="url(#image)" 
        r={innerRadius}
        cx={size / 2}
        cy={size / 2}
        filter="url(#rough)"
     
      />
    </svg>
  );
};

export default CircularProgress;
