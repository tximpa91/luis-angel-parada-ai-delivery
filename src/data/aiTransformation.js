export const transformationJourney = [
  {
    title: 'Discover use cases. Build reusable skills.',
    focus: 'Use-case discovery',
    detail: 'I started by discovering where AI could support engineering work and developing reusable skills around those use cases.',
    decision: 'Start with the work to be done, then define the skills that support it. A tool rollout alone is not enough.',
  },
  {
    title: 'Identify the context. Define MCP needs.',
    focus: 'Context foundations',
    detail: 'I identified the MCP servers needed to feed agents the relevant context for those skills and use cases.',
    decision: 'Make context requirements explicit before expanding what agents are asked to do. MCP means Model Context Protocol.',
  },
  {
    title: 'Require specialised development subagents.',
    focus: 'Development practice',
    detail: 'I began requiring specialised subagents for different areas of development, including backend and platform engineering.',
    decision: 'Move from general-purpose assistance to area-specific agent responsibilities within the development process.',
  },
  {
    title: 'Automate delivery through AI-DLC.',
    focus: 'L3 operating · L4 underway',
    detail: 'I extended the work into AI-DLC system delivery automation. L3 orchestration is operating, and L4 implementation is underway.',
    decision: 'Bring specialist agent work into an operating delivery workflow, then build the next layer of automation on that foundation.',
  },
]

export const maturityStages = [
  {
    level: 'L1',
    title: 'Assisted engineering',
    summary: 'Individual coding help. Delivery still depends on manual hand-offs and review.',
    shift: 'From personal tool adoption to a shared engineering baseline.',
    work: 'Assess where AI is used, where the team loses time, and what work is unsafe to automate. Agree approved tools, data boundaries, ownership and baseline delivery measures.',
    controls: 'Existing code review and CI remain in place. Protect credentials and private data, and make responsibility for generated changes explicit.',
    evidence: 'A baseline of lead time, review effort, escaped defects and operating cost, plus a bounded pilot with an accountable owner.',
    metrics: 'End-to-end lead time · review effort · defect baseline',
    caution: 'Adoption and generated code volume are activity measures, not proof of better delivery.',
  },
  {
    level: 'L2',
    title: 'Context-led acceleration',
    summary: 'Agents use repository context and repeatable workflows, not isolated prompts.',
    shift: 'From faster individuals to a repeatable team practice.',
    work: 'Version architecture guidance, commands, acceptance criteria and task context. Train the team on how to specify work, check outputs and capture decisions across repositories.',
    controls: 'Use bounded tasks and approved execution environments. Keep tests, reviews and human release authority connected to the original requirement.',
    evidence: 'A pilot that produces traceable changes with reproducible validation, without simply moving the bottleneck into review or QA.',
    metrics: 'Accepted changes · review backlog · rework · delivery stability',
    caution: 'Generating changes faster than the team can verify them creates review debt rather than leverage.',
  },
  {
    level: 'L3',
    title: 'Governed orchestration',
    summary: 'Specialised agent roles coordinate bounded work with independent verification.',
    shift: 'From agent-assisted tasks to an accountable delivery system.',
    work: 'Define implementation, validation and operational roles. Establish service contracts, usable system context, sandboxed execution, per-role permissions and evidence-based progression gates.',
    controls: 'Separate implementation from independent validation; agents do not approve their own work. Apply security, quality, cost and compliance checks with explicit human escalation and release decisions.',
    evidence: 'A change can be traced from intent through source revision, independent verdict, tests and environment evidence to its release or rollback decision.',
    metrics: 'Accepted outcomes · validation capacity · full delivery cost · recovery effort',
    caution: 'Orchestration needs a dependable platform foundation. Queues, data ownership, API boundaries, delivery environments and recovery paths must be understandable to both people and agents.',
  },
  {
    level: 'L4',
    title: 'AI-native delivery',
    summary: 'Low-risk work earns more autonomy through demonstrated, monitored reliability.',
    shift: 'From fixed permission boundaries to evidence-based, risk-specific autonomy.',
    work: 'Explore trusted patterns only after the governed workflow is repeatable. Maintain current intent and dependency context, evaluate outcomes and decide where automation adds value rather than risk.',
    controls: 'Constrain autonomy by risk, permissions and proven verification. Keep stop conditions, rollback and human ownership of intent, exceptions and risk acceptance.',
    evidence: 'A defined class of low-risk work repeatedly meets acceptance and recovery criteria within a monitored, revocable automation boundary.',
    metrics: 'Accepted business outcomes · cost per outcome · failure and recovery burden',
    caution: 'This is an implementation direction, not a claim of an autonomous software factory already delivered. High-risk financial, security or regulatory decisions do not automatically become autonomous.',
  },
]

export const transformationSteps = [
  ['Assess the starting point', 'Map tools, hand-offs, system constraints and team readiness. A company can have different maturity across teams and kinds of work.'],
  ['Prove one bounded workflow', 'Choose a useful change with a baseline, a sponsor and acceptance criteria. Establish context, validation and recovery before increasing scope.'],
  ['Change the operating model', 'Clarify roles, review capacity, permissions and release ownership. Coach the team and keep product, security and operations involved.'],
  ['Scale the pattern, not the hype', 'Expand where evidence supports it. Compare accepted outcomes, rework, stability and full cost; keep autonomy limited where the controls are not ready.'],
]

export const transformationMandate = [
  ['People & leadership', 'Define engineering responsibilities, coach managers and teams, and build shared ownership across product, development, QA, security and operations. Transformation must change how people collaborate, not only which tools they use.'],
  ['The delivery operating model', 'Connect intent, planning, implementation, verification and release through shared context and clear decision rights. Replace disconnected AI activity with repeatable, accountable ways of working.'],
  ['Platforms & engineering foundations', 'Make repositories, service contracts, environments, permissions and recovery paths usable for controlled agent work. Distributed-system complexity is part of the transformation and must be understood by the agents.'],
  ['Governance, adoption & value', 'Establish risk boundaries, evidence gates and cost ownership. Lead a bounded pilot, enable the teams, expand what works and measure accepted outcomes, stability, rework and operating effort.'],
]
