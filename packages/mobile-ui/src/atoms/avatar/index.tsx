import { tokens } from '@todo/commons';
import styled from 'styled-components/native';

type AvatarProps = {
  size: typeof tokens.sizes | number;
  radius: typeof tokens.sizes | 'full';
  imageUrl: string;
};

const StyledAvatar = styled.Image<Omit<AvatarProps, 'imageUrl'>>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) =>
    props.radius === 'full' ? 9999 : props.radius}px;
`;

export const Avatar = ({ imageUrl, radius, size }: AvatarProps) => (
  <StyledAvatar source={{ uri: imageUrl }} radius={radius} size={size} />
);
