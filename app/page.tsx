"use client";

import AuthWrapper from "@/components/AuthWrapper";
import HomePageContent from "@/components/HomePageContent";

export default function Page() {
  return (
    <AuthWrapper>
      <HomePageContent />
    </AuthWrapper>
  );
}
