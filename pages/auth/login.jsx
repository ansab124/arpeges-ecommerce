import Login from "@components/auth/login";
import Register from "@components/auth/register";
import { useState, useEffect } from "react";
import { getActivitiesAndCountriesList } from "@actions";
const Auth = () => {
  const [step, setStep] = useState(0);
  const [countriesAndActities, setCountriesAndActivities] = useState([]);
  const [registerStep1, setRegisterStep1] = useState({});
  console.log({ registerStep1 });

  const getCountriesAndActivitiesList = async () => {
    const response = await getActivitiesAndCountriesList();
    setCountriesAndActivities(response);
  };

  useEffect(() => {
    getCountriesAndActivitiesList();
  }, []);

  // const router = useRouter();
  return (
    <div>
      {step == 0 && (
        <Login
          setStep={setStep}
          getFieldValue={(value) => setRegisterStep1(value)}
        />
      )}
      {step == 1 && (
        <Register
          setStep={setStep}
          stepOneData={registerStep1}
          listsData={countriesAndActities}
        />
      )}
    </div>
  );
};

export default Auth;
