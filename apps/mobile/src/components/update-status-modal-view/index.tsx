import { Ref, useImperativeHandle, useState } from "react";
import { Modal, Pressable, View } from "react-native";
import { CustomSafeAreaView } from "../safe-area-view";
import { Badge } from "@/components/ui/badge";
import { Text } from "@/components/ui/text";
import { useTranslation } from "react-i18next";
import { TodoStatusTranslation } from "../../lib";
import { cn } from "@/lib/cn";

export interface UpdateStatusModalRefProps {
  visibility: boolean;
  toggleModalVisibility: () => void;
}

type UpdateStatusModalProps = {
  initialSelection: string;
  onSelect: (value: string) => void;
};

const BadgeBGColor: Record<string, string> = {
  ON_GOING: '#F2F1FC',
  COMPLETED: '#E6FAE6',
  ON_HOLD: '#F4F2D9',
  TODO: '#FBF8ED',
};

const BadgeTextColor: Record<string, string> = {
  ON_GOING: '#645CAA',
  COMPLETED: '#5EAB5C',
  ON_HOLD: '#AAA25C',
  TODO: '#645CAA',
};

function formatStatus(status: string): string {
  return (
    status.substring(0, 1).toUpperCase() +
    status.substring(1).toLocaleLowerCase()
  ).replace(/_/g, ' ');
}

export const UpdateStatusModalView = ({
  initialSelection,
  onSelect,
  ref,
}: UpdateStatusModalProps & { ref?: Ref<UpdateStatusModalRefProps> }) => {
  const { t } = useTranslation();
  const [visibility, setVisibility] = useState(false);
  const [selection, setSelection] = useState(initialSelection);

  const status = ["TODO", "ON_GOING", "ON_HOLD", "COMPLETED"];

  const toggleModalVisibility = () => {
    setVisibility(!visibility);
  };

  const onSelectStatus = (value: string) => {
    setSelection(value);
    onSelect(value);
    toggleModalVisibility();
  };

  useImperativeHandle(ref, () => ({
    visibility,
    selection,
    toggleModalVisibility,
  }));

  const renderStatus = () =>
    status.map((_status, index) => (
      <Pressable
        key={_status + index}
        onPress={(e) => {
          onSelectStatus(_status);
        }}
      >
        <View key={_status}>
          {index !== 0 && <View className="h-4" />}
          <Badge
            variant="default"
            className="rounded rounded-br-none border-transparent p-2"
            style={{ backgroundColor: BadgeBGColor[_status] }}
          >
            <Text style={{ color: BadgeTextColor[_status] }} className="text-xs font-medium">
              {t(
                TodoStatusTranslation[
                _status as keyof typeof TodoStatusTranslation
                ]
              ) as string}
            </Text>
          </Badge>
        </View>
      </Pressable>
    ));

  return (
    <Modal visible={visibility} transparent>
      <CustomSafeAreaView
        style={{
          backgroundColor: "transparent",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Pressable
          onPress={() => {
            toggleModalVisibility();
          }}
          className={cn("relative flex-row z-[2] flex-1 justify-end px-4")}
        >
          <View
            className={cn("self-end rounded-lg p-2.5 mb-12 relative z-[2] bg-neutrals-white")}
            style={{
              shadowColor: '#9F9FA1',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 1,
              shadowRadius: 16,
              elevation: 8,
            }}
          >
            {renderStatus()}
          </View>
        </Pressable>
      </CustomSafeAreaView>
    </Modal>
  );
};

UpdateStatusModalView.displayName = 'UpdateStatusModalView';
