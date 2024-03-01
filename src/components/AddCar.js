import React, { useContext } from "react";
import TopNav from "../Utils/TopNav";
import FormInputs from "../Utils/FormInputs";
import DataContext from "../context/DataContext";

const AddCar = () => {
  const { data, setData, setAddNotification, setAddNotificationTitle } =
    useContext(DataContext);

  return (
    <div>
      <TopNav title={"Add A New Car"} />
      <FormInputs
        data={data}
        setData={setData}
        setAddNotification={setAddNotification}
        setAddNotificationTitle={setAddNotificationTitle}
      />
    </div>
  );
};

export default AddCar;
