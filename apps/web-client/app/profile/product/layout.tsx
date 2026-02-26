'use client'

export default function ProfileRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <div className="px-16">
        {children}
      </div>
    </>
  );
}
