import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import './HomePage.css';
import 'mapbox-gl/dist/mapbox-gl.css';

// Add this interface at the top of the file, before the HomePage function
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function HomePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [setMap] = useState<mapboxgl.Map | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    try {
      const response = await fetch('/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: { response: string } = await response.json();

      setMessages((prevMessages: Message[]) => [
        ...prevMessages,
        { role: 'user', content: userInput } as Message,
        { role: 'assistant', content: data.response } as Message
      ]);

      // Clear the input field
      setUserInput('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhaG1lZXI2LSIsImEiOiJjbTYyamhjN3MxMXp2MnFwdXZuYTRzM2F5In0.v4biqJhea9j7EmwSufszjA';

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-74.0066, 40.7135], // Update with your desired coordinates
      zoom: 15.5,
      pitch: 45,
      bearing: -17.6
    });

    map.current.on('load', () => {
      if (!map.current) return;
      
      map.current.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
          'fill-extrusion-color': '#aaa',
          'fill-extrusion-height': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'height']
          ],
          'fill-extrusion-base': ['get', 'min_height'],
          'fill-extrusion-opacity': 0.6
        }
      });
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  // ... existing handleSendMessage function ...

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <div 
        ref={mapContainer} 
        className="absolute top-0 left-0 w-full h-full z-0"
      />
      <div className="absolute inset-0 z-10">
        <div className="container mx-auto p-4">
          <h1 className="header text-white text-3xl font-bold mb-4">Campus Chronicles</h1>
          <div className="filter-container mb-4">
            <select defaultValue="All" className="bg-white/90 backdrop-blur-sm rounded px-4 py-2">
              <option value="All">Filter by Category: All</option>
              {/* Add more options as needed */}
            </select>
          </div>
          
          <div className="chat-container absolute bottom-4 right-4 w-96 max-w-[calc(100vw-2rem)]">
            <div className="chat-messages bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 mb-2 max-h-[400px] overflow-y-auto">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.role} mb-2`}>
                  {message.content}
                </div>
              ))}
            </div>
            
            <div className="input-container bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4">
              <textarea 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your message here..."
                rows={3}
                className="w-full rounded p-2 mb-2"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <button 
                onClick={handleSendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default HomePage;