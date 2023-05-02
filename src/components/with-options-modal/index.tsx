import { useNavigation } from '@react-navigation/native';
import { FC, useState } from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  Modal,
  Pressable,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { onShare } from '../../utils/utils';
import { TodoProps, api, tokens } from '../../lib';
import { usePinnedTodo } from '../../store';
import { Palette, Spacer, Text } from '../../ui/atoms';

export const PressableTodoCard = styled(Pressable)`
  flex: 1;
`;

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

export const OptionsMenu = styled(View)`
  position: absolute;
  border-radius: ${(props) => props.theme.spacing.size32}px;
  background-color: ${(props) => props.theme.colours.neutrals.white};
  padding-horizontal: ${(props) => props.theme.spacing.size16}px;
  padding-vertical: ${(props) => props.theme.spacing.size32}px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.3);
  width: ${WIDTH}px;
  max-height: ${HEIGHT / 3}px;
  height: ${HEIGHT}px;
  bottom: 0;
`;

export const Option = styled(Pressable)`
  flex-direction: row;
  align-items: center;
  padding: ${(props) => props.theme.spacing.size8}px;
  border-radius: ${(props) => props.theme.spacing.size4}px;
`;

export const OptionsMenuContainer = styled(View)``;

export const withOptionsModal =
  (Component: FC<any>) =>
    ({ style, ...props }: any) => {
      const { pinnedTodo, addOrUpdatePinnedTodo, removePinnedTodo } =
        usePinnedTodo();
      const [visibile, setVisible] = useState(false);

      const theme = useTheme();

      const navigation = useNavigation();

      const onPressTodoCard = (todo: TodoProps) => (e: GestureResponderEvent) => {
        //@ts-ignore
        navigation.navigate<string>('Todo/View', { todo });
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
              style={{
                width: WIDTH,
                height: HEIGHT,
                opacity: 0.1,
                backgroundColor: Palette.greys.G300,
                position: 'absolute',
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
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? theme.colours.greys.G50 : 'white',
                  },
                ]}
              >
                <MaterialIcons name="push-pin" size={tokens.spacing.size24} />
                <Spacer size="4" />
                <Text size="body">
                  {pinnedTodo === props.id ? <>Unpin</> : <>Pin</>} {'\n'}
                  <Text size="small" colour={Palette.greys.G100}>
                    {pinnedTodo === props.id ? (
                      <>Remove todo from home screen</>
                    ) : (
                      <>Keep todo in home screen</>
                    )}
                  </Text>
                </Text>
              </Option>
              <Spacer size="8" />
              <Option
                onPress={handleShare}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? theme.colours.greys.G50 : 'white',
                  },
                ]}
              >
                <MaterialIcons name="share" size={tokens.spacing.size24} />
                <Spacer size="4" />
                <Text size="body">
                  Share {'\n'}
                  <Text size="small" colour={Palette.greys.G100}>
                    Share todo with other people
                  </Text>
                </Text>
              </Option>
            </OptionsMenu>
          </Modal>
        </View>
      );
    };
