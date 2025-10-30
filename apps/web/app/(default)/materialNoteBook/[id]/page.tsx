"use client";

import React from "react";
import { ProjectInfoCard } from "./components/ProjectInfoCard";
import { TechnicalInfoCard } from "./components/TechnicalInfoCard";
import { DesignInfoCard } from "./components/DesignInfoCard";
import { OwnershipDocsCard } from "./components/OwnershipDocsCard";
import { NotebookTypeCard } from "./components/NotebookTypeCard";
import { ChangeRequestStatus } from "../components/ChangeRequestStatus";

export default function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);

  const project = {
    id: id,
    name: "پروژه نیکراد",
    location: "اصفهان / تیران - شهرک صنعتی",
    area: 1200,
    builtArea: 8500,
    floors: 10,
    units: 40,
    usage: "ترکیبی (تجاری - صنعتی)",
    startYear: 1400,
    status: "در حال ساخت",
  };

  const technical = {
    structureType: "بتنی",
    roofType: "دال بتنی",
    foundationType: "رادیه",
    wallMaterial: "بلوک سیمانی",
    mechanicalSystem: "پکیج",
    electricalSystem: "کابل‌کشی مدرن",
    smartSystem: true,
    costPerMeter: 12500000,
  };

  const design = {
    hasEngineeringMap: true,
    hasInteriorDesign: true,
    hasFacadeDesign: true,
    hasLandscapeDesign: false,
    planStatus: "در حال تهیه",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است",
  };

  const ownership = {
    ownerName: "شرکت عمران نیکراد",
    ownerPhone: "8888888",
    ownerAddress: "اصفهان / تیران - شهرک صنعتی",
    engineer: "مهندس محمود سلطانی",
    licenseNumber: "489456156456",
    licenseDate: "1400/05/20",
    licenseFile: "/sample.pdf",
    technicalDocs: ["/doc1.jpg", "/doc2.jpg", "/doc3.jpg"],
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است",
  };

  const notebook = {
    type: "دفترچه مالی پروژه",
    transactionId: "546598374",
    transactionStatus: "موفق",
    transactionDate: "1402/09/20",
    transactionAmount: 2500000,
  };

  return (
    <div className=" space-y-6">
      <span className="text-xl font-semibold w-full">
        جزئیات درخواست دفترچه متریال
      </span>
      <ProjectInfoCard project={project} />
      <TechnicalInfoCard technical={technical} />
      <DesignInfoCard design={design} />
      <OwnershipDocsCard ownership={ownership} />
      <NotebookTypeCard notebook={notebook} />
      <ChangeRequestStatus />
    </div>
  );
}
