import { useQuery } from "react-query";
import { useParams } from "react-router";
import { fetchCoinHistory } from "../api";
import ReactApexCharts from "react-apexcharts";

interface IHistorical {
    close: string;
    high: string;
    low: string;
    market_cap: number;
    open: string;
    time_close: number;
    time_open: number;
    volume: string;
}

function Chart() {
    const { coinId } = useParams();

    const { isLoading, data } = useQuery(
        ["ohlcv", coinId],
        () => fetchCoinHistory(coinId)
        // { refetchInterval: 5000 }
    );
    // console.log(data);

    return (
        <>
            {isLoading ? (
                "...loading"
            ) : (
                <ReactApexCharts
                    type="line"
                    series={[
                        {
                            name: "high",
                            data: data?.map((v: IHistorical) => v.high),
                        },
                    ]}
                    options={{
                        title: {
                            text: `2022 ${coinId}`,
                            align: "left",
                            style: {
                                color: "white",
                            },
                        },
                        xaxis: {
                            categories: data?.map((v: IHistorical) =>
                                new Date(v.time_close * 1000)
                                    .toISOString()
                                    .slice(5, 10)
                            ),
                            labels: {
                                style: {
                                    colors: data?.map(
                                        (v: IHistorical) => "white"
                                    ),
                                },
                                offsetY: 5,
                            },
                        },
                        yaxis: {
                            labels: {
                                style: {
                                    colors: data?.map(
                                        (v: IHistorical) => "white"
                                    ),
                                },
                                offsetY: 5,
                            },
                        },
                        stroke: {
                            curve: "straight",
                        },
                        grid: {
                            row: {
                                colors: ["#576375", "transparent"], // takes an array which will be repeated on columns
                                opacity: 0.5,
                            },
                            borderColor: "inherit",
                        },
                        tooltip: {
                            theme: "dark",
                        },
                    }}
                />
            )}
        </>
    );
}

export default Chart;
