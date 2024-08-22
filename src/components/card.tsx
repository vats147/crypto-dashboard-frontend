// src/components/SellBuyCard.tsx
import React from "react";
import { Card, Row, Col } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

interface StockCardProps {
  title: string;
  currentValue: string;
  percentageChange?: string; // Make percentageChange optional
}

const SellBuyCard: React.FC<StockCardProps> = ({
  title,
  currentValue,
  percentageChange,
}) => {
  return (
    <Card
      style={{ borderRadius: "10px", textAlign: "left", marginBottom: "20px" }}
    >
      <Row justify="space-between" align="middle">
        <Col span={12} style={{ textAlign: "left" }}>
          <h2 style={{ fontWeight: "bold" }}>{title} Rate</h2>
        </Col>
        <Col
          span={12}
          style={{ textAlign: "right", color: "black", fontWeight: "bold" }}
        >
          <h2 style={{ margin: 0, fontWeight: "bold" }}>${currentValue}</h2>
        </Col>

        {percentageChange && (
          // Conditionally render this part if percentageChange is provided
          <>
          <Col span={12} style={{ textAlign: "left" }}>
            <h2 style={{ fontSize: '14px', color: 'gray',  fontWeight: 'bold' }}>Percentage</h2>
          </Col>
          <Col
            span={12}
            style={{ textAlign: "right", color: "black", fontWeight: "bold" }}
          >
            
          <p style={{ fontSize: "14px", color: percentageChange.startsWith('+') ? 'green' : 'red' }}>
                {percentageChange.startsWith('+') ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {percentageChange}
              </p>
        </Col>
        </>   
           
          
        )}
      </Row>
    </Card>
  );
};

export default SellBuyCard;
