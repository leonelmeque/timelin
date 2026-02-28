import { useRouter } from 'expo-router';
import { FC, useState } from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  Modal,
  Pressable,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { onShare } from '../../utils/utils';
import { TodoProps, api } from '../../lib';
import { usePinnedTodo } from '../../store';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/cn';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

export const PressableTodoCard = (props: React.ComponentProps<typeof Pressable>) => (
  <Pressable className={cn("flex-1")} {...props} />
);

export const OptionsMenu = (props: React.ComponentProps<typeof View>) => (
  <View
    className={cn("absolute rounded-[32px] px-4 py-8 bottom-0 bg-neutrals-white")}
    style={{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 8,
      width: WIDTH,
      maxHeight: HEIGHT / 3,
      height: HEIGHT,
    }}
    {...props}
  />
);

export const Option = (props: React.ComponentProps<typeof Pressable>) => (
  <Pressable className={cn("flex-row items-center p-2 rounded")} {...props} />
);

export const OptionsMenuContainer = (props: React.ComponentProps<typeof View>) => (
  <View {...props} />
);

export const withOptionsModal =
  (Component: FC<any>) =>
    ({ style, ...props }: any) => {
      const { pinnedTodo, addOrUpdatePinnedTodo, removePinnedTodo } =
        usePinnedTodo();
      const [visibile, setVisible] = useState(false);

      const router = useRouter();

      const onPressTodoCard = (todo: TodoProps) => (e: GestureResponderEvent) => {
        router.push(`/todo/${todo.id}`);
      };

      const handlePinTodo = async () => {
        await api.todo.addPinnedTodo(props.id);
        addOrUpdatePinnedTodo(props.id);
        setVisible(false);
      };

      const handleUnpinTodo = async () => {
        await api.todo.removePinnedTodo(props.id);
        removePinnedTodo();
        setVisible(false);
      };

      const handleShare = async () => {
        await onShare(props.todo)
        setVisible(false);
      };

      const toggleOptions = () => {
        setVisible(true);
      };

      return (
        <View style={{ flex: 1 }}>
          <PressableTodoCard
            onPress={onPressTodoCard({ ...props })}
            onLongPress={toggleOptions}
            style={style}
          >
            <Component {...props} />
          </PressableTodoCard>
          <Modal visible={visibile} transparent>
            <View
              className={cn("absolute opacity-10 bg-grey-300")}
              style={{
                width: WIDTH,
                height: HEIGHT,
              }}
              onTouchEndCapture={() => {
                setVisible(false);
              }}
            />
            <OptionsMenu>
              <Option
                onPress={
                  pinnedTodo === props.id ? handleUnpinTodo : handlePinTodo
                }
                style={({ pressed }: { pressed: boolean }) => [
                  {
                    backgroundColor: pressed ? '#e8e8e8' : 'white',
                  },
                ]}
              >
                <MaterialIcons name="push-pin" size={24} />
                <View className="w-2" />
                <Text>
                  {pinnedTodo === props.id ? <>Unpin</> : <>Pin</>} {'\n'}
                  <Text className="text-sm text-grey-100">
                    {pinnedTodo === props.id ? (
                      <>Remove todo from home screen</>
                    ) : (
                      <>Keep todo in home screen</>
                    )}
                  </Text>
                </Text>
              </Option>
              <View className="h-4" />
              <Option
                onPress={handleShare}
                style={({ pressed }: { pressed: boolean }) => [
                  {
                    backgroundColor: pressed ? '#e8e8e8' : 'white',
                  },
                ]}
              >
                <MaterialIcons name="share" size={24} />
                <View className="w-2" />
                <Text>
                  Share {'\n'}
                  <Text className="text-sm text-grey-100">
                    Share todo with other people
                  </Text>
                </Text>
              </Option>
            </OptionsMenu>
          </Modal>
        </View>
      );
    };
