# **Sustainable Smart City Dashboard**

An interactive, web-based dashboard for visualizing real-time urban sustainability metrics, including air quality, energy usage, public transportation, and waste management data. Built for the IITK Hackathon, this project aims to support smart city initiatives and promote sustainability.

## **Features**
- **Weather & Air Quality**: Live weather data and air quality index, using OpenWeather API.
- **Energy Usage**: Displays mock energy usage data.
- **Public Transportation**: Real-time overview of buses and metro availability (mock data).
- **Waste Management**: Monitors waste collection and recycling rates (mock data).
- **City Map**: Interactive city map centered on Delhi using OpenStreetMap and Leaflet.

---

## **Installation and Setup**

### Prerequisites
- **Node.js** and **npm** installed on your system
- **OpenWeather API Key** (sign up at [OpenWeather](https://openweathermap.org/api))

### **Step 1: Clone the Repository**
```bash
git clone https://github.com/chitraksh/your-repo-name.git
cd your-repo-name
```
### **Step 2: Install Dependencies**
In the project directory, run:
```bash
npm install
```
### **Step 3: Set Up Environment Variables**
Create a .env file in the root directory and add your OpenWeather API key:

```bash 
OPENWEATHER_API_KEY=your_openweather_api_key
```

### **Step 4: Run the Server**
Start the backend server using:
```bash 
node server.js
```

The server should now be running at http://localhost:3000.

## **Usage**
- Open a web browser and go to http://localhost:3000.
#### The dashboard will display:
 - Real-time weather and air quality data (via OpenWeather API).
 - Mock data for energy usage, transportation, and waste management.
 - An interactive map centered on Delhi, India.
### Note on Mock Data
The energy usage, transportation, and waste management data are currently mocked for demonstration purposes and can be updated as real data becomes available.

