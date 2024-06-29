import React, { useEffect, useState } from "react";
import { HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthService";
import "./CustomStyles.css";

export default function Navbar() {
  const [current, setCurrent] = useState("");
  const auth = useAuth();

  const navigate = useNavigate();

  useEffect(() => {}, []);

  const onClick = (e) => {
    console.log("Clicked ", e);
    setCurrent(e.key);

    switch (e.key) {
      case "home":
        navigate("/");
        break;
      case "logout":
        auth.authService.logout();
        break;
      default:
        console.log("No action defined for this item.");
    }
  };

  const items = [
    {
      label: <span>Home</span>,
      key: "home",
      icon: <HomeOutlined />,
    },
    ...(auth.isLoggedIn
      ? [
          {
            label: <span>Logout</span>,
            key: "logout",
            icon: <LogoutOutlined />,
          },
        ]
      : []),
  ];

  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </>
  );
}
