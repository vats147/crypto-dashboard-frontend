// src/app/home/page.tsx
import React from 'react';
import StockCard from '@/components/StockCard';
import { Row, Col } from 'antd';



const HomePage: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={6} xl={6}>
          <StockCard
            companyName="Meta"
            logo="https://upload.wikimedia.org/wikipedia/commons/6/6f/Meta_Platforms_Inc._logo.svg"
            currentValue="603.76"
            percentageChange="8.5"
            isPositive={true}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={6}>
          <StockCard
            companyName="Nike"
            logo="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg"
            currentValue="603.76"
            percentageChange="8.5"
            isPositive={false}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={6}>
          <StockCard
            companyName="Nike"
            logo="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg"
            currentValue="603.76"
            percentageChange="8.5"
            isPositive={false}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={6}>
          <StockCard
            companyName="Nike"
            logo="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg"
            currentValue="603.76"
            percentageChange="8.5"
            isPositive={false}
          />
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
