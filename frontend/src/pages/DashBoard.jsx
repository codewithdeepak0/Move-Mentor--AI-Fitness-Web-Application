import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { counts } from "../utils/data";
import CountsCard from "../component/cards/CountCard";
import WeeklyStatCard from "../component/cards/WeeklyStatCard";
import CategoryChart from "../component/cards/CategoryChart";
import AddWorkout from "../component/AddWorkout";
import WorkoutCard from "../component/cards/WorkoutCard";
import { addWorkout, getDashboardDetails, getWorkouts } from "../api";
import StreakCard from "../component/cards/StreakCard"; // Import the StreakCard component

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
`;

const Wrapper = styled.div`
  flex: 1;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Title = styled.div`
  padding: 0px 16px;
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;

const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 100px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [streakData, setStreakData] = useState(null); // New state for streak data
  const [buttonLoading, setButtonLoading] = useState(false);
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [workout, setWorkout] = useState(`#Legs
-Back Squat
-5 setsX15 reps
30 kg
-10 min`);

  const dashboardData = async () => {
    setLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    try {
      const res = await getDashboardDetails(token);
      setData(res.data);
      setStreakData(res.data.streak); // Fetch and set streak data from the API response
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
    setLoading(false);
  };

  const getTodaysWorkout = async () => {
    setLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    try {
      const res = await getWorkouts(token, "");
      setTodaysWorkouts(res?.data?.todaysWorkouts);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching today's workouts:", error);
    }
    setLoading(false);
  };

  const addNewWorkout = async () => {
    setButtonLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    try {
      await addWorkout(token, { workoutString: workout });
      await dashboardData();
      await getTodaysWorkout();
    } catch (err) {
      alert(err);
    }
    setButtonLoading(false);
  };

  const startWorkout = async () => {
    try {
      const jwtToken = localStorage.getItem("fittrack-app-token"); // Fetch token
      if (!jwtToken) {
        alert("No token found. Please login again.");
        return;
      }

      // Make the API request
      const response = await fetch("http://localhost:3000/start-Workout", {
        method: "GET", // Use GET as specified
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json(); // Parse the response

      if (response.ok) {
        console.log("Workout started successfully:", result);
        alert(`Success: ${result.message}\nOutput: ${result.output}`);
      } else {
        console.error("Failed to start workout:", result.error);
        alert(`Error: ${result.error}\nDetails: ${result.details}`);
      }
    } catch (error) {
      console.error("Error occurred:", error);
      alert(`An unexpected error occurred: ${error.message}`);
    }
  };

  useEffect(() => {
    dashboardData();
    getTodaysWorkout();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Title>Dashboard</Title>

        {/* Add the StreakCard here */}
        {streakData && (
          <FlexWrap>
            <StreakCard streak={streakData} />
          </FlexWrap>
        )}

        <FlexWrap>
          {counts.map((item) => (
            <CountsCard key={item.id} item={item} data={data} />
          ))}
        </FlexWrap>

        <FlexWrap>
          <WeeklyStatCard data={data} />
          <CategoryChart data={data} />
          <AddWorkout
            workout={workout}
            setWorkout={setWorkout}
            addNewWorkout={addNewWorkout}
            buttonLoading={buttonLoading}
          />
        </FlexWrap>

        <Section>
          <Title>Today's Workouts</Title>
          <CardWrapper>
            {todaysWorkouts.map((workout) => (
              <WorkoutCard key={workout._id} workout={workout} />
            ))}
          </CardWrapper>
        </Section>
      </Wrapper>
    </Container>
  );
};

export default Dashboard;
