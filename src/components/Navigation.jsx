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

  useEffect(() => {
    const calculateBreakpoint = () => {
      const tabsList = document.querySelector(".TabsList");
      const tabs = tabsList.querySelectorAll(".mantine-Tabs-tab");
      const logo = document.querySelector(".LogoContainer");
      const darkLight = document.querySelector(".DarkLight");

      let totalWidth = logo.offsetWidth + darkLight.offsetWidth;
      let tabsWidth = 0;

      tabs.forEach((tab) => {
        tabsWidth += tab.offsetWidth;
      });

      totalWidth += tabsWidth;

      // Add some buffer (e.g., 20px) to account for margins and padding
      const breakpoint = totalWidth + 20;

      // Set the CSS variable
      document.documentElement.style.setProperty(
        "--breakpoint",
        `${breakpoint}px`
      );
    };

    const updateNavContainerHeight = () => {
      const navContainer = document.querySelector(".NavContainer");
      const navHeight = navContainer.offsetHeight;
      document.documentElement.style.setProperty(
        "--navContainer-height",
        `${navHeight}px`
      );
    };

    // Run calculations on load and resize
    window.addEventListener("load", () => {
      calculateBreakpoint();
      updateNavContainerHeight();
    });
    window.addEventListener("resize", () => {
      calculateBreakpoint();
      updateNavContainerHeight();
    });

    // Clean up listeners on component unmount
    return () => {
      window.removeEventListener("load", calculateBreakpoint);
      window.removeEventListener("resize", updateNavContainerHeight);
    };
  }, []);

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
          <Tabs.Tab
            value="home"
            onClick={() => handleClick("/")}
            color="var(--mantine-color-rose-1)"
          >
            <h3>Home</h3>
          </Tabs.Tab>
          <Tabs.Tab
            value="shelves"
            onClick={() => handleClick("/shelves")}
            color="var(--mantine-color-rose-1)"
          >
            <h3>Shelves</h3>
          </Tabs.Tab>
          <Tabs.Tab
            value="search"
            onClick={() => handleClick("/search")}
            color="var(--mantine-color-rose-1)"
          >
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
  );
}

export default Navigation;
