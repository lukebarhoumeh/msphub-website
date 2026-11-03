/** Service content from the company deck (May 2026) and the service capabilities deck. */

export const professional = {
  title: "Professional services",
  headline: "Plan and deliver the change.",
  lead: "Microsoft 365, Azure, security and identity, and the data platform, delivered under a fixed-fee statement of work with a named project manager accountable end to end. Every project starts with a licensing review in HubX.",
  columns: [
    {
      title: "Microsoft 365",
      items: [
        "Tenant-to-tenant migrations, merges & divestitures",
        "Exchange migrations",
        "Google Workspace → Microsoft 365",
        "Intune & Autopilot",
        "Teams Phone & calling plans",
        "Windows 365 / Azure Virtual Desktop",
        "SharePoint & OneDrive",
      ],
    },
    {
      title: "Azure infrastructure",
      items: ["Azure VM deployments", "Azure Virtual Desktop", "App hosting & migration", "Hybrid connectivity", "Backup & DR"],
    },
    {
      title: "Security & identity",
      items: [
        "Defender for Endpoint / Servers / Cloud migrations",
        "Purview: DLP, sensitivity labels, retention",
        "Conditional Access & Entra ID governance",
        "Zero Trust frameworks",
        "Security posture management",
      ],
    },
    {
      title: "Data & platform",
      items: [
        "Power Platform / Power BI",
        "Fabric architecture",
        "SQL database migrations & integrations",
        "Dataverse & automation",
        "App modernization",
        "Custom .NET development",
      ],
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
        ["Managed services", "Hand the finished environment to our managed-services team, monitored around the clock."],
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
  /** MSP Hub's delivery model, as named in its Modern Work delivery white paper and proposals. */
  engagement: [
    { title: "Align", body: "Scope, licensing review in HubX, risks, and success criteria agreed in a fixed-fee statement of work." },
    { title: "Plan", body: "Architecture, migration plan, and cutover runbook, with milestone visibility for your team." },
    { title: "Deliver", body: "Pilot, waves, and validation, run by a named project manager accountable end to end." },
    { title: "Validate & Transition", body: "Evidence-based acceptance review, documentation your team can operate from, and an optional handoff into MSP Hub managed services." },
  ],
  commitments: [
    "Fixed-fee statement of work for projects; block-time for ongoing advisory",
    "A named project manager, accountable end to end",
    "Milestone visibility throughout",
    "Evidence-based acceptance review",
    "Documentation the client's team can operate from",
    "Licensing alignment: every project starts with a licensing review in HubX",
  ],
};

export const managed = {
  title: "Managed services",
  headline: "Operate what comes next.",
  lead: "Monitoring, alerting, and incident management around the clock for the environments we manage across Microsoft 365, Azure, and databases, run to agreed SLAs with clear ownership and direct Microsoft escalation.",
  offerings: [
    {
      title: "24/7 monitoring and incident management",
      body: "Around-the-clock monitoring, alerting, and incident management for the Microsoft 365 and Azure environments under MSP Hub managed services.",
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
      title: "Azure cost optimization",
      body: "Ongoing right-sizing of subscriptions, reservations, and savings plans by the cloud team, on estates MSP Hub takes over.",
    },
    {
      title: "Service Desk in HubX",
      body: "Tickets with priority and SLA state, visible to the customer and the partner, shared with MSP Hub's engineers.",
    },
    {
      title: "Direct Microsoft escalation",
      body: "Issues escalate to Microsoft Premier support directly, as a CSP direct-bill partner.",
    },
  ],
  howItWorks: [
    { title: "Monitor", body: "Around-the-clock monitoring for the managed environments across Microsoft 365, Azure, and databases." },
    { title: "Respond", body: "Engineers own the incident. Tickets carry priority and SLA state in the HubX Service Desk, visible to the customer and the partner." },
    { title: "Report", body: "Response and resolution are reported monthly against the SLAs agreed up front." },
    { title: "Optimize", body: "Ongoing right-sizing of subscriptions, reservations, and savings plans by the cloud team, on estates MSP Hub runs." },
  ],
};

export const development = {
  title: "Development as a service",
  headline: "Build the capability the estate still needs.",
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
        "Kubernetes, microservices, and containerized services",
        "DevOps transformation: lifecycle, toolchain, and team velocity",
      ],
    },
    {
      title: "AI development",
      items: [
        "AI strategy: high-impact opportunities and a roadmap",
        "Custom AI solutions, from intelligent automation to predictive analytics",
        "Microsoft Copilot rollout, governance, and adoption",
        "Claude and Anthropic implementations and custom AI tools",
        "AI operations: monitoring and optimizing for measurable ROI",
      ],
    },
  ],
  method: [
    { title: "Discover", body: "Name the capability the estate still needs, and agree the first milestone." },
    { title: "Build", body: "Three-week sprints across DEV, UAT, and production, with scope and acceptance agreed per milestone." },
    { title: "Ship", body: "Automated promotion and rollback. A demo closes every sprint." },
    { title: "Improve", body: "The next milestone, including Copilot adoption, agents, and the automation already in production." },
  ],
  /** Platform engineering heritage; shown only once approved (handoff §2 #13). */
  products: [
    { name: "SIX.One", body: "Multi-tenant SaaS platform: microservices API and Blazor SPA, built for ISVs and operators." },
    { name: "Wave", body: "Warehouse management system with real-time integration to order and logistics systems." },
    { name: "AppLauncher", body: "Desktop launcher with auto-install and encrypted parameters for vendors and distributed teams." },
  ],
};
