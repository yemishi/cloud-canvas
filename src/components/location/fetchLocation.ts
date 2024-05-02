export const fetchLocation = async (lat: number, lon: number) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
    );
    const data = await response.json();
    if (data)
      return {
        error: false,
        location: data.address.hamlet
      };
    else
      return {
        error: true,
        message: "Unknown location."
      };
  } catch (error) {
    return {
      error: true,
      message: "We had a problem trying to get this location."
    };
  }
};
