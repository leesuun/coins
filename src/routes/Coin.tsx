import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
    Outlet,
    Route,
    Routes,
    useLocation,
    useMatch,
    useParams,
} from "react-router";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Helmet } from "react-helmet-async";
import { fetchInfoData, fetchPriceData } from "../api";

const Container = styled.div`
    padding: 0px 20px;
`;

const Header = styled.header`
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
`;
const Loading = styled.span`
    display: block;
    text-align: center;
`;

const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 20px;
    border-radius: 10px;
`;
const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    span:first-child {
        font-size: 10px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`;
const Description = styled.p`
    margin: 20px 0px;
`;

const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 25px 0px;
    gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 7px 0px;
    border-radius: 10px;

    a {
        color: ${(props) =>
            props.isActive ? props.theme.accentColor : props.theme.textColor};
        display: block;
    }
`;

const BtnOpacity = keyframes`
    from{
        opacity: 0.5
    }
    to{
        opacity: 1
    }

`;

const BackBtn = styled.button`
    position: absolute;
    left: 3px;
    top: 10px;
    border: none;
    border-radius: 10px;
    background-color: tomato;
    opacity: 0.5;

    &:hover {
        cursor: pointer;
        opacity: 1;
        animation: ${BtnOpacity} 0.5s ease-in;
    }
`;

export interface RouterState {
    state: {
        name: string;
    };
}

export interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    tags: object;
    team: object;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    links: object;
    links_extended: object;
    whitepaper: object;
    first_data_at: string;
    last_data_at: string;
}

interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        };
    };
}

function Coin() {
    const { state } = useLocation() as RouterState;
    const { coinId } = useParams();
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");

    // fetchInfoData
    const { isLoading: infoLoading, data: info } = useQuery<InfoData>(
        ["info", coinId],
        () => fetchInfoData(coinId)
    );

    const { isLoading: priceLoading, data: priceInfo } = useQuery<PriceData>(
        ["tickers", coinId],
        () => fetchPriceData(coinId)
    );

    const loading = infoLoading || priceLoading;

    return (
        <>
            <Container>
                <Helmet>
                    <title>코인</title>
                </Helmet>
                <Header>
                    <Link to={`/`}>
                        <BackBtn>⬅ Back</BackBtn>
                    </Link>
                    <Title>
                        {state?.name
                            ? state.name
                            : loading
                            ? "Loading..."
                            : info?.name}
                    </Title>
                </Header>

                {loading ? (
                    <Loading>Loading...</Loading>
                ) : (
                    <>
                        <Overview>
                            <OverviewItem>
                                <span>Rank:</span>
                                <span>{info?.rank}</span>
                            </OverviewItem>
                            <OverviewItem>
                                <span>Symbol:</span>
                                <span>${info?.symbol}</span>
                            </OverviewItem>
                            <OverviewItem>
                                <span>Open Source:</span>
                                <span>
                                    {priceInfo?.quotes.USD.price.toFixed(2)}
                                </span>
                            </OverviewItem>
                        </Overview>
                        <Description>{info?.description}</Description>
                        <Overview>
                            <OverviewItem>
                                <span>Total Suply:</span>
                                <span>{priceInfo?.total_supply}</span>
                            </OverviewItem>
                            <OverviewItem>
                                <span>Max Supply:</span>
                                <span>{priceInfo?.max_supply}</span>
                            </OverviewItem>
                        </Overview>

                        <Tabs>
                            <Tab isActive={chartMatch !== null ? true : false}>
                                <Link
                                    to={`/${coinId}/chart`}
                                    state={{ coinId }}
                                >
                                    Chart
                                </Link>
                            </Tab>
                            <Tab isActive={priceMatch !== null ? true : false}>
                                <Link to={`/${coinId}/price`}>Price</Link>
                            </Tab>
                        </Tabs>
                        <Outlet />
                    </>
                )}
            </Container>
        </>
    );
}

export default Coin;
