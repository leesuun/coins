import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import coinIcons from "base64-cryptocurrency-icons";

const CoinList = styled.ul`
    a {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        padding: 10px;
        border-radius: 10px;
        color: ${(props) => props.theme.bgColor};
        background-color: white;

        &:hover {
            cursor: pointer;
            color: red;
        }
        span {
            margin-left: 10px;
        }
    }
`;

const Container = styled.div`
    padding: 0 20px;
    max-width: 480px;
    margin: 0 auto;
`;
const Header = styled.h1`
    text-align: center;
`;

const CoinImg = styled.img`
    width: 40px;
    height: 40px;
`;

interface ICoin {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: "coin";
}

function Coins() {
    const [coins, setCoins] = useState<ICoin[]>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async function getCoins() {
            const coin = await (
                await fetch(`https://api.coinpaprika.com/v1/coins`)
            ).json();
            setCoins(coin.slice(0, 100));
            setLoading(false);
        })();
    }, []);
    return (
        <Container>
            <Header>비트코인</Header>
            {loading ? (
                <span>...loading</span>
            ) : (
                <CoinList>
                    {coins?.map((coin) => (
                        <li key={coin.id}>
                            <Link to={`/${coin.id}`} state={coin.id}>
                                <CoinImg
                                    src={
                                        coinIcons[coin.symbol.toUpperCase()]
                                            ?.icon
                                    }
                                />
                                <span>{coin.name} &rarr;</span>
                            </Link>
                        </li>
                    ))}
                </CoinList>
            )}
        </Container>
    );
}

export default Coins;
