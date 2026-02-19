/**
 * Route Optimizer Demo
 * Implements nearest-neighbor algorithm for service route optimization
 */

// ========================================
// State
// ========================================
let map;
let markers = [];
let routeLine = null;
let optimizedRoute = [];
let isOptimized = false;

// ========================================
// Map Initialization
// ========================================
function initMap() {
    // Center on Boise/Nampa area
    map = L.map('map').setView([43.58, -116.45], 11);
    
    // Add OpenStreetMap tiles (free!)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);
    
    // Add initial markers
    addMarkers();
}

// ========================================
// Markers
// ========================================
function createIcon(color, label) {
    return L.divIcon({
        className: 'custom-marker',
        html: `<div class="marker-pin" style="background-color: ${color};">${label}</div>`,
        iconSize: [30, 40],
        iconAnchor: [15, 40],
        popupAnchor: [0, -40]
    });
}

function addMarkers() {
    // Clear existing markers
    markers.forEach(m => map.removeLayer(m));
    markers = [];
    
    // Add home base marker
    const homeMarker = L.marker([HOME_BASE.lat, HOME_BASE.lng], {
        icon: createIcon('#10b981', '🏠')
    }).addTo(map);
    homeMarker.bindPopup(`<strong>${HOME_BASE.name}</strong><br>${HOME_BASE.address}<br>${HOME_BASE.city}`);
    markers.push(homeMarker);
    
    // Add address markers
    SAMPLE_ADDRESSES.forEach((addr, index) => {
        const marker = L.marker([addr.lat, addr.lng], {
            icon: createIcon('#6366f1', index + 1)
        }).addTo(map);
        marker.bindPopup(`<strong>${addr.name}</strong><br>${addr.address}<br>${addr.city}`);
        markers.push(marker);
    });
}

function updateMarkersWithOrder(route) {
    // Clear existing markers
    markers.forEach(m => map.removeLayer(m));
    markers = [];
    
    route.forEach((stop, index) => {
        const isHome = stop.isHomeBase;
        const color = isHome ? '#10b981' : '#6366f1';
        const label = isHome ? '🏠' : index;
        
        const marker = L.marker([stop.lat, stop.lng], {
            icon: createIcon(color, label)
        }).addTo(map);
        
        marker.bindPopup(`
            <strong>${index === 0 ? 'START: ' : ''}${stop.name}</strong><br>
            ${stop.address}<br>
            ${stop.city}
            ${stop.notes ? `<br><em>${stop.notes}</em>` : ''}
        `);
        markers.push(marker);
    });
}

// ========================================
// Route Drawing
// ========================================
function drawRoute(route) {
    // Remove existing route line
    if (routeLine) {
        map.removeLayer(routeLine);
    }
    
    // Create route coordinates
    const coordinates = route.map(stop => [stop.lat, stop.lng]);
    
    // Animate the route drawing
    animateRoute(coordinates);
}

function animateRoute(coordinates) {
    let currentIndex = 0;
    const animatedCoords = [];
    
    function drawNextSegment() {
        if (currentIndex >= coordinates.length) {
            return;
        }
        
        animatedCoords.push(coordinates[currentIndex]);
        
        if (routeLine) {
            map.removeLayer(routeLine);
        }
        
        if (animatedCoords.length > 1) {
            routeLine = L.polyline(animatedCoords, {
                color: '#8b5cf6',
                weight: 4,
                opacity: 0.8,
                dashArray: '10, 10',
                lineCap: 'round'
            }).addTo(map);
        }
        
        currentIndex++;
        
        if (currentIndex < coordinates.length) {
            setTimeout(drawNextSegment, 200);
        }
    }
    
    drawNextSegment();
}

// ========================================
// Algorithm: Haversine Distance
// ========================================
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 3956; // Radius of earth in miles
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c = 2 * Math.asin(Math.sqrt(a));
    return R * c;
}

function toRad(deg) {
    return deg * (Math.PI / 180);
}

// ========================================
// Algorithm: Nearest Neighbor
// ========================================
function optimizeRouteNearestNeighbor(addresses) {
    const route = [HOME_BASE];
    const remaining = [...addresses];
    
    let current = HOME_BASE;
    
    while (remaining.length > 0) {
        let nearestIndex = 0;
        let minDistance = Infinity;
        
        // Find nearest unvisited address
        remaining.forEach((addr, index) => {
            const distance = calculateDistance(current.lat, current.lng, addr.lat, addr.lng);
            if (distance < minDistance) {
                minDistance = distance;
                nearestIndex = index;
            }
        });
        
        // Add nearest to route
        const nearest = remaining.splice(nearestIndex, 1)[0];
        route.push(nearest);
        current = nearest;
    }
    
    return route;
}

// ========================================
// Schedule Generation
// ========================================
function createSchedule(route, startTime = '08:30') {
    const schedule = [];
    const [startHour, startMin] = startTime.split(':').map(Number);
    let currentTime = new Date();
    currentTime.setHours(startHour, startMin, 0, 0);
    
    let totalDistance = 0;
    
    route.forEach((stop, index) => {
        let travelTime = 0;
        let distance = 0;
        
        if (index > 0) {
            const prev = route[index - 1];
            distance = calculateDistance(prev.lat, prev.lng, stop.lat, stop.lng);
            totalDistance += distance;
            // Estimate 2 min per mile + 5 min buffer
            travelTime = Math.max(5, Math.round(distance * 2 + 5));
        }
        
        currentTime = new Date(currentTime.getTime() + travelTime * 60000);
        const arrivalTime = formatTime(currentTime);
        
        const serviceTime = stop.isHomeBase ? 0 : 15;
        const serviceEnd = new Date(currentTime.getTime() + serviceTime * 60000);
        
        schedule.push({
            order: index,
            stop: stop,
            arrivalTime: arrivalTime,
            serviceEnd: formatTime(serviceEnd),
            travelMinutes: travelTime,
            serviceMinutes: serviceTime,
            distance: distance.toFixed(1)
        });
        
        currentTime = serviceEnd;
    });
    
    return {
        schedule,
        totalDistance: totalDistance.toFixed(1),
        totalTravelTime: schedule.reduce((sum, s) => sum + s.travelMinutes, 0),
        totalServiceTime: schedule.reduce((sum, s) => sum + s.serviceMinutes, 0),
        endTime: formatTime(currentTime)
    };
}

function formatTime(date) {
    return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
    });
}

// ========================================
// UI Updates
// ========================================
function renderAddressList() {
    const container = document.getElementById('address-list');
    
    const html = SAMPLE_ADDRESSES.map((addr, index) => `
        <div class="address-item">
            <span class="address-number">${index + 1}</span>
            <div class="address-details">
                <strong>${addr.name}</strong>
                <span>${addr.address}, ${addr.city}</span>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

function renderResults(result) {
    const statsContainer = document.getElementById('stats');
    const scheduleContainer = document.getElementById('schedule');
    const resultsPanel = document.getElementById('results-panel');
    
    resultsPanel.classList.add('visible');
    
    statsContainer.innerHTML = `
        <div class="stat-item">
            <span class="stat-value">${result.schedule.length - 1}</span>
            <span class="stat-label">Stops</span>
        </div>
        <div class="stat-item">
            <span class="stat-value">${result.totalDistance}</span>
            <span class="stat-label">Miles</span>
        </div>
        <div class="stat-item">
            <span class="stat-value">${Math.round((result.totalTravelTime + result.totalServiceTime) / 60 * 10) / 10}h</span>
            <span class="stat-label">Total Time</span>
        </div>
        <div class="stat-item">
            <span class="stat-value">${result.endTime}</span>
            <span class="stat-label">Est. End</span>
        </div>
    `;
    
    const scheduleHtml = result.schedule.map((item, index) => `
        <div class="schedule-item ${item.stop.isHomeBase ? 'home-base' : ''}">
            <div class="schedule-order">${item.stop.isHomeBase ? '🏠' : index}</div>
            <div class="schedule-details">
                <div class="schedule-time">
                    ${item.stop.isHomeBase ? item.arrivalTime : `${item.arrivalTime} - ${item.serviceEnd}`}
                </div>
                <div class="schedule-name">${item.stop.name}</div>
                <div class="schedule-address">${item.stop.address}</div>
                ${item.travelMinutes > 0 ? `<div class="schedule-travel">🚗 ${item.travelMinutes} min (${item.distance} mi)</div>` : ''}
            </div>
        </div>
    `).join('');
    
    scheduleContainer.innerHTML = scheduleHtml;
}

function resetDemo() {
    isOptimized = false;
    optimizedRoute = [];
    
    // Remove route line
    if (routeLine) {
        map.removeLayer(routeLine);
        routeLine = null;
    }
    
    // Reset markers
    addMarkers();
    
    // Hide results
    document.getElementById('results-panel').classList.remove('visible');
    
    // Reset button
    const btn = document.getElementById('optimize-btn');
    btn.disabled = false;
    btn.innerHTML = '<span class="btn-icon">⚡</span> Optimize Route';
}

// ========================================
// Event Handlers
// ========================================
function handleOptimize() {
    const btn = document.getElementById('optimize-btn');
    btn.disabled = true;
    btn.innerHTML = '<span class="btn-icon">⏳</span> Optimizing...';
    
    // Simulate processing time for effect
    setTimeout(() => {
        // Run optimization
        optimizedRoute = optimizeRouteNearestNeighbor(SAMPLE_ADDRESSES);
        
        // Create schedule
        const result = createSchedule(optimizedRoute);
        
        // Update UI
        updateMarkersWithOrder(optimizedRoute);
        drawRoute(optimizedRoute);
        renderResults(result);
        
        // Fit map to route
        const bounds = L.latLngBounds(optimizedRoute.map(s => [s.lat, s.lng]));
        map.fitBounds(bounds, { padding: [50, 50] });
        
        btn.innerHTML = '<span class="btn-icon">✓</span> Optimized!';
        isOptimized = true;
    }, 800);
}

// ========================================
// Initialize
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    renderAddressList();
    
    document.getElementById('optimize-btn').addEventListener('click', handleOptimize);
    document.getElementById('reset-btn').addEventListener('click', resetDemo);
});
