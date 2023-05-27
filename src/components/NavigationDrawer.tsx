import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Toolbar,
} from "@material-ui/core";
import { Menu, Home, Info } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import useScore from "../hooks/useScore";

function NavigationDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { clearScoreMap } = useScore();

  const toggleDrawer =
    (open: boolean) => (event: React.MouseEvent<HTMLElement>) => {
      setIsOpen(open);
    };

  const menuItems = [
    { text: "Home", icon: <Home />, link: "/" },
    { text: "Results", icon: <Info />, link: "/results" },
  ];

  const handleMenuClick = (link: string) => {
    navigate(link);
    clearScoreMap();
    setIsOpen(false);
  };

  return (
    <div>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
          <Menu />
        </IconButton>
      </Toolbar>
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => handleMenuClick(item.link)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}

export default NavigationDrawer;
