// src/components/StockCard.tsx
import React from 'react';
import { Card, Row, Col } from 'antd';

interface StockCardProps {
  title: string;
  currentValue: string;
}

const SellBuyCard: React.FC<StockCardProps> = ({
  title,
  currentValue,
}) => {
  return (
    <Card style={{ borderRadius: '10px', textAlign: 'left', marginBottom: '20px' }}>
      
      <Row justify="space-between" align="middle">
        <Col span={12} style={{ textAlign: 'left' }}>
          {/* <p style={{ fontSize: '14px', color: 'gray' }}>Value</p> */}
          <h2 style={{ fontWeight: 'bold' }}>{title} Rate</h2>
        </Col>
        <Col span={12} style={{ textAlign: 'right', color: 'black', fontWeight: 'bold' }}>
          <h2 style={{ margin: 0, fontWeight: 'bold' }}>
            ${currentValue}
          </h2>
        </Col>
      </Row>
    </Card>
  );
};

export default SellBuyCard;
