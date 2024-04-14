import Layout from "@/app/layout";
import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function App({ Component, pageProps }: AppProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  return (
    <>
      <Layout {...pageProps}>
        <main className="w-auto mx-6 xl:max-w-[76rem] xl:mx-auto min-h-screen">
          <Component {...pageProps} />
        </main>
      </Layout>
    </>
  );
}

export default App;
