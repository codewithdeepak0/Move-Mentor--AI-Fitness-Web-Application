import cv2
import mediapipe as mp
import numpy as np

# Initialize MediaPipe Pose
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5)
mp_drawing = mp.solutions.drawing_utils

# Function to calculate the angle between three points
def calculate_angle(a, b, c):
    a = np.array(a)
    b = np.array(b)
    c = np.array(c)

    radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
    angle = np.abs(radians * 180.0 / np.pi)
    if angle > 180.0:
        angle = 360 - angle
    return angle

# Initialize exercise counter and state
exercise_dict = {
    "squat": {"counter": 0, "stage": None, "threshold": 90, "joints": ["LEFT_HIP", "LEFT_KNEE", "LEFT_ANKLE"]},
    "pushup": {"counter": 0, "stage": None, "threshold": 90, "joints": ["LEFT_ELBOW", "LEFT_SHOULDER", "LEFT_WRIST"]},
}

selected_exercise = "squat"  # Default exercise

# Open webcam
cap = cv2.VideoCapture(0)

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        print("Failed to capture image")
        break

    # Convert frame to RGB
    image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    image.flags.writeable = False

    # Process pose landmarks
    results = pose.process(image)
    image.flags.writeable = True
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

    # If landmarks detected, draw and calculate angles
    if results.pose_landmarks:
        mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)

        landmarks = results.pose_landmarks.landmark
        joint_coords = [
            [landmarks[getattr(mp_pose.PoseLandmark, joint).value].x,
             landmarks[getattr(mp_pose.PoseLandmark, joint).value].y]
            for joint in exercise_dict[selected_exercise]["joints"]
        ]

        angle = calculate_angle(*joint_coords)
        stage = exercise_dict[selected_exercise]["stage"]
        threshold = exercise_dict[selected_exercise]["threshold"]

        if angle > threshold:
            stage = "up"
        elif angle < threshold - 30 and stage == "up":
            stage = "down"
            exercise_dict[selected_exercise]["counter"] += 1

        exercise_dict[selected_exercise]["stage"] = stage

        # Display info
        cv2.putText(image, f'Exercise: {selected_exercise}', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
        cv2.putText(image, f'Reps: {exercise_dict[selected_exercise]["counter"]}', (10, 70), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
        cv2.putText(image, f'Status: {stage}', (10, 110), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

    # Display the output
    cv2.imshow('Exercise Tracker', image)

    # Key controls for exercises
    key = cv2.waitKey(1) & 0xFF
    if key == ord('q'):
        break
    elif key == ord('1'):
        selected_exercise = "squat"
    elif key == ord('2'):
        selected_exercise = "pushup"

cap.release()
cv2.destroyAllWindows()
