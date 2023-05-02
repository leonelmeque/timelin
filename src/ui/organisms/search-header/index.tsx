import { FC } from 'react';
import { Pressable, PressableProps } from 'react-native';
import { Text } from '../../atoms/typography';
import { StyledSearchHeader } from './styles';

type SearchHeaderProps = {
  title: string;
} & Pick<PressableProps, 'onPress'>;
/**
 * @deprecated build a custom header 
 */
export const SearchHeader: FC<SearchHeaderProps> = ({ title, onPress }) => (
  <StyledSearchHeader>
    <Text size="large" weight="bold">
      {title}
    </Text>
    <Pressable onPress={onPress}>
      <Text size="body">Search</Text>
    </Pressable>
  </StyledSearchHeader>
);

SearchHeader.displayName = 'SearchHeader';
