export default function IntakeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="intake-scope min-h-screen flex flex-col">{children}</div>;
}
