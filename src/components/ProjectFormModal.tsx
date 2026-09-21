/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Sparkles, Check, Info, AlertCircle, Save, Plus } from 'lucide-react';
import { Project } from '../types';

interface ProjectFormModalProps {
  project?: Project | null;
  onClose: () => void;
  onSave: (project: Project) => void;
}

const TEMPLATE_SAMPLES = [
  {
    title: 'Horizon Quantum',
    subtitle: 'High-Fidelity Quantum Cryptography Suite',
    category: 'System' as const,
    description: 'An open-source security gateway orchestrating post-quantum TLS handshakes, randomized matrix key encryptions, and atomic secure pipelines.',
    longDescription: 'Horizon Quantum provides decentralized microservice environments with cutting-edge post-quantum cryptography algorithms. It executes rapid dual-phase packet verifications with zero state lag, utilizing WebAssembly kernels to process massive multi-tenant encryption matrices securely in the browser.',
    techStack: 'Rust, WebAssembly, TypeScript, Node.js, WebSockets',
    features: 'Multi-threaded WASM key negotiation, Quantum-safe lattice validation loops, Low-overhead hardware acceleration',
    github: 'https://github.com/Kamal-Hossain52625/horizon-quantum',
    liveDemo: '#',
    metrics: [
      { label: 'Throughput Overhead', value: '< 1.8ms' },
      { label: 'Cipher Strength', value: '8192-bit' },
      { label: 'Failover Rate', value: '0.001%' }
    ],
    caseStudy: {
      challenge: 'Traditional key exchanges were susceptible to predictive entropy analysis, causing high-priority transaction channels to experience security breaches under specialized load conditions.',
      solution: 'Developed an atomic multi-threaded lattice validation scheme running locally inside a sandboxed WebAssembly execution layer to randomize keys on every transaction frame.',
      results: 'Secured all critical application layers, lowered cryptographic handshaking overheads by 75%, and eliminated zero-day credential leaks successfully.'
    }
  },
  {
    title: 'Aether Analytics',
    subtitle: 'Dynamic Semantic Knowledge Map Graph',
    category: 'Full-stack' as const,
    description: 'A distributed vector embedding database search engine visualization linking high-dimensional clusters with interactive radial trees.',
    longDescription: 'Aether Analytics allows data scientists to search and map high-dimensional database structures cleanly in a collaborative workspace. Built with specialized radial embedding layouts, it renders thousands of interconnected database nodes with real-time semantic proximity indicators.',
    techStack: 'React, D3.js, FastAPI, PostgreSQL, Tailwind CSS',
    features: 'Interactive semantic search index, High-dimensional proximity layouts, Real-time cluster group sorting',
    github: 'https://github.com/Kamal-Hossain52625/aether-analytics',
    liveDemo: '#',
    metrics: [
      { label: 'Node Capacity', value: '25,000+' },
      { label: 'Search Latency', value: '14ms' },
      { label: 'Cluster Accuracy', value: '99.2%' }
    ],
    caseStudy: {
      challenge: 'Parsing dense neural vector clusters in client systems generated massive thread blockages, freeze states, and messy layouts that confused enterprise operators.',
      solution: 'Integrated spatial grouping algorithms and lazy-loaded nodes using canvas virtual viewports to show precise sub-clusters on demand.',
      results: 'Delivered intuitive searching capabilities, boosted load performance times by 9x, and improved operational productivity.'
    }
  }
];

export default function ProjectFormModal({ project, onClose, onSave }: ProjectFormModalProps) {
  const isEditing = Boolean(project);

  const [title, setTitle] = useState(project?.title || '');
  const [subtitle, setSubtitle] = useState(project?.subtitle || '');
  const [category, setCategory] = useState<'Full-stack' | 'Frontend' | 'System' | 'Creative'>(
    project?.category || 'Full-stack'
  );
  const [description, setDescription] = useState(project?.description || '');
  const [longDescription, setLongDescription] = useState(project?.longDescription || '');
  const [techStack, setTechStack] = useState(project?.techStack?.join(', ') || '');
  const [features, setFeatures] = useState(project?.features?.join(', ') || '');
  const [github, setGithub] = useState(project?.github || '');
  const [liveDemo, setLiveDemo] = useState(project?.liveDemo || '');

  // Metrics
  const [metric1Label, setMetric1Label] = useState(project?.metrics?.[0]?.label || 'Uptime');
  const [metric1Val, setMetric1Val] = useState(project?.metrics?.[0]?.value || '99.9%');
  const [metric2Label, setMetric2Label] = useState(project?.metrics?.[1]?.label || 'Throughput');
  const [metric2Val, setMetric2Val] = useState(project?.metrics?.[1]?.value || '10k/s');
  const [metric3Label, setMetric3Label] = useState(project?.metrics?.[2]?.label || 'Latency');
  const [metric3Val, setMetric3Val] = useState(project?.metrics?.[2]?.value || '< 5ms');

  // Case study
  const [challenge, setChallenge] = useState(project?.caseStudy?.challenge || '');
  const [solution, setSolution] = useState(project?.caseStudy?.solution || '');
  const [results, setResults] = useState(project?.caseStudy?.results?.join(', ') || '');

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const fillTemplate = () => {
    const randomTemplate = TEMPLATE_SAMPLES[Math.floor(Math.random() * TEMPLATE_SAMPLES.length)];
    setTitle(randomTemplate.title);
    setSubtitle(randomTemplate.subtitle);
    setCategory(randomTemplate.category);
    setDescription(randomTemplate.description);
    setLongDescription(randomTemplate.longDescription);
    setTechStack(randomTemplate.techStack);
    setFeatures(randomTemplate.features);
    setGithub(randomTemplate.github);
    setLiveDemo(randomTemplate.liveDemo);

    setMetric1Label(randomTemplate.metrics[0].label);
    setMetric1Val(randomTemplate.metrics[0].value);
    setMetric2Label(randomTemplate.metrics[1].label);
    setMetric2Val(randomTemplate.metrics[1].value);
    setMetric3Label(randomTemplate.metrics[2].label);
    setMetric3Val(randomTemplate.metrics[2].value);

    setChallenge(randomTemplate.caseStudy.challenge);
    setSolution(randomTemplate.caseStudy.solution);
    setResults(randomTemplate.caseStudy.results);
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!title.trim()) newErrors.title = 'Title is required';
    if (!subtitle.trim()) newErrors.subtitle = 'Subtitle is required';
    if (!description.trim()) newErrors.description = 'Short description is required';
    if (!longDescription.trim()) newErrors.longDescription = 'Detailed description is required';
    if (!techStack.trim()) newErrors.techStack = 'Tech stack is required';
    if (!challenge.trim()) newErrors.challenge = 'Challenge details are required';
    if (!solution.trim()) newErrors.solution = 'Solution details are required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const element = document.getElementById('project-form-container');
      if (element) element.scrollTop = 0;
      return;
    }

    const techArray = techStack.split(',').map((item) => item.trim()).filter(Boolean);
    const featuresArray = features.split(',').map((item) => item.trim()).filter(Boolean);
    const resultsArray = results.trim()
      ? results.split(',').map((item) => item.trim()).filter(Boolean)
      : ['Optimized network runtime latency', 'Maintained 99.9% uptime benchmark', 'Delivered zero downtime transition'];

    const savedProject: Project = {
      id: project?.id || 'custom-' + Date.now(),
      title,
      subtitle,
      description,
      longDescription,
      image: project?.image || 'interactive-custom',
      techStack: techArray,
      features: featuresArray.length > 0 ? featuresArray : ['Modular backend architecture', 'Automated optimization engines'],
      metrics: [
        { label: metric1Label || 'Throughput', value: metric1Val || 'Stable' },
        { label: metric2Label || 'Coverage', value: metric2Val || '95%' },
        { label: metric3Label || 'Load Time', value: metric3Val || '0.2s' },
      ],
      liveDemo: liveDemo.trim() || '#',
      github: github.trim() || 'https://github.com/Kamal-Hossain52625',
      category,
      caseStudy: {
        challenge,
        solution,
        results: resultsArray,
      },
    };

    onSave(savedProject);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/85 backdrop-blur-xl">
      <div className="absolute inset-0 cursor-zoom-out" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.3 }}
        id="project-form-container"
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#09090c] border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl z-10 no-scrollbar select-text text-white font-sans"
      >
        {/* Header Controls */}
        <div className="sticky top-0 flex justify-between items-center pb-4 border-b border-white/5 bg-gradient-to-b from-[#09090c] via-[#09090c] to-transparent z-20">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
            <span className="text-[10px] font-mono tracking-widest text-orange-500 font-extrabold uppercase">
              {isEditing ? `EDIT PROJECT // ${project?.title}` : 'ADD NEW PROJECT // PROTOCOL'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {!isEditing && (
              <button
                type="button"
                onClick={fillTemplate}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-400 font-mono text-[9px] font-extrabold tracking-wider rounded-xl transition-all cursor-pointer uppercase shadow-lg"
              >
                <Sparkles className="w-3 h-3" /> AUTOFILL SAMPLE
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 border border-white/10 bg-white/5 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-6">
          {Object.keys(errors).length > 0 && (
            <div className="flex items-center gap-2 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-400">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Please review required fields marked below.</span>
            </div>
          )}

          {/* Title and Category */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-[9px] font-mono font-bold tracking-widest text-white/40 uppercase">
                PROJECT TITLE *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Horizon Quantum"
                className={`w-full p-3 bg-white/5 border ${
                  errors.title ? 'border-rose-500/50' : 'border-white/10 focus:border-orange-500/40'
                } rounded-xl text-xs font-sans outline-none transition-all placeholder:text-white/20`}
              />
              {errors.title && <span className="text-[9px] font-mono text-rose-400">{errors.title}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-mono font-bold tracking-widest text-white/40 uppercase">
                CATEGORY
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-3 bg-zinc-950 border border-white/10 focus:border-orange-500/40 rounded-xl text-xs font-mono outline-none transition-all cursor-pointer text-white/80"
              >
                <option value="Full-stack">Full-stack</option>
                <option value="Frontend">Frontend</option>
                <option value="System">System</option>
                <option value="Creative">Creative</option>
              </select>
            </div>
          </div>

          {/* Subtitle */}
          <div className="flex flex-col gap-2">
            <label className="text-[9px] font-mono font-bold tracking-widest text-white/40 uppercase">
              SUBTITLE / ARCHITECTURAL FOCUS *
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="e.g. Next-Gen Cryptographic Middleware Engine"
              className={`w-full p-3 bg-white/5 border ${
                errors.subtitle ? 'border-rose-500/50' : 'border-white/10 focus:border-orange-500/40'
              } rounded-xl text-xs font-sans outline-none transition-all placeholder:text-white/20`}
            />
            {errors.subtitle && <span className="text-[9px] font-mono text-rose-400">{errors.subtitle}</span>}
          </div>

          {/* Short Description */}
          <div className="flex flex-col gap-2">
            <label className="text-[9px] font-mono font-bold tracking-widest text-white/40 uppercase">
              SHORT SUMMARY (TEASER) *
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. A secure reverse proxy gateway orchestrating post-quantum TLS verifications..."
              className={`w-full p-3 bg-white/5 border ${
                errors.description ? 'border-rose-500/50' : 'border-white/10 focus:border-orange-500/40'
              } rounded-xl text-xs font-sans outline-none transition-all placeholder:text-white/20 resize-none leading-relaxed`}
            />
            {errors.description && <span className="text-[9px] font-mono text-rose-400">{errors.description}</span>}
          </div>

          {/* Long Description */}
          <div className="flex flex-col gap-2">
            <label className="text-[9px] font-mono font-bold tracking-widest text-white/40 uppercase">
              DETAILED NARRATIVE DESCRIPTION *
            </label>
            <textarea
              rows={3}
              value={longDescription}
              onChange={(e) => setLongDescription(e.target.value)}
              placeholder="Describe system goals, design paradigms, and architectural layers..."
              className={`w-full p-3 bg-white/5 border ${
                errors.longDescription ? 'border-rose-500/50' : 'border-white/10 focus:border-orange-500/40'
              } rounded-xl text-xs font-sans outline-none transition-all placeholder:text-white/20 resize-none leading-relaxed`}
            />
            {errors.longDescription && <span className="text-[9px] font-mono text-rose-400">{errors.longDescription}</span>}
          </div>

          {/* Tech Stack and Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-mono font-bold tracking-widest text-white/40 uppercase">
                TECH STACK * (Comma separated)
              </label>
              <input
                type="text"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                placeholder="e.g. React, Rust, D3.js, WebSockets"
                className={`w-full p-3 bg-white/5 border ${
                  errors.techStack ? 'border-rose-500/50' : 'border-white/10 focus:border-orange-500/40'
                } rounded-xl text-xs font-sans outline-none transition-all placeholder:text-white/20`}
              />
              {errors.techStack && <span className="text-[9px] font-mono text-rose-400">{errors.techStack}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-mono font-bold tracking-widest text-white/40 uppercase">
                KEY FEATURES (Comma separated)
              </label>
              <input
                type="text"
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                placeholder="e.g. Atomic handshakes, 60fps canvas, Zero telemetry lag"
                className="w-full p-3 bg-white/5 border border-white/10 focus:border-orange-500/40 rounded-xl text-xs font-sans outline-none transition-all placeholder:text-white/20"
              />
            </div>
          </div>

          {/* URLs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-mono font-bold tracking-widest text-white/40 uppercase">
                GITHUB REPOSITORY URL
              </label>
              <input
                type="url"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full p-3 bg-white/5 border border-white/10 focus:border-orange-500/40 rounded-xl text-xs font-sans outline-none transition-all placeholder:text-white/20"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-mono font-bold tracking-widest text-white/40 uppercase">
                LIVE DEMO URL
              </label>
              <input
                type="text"
                value={liveDemo}
                onChange={(e) => setLiveDemo(e.target.value)}
                placeholder="e.g. https://... or #"
                className="w-full p-3 bg-white/5 border border-white/10 focus:border-orange-500/40 rounded-xl text-xs font-sans outline-none transition-all placeholder:text-white/20"
              />
            </div>
          </div>

          {/* Operational Metrics Grid */}
          <div className="flex flex-col gap-3 p-4 border border-white/5 bg-white/5 rounded-2xl">
            <span className="text-[9px] font-mono font-bold tracking-widest text-orange-500 uppercase flex items-center gap-1">
              <Info className="w-3.5 h-3.5" /> THREE SYSTEM PERFORMANCE METRICS
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-1">
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={metric1Label}
                  onChange={(e) => setMetric1Label(e.target.value)}
                  placeholder="Metric 1 Label (e.g. Latency)"
                  className="w-full p-2.5 bg-black/40 border border-white/5 focus:border-orange-500/40 rounded-xl text-xs font-mono outline-none text-white/80"
                />
                <input
                  type="text"
                  value={metric1Val}
                  onChange={(e) => setMetric1Val(e.target.value)}
                  placeholder="Metric 1 Value (e.g. < 2.5ms)"
                  className="w-full p-2.5 bg-black/40 border border-white/5 focus:border-orange-500/40 rounded-xl text-xs font-sans font-bold outline-none text-white"
                />
              </div>

              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={metric2Label}
                  onChange={(e) => setMetric2Label(e.target.value)}
                  placeholder="Metric 2 Label (e.g. Throughput)"
                  className="w-full p-2.5 bg-black/40 border border-white/5 focus:border-orange-500/40 rounded-xl text-xs font-mono outline-none text-white/80"
                />
                <input
                  type="text"
                  value={metric2Val}
                  onChange={(e) => setMetric2Val(e.target.value)}
                  placeholder="Metric 2 Value (e.g. 50k events/s)"
                  className="w-full p-2.5 bg-black/40 border border-white/5 focus:border-orange-500/40 rounded-xl text-xs font-sans font-bold outline-none text-white"
                />
              </div>

              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={metric3Label}
                  onChange={(e) => setMetric3Label(e.target.value)}
                  placeholder="Metric 3 Label (e.g. Uptime)"
                  className="w-full p-2.5 bg-black/40 border border-white/5 focus:border-orange-500/40 rounded-xl text-xs font-mono outline-none text-white/80"
                />
                <input
                  type="text"
                  value={metric3Val}
                  onChange={(e) => setMetric3Val(e.target.value)}
                  placeholder="Metric 3 Value (e.g. 99.99%)"
                  className="w-full p-2.5 bg-black/40 border border-white/5 focus:border-orange-500/40 rounded-xl text-xs font-sans font-bold outline-none text-white"
                />
              </div>
            </div>
          </div>

          {/* Case Study Details */}
          <div className="flex flex-col gap-4 p-4 border border-white/5 bg-white/5 rounded-2xl">
            <span className="text-[9px] font-mono font-bold tracking-widest text-orange-500 uppercase">
              CASE STUDY AUDIT DATA
            </span>

            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-mono font-bold tracking-widest text-white/30 uppercase">
                THE CHALLENGE BRIEF *
              </label>
              <textarea
                rows={2}
                value={challenge}
                onChange={(e) => setChallenge(e.target.value)}
                placeholder="e.g. Real-time rendering loops created thread blockage on low-end devices..."
                className={`w-full p-3 bg-black/40 border ${
                  errors.challenge ? 'border-rose-500/50' : 'border-white/5 focus:border-orange-500/40'
                } rounded-xl text-xs font-sans outline-none resize-none leading-relaxed`}
              />
              {errors.challenge && <span className="text-[9px] font-mono text-rose-400">{errors.challenge}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-mono font-bold tracking-widest text-white/30 uppercase">
                THE RESOLUTION / ARCHITECTURAL SOLUTION *
              </label>
              <textarea
                rows={2}
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                placeholder="e.g. Separated the calculation cycle from React's reconciliation engine using dedicated Web Workers..."
                className={`w-full p-3 bg-black/40 border ${
                  errors.solution ? 'border-rose-500/50' : 'border-white/5 focus:border-orange-500/40'
                } rounded-xl text-xs font-sans outline-none resize-none leading-relaxed`}
              />
              {errors.solution && <span className="text-[9px] font-mono text-rose-400">{errors.solution}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-mono font-bold tracking-widest text-white/30 uppercase">
                KEY MEASURABLE OUTCOMES (Comma separated)
              </label>
              <input
                type="text"
                value={results}
                onChange={(e) => setResults(e.target.value)}
                placeholder="e.g. Achieved 60 FPS, Reduced memory by 64%, Eliminated zero-day leaks"
                className="w-full p-3 bg-black/40 border border-white/5 focus:border-orange-500/40 rounded-xl text-xs font-sans outline-none placeholder:text-white/20"
              />
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t border-white/5 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 border border-white/10 hover:bg-white/5 rounded-xl font-mono text-[9px] font-extrabold tracking-widest transition-colors cursor-pointer uppercase"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 font-mono text-[9px] font-extrabold tracking-widest px-6 py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer uppercase shadow-xl"
            >
              {isEditing ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {isEditing ? 'SAVE PROJECT CHANGES' : 'CREATE NEW PROJECT'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
