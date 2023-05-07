import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  //UilUsdSquare,
  UilTrees,
  UilBox,
  UilTear, 
  // UilSignOutAlt,
} from "@iconscout/react-unicons";
import React, { useState, useEffect } from "react";

function FetchCardData() {
  const [data, setData] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/tea-factory/inventory/")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  useEffect(() => {
    setTotalQuantity(data.reduce((total, item) => total + item.quantity, 0));
  }, [data]);
}

//Sidebar data
export const SidebarData = [
  {
    icon: UilEstate,
    heading: "Dashbord",
    path: "/InventoryAdminPanal",
  },
  {
    icon: UilClipboardAlt,
    heading: "View Inventory",
    path: "/viewInventory",
  },
  {
    icon: UilUsersAlt,
    heading: "Add Inventory",
    path: "/addInventory",
  },
  {
    icon: UilPackage,
    heading: "Products",
  },
  {
    icon: UilChart,
    heading: "Analytics",
  },
];

//Cards Data
export const CardsData = [
  {
    title: "Tea Leaf",
    color: {
      backGround: "linear-gradient(to bottom,#00802b, #00cc33 )",
      boxShadow: "0px 10px 20px 0px rgba(0, 128, 43, 0.5)",
    },
    barValue: 70,
    value: "3500 KG",
    png: UilTrees,
    unit: "KG",
    series: [
      {
        name: "Sales",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },
  {
    title: "Finish Goods",
    color: {
      backGround: "linear-gradient(180deg, #006A4E 0%, #1CAC78 100%)",
      boxShadow: "0px 10px 20px 0px rgba(0, 106, 78, 0.5)",
    },
    barValue: 80,
    value: "9500 Pkg",
    png: UilBox,
    unit: "Packs",
    series: [
      {
        name: "Revenue",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },
  {
    title: "Consumables",
    color: {
      backGround: "linear-gradient(#FEBE10 0%, #FFD700 100%)",
      boxShadow: "0px 10px 20px 0px rgba(254, 190, 16, 0.5)",
    },
    barValue: 60,
    value: "4,270 L",
    png: UilTear ,
    unit: "L",
    series: [
      {
        name: "Expenses",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
  },
];
