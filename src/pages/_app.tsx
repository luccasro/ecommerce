import Layout from "@/app/layout";
import { pageRoutes } from "@/utils/routes";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const isHomePage = pathname === pageRoutes.home;

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  return (
    <Layout {...pageProps}>
      <main
        className={`${
          !isHomePage && "w-auto mx-6 xl:max-w-[76rem] xl:mx-auto"
        } h-full min-h-screen`}
      >
        <Component {...pageProps} />
      </main>
    </Layout>
  );
}

export default App;
