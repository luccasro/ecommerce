import React, {
  useState,
  useEffect,
  useContext,
  PropsWithChildren,
  ComponentType,
} from "react";

export const HydrationRenderContext = React.createContext<boolean>(true);

function useHydrationRenderProviderValue(): boolean {
  const [isHydrationRender, setIsHydrationRender] = useState(true);

  useEffect(() => {
    setIsHydrationRender(false);
  }, []);

  return isHydrationRender;
}

export const HydrationRenderProvider: React.FC<PropsWithChildren<{}>> = (
  props
) => {
  const isHydrationRender = useHydrationRenderProviderValue();

  return (
    <HydrationRenderContext.Provider value={isHydrationRender}>
      {props.children}
    </HydrationRenderContext.Provider>
  );
};

export function useHydrationRender(): boolean {
  return useContext(HydrationRenderContext);
}

export function withHydrationRenderContext<
  T extends React.JSX.IntrinsicAttributes
>(Component: ComponentType<T>): React.FC<T> {
  const WithHydrationRenderContext: React.FC<T> = (props) => {
    return (
      <HydrationRenderProvider>
        <Component {...props} />
      </HydrationRenderProvider>
    );
  };

  return WithHydrationRenderContext;
}

export default useHydrationRender;
