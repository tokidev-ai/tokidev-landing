---
title: "Designing solveOS: a distributed problem-solving runtime"
excerpt: "How we built a coordination layer for ephemeral workers that scales horizontally without the operational overhead of Kubernetes — and the lessons we learned tearing down the first three prototypes."
date: "April 10, 2026"
readTime: "12 MIN READ"
category: "Distributed Systems"
color: "#ef6c4a"
---

Five years ago, if you wanted to run a fleet of ephemeral workers that cooperated to solve large problems, your options were roughly: rent a Kubernetes cluster you didn't need, glue together a queue and a lock service and hope for the best, or reach for a heavyweight workflow engine that came with its own operational tax.

We didn't love any of those options. So we built solveOS — a runtime designed around one assumption: most distributed problems aren't actually about scale, they're about coordination under uncertainty.

## Why we didn't just use Kubernetes

Let's get this out of the way early. K8s is great at a specific job: keeping long-running services alive and reconciling desired state against reality. But our workload looked nothing like that.

<ul>
  <li>Workers lived for seconds to minutes, not days</li>
  <li>State was the problem, not the side effect</li>
  <li>We needed coordination primitives, not schedulers</li>
  <li>Every layer of abstraction cost us latency we didn't have</li>
</ul>

<div class="bg-brand-orange/10 border border-brand-orange/25 border-solid flex gap-4 md:gap-5 items-start md:items-center px-4 py-4 md:px-5 md:py-5 rounded-[16px] w-full max-w-[720px] my-4 flex-col sm:flex-row">
  <div class="bg-brand-orange/20 shrink-0 flex items-center justify-center rounded-full w-9 h-9">
    <span class="font-bold text-brand-orange text-[18px] leading-none mt-0.5">!</span>
  </div>
  <div class="flex flex-col items-start text-[14px] md:text-[15px]">
    <p class="font-semibold text-white m-0">Heads up</p>
    <p class="font-normal leading-[1.6] text-brand-text/70 m-0 md:text-[14.5px]">We considered and rejected Nomad, Temporal, and Argo Workflows before committing to build from scratch. All three are excellent; none fit.</p>
  </div>
</div>

## The three prototypes we threw away

Before we got to the version that ships today, we tore down three prototypes — each teaching us something the docs wouldn't have. Here's a distilled version of iteration #2's coordinator contract:

<div class="bg-[#0a0712]/80 border border-white/10 flex flex-col items-start overflow-hidden rounded-[16px] w-full max-w-[720px] mb-10 mt-6 font-mono">
  <div class="bg-white/5 border-b border-white/10 flex items-center justify-between px-[18px] py-[10px] w-full">
    <div class="flex gap-1.5 pointer-events-none">
      <div class="w-2.5 h-2.5 rounded-full bg-white/20"></div>
      <div class="w-2.5 h-2.5 rounded-full bg-white/20"></div>
      <div class="w-2.5 h-2.5 rounded-full bg-white/20"></div>
    </div>
    <p class="font-medium text-[12px] text-white/50 m-0 tracking-wide font-sans">coordinator.ts</p>
    <div class="flex gap-[6px] items-center text-[#c6cad0] text-[12px] font-sans">
      <p class="m-0 hover:text-white cursor-pointer transition">⧉ Copy</p>
    </div>
  </div>
  <div class="flex flex-col px-[22px] py-[20px] text-[13.5px] w-full bg-[#0a0712] overflow-x-auto">
    <p class="text-white/35 mb-2 m-0 mt-0">// A minimal cooperative worker contract</p>
    <pre class="m-0 bg-transparent p-0 text-[#e3dfe9] leading-[24px]"><code><span class="text-[#f88b6d]">interface </span><span class="text-[#d7c2ea]">Worker</span> {
  <span class="text-[#d7c2ea]">id</span>: <span class="text-brand-yellow">string</span>;
  <span class="text-[#d7c2ea]">claim</span>(task: Task): <span class="text-[#f88b6d]">Promise</span>&lt;Lease&gt;;
  <span class="text-[#d7c2ea]">report</span>(progress: Progress): <span class="text-[#f88b6d]">Promise</span>&lt;<span class="text-brand-yellow">'continue'|'yield'</span>&gt;;
  <span class="text-[#d7c2ea]">handoff</span>(to: Worker, state: OpaqueState): <span class="text-[#f88b6d]">Promise</span>&lt;<span class="text-[#f88b6d]">void</span>&gt;;
}
    
<span class="text-white/35">// The coordinator never owns state —</span>
<span class="text-white/35">// it only witnesses it.</span>
<span class="text-[#f88b6d]">const </span><span class="text-[#d7c2ea]">lease</span> = <span class="text-[#f88b6d]">await</span> worker.<span class="text-[#d7c2ea]">claim</span>(task);
<span class="text-[#f88b6d]">if</span> (lease.deadlineMs &lt; <span class="text-brand-orange">500</span>) worker.<span class="text-[#d7c2ea]">handoff</span>(nextPeer, lease.state);</code></pre>
  </div>
</div>

The key insight — which we only hit on iteration #3 — was that the coordinator shouldn't own state. It should only witness it. That flipped the entire dependency graph and let us lose the central store.

<div class="bg-linear-to-r border-brand-orange border-l-[3px] border-solid flex from-brand-orange/10 items-start px-6 py-6 md:px-[40px] md:py-[32px] rounded-br-[16px] rounded-tr-[16px] to-transparent w-full max-w-[720px] my-10 md:my-12">
  <p class="font-medium leading-[1.4] text-[20px] md:text-[26px] text-white tracking-[-0.26px] m-0">
    Most distributed problems aren't about scale. They're about coordination under uncertainty.
  </p>
</div>

## What changed when we stopped storing state

Once the coordinator became stateless, we could do something interesting: run it anywhere, in any quantity, and let workers gossip leases peer-to-peer when load got heavy. The failure modes shrank from dozens to three.

The rest of the story is in the technical whitepaper, but the short version: we shipped, it works, and I'm genuinely nervous about the next bottleneck.

## What I wish I'd known

If you're about to embark on a similar project, here's what I'd tell a past version of me:

<ul>
  <li><strong>Start with the failure modes.</strong> Seriously. Before you draw a single happy-path diagram, list everything that can break — then design the system around that.</li>
  <li><strong>Write the operator runbook first.</strong> If you can't describe how an on-call engineer debugs a stuck worker at 3am, you don't have a design yet.</li>
  <li><strong>Benchmark the boring numbers.</strong> P99 latency is a vanity metric. Tail-of-tail latency (p99.9+) is where the real pain lives.</li>
</ul>

We'll be open-sourcing solveOS later this year once the API stops thrashing. If you want early access, the waitlist is live.
