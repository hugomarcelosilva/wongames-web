import * as S from './styles';

export type RibbonColorsProps = 'primary' | 'secondary';
export type RibbonSizesProps = 'normal' | 'small';

export type RibbonProps = {
  children: React.ReactNode;
  color?: RibbonColorsProps;
  size?: RibbonSizesProps;
};

const Ribbon = ({
  children,
  color = 'primary',
  size = 'normal'
}: RibbonProps) => (
  <S.Wrapper color={color} size={size}>
    {children}
  </S.Wrapper>
);

export default Ribbon;
