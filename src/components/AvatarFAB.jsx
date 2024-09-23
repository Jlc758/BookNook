import { useState } from "react";
import { ActionIcon, Transition, Stack, Tooltip, Text } from "@mantine/core";
import {
  IconPlus,
  IconX,
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconBook,
  IconCode,
  IconLeaf,
} from "@tabler/icons-react";

const AvatarFAB = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    {
      icon: IconBrandGithub,
      label: "GitHub",
      link: "https://github.com/Jlc758",
      description: "Check out my projects and contributions",
    },
    {
      icon: IconBrandLinkedin,
      label: "LinkedIn",
      link: "https://www.linkedin.com/in/jlc758/",
      description: "Connect with me professionally",
    },
    {
      icon: IconMail,
      label: "Email",
      link: "mailto:janelle.chafe@gmail.com",
      description: "Reach out to collaborate anytime!",
    },
    {
      icon: IconBook,
      label: "Fun Fact",
      description:
        "I have a dog that looks like a cow and a cat that looks like a lynx!",
    },
    {
      icon: IconCode,
      label: "Skills",
      description: "React, JavaScript, CSS, HTML, & Typescript (in progress)",
    },
    {
      icon: IconLeaf,
      label: "Interests",
      description: "AI, sustainable tech, and digital storytelling",
    },
  ];

  return (
    <div
      style={{
        position: "fixed",
        bottom: "5rem",
        left: "1.5rem",
        zIndex: 1000,
      }}
    >
      <Transition
        mounted={isOpen}
        transition="scale-x"
        duration={400}
        timingFunction="ease"
      >
        {(styles) => (
          <Stack spacing="xs" style={styles} className="Stack">
            {menuItems.map((item, index) => (
              <Tooltip
                key={index}
                label={
                  <div>
                    <Text size="sm" weight={700}>
                      {item.label}
                    </Text>
                    <Text size="xs">{item.description}</Text>
                  </div>
                }
                position="right"
                withArrow
              >
                <ActionIcon
                  size="lg"
                  radius="lg"
                  variant="filled"
                  color="var(--mantine-color-gray-7)"
                  onClick={() => {
                    if (item.link) {
                      window.open(item.link, "_blank", "noopener,noreferrer");
                    }
                  }}
                  style={{
                    transition:
                      "background-color 0.3s ease, transform 0.3s ease",
                    cursor: item.link ? "pointer" : "default",
                  }}
                  sx={(theme) => ({
                    "&:hover": {
                      backgroundColor: theme.colors.blue[7],
                      transform: "scale(1.1)",
                    },
                  })}
                >
                  <item.icon size={24} />
                </ActionIcon>
              </Tooltip>
            ))}
          </Stack>
        )}
      </Transition>
      <ActionIcon
        size="lg"
        radius="lg"
        variant="filled"
        color="var(--mantine-color-rose-1)"
        onClick={toggleMenu}
        style={{
          transition: "transform 0.3s ease, background-color 0.3s ease",
          transform: isOpen ? "rotate(45deg)" : "none",
        }}
        sx={(theme) => ({
          "&:hover": {
            backgroundColor: theme.colors.rose[3],
          },
        })}
      >
        {isOpen ? <IconX size={24} /> : <IconPlus size={24} />}
      </ActionIcon>
    </div>
  );
};

export default AvatarFAB;
