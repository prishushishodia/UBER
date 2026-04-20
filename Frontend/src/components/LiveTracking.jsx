import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix default marker icons broken by webpack/vite asset handling
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const defaultPosition = { lat: 28.6139, lng: 77.209 } // New Delhi fallback

function RecenterMap({ position }) {
    const map = useMap()
    useEffect(() => {
        map.setView([position.lat, position.lng])
    }, [position, map])
    return null
}

const LiveTracking = () => {
    const [currentPosition, setCurrentPosition] = useState(defaultPosition)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords
            setCurrentPosition({ lat: latitude, lng: longitude })
        })

        const watchId = navigator.geolocation.watchPosition((position) => {
            const { latitude, longitude } = position.coords
            setCurrentPosition({ lat: latitude, lng: longitude })
        })

        return () => navigator.geolocation.clearWatch(watchId)
    }, [])

    return (
        <MapContainer
            center={[currentPosition.lat, currentPosition.lng]}
            zoom={15}
            style={{ width: '100%', height: '100%' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[currentPosition.lat, currentPosition.lng]} />
            <RecenterMap position={currentPosition} />
        </MapContainer>
    )
}

export default LiveTracking
