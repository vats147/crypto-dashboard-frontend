// src/app/home/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import StockCard from "@/components/StockCard";
import { Row, Col, Spin, Table, message, Button, Space } from "antd";
import {
  ReloadOutlined,
} from '@ant-design/icons';

import { parse } from "node-html-parser";
import axios from "axios";
import SellBuyCard from "@/components/card";
import Column from "antd/es/table/Column";
// let baseurl = process.env.baseurl;
let baseurl = "https://connor-crypto-backend.vercel.app";

interface StockData {
  symbol: string;
  logo: string;
  percentageChange: number;
  isPositive: boolean;
  volume: number;
  price_24h: string;
  price: string;
  informalbuyValue?: string;  // Add optional properties
  informalsellValue?: string;
  officialbuyValue?: string;
  officialsellValue?: string;
  currentValue?:string;
  
}
interface bondsData {
  shortName: string;
  yield: string;
  change: string;
}
interface crudeData {
  logo: string;
  change: string;
  last_price: string;
  last_time: string;
  change_percent: string;
  symbol: string;
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

interface rateData {
  informalbuyValue: string;
  informalsellValue: string;
  officialbuyValue: string;
  officialsellValue: string;
}


const HomePage: React.FC = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [bonds, setBonds] = useState<bondsData[]>([]);
  const [crude, setCrude] = useState<crudeData[]>([]);
  const [rate, setRate] = useState<rateData[]>([]);
  const [argBonds, setArgBonds] = useState<bondsData[]>([]);
  const [dlBonds, setDlBonds] = useState<bondsData[]>([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';
  const bondcolumns = [
    {
      title: "SYMBOL",
      dataIndex: "shortName",
      key: "shortName",
    },
    {
      title: "YIELD",
      dataIndex: "yield",
      key: "yield",
    },
    {
      title: "CHANGE",
      dataIndex: "change",
      key: "change",
      render: (text: number) => (
        <span style={{ color: text < 0 ? "red" : "green" }}>{text}</span>
      ),
    },
  ];
  const crudeColumns = [
    {
      title: "Futures & Indexes",
      dataIndex: "symbol",
      key: "symbol",
    },
    {
      title: "Last",
      dataIndex: "last_price",
      key: "last_price",
    },
    {
      title: "Change",
      dataIndex: "change",
      key: "change",
      render: (text: number) => (
        <span style={{ color: text < 0 ? "red" : "green" }}>{text}</span>
      ),
    },
    {
      title: "% Change",
      dataIndex: "change_percent",
      key: "change_percent",
      render: (text: number) => (
        <span style={{ color: text < 0 ? "red" : "green" }}>{text}</span>
      ),
    },
  ];

  const filteredData = ["BTC", "ICX", "ETH", "BALN"];
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
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `Just now`;
    }
  }
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a success message',
    });
    console.log("success")
  };

  const reloading = () => {
    setLoading(true);
    messageApi.open({
      key,
      type: 'loading',
      content: 'Your data is loading...',
    });
    
  };

  const errorMessage = (data :any) =>{
    messageApi.open({
      
      type: 'error',
      content: data,
      duration: 3,
    });
  }

  useEffect(() => {
    const fetchTokenData = async (): Promise<StockData[]> => {
      const response = await fetch(
        "https://balanced.icon.community/api/v1/tokens"
      );
      const data = await response.json();

      // Filter and process the data
      const res = data.filter((item: any) =>
        filteredData.includes(item.symbol)
      );

      const returnArray = res.map((currentValue: any) => {
        const percentageChange =
          (currentValue.price * 100) / currentValue.price_24h - 100;
        const isPositive = percentageChange >= 0;
        
        return {
          symbol: currentValue.symbol,
          logo: currentValue.logo_uri,
          price: currentValue.price.toFixed(2),
          percentageChange: parseFloat(percentageChange.toFixed(2)), // rounded to 2 decimal places
          isPositive,
          volume: parseFloat(
            (
              parseFloat(currentValue.total_supply) *
              parseFloat(currentValue.price)
            ).toFixed(2)
          ),
          price_24h: currentValue.price_24h,
        };
      });
      

      let temp = await fetchRateData() as any;;
      console.log("temp if " ,temp)

          returnArray.push({
            symbol: "Argentinian Peso - Informal Rate",
            logo: "",
            informalbuyValue: temp.informalbuyValue,
            informalsellValue: temp.informalsellValue,
            isPositive: temp.informalbuyValue > 0,
            percentageChange : temp.informalBuyChangePercentage.split('%')[0],

            
          });
    
          returnArray.push({
            symbol: "Argentinian Peso - Offical Rate",
            logo: "",
            officialbuyValue: temp.officialbuyValue,
            officialsellValue: temp.officialsellValue,
            isPositive: temp.officialbuyValue > 0,
            percentageChange:temp.officalBuyChangePercentage.split('%')[0]
           
          });
        
       temp = await fetchArgBondsData();
       returnArray.push({
        symbol:temp.title,
        logo: "",
        currentValue: temp.value,
        percentageChange: temp.percentageChange.split('%')[0],
        isPositive: temp.percentageChange.startsWith('+') ? true : false
       
      });
      
       temp = await fetchDlBondsData();
       returnArray.push({
        symbol: temp.title,
        logo: "",
        currentValue: temp.value,
        percentageChange: temp.percentageChange.split('%')[0],
        isPositive: temp.percentageChange.startsWith('+') ? true : false
       
      });
      console.log(returnArray);
      
      return returnArray;
    };
    const fetchBondsData = async (): Promise<bondsData[]> => {
      const response = await fetch(
        "https://quote.cnbc.com/quote-html-webservice/restQuote/symbolType/symbol?symbols=US3M%7CUS6M%7CUS1Y%7CUS10Y%7CUS30Y&requestMethod=itv&noform=1&partnerId=2&fund=1&exthrs=1&output=json&events=1"
      );

      const data = await response.json();
      console.log(data.FormattedQuoteResult.FormattedQuote);
      if(response.status !==  200){
        errorMessage("Failed to fetch Crude Oil  Data");
      }
      const returnArray = data.FormattedQuoteResult.FormattedQuote.map(
        (e: any) => {
          return {
            shortName: e.shortName,
            yield: e.last,
            change: e.change,
          };
        }
      );
      console.log(returnArray);
      return returnArray;
    };

    const fetchCrudeData = async () => {
      let data = await fetch(`${baseurl}/api/crude`);
      let response = await data.json();
      if(data.status !==  200){

      errorMessage("Failed to fetch Crude Oil  Data");
      }
      return response;
    };

    const fetchRateData = async (): Promise<rateData[]> => {
      let data = await fetch(`${baseurl}/api/rates`);
      let response = await data.json();
      if(data.status !==  200){
        errorMessage("Failed to fetch Offical and Informal Rate Data");
      }
      return response;
    };

    const fetchArgBondsData = async (): Promise<bondsData[]> => {
      let data = await fetch(`${baseurl}/api/argentina-bond-2020`);
      let response = await data.json();
      console.log("fetch arg data", data.status);
      if(data.status !==  200){
        errorMessage("Failed to fetch Argentina Bonds Data");
      }

      return response;
    };

    const fetchDlBondsData = async (): Promise<bondsData[]> => {
      let data = await fetch(`${baseurl}/api/dl-bonds`);
      let response = await data.json();
      if(data.status !==  200){
        errorMessage("Failed to fetch dl Bonds Data");
      }


      return response;
    };
    

    const fetchData = async () => {
      try {
        const [
          tokenData,
          bondsData,
          rateData,
          oilData,
          argBondsData,
          dlBondsData,
        ] = await Promise.all([
          fetchTokenData(),
          fetchBondsData(),
          fetchRateData(),
          fetchCrudeData(),
          fetchArgBondsData(),
          fetchDlBondsData(),
        ]);

        if ( !tokenData || !bondsData || !rateData || !oilData || !argBondsData || !dlBondsData) {
          messageApi.open({
            key,
            type: 'error',
            content: 'Failed to fetch data please reload the site !',
            duration: 5,
          });
          throw new Error("Data fetching failed");
        }
        await Promise.all([
          setStocks(tokenData),
          setBonds(bondsData),
          setRate(rateData),
          setCrude(oilData),
          setArgBonds(argBondsData),
          setDlBonds(dlBondsData),

        ])

        // console.log("argBonds", argBonds);
        // console.log(argBonds)
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); 
        messageApi.open({
          key,
          type: 'success',
          content: 'Loaded!',
          duration: 2,
        });
      }
    };

    fetchData();
  }, [loading]);

  return (
    <>
     <Spin spinning={loading}>
    {contextHolder}
      <div style={{ padding: "20px" }}>
    
      
      
      <Space>

        <Button onClick={reloading} style={{ margin : "20px", padding : "20px" }} > <ReloadOutlined /> Reload</Button>
        
      </Space>

      
        <Row gutter={[16, 16]}>
        


          {stocks.map((stock, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6} xl={6}>
              <StockCard
                symbol={stock?.symbol}
                logo={stock?.logo}
                
                currentValue={(stock?.price ?? stock?.currentValue) ?? ""}

                percentageChange={stock?.percentageChange?.toString()} // Convert number to string for display
                isPositive={stock?.isPositive}
                volume={stock?.volume?.toString()}
                price_24h={stock?.price_24h}
                informalbuyValue={stock?.informalbuyValue ?? ""}
                informalsellValue={stock?.informalsellValue ?? ""}
                officialbuyValue={stock?.officialbuyValue ?? ""}
                officialsellValue={stock?.officialsellValue ?? ""}
                
              />

            
            
            </Col>
          ))}


        </Row>
        

        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Table dataSource={bonds} columns={bondcolumns} pagination={false}  loading={loading}/>

          </Col>
          {/* <Col xs={24} sm={12} md={8} lg={6} xl={6}>
          <StockCard symbol="Argentinian Peso -Informal Buy Rate" currentValue={rate.informalbuyValue} percentageChange ={rate.informalbuyValue} isPositive = {rate.informalbuyValue > 0} />

            <SellBuyCard
              title="Argentinian Peso -Informal Buy Rate"
              currentValue={rate.informalbuyValue}
            />
            <SellBuyCard
              title="Argentinian Peso -Informal Sell Rate"
              currentValue={rate?.informalsellValue}
            />
            <SellBuyCard
              title="Argentinian Peso - Official Buy Rate"
              currentValue={rate.officialbuyValue}
            />
            <SellBuyCard
              title="Argentinian Peso - Official Sell Rate"
              currentValue={rate.officialsellValue}
            />
          </Col> */}

          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Table dataSource={crude} columns={crudeColumns}   pagination={false}  loading={loading}/>
          </Col>
          {/* <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <SellBuyCard title={argBonds.title} currentValue={argBonds.value} percentageChange = {argBonds.percentageChange}/>
            <SellBuyCard title={dlBonds.title} currentValue={dlBonds.value}  percentageChange = {dlBonds.percentageChange}/>
          </Col> */}
        </Row>
     

      </div>
      </Spin>
    </>
  );
};

export default HomePage;
