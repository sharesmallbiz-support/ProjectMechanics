export const METHODOLOGY_CONTENT = {
  overview: {
    title:
      "Understanding the Project Life Cycle for Effective Project Management",
    description:
      "In today's dynamic business environment, effective project management is crucial for organizations to achieve strategic goals and deliver successful outcomes. Understanding the project life cycle and embracing portfolio management (PPM) are essential steps toward ensuring consistency, efficiency, and strategic alignment in project execution.",
  },
  projectPortfolioManagement: {
    title: "Project Portfolio Management",
    description:
      "Project Portfolio Management (PPM) is a strategic approach that organizations use to prioritize, select, and manage a collection of projects and programs as a unified portfolio. It involves aligning projects and programs with the organization's strategic goals and objectives, optimizing resource allocation, and balancing the portfolio to maximize value and achieve desired outcomes.",
    benefits: [
      "Structured framework for evaluating and prioritizing projects",
      "Alignment with strategic objectives and resource availability",
      "Assessment of potential value, risks, and resource requirements",
      "Informed decision-making about project selection and resource allocation",
    ],
  },
  benefitsOfConsistency: {
    title: "Benefits of Consistency",
    description:
      "The Project Life Cycle represents a logical sequence of activities that collectively contribute to accomplishing a project's goals or objectives. By dividing a project into distinct states, it becomes easier for project managers and their teams to plan, allocate resources, and monitor progress effectively.",
    advantages: [
      "Ability to analyze projects consistently across the organization",
      "Comprehensive view of the entire project portfolio",
      "Enhanced communication and collaboration among stakeholders",
      "Improved project governance, risk management, and strategic alignment",
    ],
  },
  artVsScience: {
    title: "The Art and Science of Project Management",
    content:
      'Successful project management is part "art" and part "mechanics". Project Mechanics are objective and relatively easy to describe, whereas the art of project management is left to each individual\'s interpretation.',
    artDescription:
      "Effective communication with clients, staff, and management is the subjective art that drives project success.",
    scienceDescription:
      "Objective tasks and procedures that must be carried out to ensure project success.",
  },
  constituencies: [
    {
      name: "Client",
      description:
        "Receiving the output of the project and defining success criteria",
      color: "blue",
    },
    {
      name: "Staff",
      description:
        "Performing the steps necessary to complete the project objectives",
      color: "green",
    },
    {
      name: "Management",
      description: "Tracking progress and ensuring project profitability",
      color: "purple",
    },
  ],
  projectLifeCycle: {
    title: "The Project Mechanics Project Life Cycle",
    description:
      "The Project Life Cycle defines a series of states that a project goes through from its inception to its completion. Project activities are grouped into states so that the project manager and the core team can efficiently plan and organize resources appropriately for each state.",
    states: [
      {
        name: "Future / Opportunity",
        status: "An opportunity has been identified",
        description:
          "In this state, an opportunity is identified, signaling the potential for a project. However, no specific team has been assigned to define the opportunity yet. The key takeaway is that no work is being done so no resources need to be tracked.",
        keyPoints: [
          "No team assigned",
          "Potential project idea",
          "No resource tracking needed",
        ],
      },
      {
        name: "Project Definition",
        status:
          "Sponsor has agreed to fund the creation of a project definition",
        description:
          "Once a sponsor agrees to fund the project definition, a dedicated team is assigned to define the project and create a proposal. During this phase, an accounting code is generated to track the time and resources.",
        keyPoints: [
          "Team assigned",
          "Proposal creation",
          "ROI calculation",
          "Resource tracking begins",
        ],
        deliverable:
          "Comprehensive proposal outlining goals, scope, timeline, and budget",
      },
      {
        name: "Proposed",
        status: "A proposal has been presented for approval",
        description:
          "After the project proposal is created, it is presented to the Project Sponsor for approval. The proposal should include an expiration date and specific metrics that determine when the project can commence.",
        keyPoints: [
          "All work has stopped",
          "Awaiting sponsor decision",
          "Proposal includes expiration date",
        ],
        keyQuestion: "Are we going to do it?",
      },
      {
        name: "Approved",
        status: "The Project Sponsor has approved the project proposal",
        description:
          "In the Approved state, the Project Sponsor gives the green light to proceed with the project. The project team is officially formed, and the project's priority is established.",
        keyPoints: [
          "Team formation begins",
          "Project priority established",
          "Kickoff meeting scheduled",
        ],
      },
      {
        name: "In Progress",
        status:
          "The project has been kicked off and the project charter established",
        description:
          "The In Progress state represents the core implementation phase of the project. The project team actively works on executing the defined tasks and activities.",
        keyPoints: [
          "Active project work",
          "Weekly status reports",
          "Formal change control process",
          "Milestone tracking",
        ],
        deliverable: "Regular progress reports and milestone achievements",
      },
      {
        name: "Complete",
        status: "The project has been delivered",
        description:
          "When all project deliverables have been successfully accepted, the project enters the Complete state. At this point, there are no ongoing project activities, and the project code is closed.",
        keyPoints: [
          "No ongoing activities",
          "Final invoice issued",
          "Post-implementation review",
          "Team disbanded",
        ],
      },
      {
        name: "Cancelled",
        status: "The project has been canceled",
        description:
          "At any point in the project life cycle, a project may face challenges or changes in circumstances that lead to its cancellation. This could occur due to budget constraints, shifting priorities, or technological limitations.",
        keyPoints: [
          "All work ceases",
          "Resources reallocated",
          "Can occur at any stage",
        ],
      },
    ],
  },
  kickOffMeeting: {
    title: "Project Kick-Off Meeting Essentials",
    description:
      "Once an initial project team has been constructed, the Project Manager should hold a project kick-off meeting to discuss the future that lies before the project team.",
    agenda: [
      'Expectations of customer/user/sponsors – Deliverables & "The Journey"',
      "Expectations of team members",
      "Expectations of Project Manager",
      'Project "rules"',
      "Resources available",
      "Project mechanics (e.g. control procedures, schedules, milestones, etc.)",
    ],
  },
  pmiFramework: {
    title: "PMI Framework Integration",
    quote:
      "Project management is the application of knowledge, skills, tools, and techniques to a broad range of activities to meet the requirements of a particular project.",
    processes: [
      "Five Process Groups: Initiating, Planning, Executing, Monitoring, Closing",
      "Nine Knowledge Areas including Scope, Time, Cost, Quality",
      "Human Resources, Communications, Risk Management",
      "Project Integration and Procurement Management",
    ],
  },
};

export const YOUTUBE_VIDEO_ID = "EEFXTcARvGY";
export const YOUTUBE_CHANNEL_URL =
  "https://www.youtube.com/channel/UCWy4-89rNbDI_HGUCB8pkBA";
