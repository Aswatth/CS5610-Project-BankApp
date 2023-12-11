import axios from "axios";

const MAP_API = process.env.REACT_APP_LOCATION_IQ_API;
const MAP_API_KEY = process.env.REACT_APP_LOCATION_IQ_API_KEY;

export const CoordToLocation = async ({ lat, lon }) => {
  const response = await axios.get(
    `${MAP_API}/reverse?key=${MAP_API_KEY}&lat=${lat}&lon=${lon}&format=json`
  );
  console.log(response.data.display_name);
};

export const LocationToCoord = async (query) => {
  const response = await axios.get(
    `${MAP_API}/search?key=${MAP_API_KEY}&q=${query}%2C%20USA&format=json`
  );
  return { lat: response.data[0].lat, lon: response.data[0].lon };
};
