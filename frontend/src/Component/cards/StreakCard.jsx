import React from "react";
import styled from "styled-components";
import { FaFire } from "react-icons/fa";

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: ${({ theme }) => theme.bg_secondary};
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  gap: 16px;
`;

const Icon = styled.div`
  font-size: 36px;
  color: #ff4500; // Fire-like orange color
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

const StreakCount = styled.div`
  font-size: 32px;
  font-weight: bold;
`;

const StreakCard = ({ streak }) => {
  return (
    <Card>
      <Icon>
        <FaFire />
      </Icon>
      <Info>
        <Title>Your Current Streak</Title>
        <StreakCount>{streak}🔥</StreakCount>
      </Info>
    </Card>
  );
};

export default StreakCard;
