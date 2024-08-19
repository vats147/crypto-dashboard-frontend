// src/components/StockCard.tsx
import React from 'react';
import { Card, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import Image from 'next/image';

interface StockCardProps {
  symbol: string;
  logo: string;
  currentValue: string;
  percentageChange: string;
  isPositive: boolean;
  volume: string;
  price_24h: string;
}

const StockCard: React.FC<StockCardProps> = ({
  symbol,
  logo,
  currentValue,
  percentageChange,
  isPositive,
  volume,
}) => {
  return (
    <Card style={{ borderRadius: '10px', textAlign: 'left' }}>
      <Row justify="center" align="middle">
        <Col span={12}>
          <Image src={logo} alt={symbol} width={40} height={40} />
        </Col>
        <Col span={12}>
          <h1 style={{ fontWeight: 'bold' }}>{symbol}</h1>
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col span={24}>
          <h1 style={{ fontWeight: 'bold', fontSize: 24 }}>{symbol}</h1>
        </Col>
      </Row>
      <Row>
        <hr style={{ margin: '10px 0' }} />
      </Row>
      <Row justify="space-between" align="middle">
        <Col span={12} style={{ textAlign: 'left' }}>
          <p style={{ fontSize: '14px', color: 'gray' }}>Current Value</p>
          <p style={{ fontSize: '14px', color: 'gray' }}></p>
        </Col>
        <Col span={12} style={{ textAlign: 'right', color: isPositive ? 'green' : 'red', fontWeight: 'bold' }}>
          <h2 style={{ margin: 0, fontWeight: 'bold' }}>
            ${currentValue}
          </h2>
        </Col>
      </Row>
      <Row justify="space-between" align="middle">
        <Col span={12} style={{ textAlign: 'left' }}>
          <p style={{ fontSize: '14px', color: 'gray' }}>Percentage</p>
          <p style={{ fontSize: '14px', color: 'gray' }}></p>
        </Col>
        <Col span={12} style={{ textAlign: 'right', color: isPositive ? 'green' : 'red', fontWeight: 'bold' }}>
          <h3 style={{ margin: 0, fontWeight: 'bold' }}>
            {isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {percentageChange}%
          </h3>
        </Col>
      </Row>
      <Row justify="space-between" align="middle">
        <Col span={12} style={{ textAlign: 'left' }}>
          <p style={{ fontSize: '14px', color: 'gray', fontWeight: 'bold' }}>Volume</p>
        </Col>
        <Col span={12} style={{ textAlign: 'right', color: 'black', fontWeight: 'bold' }}>
          {volume}
        </Col>
      </Row>
    </Card>
  );
};

export default StockCard;



