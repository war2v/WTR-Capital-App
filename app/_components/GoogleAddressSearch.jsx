import { MapPin } from "lucide-react";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";

const GoogleAddressSearch = ({
  selectedAddress,
  setCoordinates,
  className,
}) => {
  return (
    <div className={"flex items-center w-full"}>
      <MapPin className="p-2 h-10 w-10 rounded-l-lg text-slate-100 bg-blue-300 opacity-70" />
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        selectProps={{
          placeholder: "Enter Address",
          isClearnable: true,
          className: "w-full rounded-r-md",
          onChange: (place) => {
            selectedAddress(place);
            geocodeByAddress(place.label)
              .then((result) => getLatLng(result[0]))
              .then(({ lat, lng }) => {
                setCoordinates({ lat, lng });
              });
          },
        }}
      />
    </div>
  );
};

export default GoogleAddressSearch;
