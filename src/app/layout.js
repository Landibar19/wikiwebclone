'use client';
import "./globals.css";
import Header from "./components/Header/Header";
import { Provider } from "react-redux";
import store from '../redux/store';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <div className="px-10 py-2">
            <Header />
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}