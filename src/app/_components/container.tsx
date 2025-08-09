type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return <div className="container px-8 lg:px-24 flex justify-center">{children}</div>;
};

export default Container;
