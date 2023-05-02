import { Palette } from '../palette';
import { Text } from '../typography';

type CaptionProps = {
  variant?: 'success' | 'error' | 'caption';
  caption?: string;
};

export const Caption = ({ variant, caption }: CaptionProps) => {
  const renderCaption = () => {
    switch (variant) {
      case 'success':
        return (
          <Text size="small" weight="medium" colour={Palette.success.S300}>
            {caption}
          </Text>
        );
      case 'error':
        return (
          <Text size="small" weight="medium" colour={Palette.danger.D200}>
            {caption}
          </Text>
        );
      case 'caption':
        return (
          <Text size="small" colour={Palette.greys.G200}>
            {caption}
          </Text>
        );
      default:
        return <></>;
    }
  };

  return renderCaption();
};
