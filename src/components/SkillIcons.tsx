import type { SVGProps } from "react";

const b = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const Dynamics365 = (p: SVGProps<SVGSVGElement>) => (
  <svg {...b} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 3v18" /><path d="M3 12h18" /><path d="M5.6 5.6l12.8 12.8" /><path d="M18.4 5.6L5.6 18.4" /></svg>
);
const Dataverse = (p: SVGProps<SVGSVGElement>) => (
  <svg {...b} {...p}><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" /><path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" /></svg>
);
const PowerPages = (p: SVGProps<SVGSVGElement>) => (
  <svg {...b} {...p}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 9v12" /></svg>
);
const PowerAutomate = (p: SVGProps<SVGSVGElement>) => (
  <svg {...b} {...p}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
);
const PowerBI = (p: SVGProps<SVGSVGElement>) => (
  <svg {...b} {...p}><rect x="3" y="12" width="4" height="9" rx="1" /><rect x="10" y="7" width="4" height="14" rx="1" /><rect x="17" y="3" width="4" height="18" rx="1" /></svg>
);
const PowerPlatform = (p: SVGProps<SVGSVGElement>) => (
  <svg {...b} {...p}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
);
const RibbonWorkbench = (p: SVGProps<SVGSVGElement>) => (
  <svg {...b} {...p}><rect x="2" y="3" width="20" height="5" rx="1" /><path d="M4 8v4h5V8" /><path d="M11 8v4h5V8" /><path d="M18 8v4h4V8" /><path d="M7 15l5 6 5-6" /></svg>
);
const XrmToolBox = (p: SVGProps<SVGSVGElement>) => (
  <svg {...b} {...p}><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" /></svg>
);
const AzureFunc = (p: SVGProps<SVGSVGElement>) => (
  <svg {...b} {...p}><path d="M6 3l4 8-4 8h5l7-8-7-8H6z" /><path d="M10 11h6" /></svg>
);
const KeyVault = (p: SVGProps<SVGSVGElement>) => (
  <svg {...b} {...p}><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.78 7.78 5.5 5.5 0 017.78-7.78zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" /></svg>
);
const RestAPI = (p: SVGProps<SVGSVGElement>) => (
  <svg {...b} {...p}><path d="M4 12h4" /><path d="M16 12h4" /><circle cx="12" cy="12" r="3" /><path d="M12 3v3" /><path d="M12 18v3" /><path d="M5.6 5.6l2.2 2.2" /><path d="M16.2 16.2l2.2 2.2" /><path d="M18.4 5.6l-2.2 2.2" /><path d="M7.8 16.2l-2.2 2.2" /></svg>
);
const DocuSign = (p: SVGProps<SVGSVGElement>) => (
  <svg {...b} {...p}><path d="M17 3a2.83 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>
);
const ESign = (p: SVGProps<SVGSVGElement>) => (
  <svg {...b} {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>
);
const OAuth = (p: SVGProps<SVGSVGElement>) => (
  <svg {...b} {...p}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /><circle cx="12" cy="16" r="1" /></svg>
);
const FlutterIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...b} {...p}><rect x="5" y="2" width="14" height="20" rx="3" /><path d="M12 18h.01" /><path d="M9 6h6" /></svg>
);
const JSIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...b} {...p}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /><line x1="14" y1="4" x2="10" y2="20" /></svg>
);
const LiquidIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...b} {...p}><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0L12 2.69z" /></svg>
);
const CSharp = (p: SVGProps<SVGSVGElement>) => (
  <svg {...b} {...p}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
);
const ReactIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...b} {...p}><circle cx="12" cy="12" r="2" /><ellipse cx="12" cy="12" rx="10" ry="4" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" /></svg>
);
const NodeIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...b} {...p}><path d="M12 2l8.5 5v10L12 22l-8.5-5V7L12 2z" /><path d="M12 22V12" /><path d="M20.5 7L12 12 3.5 7" /></svg>
);
const SQLIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...b} {...p}><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 5v14c0 1.66-4.03 3-9 3s-9-1.34-9-3V5" /><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" /></svg>
);
const MongoIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...b} {...p}><path d="M12 2C8 6 5 10 5 14a7 7 0 0014 0c0-4-3-8-7-12z" /><path d="M12 2v20" /></svg>
);
const GitIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...b} {...p}><circle cx="18" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><path d="M6 21V9a9 9 0 009 9" /></svg>
);
const ReqAnalysis = (p: SVGProps<SVGSVGElement>) => (
  <svg {...b} {...p}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><path d="M8 11h6" /><path d="M11 8v6" /></svg>
);
const UATIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...b} {...p}><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
);
const SysIntegration = (p: SVGProps<SVGSVGElement>) => (
  <svg {...b} {...p}><rect x="2" y="6" width="6" height="6" rx="1" /><rect x="16" y="12" width="6" height="6" rx="1" /><path d="M8 9h3a3 3 0 013 3v3" /><path d="M16 15h-3a3 3 0 01-3-3V9" /></svg>
);
const MigrationIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...b} {...p}><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /><path d="M19 5v14" /><path d="M5 5v14" /></svg>
);
const ConsultIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...b} {...p}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>
);

export const skillIconMap: Record<string, React.FC<SVGProps<SVGSVGElement>>> = {
  "Microsoft Dynamics 365 CRM": Dynamics365,
  "Dataverse": Dataverse,
  "Power Pages": PowerPages,
  "Power Automate": PowerAutomate,
  "Power BI": PowerBI,
  "Power Platform": PowerPlatform,
  "Ribbon Workbench": RibbonWorkbench,
  "XrmToolBox": XrmToolBox,
  "Azure Functions (C#)": AzureFunc,
  "Azure Key Vault": KeyVault,
  "REST APIs": RestAPI,
  "DocuSign Integration": DocuSign,
  "eSignature (Emsign)": ESign,
  "OAuth2 / SSO": OAuth,
  "Flutter (iOS & Android)": FlutterIcon,
  "JavaScript": JSIcon,
  "Liquid Templates": LiquidIcon,
  "C#": CSharp,
  "ReactJS": ReactIcon,
  "Node.js": NodeIcon,
  "SQL": SQLIcon,
  "MongoDB": MongoIcon,
  "Git": GitIcon,
  "Requirements Analysis": ReqAnalysis,
  "UAT": UATIcon,
  "System Integration": SysIntegration,
  "DEV-to-UAT Migration": MigrationIcon,
  "Functional Consulting": ConsultIcon,
};
