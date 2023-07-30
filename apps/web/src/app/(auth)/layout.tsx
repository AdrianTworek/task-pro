export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container max-w-md flex flex-col justify-center mt-24">
      {children}
    </div>
  );
}
