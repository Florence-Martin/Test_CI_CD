import React from "react";

interface HomeProps {
  title: string;
}

const Home: React.FC<HomeProps> = ({ title }) => {
  return <h1>{title}</h1>;
};
export default Home;
