import React from 'react'

const LocationSearchPanel = ({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField, setActiveField }) => {

    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion)
            setActiveField('destination') // auto-switch to destination input
        } else if (activeField === 'destination') {
            setDestination(suggestion)
            setPanelOpen(false) // both fields filled, close panel
        }
    }

    return (
        <div className='p-4'>
            {suggestions.length === 0 ? (
                <p className='text-gray-400 text-sm text-center mt-4'>Start typing to search locations</p>
            ) : (
                suggestions.map((elem, idx) => (
                    <div key={idx} onClick={() => handleSuggestionClick(elem)} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start cursor-pointer'>
                        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
                        <h4 className='font-medium'>{elem}</h4>
                    </div>
                ))
            )}
        </div>
    )
}

export default LocationSearchPanel