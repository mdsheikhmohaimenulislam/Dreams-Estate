import React from "react";

const MySoldTableBody = ({ soldProperty }) => {
  const {
    propertyTitle,
    location,
    buyerEmail,
    buyerName,
    offerAmount
  } = soldProperty;

  return (
    <tr>
      <td>{propertyTitle}</td>
      <td>{location}</td>
      <td>{buyerEmail}</td>
      <td>{buyerName}</td>
      <td>${offerAmount}</td>
    </tr>
  );
};

export default MySoldTableBody;
