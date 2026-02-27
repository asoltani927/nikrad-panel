'use client'

import BaseContainer from "@/components/base/BaseContainer";

export default function ProfileRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <BaseContainer className="lg:px-36">
        {children}
      </BaseContainer>
    </>
  );
}
