import { ImageProps } from 'react-native';
import styled from 'styled-components/native';

type AvatarProps = {
  size: string | number;
  radius: string | number | 'full';
} & ImageProps;

const StyledAvatar = styled.Image<Omit<AvatarProps, 'imageUrl'>>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) =>
    props.radius === 'full' ? 9999 : props.radius}px;
`;

export const Avatar = ({ radius, size, ...rest }: AvatarProps) => (
  <StyledAvatar radius={radius} size={size} {...rest} />
);
