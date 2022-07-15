import { useQuery } from "react-query";
import { useParams } from "react-router";
import { fetchCoinHistory } from "../api";
import ReactApexCharts from "react-apexcharts";
import { IRouterProps } from "../Router";

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

function Chart({ isDark }: IRouterProps) {
  const { coinId } = useParams();

  const { isLoading, data } = useQuery(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    { refetchInterval: 5000 }
  );

  return (
    <>
      {isLoading ? (
        "...loading"
      ) : (
        <ReactApexCharts
          type="candlestick"
          series={[
            {
              name: "high",
              data: data.map((d: IHistorical) => {
                return {
                  x: new Date(d.time_close * 1000).toISOString(),
                  y: [d.open, d.high, d.low, d.close],
                };
              }),
            },
          ]}
          options={{
            chart: { type: "candlestick", height: 150 },
            title: {
              text: `2022 ${coinId}`,
              align: "left",
              style: {
                color: isDark ? "white" : "black",
              },
            },
            tooltip: {
              theme: "dark",
            },
            xaxis: {
              type: "datetime",
              labels: {
                style: {
                  colors: data?.map((v: IHistorical) =>
                    isDark ? "white" : "black"
                  ),
                },
              },
            },
            yaxis: {
              labels: {
                style: {
                  colors: data?.map((v: IHistorical) =>
                    isDark ? "white" : "black"
                  ),
                },
                offsetY: 5,
              },
            },
          }}
        />
      )}
    </>
  );
}

export default Chart;
