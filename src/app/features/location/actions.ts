export const getLocationName = async (
    lat: number,
    lon: number,
    setError:React.Dispatch<React.SetStateAction<string>>
  ): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
      );
      const data = await response.json();
      if (data) {
        setError("");
        return data.address.hamlet;
      } else {
        setError("Unknown location");
        return "";
      }
    } catch (error) {
      setError("Unknown location");
      return "";
    }
  };