import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { IRouterProps } from "../Router";

const Container = styled.div`
  padding: 0px 20px;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loading = styled.span`
  text-align: center;
  display: block;
`;

const CoinImg = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const ToggleBtn = styled.button`
  position: fixed;
  right: 10px;
  top: 10px;
  width: 50px;
  height: 50px;
  font-size: 20px;
  text-align: center;
  border-radius: 50%;
  background-color: ${(prop) => prop.theme.textColor};
  opacity: 0.5;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

interface ICoins {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins({ isDark, setIsDark }: IRouterProps) {
  const { isLoading, data } = useQuery<ICoins[]>("allCoins", fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>비트코인</Title>
        <ToggleBtn onClick={setIsDark}>{isDark ? "🌞" : "🌛"}</ToggleBtn>
      </Header>

      <CoinsList>
        {isLoading ? (
          <Loading>loading...</Loading>
        ) : (
          data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <CoinImg
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))
        )}
      </CoinsList>
    </Container>
  );
}

export default Coins;
