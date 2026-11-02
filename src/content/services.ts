/** Service content from the company deck (May 2026) and the service capabilities deck. */

export const professional = {
  title: "Professional services",
  headline: "Cloud expertise, delivered.",
  lead: "Assessment, design, migration, and handover for Microsoft 365, Azure, security and identity, and the data platform. Fixed scope, named engineers, direct Microsoft escalation.",
  columns: [
    {
      title: "Microsoft 365",
      items: ["Tenant-to-tenant migrations", "Exchange migrations", "Intune & Autopilot", "SharePoint & OneDrive", "Security & compliance"],
    },
    {
      title: "Azure infrastructure",
      items: ["Azure VM deployments", "Azure Virtual Desktop", "App hosting & migration", "Hybrid connectivity", "Backup & DR"],
    },
    {
      title: "Security & identity",
      items: ["Defender implementations", "Conditional Access", "Identity governance", "Zero Trust frameworks", "Security posture management"],
    },
    {
      title: "Data & platform",
      items: ["Power Platform / Power BI", "Fabric architecture", "Dataverse & automation", "App modernization", "Custom .NET development"],
    },
  ],
  practices: [
    {
      name: "Cloud",
      tiles: [
        ["Cloud migration", "Workloads moved to Azure or the right cloud with a tested cutover plan."],
        ["Cloud infrastructure", "Compute, storage, and networking designed for the workload, not the catalog."],
        ["Architecture", "Well-Architected reviews and target-state designs."],
        ["Landing zone", "Identity, governance, networking, and policy foundations before the first workload."],
        ["DevOps", "Pipelines and infrastructure as code so environments are repeatable."],
        ["VDI", "Azure Virtual Desktop and Windows 365 design and rollout."],
        ["Penetration testing", "Find the gaps before someone else does."],
        ["Security & compliance", "Controls mapped to frameworks such as PCI DSS."],
        ["Managed services", "Hand the finished environment to our 24/7 operations team."],
      ],
    },
    {
      name: "Microsoft 365",
      tiles: [
        ["Microsoft 365", "Tenant design, licensing alignment, and rollout."],
        ["Exchange to Microsoft 365", "On-premises and hybrid Exchange moved with zero mail loss."],
        ["Tenant to tenant", "Mergers, divestitures, and consolidations."],
        ["Gmail to Microsoft 365", "Google Workspace migrations including mail, drive, and calendars."],
        ["Intune & Autopilot", "Zero-touch device provisioning and policy."],
        ["Data Loss Prevention", "Sensitivity labels, DLP policies, and retention."],
        ["Managed services", "Ongoing tenant administration and support."],
      ],
    },
    {
      name: "Database",
      tiles: [
        ["Database infrastructure", "On-premises, VMware, and cloud IaaS or PaaS platforms."],
        ["Database migration", "A zero-tolerance approach to data loss."],
        ["Managed service", "Operations and tuning run to agreed SLAs."],
        ["Data pipeline", "Ingestion, transformation, and orchestration."],
        ["Optimization", "OLTP and OLAP performance tuning."],
        ["Data visualization", "Power BI models and dashboards people actually use."],
      ],
    },
  ],
  engagement: [
    { title: "Assess", body: "We inventory the estate, the licensing, and the risks, and agree the target state." },
    { title: "Design", body: "Architecture, migration plan, and cutover runbook, reviewed with your team." },
    { title: "Migrate", body: "Pilot, waves, and validation with a named engineer and clear rollback points." },
    { title: "Hand over or operate", body: "Documentation and training, or a handoff into MSP Hub managed services." },
  ],
};

export const managed = {
  title: "Managed services",
  headline: "Improved uptime, security, and strategic growth.",
  lead: "24/7 monitoring, alerting, and incident management across Microsoft 365, cloud, and databases, run to agreed SLAs with clear ownership and direct Microsoft escalation.",
  offerings: [
    {
      title: "24/7 managed cloud support",
      body: "Monitoring, alerting, and incident management around the clock for Azure and multi-cloud estates.",
    },
    {
      title: "Microsoft 365 & desktop modernization",
      body: "Security and compliance operations, hybrid Exchange, and the modern desktop, administered for you.",
    },
    {
      title: "Database managed service",
      body: "Backups, patching, performance tuning, and availability for SQL and cloud database platforms.",
    },
    {
      title: "Cloud consulting",
      body: "Migration readiness assessments, Well-Architected reviews, and ongoing cost optimization.",
    },
  ],
  howItWorks: [
    { title: "Monitor", body: "Telemetry across tenants, subscriptions, and databases feeds one operations view." },
    { title: "Alert and triage", body: "Alerts are triaged by engineers, not just forwarded, with severity agreed in advance." },
    { title: "Resolve and escalate", body: "Clear ownership from first response to resolution, with direct escalation to Microsoft when needed." },
  ],
};

export const development = {
  title: "Development as a service",
  headline: "Faster deployments. Improved collaboration. Scalability.",
  lead: "Application development, DevOps, and AI development as a managed engagement, from Copilot rollouts to purpose-built agents and automation.",
  tracks: [
    {
      title: "Application development",
      items: [
        "Custom cloud-native applications and microservices",
        ".NET and Blazor web, mobile, and Windows applications",
        "Full-stack development for modern workloads",
        "App modernization and re-platforming",
      ],
    },
    {
      title: "DevOps",
      items: [
        "CI/CD pipelines for rapid, reliable delivery",
        "Infrastructure as code with Terraform, ARM, and Bicep",
        "Kubernetes and serverless platforms",
        "DevOps transformation: lifecycle, toolchain, and team velocity",
      ],
    },
    {
      title: "AI development",
      items: [
        "AI strategy: high-impact opportunities and a roadmap",
        "Custom AI solutions, from intelligent automation to predictive analytics",
        "Microsoft Copilot deployment and optimization",
        "Claude and Anthropic implementations and custom AI tools",
        "AI operations: monitoring and optimizing for measurable ROI",
      ],
    },
  ],
  method: [
    { title: "Agile delivery", body: "Three-week sprints with a demo at the end of every one." },
    { title: "Milestone cycles", body: "Scope, build, and acceptance agreed per milestone, so budgets stay predictable." },
    { title: "DEV, UAT, Prod", body: "Separate environments with automated promotion and rollback." },
  ],
  products: [
    { name: "SIX.One", body: "Multi-tenant SaaS platform: microservices API and Blazor SPA, built for ISVs and operators." },
    { name: "Wave", body: "Warehouse management system with real-time integration to order and logistics systems." },
    { name: "AppLauncher", body: "Desktop launcher with auto-install and encrypted parameters for vendors and distributed teams." },
  ],
};
