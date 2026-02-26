import { FC, ReactNode } from 'react';
import { PressableProps } from 'react-native';
import {
  Container,
  HeaderLeftContent,
  HeaderMiddleContent,
  HeaderRightContent,
} from './styles';


interface HeaderProps extends PressableProps {
  /**
   * URL link users profile
   */
  avatarURI?: string;
  renderLeftContent?: () => ReactNode;
  renderMiddleContent?: () => ReactNode;
  renderRigthContent?: () => ReactNode;
}

export const Header: FC<HeaderProps> = ({
  avatarURI,
  renderLeftContent = () => <></>,
  renderMiddleContent = () => <></>,
  renderRigthContent = () => <></>,
  ...rest
}) => {
  return (
    <Container {...rest}>
      <HeaderLeftContent>{renderLeftContent()}</HeaderLeftContent>
      <HeaderMiddleContent>{renderMiddleContent()}</HeaderMiddleContent>
      <HeaderRightContent>{renderRigthContent()}</HeaderRightContent>
    </Container>
  );
};

Header.displayName = 'Header';
