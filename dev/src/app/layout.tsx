"use client";

import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./frontend/redux/store";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import MiniDrawer from "./frontend/components/sideNav/sideNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Box>
          <Container maxWidth="xl">
            <Provider store={store}>
              <UserProvider>
                <MiniDrawer>{children}</MiniDrawer>
              </UserProvider>
            </Provider>
          </Container>
        </Box>
      </body>
    </html>
  );
}
