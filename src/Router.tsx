import { HashRouter, Routes, Route } from "react-router-dom";
import Chart from "./routes/Chart";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Price from "./routes/Price";

export interface IRouterProps {
  isDark: boolean;
  setIsDark: (a: any) => void;
}

function Router({ isDark, setIsDark }: IRouterProps) {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={<Coins isDark={isDark} setIsDark={setIsDark} />}
          ></Route>
          <Route
            path="/:coinId/*"
            element={<Coin isDark={isDark} setIsDark={setIsDark} />}
          >
            <Route path={`price`} element={<Price />} />
            <Route
              path={`chart`}
              element={<Chart setIsDark={setIsDark} isDark={isDark} />}
            />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default Router;
