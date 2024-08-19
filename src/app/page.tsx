// src/app/home/page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import StockCard from '@/components/StockCard';
import { Row, Col } from 'antd';
import { Table } from "antd";

interface StockData {
  symbol: string;
  logo: string;
  percentageChange: number;
  isPositive: boolean;
  volume: number;
  price_24h: string;
  price: string;
}
interface bondsData{
  shortName: string;
  yield: string;
  change: string;
}

const HomePage: React.FC = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [bonds, setBonds] = useState<bondsData[]>([]);
  const columns = [
    {
      title: 'SYMBOL',
      dataIndex: 'shortName',
      key: 'shortName',
    },
    {
      title: 'YIELD',
      dataIndex: 'yield',
      key: 'yield',
    },
    {
      title: 'CHANGE',
      dataIndex: 'change',
      key: 'change', 
      render: (text: number) => (
        <span style={{ color: text < 0 ? 'red' : 'green' }}>
          {text}
        </span>
      ),
     
    },
  ];

  const filteredData =  [ "BTC", "ICX" , "ETH", "BALN",  ] ;

  useEffect(() => {

    const fetchTokenData = async (): Promise<StockData[]> => {
      const response = await fetch('https://balanced.icon.community/api/v1/tokens');
      const data = await response.json();
      
      // Filter and process the data
      const res = data.filter((item: any) => filteredData.includes(item.symbol));
      
      const returnArray = res.map((currentValue: any) => {
        const percentageChange = ((currentValue.price * 100) / currentValue.price_24h) - 100;
        const isPositive = percentageChange >= 0;
        return {
          symbol: currentValue.symbol,
          logo: currentValue.logo_uri,
          price: currentValue.price.toFixed(2),
          percentageChange: parseFloat(percentageChange.toFixed(2)), // rounded to 2 decimal places
          isPositive,
          volume: parseFloat(( parseFloat(currentValue.total_supply)*  parseFloat(currentValue.price)).toFixed(2)),
          price_24h: currentValue.price_24h
        };
      });
      return returnArray;
    };
    const fetchBondsData = async (): Promise<bondsData[]> =>{
      const response = await fetch(
        'https://quote.cnbc.com/quote-html-webservice/restQuote/symbolType/symbol?symbols=US3M%7CUS6M%7CUS1Y%7CUS10Y%7CUS30Y&requestMethod=itv&noform=1&partnerId=2&fund=1&exthrs=1&output=json&events=1'
        
        );
      
      const data = await response.json();
      console.log(data.FormattedQuoteResult.FormattedQuote)

      const returnArray = data.FormattedQuoteResult.FormattedQuote.map((e :any) => {
        return{
          shortName: e.shortName,
          yield: e.last,
          change: e.change
        }
       
      })
      console.log(returnArray)
      return returnArray;
    }

    const fetchData = async () => {
      try {
        const tokenData = await fetchTokenData();
        const bondsData = await fetchBondsData();


        setStocks(tokenData);
        setBonds(bondsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <div style={{ padding: '20px' }}>
      <Row gutter={[16, 16]}>
        {stocks.map((stock, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6} xl={6}>
            <StockCard
              symbol={stock.symbol}
              logo={stock.logo}
              currentValue={stock.price}
              percentageChange={stock.percentageChange.toString()} // Convert number to string for display
              isPositive={stock.isPositive}
              volume={stock.volume.toString()}
              price_24h={stock.price_24h}
            />
          </Col>
        ))}

      </Row>
     
      
    </div>
    <div  style={{ padding: '20px' }}>
      <Row gutter={[16, 16]}>
        <Col  xs={24} sm={12} md={8} lg={6} xl={6}>
          <Table  dataSource={bonds} columns={columns} />
        </Col>
      </Row>
    </div>
    </>
  );
};

export default HomePage;
