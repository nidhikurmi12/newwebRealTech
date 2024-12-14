import React, { useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import img from '../../assets/Images/Home-img/slider1.jpeg';

const faqs = {
    all: [
        { question: 'What is the difference between a real estate agent and a real estate broker?', answer: 'An agent is licensed to sell real estate, while a broker has additional education and licensing to manage their own firm.' },
        { question: 'Why should I use a real estate salesperson?', answer: 'A real estate salesperson has expertise in the market, can negotiate on your behalf, and guide you through the buying or selling process.' },
        { question: 'I have a family friend who is a Realtor. I like her and she is a help but she gives me one price to sell my home for and I think it is too low. So I called another agent who suggested a price more in line with my expectations. Who do I choose?', answer: 'Consider getting a third opinion or compare the market analysis provided by both agents to make an informed decision.' },
        { question: 'I have to make a choice between an updated home in an older neighborhood or a newer home in a more modern neighborhood. The home in the older neighborhood has almost everything I want and is much larger, but which makes the most sense as an investment?', answer: 'Evaluate the potential for appreciation in each neighborhood and consider factors like future development plans.' },
        { question: 'When buying a new home, what upgrades should we go for? What holds the most value? Do we upgrade the lot? Pick more square footage in the house? Add an extra bedroom?, etc.', answer: 'Focus on upgrades that provide the best return on investment, such as kitchen and bathroom renovations or adding energy-efficient features.' },
    ],
    choosing: [
        { question: 'I have to make a choice between an updated home in an older neighborhood or a newer home in a more modern neighborhood. The home in the older neighborhood has almost everything I want and is much larger, but which makes the most sense as an investment?', answer: 'Evaluate the potential for appreciation in each neighborhood and consider factors like future development plans.' },
        { question: 'When buying a new home, what upgrades should we go for? What holds the most value? Do we upgrade the lot? Pick more square footage in the house? Add an extra bedroom?, etc.', answer: 'Focus on upgrades that provide the best return on investment, such as kitchen and bathroom renovations or adding energy-efficient features.' },
    ],
};

const FAQs = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [openIndex, setOpenIndex] = useState(null);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setOpenIndex(null); // Close all FAQs when changing categories
    };

    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            <div>
                <img className='h-[500px]' src={img} alt="FAQ Banner" />
            </div>

            <div className="container mx-auto lg:px-20 lg:py-20 px-3 py-9">
                <div className="flex flex-col md:flex-row md:space-x-6 mb-6">
                    <button
                        className={`flex-1 py-2 px-4 mb-2 md:mb-0 text-center rounded-lg transition-colors duration-300 ${selectedCategory === 'all' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-black'}`}
                        onClick={() => handleCategoryChange('all')}
                    >
                        All
                    </button>
                    <button
                        className={`flex-1 py-2 px-4 mb-2 md:mb-0 text-center rounded-lg transition-colors duration-300 ${selectedCategory === 'choosing' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-black'}`}
                        onClick={() => handleCategoryChange('choosing')}
                    >
                        Choosing a Property
                    </button>
                </div>

                <div className="space-y-4">
                    {faqs[selectedCategory].map((faq, index) => (
                        <div key={index} className="border-b border-gray-300 mb-4">
                            <button
                                className="w-full flex justify-between items-center py-3 px-4 text-left bg-gray-200 text-black font-semibold rounded-lg focus:outline-none"
                                onClick={() => toggleAnswer(index)}
                            >
                                <span>{faq.question}</span>
                                {openIndex === index ? <FaAngleUp /> : <FaAngleDown />}
                            </button>
                            {openIndex === index && (
                                <div className="py-3 px-4 bg-white text-gray-800 rounded-b-lg">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default FAQs;
