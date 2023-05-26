import {
  UilEstate,
  UilClipboardAlt,
  UilClipboard,
  UilPackage,
  UilChart,
  //UilUsdSquare,
  UilTrees,
  UilBox,
  UilTear, 
  // UilSignOutAlt,
} from "@iconscout/react-unicons";


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
    icon: UilClipboard ,
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
    path: "/analyzeInventory"
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
    barValue: 40,
    value: "700 KG",
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
    barValue: 25,
    value: "50 Pkg",
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
    value: "110 L",
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
