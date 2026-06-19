import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState("");
  const [sqft, setSqft] = useState(1000);
  const [bhk, setBhk] = useState(2);
  const [bath, setBath] = useState(2);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/get_location_names")
      .then((response) => {
        const locs = response.data.locations;

        setLocations(locs);

        if (locs.length > 0) {
          setLocation(locs[0]);
        }
      })
      .catch((error) =>
        console.error("Error fetching locations:", error)
      );
  }, []);

  const handlePredict = async (e) => {
    e.preventDefault();

    setLoading(true);

    const payload = {
      location: location,
      total_sqft: Number(sqft),
      bhk: Number(bhk),
      bath: Number(bath),
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict_home_price",
        payload
      );

      setPrediction(response.data.estimated_price);
    } catch (error) {
      console.error("Prediction Error:", error);
      alert("Prediction failed. Check backend logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-8">
          Bangalore Home Price Predictor
        </h1>

        <form onSubmit={handlePredict} className="space-y-6">

          {/* SQFT */}
          <div>
            <label className="block mb-2 font-semibold">
              Total Square Feet
            </label>

            <input
              type="number"
              value={sqft}
              onChange={(e) => setSqft(e.target.value)}
              min="100"
              required
              className="w-full p-3 border rounded-lg"
            />
          </div>

          {/* BHK */}
          <div>
            <label className="block mb-2 font-semibold">
              BHK
            </label>

            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((val) => (
                <div key={val}>
                  <input
                    type="radio"
                    id={`bhk-${val}`}
                    name="bhk"
                    checked={Number(bhk) === val}
                    onChange={() => setBhk(val)}
                    className="hidden peer"
                  />

                  <label
                    htmlFor={`bhk-${val}`}
                    className="block text-center p-2 border rounded-lg cursor-pointer peer-checked:bg-indigo-600 peer-checked:text-white"
                  >
                    {val}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Bathrooms */}
          <div>
            <label className="block mb-2 font-semibold">
              Bathrooms
            </label>

            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((val) => (
                <div key={val}>
                  <input
                    type="radio"
                    id={`bath-${val}`}
                    name="bath"
                    checked={Number(bath) === val}
                    onChange={() => setBath(val)}
                    className="hidden peer"
                  />

                  <label
                    htmlFor={`bath-${val}`}
                    className="block text-center p-2 border rounded-lg cursor-pointer peer-checked:bg-indigo-600 peer-checked:text-white"
                  >
                    {val}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block mb-2 font-semibold">
              Location
            </label>

            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 border rounded-lg"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700"
          >
            {loading ? "Calculating..." : "Estimate Price"}
          </button>
        </form>

        {prediction !== null && (
          <div className="mt-6 p-4 bg-green-100 rounded-lg text-center">
            <h3 className="font-bold text-green-700">
              Estimated Price
            </h3>

            <p className="text-2xl font-bold text-green-900">
              ₹ {prediction} Lakhs
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;