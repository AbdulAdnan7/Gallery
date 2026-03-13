import React, { useState, useEffect } from "react";

function useFetchPhotos () {
    const [photos, setPhotos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchPhotos() {
            try {
                const res = await fetch('https://picsum.photos/v2/list?limit=30')
                if(!res.ok) {
                    throw new Error('Failed to fetch photos')
                }
                const data = await res.json()

                    setPhotos(data)
            } catch (err) {
                console.log('Error: ', err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchPhotos()
    }, [])
    return (
     { photos, loading, error }
    )
}

export default useFetchPhotos