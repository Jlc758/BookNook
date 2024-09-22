import {
  Tabs,
  useMantineTheme,
  Switch,
  rem,
  useMantineColorScheme,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconSun, IconMoonStars } from "@tabler/icons-react";
import LogoDark from "../images/Logo-Dark.png";
import LogoLight from "../images/Logo-Light.png";
import "@mantine/core/styles.css";
import { useEffect } from "react";

function Navigation() {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  useEffect(() => {
    localStorage.setItem("mantine-color-scheme", colorScheme);
  }, [colorScheme]);

  const handleClick = (path) => {
    navigate(path);
  };

  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.rose[2]}
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.rose[2]}
    />
  );

  return (
    <>
      <div className="NavContainer">
        <div className="LogoContainer" onClick={() => handleClick("/")}>
          <div className="LogoWrapper">
            <img
              src={colorScheme === "dark" ? LogoDark : LogoLight}
              alt="Logo"
              className="Logo"
            />
          </div>
        </div>
        <Tabs defaultValue={"home"} className="TabsContainer">
          <Tabs.List className="TabsList">
            <Tabs.Tab value="home" onClick={() => handleClick("/")}>
              <h3>Home</h3>
            </Tabs.Tab>
            <Tabs.Tab value="shelves" onClick={() => handleClick("/shelves")}>
              <h3>Shelves</h3>
            </Tabs.Tab>
            <Tabs.Tab value="search" onClick={() => handleClick("/search")}>
              <h3>Discover</h3>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="home"></Tabs.Panel>
          <Tabs.Panel value="shelves"></Tabs.Panel>
          <Tabs.Panel value="search"></Tabs.Panel>
        </Tabs>
        <div className="DarkLight">
          <Switch
            size="md"
            color={colorScheme === "dark" ? "light" : "dark"}
            onLabel={sunIcon}
            offLabel={moonIcon}
            checked={colorScheme === "dark"}
            onChange={() => toggleColorScheme()}
          />
        </div>
      </div>
    </>
  );
}

export default Navigation;
