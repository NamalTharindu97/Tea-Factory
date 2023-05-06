import { 
    UilEstate,
    UilClipboardAlt,
    UilUsersAlt,
    UilPackage,
    UilChart,
    UilUsdSquare,
    // UilSignOutAlt,
 } from '@iconscout/react-unicons';

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
 ]

 //Cards Data
 export const CardsData = [
    {
        title: "Tea Leaf",
        color:{
            backGround: "linear-gradient(to bottom,#00802b, #00cc33 )",
            boxShadow: "0px 10px 20px 0px #e0c6f5",
        },
        barValue: 70,
        value: "25,970",
        png: UilUsdSquare,
        series: [
            {
                name: "Sales",
                data: [31, 40, 28, 51, 42, 109, 100],
            },
        ],
    },
    {
        title: "Revenue",
        color:{
            backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
            boxShadow: "0px 10px 20px 0px #FDC0C7",
        },
        barValue: 80,
        value: "14,270",
        png: UilUsdSquare,
        series: [
            {
                name: "Revenue",
                data: [10, 100, 50, 70, 80, 30, 40],
            },
        ],
    },
    {
        title: "Expense",
        color:{
            backGround: "linear-gradient(rgb(248, 212, 154) -146.42%, rgba(255 202 113) -46.42%)",
            boxShadow: "0px 10px 20px 0px #F9D59B",
        },
        barValue: 60,
        value: "4,270",
        png: UilUsdSquare,
        series: [
            {
                name: "Expenses",
                data: [10, 25, 15, 30, 12, 15, 20],
            },
        ],
    },
 ]