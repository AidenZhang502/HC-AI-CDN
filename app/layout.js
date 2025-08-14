// app/layout.js
export const metadata = {
  title: "HC-AI-CDN",
  description: "CDN + Mongo manifest for Unity",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
