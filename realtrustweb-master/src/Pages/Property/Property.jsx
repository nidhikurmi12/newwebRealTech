import React from 'react';
import img1 from '../../assets/Images/Home-img/slider1.jpeg';
import img2 from '../../assets/Images/Home-img/slider2.jpeg';
import img3 from '../../assets/Images/Home-img/slider3.jpeg';
import img4 from '../../assets/Images/Home-img/slider4.jpeg';

const properties = [
    {
        id: 1,
        image: img1,
        title: "Single Home at Florida 5, Pinecrest",
        price: "$580,000",
        description: "Beautiful home on quiet, tree-lined street with a gracious master suite, oversized walk-in closet, and lovely bathroom.",
        details: "5500 sq ft, 4 Bedrooms, 4 Bathrooms, 2 Garages",
        location: "Florida 5, Pinecrest, FL",
        status: "For Sale"
    },
    {
        id: 2,
        image: img2,
        title: "Villa on Grand Avenue",
        price: "$12,500 Monthly",
        description: "Spacious executive style four bed, four bath home with impact resistant windows and a renovated kitchen.",
        details: "9350 sq ft, 6 Bedrooms, 6 Bathrooms, 4 Garages",
        location: "Grand Avenue",
        status: "For Rent"
    },
    {
        id: 3,
        image: img3,
        title: "Villa on Hollywood Boulevard",
        price: "$740,000",
        description: "The best waterfront location with private dock and amazing water frontage.",
        details: "7700 sq ft, 5 Bedrooms, 5 Bathrooms, 3 Garages",
        location: "Hollywood Boulevard",
        status: "For Sale"
    },
    {
        id: 4,
        image: img4,
        title: "Villa in Hialeah, Dade County",
        price: "$7,500 Per Month",
        description: "Secure parking and additional features for first-time buyers or investors.",
        details: "4800 sq ft, 4 Bedrooms, 3 Bathrooms, 2 Garages",
        location: "Hialeah, Dade County",
        status: "For Rent"
    }
];

const Property = () => {
    return (
        <div className="w-full p-4 mt-20">
            <h1 className="text-3xl font-bold mb-6">Property Listings</h1>
            <div className="space-y-6">
                {properties.map((property) => (
                    <div key={property.id} className="flex flex-col md:flex-row border rounded-lg overflow-hidden shadow-lg bg-white">
                        <img src={property.image} alt={property.title} className="w-full md:w-1/3 h-48 object-cover" />
                        <div className="p-4 flex-1">
                            <h2 className="text-xl font-semibold mb-2">{property.title}</h2>
                            <p className="text-gray-700 mb-4">{property.description}</p>
                            <div className="mb-4">
                                <p className="text-gray-600 mb-2">Price: <span className="font-semibold">{property.price}</span></p>
                                <p className="text-gray-600 mb-2">Location: <span className="font-semibold">{property.location}</span></p>
                                <p className={`text-gray-600 mb-2 font-semibold ${property.status === "For Sale" ? "text-yellow-500" : "text-yellow-600"}`}>Status: {property.status}</p>
                            </div>
                            <div className="flex flex-wrap gap-2 border-t border-gray-300 pt-4">
                                {property.details.split(',').map((detail, index) => (
                                    <div
                                        key={index}
                                        className={`bg-${
                                            index === 0 ? 'yellow-100' :
                                            index === 1 ? 'pink-100' :
                                            index === 2 ? 'indigo-100' :
                                            'green-100'
                                        } text-${
                                            index === 0 ? 'yellow-800' :
                                            index === 1 ? 'pink-100' :
                                            index === 2 ? 'indigo-800' :
                                            'green-800'
                                        } py-2 px-4 rounded-lg border border-${
                                            index === 0 ? 'yellow-300' :
                                            index === 1 ? 'pink-300' :
                                            index === 2 ? 'indigo-300' :
                                            'green-300'
                                        }`}
                                    >
                                        {detail.trim()}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Property;
