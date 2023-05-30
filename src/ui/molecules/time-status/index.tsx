import { FC } from "react";
import { Palette } from "../../atoms/palette";
import { Text } from "../../atoms/typography";
import { distanceBetweenDates } from "../../../lib/utils";
import { useTranslation } from "react-i18next";

type TimeStatusProps = {
  endDate: string;
  startDate?: string;
  status: string;
};

export const TimeStatus: FC<TimeStatusProps> = ({
  endDate,
  startDate,
  status,
}) => {
  const { t } = useTranslation();
  const renderTimeStatus = () => {
    const result = distanceBetweenDates(
      startDate || String(new Date()),
      endDate
    );

    if (status === "completed") {
      return (
        <Text size="body" weight="medium" colour={Palette.success.S300}>
          {t("todo.time_status.completed")}
        </Text>
      );
    }

    if (result < 7) {
      return (
        <Text size="body" weight="medium" colour={Palette.warning.W400}>
          {t("todo.time_status.out_of_time")}
        </Text>
      );
    } else if (result > 7 && result < 30) {
      return (
        <Text size="body" weight="medium" colour={Palette.warning.W400}>
          {t("todo.time_status.step_up")}
        </Text>
      );
    } else if (result < 0) {
      return (
        <Text size="body" weight="medium" colour={Palette.danger.D300}>
          {t("todo.time_status.overdue")}
        </Text>
      );
    }

    return (
      <Text size="body" weight="medium" colour={Palette.success.S300}>
        {t("todo.time_status.on_time")}
      </Text>
    );
  };

  return renderTimeStatus();
};
