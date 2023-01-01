import React from 'react';
import axios from 'axios';
import { useState } from "react";

function BodyFatPercentage() {
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [age, setAge] = React.useState('');
  const [weight, setWeight] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [gender, setGender] = React.useState('');

  const getBodyFatPercentage = () => {
    axios.get("http://localhost:8080/bodyFatPercentage/getBodyFatPercentage", {
      params: { age: age, weight: weight, height: height, gender: gender}
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      }
      );
  };
}

export default BodyFatPercentage;