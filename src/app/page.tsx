// src/app/home/page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import StockCard from '@/components/StockCard';
import { Row, Col } from 'antd';
import { Table } from "antd";
import { parse } from "node-html-parser";
import axios from 'axios';
import SellBuyCard from '@/components/card';
import Column from 'antd/es/table/Column';
let baseurl='http://localhost:3001';

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
interface crudeData{
  logo: string;
  change: string;
  last_price : string;
  last_time : string;
  change_percent: string;
  symbol:string;
}

interface ReturnObj {
  logo: string;
  change: number;
  last_price: number;
  last_time: string;
  change_percent: number;
}

interface Data {
  blend: {
    flag: string;
    last_price_timestamp: number;
  };
  change: number;
  last_price: number;
  change_percent: number;
}

interface rateData{
  informalbuyValue:string;
  informalsellValue:string;
  officialbuyValue:string;
  officialsellValue:string;
}

const HomePage: React.FC = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [bonds, setBonds] = useState<bondsData[]>([]);
  const [crude, setCrude] = useState<crudeData[]>([]);
  const [rate, setRate] =  useState<rateData[]>([]);
  const [argBonds, setArgBonds] = useState<bondsData[]>([]);
  const [dlBonds, setDlBonds] = useState<bondsData[]>([]);

  const bondcolumns = [
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
  const crudeColumns = [
    {
      title: 'Futures & Indexes',
      dataIndex: 'symbol',
      key: 'symbol',
    },
    {
      title: 'Last',
      dataIndex: 'last_price',
      key: 'last_price',
    },
    {
      title: 'Change',
      dataIndex: 'change',
      key: 'change', 
      render: (text: number) => (
        <span style={{ color: text < 0 ? 'red' : 'green' }}>
          {text}
        </span>
      ),
     
    },
    {
      title: '% Change',
      dataIndex: 'change_percent',
      key: 'change_percent', 
      render: (text: number) => (
        <span style={{ color: text < 0 ? 'red' : 'green' }}>
          {text}
        </span>
      ),
     
    },
    {
      title: 'Last Updated',
      dataIndex: 'last_time',
      key: 'last_time', 
      render: (text: number) => (
        <p style={{ color: text < 0 ? 'red' : 'green' }}>
          {text}
        </p>
      ),
     
    },
  ];

  const filteredData =  [ "BTC", "ICX" , "ETH", "BALN",  ];
  const returnArray: ReturnObj[] = [];

  function processData(data: Data): void {
    let returnobj: ReturnObj = {
      logo: `https://d1o9e4un86hhpc.cloudfront.net/a/img/oilprices/${data.blend.flag}`,
      change: data.change,
      last_price: data.last_price,
      last_time: timeAgo(data.blend.last_price_timestamp),
      change_percent: data.change_percent,
    };
  
    returnArray.push(returnobj);
  }
  function timeAgo(timestamp: number): string {
    const now = new Date();
    const timeDifference = Math.floor(now.getTime() / 1000 - timestamp); // in seconds
  
    const minutes = Math.floor(timeDifference / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `Just now`;
    }
  }

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

    const fetchCrudeData = async()  =>{
      let data = await fetch(`${baseurl}/api/crude`);
      let response = await data.json();
      
          
        return response;

    }

    const fetchRateData = async () : Promise<rateData[]> =>{
        let data = await fetch(`${baseurl}/api/rates`);
        let response = await data.json();
        
          
        return response;
    }

    const fetchArgBondsData = async (): Promise<bondsData[]> =>{
      let data = await fetch(`${baseurl}/api/argentina-bond-2020`);
      let response = await data.json();
      console.log("fetch arg data",response)
      return response;

    }

    const fetchDlBondsData = async (): Promise<bondsData[]> =>{
      let data = await fetch(`${baseurl}/api/dl-bonds`);
      let response = await data.json();

      return response;

    }





      

    const fetchData = async () => {
      try {
        const tokenData = await fetchTokenData();
        const bondsData = await fetchBondsData();
        const rateData = await fetchRateData();
        const oilData = await fetchCrudeData();
        const argBondsData = await fetchArgBondsData();
        const dlBondsData = await fetchDlBondsData();


        setStocks(tokenData);
        setBonds(bondsData);
        setRate(rateData);
        setCrude(oilData);
        setArgBonds(argBondsData);
        setDlBonds(dlBondsData);
        console.log("argBonds",argBonds)
        // console.log(argBonds)
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
          <Table  dataSource={bonds} columns={bondcolumns} />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={6} >
       
        
       
          <SellBuyCard title="Informal Buy" currentValue={rate.informalbuyValue} />
          <SellBuyCard title="Informal Sell" currentValue={rate?.informalsellValue} />
          <SellBuyCard title="Official Buy" currentValue={rate.officialbuyValue} />
          <SellBuyCard title="Official Sell" currentValue={rate.officialsellValue} />
        </Col>

        <Col  xs={24} sm={12} md={8} lg={6} xl={6}>
          <Table  dataSource={crude} columns={crudeColumns} />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={6} >
       
        
       
          <SellBuyCard title={argBonds.title} currentValue={argBonds.value} />
          <SellBuyCard title={dlBonds.title} currentValue={dlBonds.value} />
        </Col>
      </Row>
    </div>
    </>
  );
};

export default HomePage;
