import styled, { createGlobalStyle } from "styled-components";
import { useState, useEffect } from "react";
import coinIcons from "base64-cryptocurrency-icons";

const GlobalStyle = createGlobalStyle`
 html, body, div, span, applet, object, iframe,
    h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, menu, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    main, menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, main, menu, nav, section {
    display: block;
    }
    /* HTML5 hidden-attribute fix for newer browsers */
    *[hidden] {
        display: none;
    }
    menu, ol, ul {
    list-style: none;
    }
    blockquote, q {
    quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
    content: '';
    content: none;
    }
    table {
    border-collapse: collapse;
    border-spacing: 0;
    }
    * {
    box-sizing: border-box;
    }

    body{
        font-weight: 300;
        font-family: 'Source Sans Pro', sans-serif;
        line-height: 1;
        color: ${(props) => props.theme.textColor};
        background-color: ${(props) => props.theme.bgColor};
        
    }       

    a{
        text-decoration: none;
        color:inherit;
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

const CoinList = styled.ul`
    li {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        padding: 10px;
        border-radius: 10px;
        background-color: white;
        cursor: pointer;
        span {
            margin-left: 10px;
            color: ${(props) => props.theme.bgColor};
        }
    }
`;

const CoinImg = styled.img`
    width: 40px;
    height: 40px;
`;

interface Coins {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: "coin";
}

function App() {
    const [coins, setCoins] = useState<Coins[]>();
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
        <>
            <Container>
                <Header>비트코인</Header>
                {loading ? (
                    <span>loading...</span>
                ) : (
                    <CoinList>
                        {coins?.map((coin) => (
                            <li key={coin.id}>
                                <CoinImg
                                    src={
                                        coinIcons[coin.symbol.toUpperCase()]
                                            ?.icon
                                    }
                                />{" "}
                                <span>{coin.name} &rarr;</span>
                            </li>
                        ))}
                    </CoinList>
                )}
            </Container>

            <GlobalStyle />
        </>
    );
}

export default App;
