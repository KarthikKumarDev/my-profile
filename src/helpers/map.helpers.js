export const generateGeoJSON = (data) => {
  let geoJSON = {
    type: "FeatureCollection",
    features: [],
  };

  data?.forEach((record) => {
    geoJSON.features.push({
      type: "Feature",
      properties: record.attributes,
      geometry: {
        type: "Point",
        coordinates: [record.geoCodes.longitude, record.geoCodes.latitude],
      },
    });
  });

  return geoJSON;
};

export const generateJSONBlobURL = (jsonObject) => {
  const jsonString = JSON.stringify(jsonObject);
  const blob = new Blob([jsonString], { type: "application/json" });

  return URL.createObjectURL(blob);
};

export const generateUniqueValueInfos = (data) => {
  let uniqueValueInfos = [];
  data.forEach((record) => {
    uniqueValueInfos.push({
      // All features with value of "North" will be blue
      value: record.attributes.name,
      symbol: {
        type: "picture-marker",
        url: record.attributes.picture.src,
        width: record.attributes.picture.width,
        height: record.attributes.picture.height,
      },
      popupTemplate: record.attributes.popup,
    });
  });
  return uniqueValueInfos;
};

export const generateSVGBlobURL = (svgString) => {
  const blob = new Blob([svgString], { type: "image/svg+xml" });

  // Create a URL for the Blob
  return URL.createObjectURL(blob);
};

export const getClusterIconSVG = () => {
  return `<svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_717_3)">
    <circle cx="31" cy="25" r="25" fill="#667EFF"/>
    <circle cx="31" cy="25" r="23.5" stroke="#0011A8" stroke-width="3"/>
    </g>
    <defs>
    <filter id="filter0_d_717_3" x="0" y="0" width="62" height="62" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="6"/>
    <feGaussianBlur stdDeviation="3"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_717_3"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_717_3" result="shape"/>
    </filter>
    </defs>
    </svg>
    `;
};
