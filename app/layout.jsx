import "./globals.css";

export const metadata = {
  title: "Rose Day Special",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
