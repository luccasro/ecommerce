import Layout from "@/app/layout";
import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function App({ Component, pageProps }: AppProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  return (
    <>
      <Layout {...pageProps}>
        <main className="px-4 md:px-24 lg:px-24 min-h-screen">
          <Component {...pageProps} />
        </main>
      </Layout>
    </>
  );
}

export default App;
