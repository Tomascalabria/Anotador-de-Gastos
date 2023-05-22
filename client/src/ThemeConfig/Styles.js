import { mode } from "@chakra-ui/theme-tools";

const styles = {
  global: (props) => ({
    body: {
      fontFamily: "body",
      color: mode("E5E5E5", "#2A2A2A")(props),
      bg: mode("#E5E5E5", "#2A2A2A")(props), // Update the background color to #2a2a2a
      transitionProperty: "background-color",
      transitionDuration: "normal",
      lineHeight: "base",
    },
    "*::placeholder": {
      color: mode("gray.400", "whiteAlpha.400")(props),
    },
    "*, *::before, &::after": {
      borderColor: mode("gray.200", "whiteAlpha.300")(props),
      wordWrap: "break-word",
    },
  }),
};

export default styles;
