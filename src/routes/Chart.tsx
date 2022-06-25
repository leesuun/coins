import { useQuery } from "react-query";
import { useParams } from "react-router";
import { fetchCoinHistory } from "../api";

function Chart() {
    const { coinId } = useParams();

    const { isLoading, data } = useQuery(
        ["ohlcv", coinId],
        () => fetchCoinHistory(coinId),
        { refetchInterval: 5000 }
    );
    console.log(data);

    return <h1>Chart</h1>;
}

export default Chart;
