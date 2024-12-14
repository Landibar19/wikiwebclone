'use client';
import localFont from "@next/font/local";
import "./globals.css";
import Header from "./components/Header/Header";
import { Provider } from "react-redux";
import store from '../redux/store';



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="px-10 py-2">
          <Provider store={store}>
          <Header />
          {children}
          </Provider>
          </div>
      
      </body>
    </html>
  );
}
