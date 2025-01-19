import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhaG1lZXI2LSIsImEiOiJjbTYyamhjN3MxMXp2MnFwdXZuYTRzM2F5In0.v4biqJhea9j7EmwSufszjA';

const API_BASE_URL = "http://localhost:3000/api/memories";

const HomePage: React.FC = () => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [category, setCategory] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const initializeMap = () => {
      const mapInstance = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        center: [-79.3832, 43.6532],
        zoom: 16,
        pitch: 60,
        bearing: -17.6,
        antialias: true
      });

      mapInstance.addControl(new mapboxgl.NavigationControl());

      mapInstance.on('load', () => {
        mapInstance.addLayer({
          id: 'sky',
          type: 'sky',
          paint: {
            'sky-type': 'atmosphere',
            'sky-atmosphere-sun': [0.0, 90.0],
            'sky-atmosphere-sun-intensity': 15
          }
        });

        mapInstance.addLayer({
          id: '3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 12,
          paint: {
            'fill-extrusion-color': [
              'interpolate',
              ['linear'],
              ['get', 'height'],
              0, '#DCE6E8',
              50, '#B8C6C9',
              100, '#94A6AA',
              200, '#708589'
            ],
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15, 0,
              15.05, ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15, 0,
              15.05, ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.7
          }
        });

        loadMemories(mapInstance);
      });

      mapInstance.on('click', (event) => {
        const { lng, lat } = event.lngLat;
        const popupContent = `
          <div class="popup p-4 text-sm">
            <h3 class="font-medium mb-2">Add a Memory</h3>
            <input class="w-full p-2 border rounded mb-2" type="text" id="memoryTitle" placeholder="Enter title">
            <textarea class="w-full p-2 border rounded mb-2" id="memoryDescription" placeholder="Describe your memory"></textarea>
            <label for="memoryCategory" class="block mb-2">Category:</label>
            <select class="w-full p-2 border rounded mb-2" id="memoryCategory">
              <option value="study">Study</option>
              <option value="hangout">Hangout</option>
              <option value="event">Event</option>
            </select>
            <button class="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600" onclick="handleSaveMemory(${lng}, ${lat})">Save Memory</button>
          </div>
        `;

        new mapboxgl.Popup({ closeOnClick: true })
          .setLngLat([lng, lat])
          .setHTML(popupContent)
          .addTo(mapInstance);
      });

      setMap(mapInstance);
    };

    initializeMap();

    return () => map?.remove();
  }, []);

  const fetchMemories = async (bounds: mapboxgl.LngLatBounds, category: string) => {
    try {
      const boundsJSON = JSON.stringify(bounds.toArray());
      const response = await fetch(`${API_BASE_URL}?bounds=${encodeURIComponent(boundsJSON)}&category=${category}`);
      if (response.ok) return response.json();
      console.error('Failed to fetch memories');
      return [];
    } catch (error) {
      console.error('Error fetching memories:', error);
      return [];
    }
  };

  const loadMemories = async (mapInstance: mapboxgl.Map) => {
    const bounds = mapInstance.getBounds();
    const memories = await fetchMemories(bounds!, category);

    memories.forEach((memory: any) => {
      new mapboxgl.Marker()
        .setLngLat([memory.lng, memory.lat])
        .setPopup(
          new mapboxgl.Popup().setHTML(`
            <div class="text-sm">
              <h3 class="font-medium mb-1">${memory.title}</h3>
              <p class="mb-1">${memory.description}</p>
              <p class="text-gray-500">Category: ${memory.category}</p>
              <p class="text-gray-500">Shared by: ${memory.user}</p>
              <a class="text-blue-500 hover:underline" href="/memory/${memory.id}" target="_blank">View Details</a>
            </div>
          `)
        )
        .addTo(mapInstance);
    });
  };

  const handleSaveMemory = async (lng: number, lat: number) => {
    const title = (document.getElementById('memoryTitle') as HTMLInputElement).value;
    const description = (document.getElementById('memoryDescription') as HTMLTextAreaElement).value;
    const category = (document.getElementById('memoryCategory') as HTMLSelectElement).value;

    if (!title || !description) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lat, lng, title, description, category })
      });

      if (response.ok) {
        alert('Memory saved successfully!');
        location.reload();
      } else {
        const error = await response.json();
        alert(`Failed to save memory: ${error.error}`);
      }
    } catch (error) {
      console.error('Error saving memory:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="relative h-screen w-screen">
      <h1 className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-white px-8 py-4 rounded-lg shadow-md font-semibold text-gray-800 text-lg">
        Campus Chronicles
      </h1>

      <div className="absolute top-5 left-5 bg-white p-4 rounded-lg shadow-md">
        <label htmlFor="category" className="block mb-2 font-medium">Filter by Category:</label>
        <select
          id="category"
          className="w-52 p-2 border rounded"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            map && loadMemories(map);
          }}
        >
          <option value="">All</option>
          <option value="study">Study</option>
          <option value="hangout">Hangout</option>
          <option value="event">Event</option>
        </select>
      </div>

      <div className="absolute top-5 right-5 bg-white p-4 rounded-lg shadow-md w-64">
        <h3 className="mb-3 font-medium text-gray-800">User Profile</h3>
        <label htmlFor="username" className="block mb-2 font-medium">Name:</label>
        <input
          type="text"
          id="username"
          className="w-full p-2 border rounded mb-3"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => alert(`Welcome, ${userName}! Your profile has been saved.`)}
        >
          Save Profile
        </button>
      </div>

      <div id="map" className="h-full w-full"></div>
    </div>
  );
};

export default HomePage
