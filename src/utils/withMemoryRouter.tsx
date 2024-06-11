import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from '@/store/store'

export const withMemoryRouteAndReduxProvider = (Component: React.ReactElement) => {
    return (
        <Provider store={store}>
            <MemoryRouter>{Component}</MemoryRouter>
        </Provider>
    )
}

