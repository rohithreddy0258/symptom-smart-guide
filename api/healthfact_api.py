
from flask import Flask, jsonify, request
import requests
import json
from datetime import datetime
import random

app = Flask(__name__)

# Sample doctor data - in a real app this would come from a database
doctors_data = [
    {
        "id": 1,
        "name": "Dr. Sarah Johnson",
        "specialty": "Cardiology",
        "hospital": "City Medical Center",
        "image": "https://randomuser.me/api/portraits/women/44.jpg",
        "rating": 4.9,
        "reviews": 127,
        "location": {"lat": 40.7128, "lng": -74.0060}  # NYC
    },
    {
        "id": 2,
        "name": "Dr. Michael Chen",
        "specialty": "Neurology",
        "hospital": "University Hospital",
        "image": "https://randomuser.me/api/portraits/men/32.jpg",
        "rating": 4.8,
        "reviews": 94,
        "location": {"lat": 34.0522, "lng": -118.2437}  # LA
    },
    {
        "id": 3,
        "name": "Dr. Emily Rodriguez",
        "specialty": "Pediatrics",
        "hospital": "Children's Health Center",
        "image": "https://randomuser.me/api/portraits/women/68.jpg",
        "rating": 4.7,
        "reviews": 112,
        "location": {"lat": 41.8781, "lng": -87.6298}  # Chicago
    },
    {
        "id": 4,
        "name": "Dr. James Wilson",
        "specialty": "Orthopedics",
        "hospital": "Sports Medicine Clinic",
        "image": "https://randomuser.me/api/portraits/men/62.jpg",
        "rating": 4.8,
        "reviews": 88,
        "location": {"lat": 37.7749, "lng": -122.4194}  # San Francisco
    },
    {
        "id": 5,
        "name": "Dr. Lisa Thompson",
        "specialty": "Dermatology",
        "hospital": "Skin & Beauty Clinic",
        "image": "https://randomuser.me/api/portraits/women/25.jpg",
        "rating": 4.6,
        "reviews": 76,
        "location": {"lat": 33.4484, "lng": -112.0740}  # Phoenix
    },
    {
        "id": 6,
        "name": "Dr. Robert Garcia",
        "specialty": "Gastroenterology",
        "hospital": "Digestive Health Institute",
        "image": "https://randomuser.me/api/portraits/men/41.jpg",
        "rating": 4.9,
        "reviews": 103,
        "location": {"lat": 29.7604, "lng": -95.3698}  # Houston
    }
]

# Calculate distance between two coordinates using Haversine formula
def calculate_distance(lat1, lon1, lat2, lon2):
    from math import radians, sin, cos, sqrt, atan2
    
    # Convert decimal degrees to radians
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
    
    # Haversine formula
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * atan2(sqrt(a), sqrt(1-a))
    r = 6371  # Radius of earth in kilometers
    
    return r * c

@app.route('/api/doctors', methods=['GET'])
def get_doctors():
    user_lat = request.args.get('lat', type=float)
    user_lng = request.args.get('lng', type=float)
    specialty = request.args.get('specialty', default='All Specialties')
    
    # If location is provided, sort doctors by distance
    if user_lat and user_lng:
        for doctor in doctors_data:
            doctor_lat = doctor['location']['lat']
            doctor_lng = doctor['location']['lng']
            distance = calculate_distance(user_lat, user_lng, doctor_lat, doctor_lng)
            doctor['distance'] = round(distance, 1)  # Distance in km
        
        # Sort by distance
        sorted_doctors = sorted(doctors_data, key=lambda x: x['distance'])
    else:
        sorted_doctors = doctors_data
        
    # Filter by specialty if needed
    if specialty != 'All Specialties':
        sorted_doctors = [d for d in sorted_doctors if d['specialty'] == specialty]
    
    return jsonify(sorted_doctors)

@app.route('/api/news', methods=['GET'])
def get_news():
    # In a real app, you would call a news API like NewsAPI or use web scraping
    # For demo purposes, we'll create some mock data with current timestamps
    
    current_time = datetime.now().strftime("%B %d, %Y %H:%M")
    
    news = [
        {
            "id": 1,
            "title": "New AI Technology Improves Early Cancer Detection",
            "excerpt": "Researchers have developed a new AI algorithm that can detect early signs of cancer from medical images with 97% accuracy.",
            "image": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
            "date": current_time,
            "category": "Technology",
            "readTime": f"{random.randint(4, 10)} min read"
        },
        {
            "id": 2,
            "title": "Breakthrough in Treatment for Alzheimer's Disease",
            "excerpt": "Clinical trials show promising results for a new drug that targets the root causes of Alzheimer's disease.",
            "image": "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
            "date": current_time,
            "category": "Research",
            "readTime": f"{random.randint(4, 10)} min read"
        },
        {
            "id": 3,
            "title": "The Growing Role of Telemedicine in Rural Healthcare",
            "excerpt": "How telemedicine is bridging the healthcare gap in rural communities and improving patient outcomes.",
            "image": "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
            "date": current_time,
            "category": "Healthcare",
            "readTime": f"{random.randint(4, 10)} min read"
        },
        {
            "id": 4,
            "title": "Medical Wearables: The Future of Preventive Healthcare",
            "excerpt": "How smartwatches and other wearable devices are revolutionizing preventive healthcare and saving lives.",
            "image": "https://images.unsplash.com/photo-1557825835-70d97c4aa567?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
            "date": current_time,
            "category": "Technology",
            "readTime": f"{random.randint(4, 10)} min read"
        },
        {
            "id": 5,
            "title": "Nutrition and Mental Health: The Gut-Brain Connection",
            "excerpt": "New research highlights the important relationship between diet, gut health, and mental wellbeing.",
            "image": "https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
            "date": current_time,
            "category": "Nutrition",
            "readTime": f"{random.randint(4, 10)} min read"
        },
    ]
    
    return jsonify(news)

if __name__ == '__main__':
    app.run(debug=True)
