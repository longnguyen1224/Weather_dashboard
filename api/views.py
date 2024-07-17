from django.http import JsonResponse
import requests

def weather(request):
    city = request.GET.get('city', 'London')
    api_key = '0a7a5f78d3da631a7238c86b6aed1914'  # Replace with your OpenWeatherMap API key
    url = f'http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric'
    response = requests.get(url)
    data = response.json()
    if response.status_code == 200:
        weather_data = {
            'temperature': data['main']['temp'],
            'humidity': data['main']['humidity'],
            'description': data['weather'][0]['description']
        }
    else:
        weather_data = {
            'temperature': 0,
            'humidity': 0,
            'description': 'N/A'
        }
    return JsonResponse(weather_data)
