import { useState } from "react";
import { ActionIcon, Transition, Stack } from "@mantine/core";
import {
  IconPlus,
  IconX,
  IconEdit,
  IconTrash,
  IconShare,
} from "@tabler/icons-react";

const AvatarFAB = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { icon: IconEdit, label: "Edit" },
    { icon: IconTrash, label: "Delete" },
    { icon: IconShare, label: "Share" },
  ];

  return (
    <div style={{ position: "fixed", bottom: "6rem", left: "1.5rem" }}>
      <Transition
        mounted={isOpen}
        transition="scale-x"
        duration={400}
        timingFunction="ease"
      >
        {(styles) => (
          <Stack spacing="xs" style={styles} className="Stack">
            {menuItems.map((item, index) => (
              <ActionIcon
                key={index}
                size="md"
                radius="md"
                variant="filled"
                color="blue"
                onClick={() => console.log(`Clicked ${item.label}`)}
              >
                <item.icon size={20} />
              </ActionIcon>
            ))}
          </Stack>
        )}
      </Transition>
      <ActionIcon
        size={30}
        radius="xl"
        variant="filled"
        color="red"
        onClick={toggleMenu}
        style={{
          transition: "transform 0.3s ease",
          transform: isOpen ? "rotate(45deg)" : "none",
        }}
      >
        {isOpen ? <IconX size={16} /> : <IconPlus size={16} />}
      </ActionIcon>
    </div>
  );
};

export default AvatarFAB;
