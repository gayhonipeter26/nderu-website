"use client";

import React, { type SVGProps } from "react";
import { LogoCarousel } from "@/components/ui/logo-carousel";

// Engineering Skills Icons
function VueIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="#4FC08D"
      {...props}
    >
      <path d="M24,1.61H14.06L12,5.16,9.94,1.61H0L12,22.39ZM12,14.08,5.16,2.23H9.59L12,6.41l2.41-4.18h4.43Z"/>
    </svg>
  );
}

function ReactIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="#61DAFB"
      {...props}
    >
      <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.342 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.877-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.342 0 3.108-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.877 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278z"/>
    </svg>
  );
}

function LaravelIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="#FF2D20"
      {...props}
    >
      <path d="M22.392 6h-4.396V.608A.608.608 0 0 0 17.388 0H6.612a.608.608 0 0 0-.608.608V6H1.608A.608.608 0 0 0 1 6.608v10.776c0 .336.272.608.608.608H6v4.008c0 .336.272.608.608.608h10.776a.608.608 0 0 0 .608-.608v-4.008h4.392a.608.608 0 0 0 .608-.608V6.608A.608.608 0 0 0 22.392 6z"/>
    </svg>
  );
}

function NodeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="#339933"
      {...props}
    >
      <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.586-0.203,0.704-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.08-0.047-0.189-0.047-0.271,0 l-8.79,5.072C3.052,6.727,3,6.818,3,6.921v10.156c0,0.094,0.053,0.184,0.137,0.229l2.409,1.392 c1.307,0.654,2.108-0.117,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.945-1.058,3.063-2.898,3.063c-0.566,0-1.014,0-2.257-0.613l-2.313-1.333c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.352-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.926,0.944,0.926,1.603 v10.156c0,0.659-0.356,1.273-0.926,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z"/>
    </svg>
  );
}

function TypeScriptIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="#3178C6"
      {...props}
    >
      <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.89V9.938H3.375V7.772z"/>
    </svg>
  );
}

function AWSIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="#FF9900"
      {...props}
    >
      <path d="M14.5 10.5c0 .3-.1.5-.3.7-.2.2-.4.3-.7.3s-.5-.1-.7-.3c-.2-.2-.3-.4-.3-.7s.1-.5.3-.7c.2-.2.4-.3.7-.3s.5.1.7.3c.2.2.3.4.3.7zm-5 0c0 .3-.1.5-.3.7-.2.2-.4.3-.7.3s-.5-.1-.7-.3c-.2-.2-.3-.4-.3-.7s.1-.5.3-.7c.2-.2.4-.3.7-.3s.5.1.7.3c.2.2.3.4.3.7zm10 0c0 .3-.1.5-.3.7-.2.2-.4.3-.7.3s-.5-.1-.7-.3c-.2-.2-.3-.4-.3-.7s.1-.5.3-.7c.2-.2.4-.3.7-.3s.5.1.7.3c.2.2.3.4.3.7z"/>
    </svg>
  );
}

function DockerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="#2496ED"
      {...props}
    >
      <path d="M12.76 8.82a1.58 1.58 0 0 0-.58-.1h-.02a1.58 1.58 0 0 0-.58.1c-.36.14-.64.42-.78.78a1.58 1.58 0 0 0-.1.58v.02c0 .2.04.4.1.58.14.36.42.64.78.78.18.06.38.1.58.1h.02c.2 0 .4-.04.58-.1.36-.14.64-.42.78-.78.06-.18.1-.38.1-.58v-.02a1.58 1.58 0 0 0-.1-.58 1.58 1.58 0 0 0-.78-.78zm-4 0a1.58 1.58 0 0 0-.58-.1h-.02a1.58 1.58 0 0 0-.58.1c-.36.14-.64.42-.78.78a1.58 1.58 0 0 0-.1.58v.02c0 .2.04.4.1.58.14.36.42.64.78.78.18.06.38.1.58.1h.02c.2 0 .4-.04.58-.1.36-.14.64-.42.78-.78.06-.18.1-.38.1-.58v-.02a1.58 1.58 0 0 0-.1-.58 1.58 1.58 0 0 0-.78-.78zm8 0a1.58 1.58 0 0 0-.58-.1h-.02a1.58 1.58 0 0 0-.58.1c-.36.14-.64.42-.78.78a1.58 1.58 0 0 0-.1.58v.02c0 .2.04.4.1.58.14.36.42.64.78.78.18.06.38.1.58.1h.02c.2 0 .4-.04.58-.1.36-.14.64-.42.78-.78.06-.18.1-.38.1-.58v-.02a1.58 1.58 0 0 0-.1-.58 1.58 1.58 0 0 0-.78-.78z"/>
    </svg>
  );
}

function PostgreSQLIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="#336791"
      {...props}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  );
}

function MySQLIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="#00758F"
      {...props}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  );
}

// Consulting Skills Icons
function ConsultingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
  );
}

function ArchitectureIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M3 3h18v18H3zM12 8v8m-4-4h8"/>
    </svg>
  );
}

function LeadershipIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2m14-10a4 4 0 1 0-8 0 4 4 0 0 0 8 0z"/>
    </svg>
  );
}

// Creative Skills Icons
function CameraIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  );
}

function EditIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7m-5-4l5 5m0-5l-5 5"/>
    </svg>
  );
}

function BrandIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  );
}

// Skills array matching the About.vue skillGroups
const engineeringSkills = [
  { name: "Vue.js", id: 1, img: VueIcon },
  { name: "React", id: 2, img: ReactIcon },
  { name: "Laravel", id: 3, img: LaravelIcon },
  { name: "Node.js", id: 4, img: NodeIcon },
  { name: "TypeScript", id: 5, img: TypeScriptIcon },
  { name: "AWS", id: 6, img: AWSIcon },
  { name: "Docker", id: 7, img: DockerIcon },
  { name: "PostgreSQL", id: 8, img: PostgreSQLIcon },
  { name: "MySQL", id: 9, img: MySQLIcon },
];

const consultingSkills = [
  { name: "Technical Discovery", id: 10, img: ConsultingIcon },
  { name: "Architecture Planning", id: 11, img: ArchitectureIcon },
  { name: "Process Optimization", id: 12, img: ConsultingIcon },
  { name: "Team Leadership", id: 13, img: LeadershipIcon },
  { name: "Stakeholder Alignment", id: 14, img: LeadershipIcon },
];

const creativeSkills = [
  { name: "Commercial Photography", id: 15, img: CameraIcon },
  { name: "Event Coverage", id: 16, img: CameraIcon },
  { name: "Portrait & Lifestyle", id: 17, img: CameraIcon },
  { name: "Editing Workflows", id: 18, img: EditIcon },
  { name: "Brand Storytelling", id: 19, img: BrandIcon },
];

export function SkillsCarousel() {
  return (
    <div className="space-y-12 py-8">
      {/* Engineering Skills */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-center">Engineering</h3>
        <LogoCarousel columnCount={3} logos={engineeringSkills} />
      </div>

      {/* Consulting Skills */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-center">Consulting</h3>
        <LogoCarousel columnCount={3} logos={consultingSkills} />
      </div>

      {/* Creative Skills */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-center">Creative</h3>
        <LogoCarousel columnCount={3} logos={creativeSkills} />
      </div>
    </div>
  );
}
