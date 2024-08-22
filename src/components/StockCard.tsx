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
  informalbuyValue: string;
  informalsellValue: string;
  officialbuyValue: string;
  officialsellValue: string;
  price_24h: string;

}

const StockCard: React.FC<StockCardProps> = ({
  symbol,
  logo,
  currentValue,
  percentageChange,
  isPositive,
  volume,
  informalbuyValue,
  informalsellValue,
  officialbuyValue,
  officialsellValue,
}) => {
  return (
    <Card style={{ borderRadius: '10px', textAlign: 'left' }}>
      <Row justify="center" align="middle">
        {logo && (
          <Col span={12}>
            <Image src={logo} alt={symbol} width={40} height={40} />
          </Col>
        )}
        {symbol && (
          <Col span={12}>
            <h1 style={{ fontWeight: 'bold' }}>{symbol}</h1>
          </Col>
        )}
      </Row>

      <hr style={{ margin: '10px 0' }} />

      {currentValue && (
        <Row justify="space-between" align="middle">
          <Col span={12} style={{ textAlign: 'left' }}>
            <p style={{ fontSize: '14px', color: 'gray' }}>Current Value</p>
          </Col>
          <Col span={12} style={{ textAlign: 'right', color: isPositive ? 'green' : 'red', fontWeight: 'bold' }}>
            <h2 style={{ margin: 0, fontWeight: 'bold' }}>${ parseFloat(currentValue).toFixed(2).toLocaleString()}</h2>
          </Col>
        </Row>
      )}

      {percentageChange && (
        <Row justify="space-between" align="middle">
          <Col span={12} style={{ textAlign: 'left' }}>
            <p style={{ fontSize: '14px', color: 'gray' }}>Percentage</p>
          </Col>
          <Col span={12} style={{ textAlign: 'right', color: isPositive ? 'green' : 'red', fontWeight: 'bold' }}>
            <h3 style={{ margin: 0, fontWeight: 'bold' }}>
              {isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {percentageChange}%
            </h3>
          </Col>
        </Row>
      )}

      {volume && (
        <Row justify="space-between" align="middle">
          <Col span={12} style={{ textAlign: 'left' }}>
            <p style={{ fontSize: '14px', color: 'gray', fontWeight: 'bold' }}>Market Cap</p>
          </Col>
          <Col span={12} style={{ textAlign: 'right', color: 'black', fontWeight: 'bold' }}>
            ${ parseFloat(volume).toFixed(2).toLocaleString()}
          </Col>
        </Row>
      )}

      {informalbuyValue && (
        <Row justify="space-between" align="middle">
          <Col span={12} style={{ textAlign: 'left' }}>
            <p style={{ fontSize: '14px', color: 'gray', fontWeight: 'bold' }}>Informal Buy</p>
          </Col>
          <Col span={12} style={{ textAlign: 'right', color: 'black', fontWeight: 'bold' }}>
            {informalbuyValue}
          </Col>
        </Row>
      )}

      {informalsellValue && (
        <Row justify="space-between" align="middle">
          <Col span={12} style={{ textAlign: 'left' }}>
            <p style={{ fontSize: '14px', color: 'gray', fontWeight: 'bold' }}>Informal Sell</p>
          </Col>
          <Col span={12} style={{ textAlign: 'right', color: 'black', fontWeight: 'bold' }}>
            {informalsellValue}
          </Col>
        </Row>
      )}

      {officialbuyValue && (
        <Row justify="space-between" align="middle">
          <Col span={12} style={{ textAlign: 'left' }}>
            <p style={{ fontSize: '14px', color: 'gray', fontWeight: 'bold' }}>Official Buy</p>
          </Col>
          <Col span={12} style={{ textAlign: 'right', color: 'black', fontWeight: 'bold' }}>
            {officialbuyValue}
          </Col>
        </Row>
      )}

      {officialsellValue && (
        <Row justify="space-between" align="middle">
          <Col span={12} style={{ textAlign: 'left' }}>
            <p style={{ fontSize: '14px', color: 'gray', fontWeight: 'bold' }}>Official Sell</p>
          </Col>
          <Col span={12} style={{ textAlign: 'right', color: 'black', fontWeight: 'bold' }}>
            {officialsellValue}
          </Col>
        </Row>
      )}
    </Card>
  );
};

export default StockCard;
