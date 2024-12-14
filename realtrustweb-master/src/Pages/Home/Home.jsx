import Slider from "./Slider/Slider";
import Destinations from "./Destinations/Destinations";
import FindHome from "./FindYourHome/FindHome";
import Properties from "./All Properties/Properties";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Request from "../../lib/axios";
import { Helmet } from "react-helmet";

const Home = () => {
  const [property, setProperty] = useState({});
  const [filterLoading, setFilterLoading] = useState(false);

  const query = new URLSearchParams(useLocation().search);

  const cities = query.get("location");
  const bhkType = query.get("bhk");
  const furnish_type = query.get("furnish_type");
  const purpose = query.get("type");
  const price = query.get("price");
  const page = query.get("page");
  const sub_type = query.get("sub_type");
  const society = query.get("society");
  const fetchAllProperty = async () => {
    try {
      setFilterLoading(true);
      const params = new URLSearchParams();
      if (cities) {
        params.append("locality", cities);
      }
      if (bhkType) {
        params.append("bhk", bhkType);
      }
      if (purpose) {
        params.append("purpose", purpose);
      }

      if (furnish_type) {
        params.append("furnish_type", furnish_type);
      }
      if (price) {
        params.append("price", price);
      }
      if (page) {
        params.append("page", page);
      }
      if (sub_type) {
        params.append("type", sub_type);
      }
      if (society) {
        params.append("society", society);
      }

      if (params.size > 0) {
        setFilterLoading(true);
      }
      console.log(params.toString());
      const result = await Request.get(`/filter?${params.toString()}`);
      setProperty(result.data.properties);
    } catch (error) {
      setProperty({});
      setFilterLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProperty();
  }, [cities, bhkType, purpose, furnish_type, price, sub_type, society]);

  return (
    <div>
      <Helmet>
        <title>Real-Trust</title>
      </Helmet>
      <Slider />
      <FindHome searchBtnLoader={filterLoading} Isloading={filterLoading} />
      <Properties data={property} />
      {/* <Destinations /> */}
    </div>
  );
};

export default Home;
