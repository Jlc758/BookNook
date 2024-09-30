import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ActionIcon,
  Transition,
  Stack,
  Tooltip,
  Text,
  Avatar,
  Paper,
  Group,
} from "@mantine/core";
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
import { RxQuestionMark } from "react-icons/rx";
import Headshot from "../images/Headshot.png";
import Sparkle from "react-sparkle";

const MagicWand = () => {
  return (
    <Sparkle
      count={3}
      overflowPx={8}
      flicker={false}
      fadeOutSpeed={20}
      color={"var(--mantine-color-gray-7)"}
    />
  );
};

const Animation = (Component) => {
  return motion(Component);
};

const AnimatedActionIcon = Animation(ActionIcon);

const AvatarFAB = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowWelcome(true);
      setTimeout(() => setShowWelcome(false), 5000); // Hide welcome message after 5 seconds
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setShowWelcome(false);
    }
  }, [isOpen]);

  const menuItems = [
    {
      icon: IconBook,
      label: "Fun Fact",
      description:
        "I have a dog that looks like a cow and a cat that looks like a lynx!",
    },
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
      icon: IconCode,
      label: "Skills",
      description: "React, JavaScript, CSS, HTML, & Typescript (in progress)",
    },
    {
      icon: IconLeaf,
      label: "Interests",
      description: "AI, sustainable tech, and digital storytelling",
    },
    {
      icon: RxQuestionMark,
      label: "Walkthrough",
      description:
        "Watch the walkthrough to learn about the features of BookNook!",
    },
  ];

  return (
    <Group
      align="flex-end"
      spacing="sm"
      style={{
        position: "fixed",
        bottom: "5rem",
        right: "1.5rem",
        zIndex: 1000,
      }}
    >
      <div>
        <Transition
          mounted={isOpen}
          transition="scale-y"
          duration={400}
          timingFunction="ease"
        >
          {(styles) => (
            <Stack spacing="xs" style={{ ...styles, marginBottom: "0.5rem" }}>
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
                  zIndex={1000}
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
        <MagicWand />
        <AnimatedActionIcon
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
          animate={{ rotate: [0, 180] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {isOpen ? <IconX size={24} /> : <IconPlus size={24} />}
        </AnimatedActionIcon>
      </div>
      <Transition
        mounted={showWelcome}
        transition="slide-left"
        duration={400}
        timingFunction="ease"
      >
        {(styles) => (
          <Paper
            shadow="md"
            p="md"
            style={{
              ...styles,
              width: "400px",
              position: "absolute",
              right: "100%",
              bottom: 0,
              marginRight: "1rem",
            }}
          >
            <Group>
              <Avatar src={Headshot} size="xl" radius="xl" />
              <Text size="sm">
                Hi there, I&apos;m Janelle Chafe. Welcome to my project for the
                ReactJS module with Get Coding! Let me know what you think!
              </Text>
            </Group>
          </Paper>
        )}
      </Transition>
    </Group>
  );
};

export default AvatarFAB;
