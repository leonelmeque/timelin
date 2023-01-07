import { StyledLayout } from "./styles";

// eslint-disable-next-line react/require-default-props
const Layout = ({ children, ...rest }: { children: any; rest?: never }) => (
  <StyledLayout {...rest}>{children}</StyledLayout>
)

export default Layout;