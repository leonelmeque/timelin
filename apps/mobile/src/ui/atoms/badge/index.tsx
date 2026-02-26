import { FC } from "react";
import { BadgeBGColor, BadgeTextColor } from "../../shared-types";
import { Text } from "../typography";
import { StyledBadge } from "./styles";
import { TodoStatus } from "../../../lib/shared-types";

type BadgeProps = {
  status: TodoStatus;
  label: string;
  type: "colored" | "simple";
};

export const Badge: FC<BadgeProps> = ({ status, label, ...rest }) => (
  <StyledBadge bg={BadgeBGColor[status]} {...rest}>
    <Text
      size="small"
      weight="medium"
      colour={rest.type === "simple" ? "" : BadgeTextColor[status]}
    >
      {label ||
        (
          status.substring(0, 1).toUpperCase() +
          status.substring(1, status.length).toLocaleLowerCase()
        ).replace(/_/g, " ")}
    </Text>
  </StyledBadge>
);

Badge.displayName = "Badge";
