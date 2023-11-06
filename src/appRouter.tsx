import { Route, Routes } from "react-router-dom"
import { TaxRecovery } from "./pages/TaxRecovery"
import TaxAssets from "./pages/TaxAssets"
import Refund from "./pages/Refund"
import Settings from "./pages/Settings"
import Home from "./pages/Home"

export function AppRouter() {
    return (
        <>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/taxRecovery" element={<TaxRecovery/>} />
            <Route path="/taxAssets" element={<TaxAssets />} />
            <Route path="/refund" element={<Refund />} />
            <Route path="/settings" element={<Settings />} />
        </Routes>
        </>
    )
}