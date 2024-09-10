import Layout from "@/app/layout";
import { cn } from "@/utils/cn";
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
        className={cn(
          "h-full min-h-screen",
          !isHomePage && "w-auto mx-6 xl:max-w-[76rem] xl:mx-auto"
        )}
      >
        <Component {...pageProps} />
      </main>
    </Layout>
  );
}

export default App;
