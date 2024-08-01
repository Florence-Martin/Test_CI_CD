interface HomeProps {
  title: string;
}

const Home: React.FC<HomeProps> = ({ title }) => {
  return <h1>{title}</h1>;
};
