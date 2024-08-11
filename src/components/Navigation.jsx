import {
  Tabs,
  useMantineTheme,
  Switch,
  rem,
  useMantineColorScheme,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

function Navigation() {
  const navigate = useNavigate();

  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const handleClick = (path) => {
    navigate(path);
  };

  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.yellow[4]}
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.blue[6]}
    />
  );

  return (
    <Tabs>
      <Tabs.List>
        <Tabs.Tab value="home" onClick={() => handleClick("/")}>
          Home
        </Tabs.Tab>
        <Tabs.Tab value="shelves" onClick={() => handleClick("/shelves")}>
          Shelves
        </Tabs.Tab>
        <Tabs.Tab value="search" onClick={() => handleClick("/search")}>
          Search
        </Tabs.Tab>
        <Tabs.Tab value="profile" onClick={() => handleClick("/profile")}>
          Profile
        </Tabs.Tab>
        <Tabs.Tab value="theme">
          <Switch
            size="md"
            color={colorScheme === "dark" ? "light" : "dark"}
            onLabel={sunIcon}
            offLabel={moonIcon}
            checked={colorScheme === "dark"}
            onChange={() => toggleColorScheme()}
          />
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="home"></Tabs.Panel>
      <Tabs.Panel value="shelves"></Tabs.Panel>
      <Tabs.Panel value="search"></Tabs.Panel>
      <Tabs.Panel value="profile"></Tabs.Panel>
    </Tabs>
  );
}

export default Navigation;
