import React from "react";
import { FaTruck } from "react-icons/fa"; 

const services = [
  {
    id: 1,
    icon: <FaTruck className="text-4xl text-orange-500" />, 
    title: "24/7 Support",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.",
  }
];

const ServiceCard = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {services.map((service) => (
        <div
          key={service.id}
          className="max-w-xs bg-white rounded-lg shadow-lg p-6 text-center"
        >
          {/* Icon Section */}
          <div className="flex justify-center mb-4">{service.icon}</div>

          {/* Title Section */}
          <h3 className="text-lg font-semibold text-blue-800">{service.title}</h3>

          {/* Description Section */}
          <p className="text-gray-500 mt-2">{service.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ServiceCard;
