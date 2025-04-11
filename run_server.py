
import subprocess
import webbrowser
import time
import os
import signal
import sys

def run_backend():
    print("Starting HealthFact Python Backend Server...")
    api_process = subprocess.Popen(["python", "api/healthfact_api.py"])
    return api_process

def run_frontend():
    print("Starting HealthFact Frontend Server...")
    # Assuming you're using npm start or similar to run the React app
    frontend_process = subprocess.Popen(["npm", "start"])
    return frontend_process

def open_browser():
    print("Opening application in browser...")
    # Give the servers a moment to start
    time.sleep(5)
    webbrowser.open("http://localhost:3000")

def cleanup(api_process, frontend_process):
    print("\nShutting down servers...")
    if api_process:
        api_process.terminate()
    if frontend_process:
        frontend_process.terminate()
    print("Servers shut down. Thank you for using HealthFact!")

def main():
    api_process = None
    frontend_process = None
    
    try:
        api_process = run_backend()
        frontend_process = run_frontend()
        open_browser()
        
        print("\nHealthFact is running!")
        print("Press Ctrl+C to shut down the servers")
        
        # Keep the script running until interrupted
        while True:
            time.sleep(1)
            
    except KeyboardInterrupt:
        pass
    finally:
        cleanup(api_process, frontend_process)

if __name__ == "__main__":
    main()
