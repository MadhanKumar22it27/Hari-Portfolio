"use client";
import dynamic from "next/dynamic";

const ScrollToTop = dynamic(
  () => import("./components/helper/scroll-to-top"),
  { ssr: false }
);

export default function ScrollWrapper() {
  return <ScrollToTop />;
} 