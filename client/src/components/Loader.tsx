type LoaderProps = {
  progress?: number;
};

export function Loader({ progress }: LoaderProps) {
  if (progress === undefined) {
    return <div>Loading...</div>;
  }

  return <div>Loading... ({progress}%)</div>;
}
