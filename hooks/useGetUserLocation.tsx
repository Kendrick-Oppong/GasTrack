import { useGeolocated } from "react-geolocated";
import toast from "react-hot-toast";

const useGetUserLocation = () => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled, getPosition } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      watchPosition: true,
      // suppressLocationOnMount: true,
      isOptimisticGeolocationEnabled: false,
      userDecisionTimeout: 5000,
      onError(positionError) {
        console.log(positionError);
        toast.error(positionError?.message as string);
      },
    });

  return {
    coords,
    isGeolocationAvailable,
    isGeolocationEnabled,
    getPosition,
  };
};

export default useGetUserLocation;
