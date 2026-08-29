import React, { useState, useEffect, useCallback } from 'react';
import {
  Building2, Layers, Users, Target, Ruler, UserPlus, ClipboardCheck, Send,
  LayoutDashboard, Plus, Pencil, Trash2, X, AlertTriangle, Loader2, Inbox
} from 'lucide-react';

/* ---------- PRISM Brain Mapping domain model ----------
   Grounded in prismbrainmapping.com: behaviour is measured across 8 dimensions,
   grouped into 4 colours each linked to a brain chemical system, and expressed
   through 3 distinct maps (Natural preference, Adapted preference, Overall pattern). */

const DIMENSIONS = [
  { key: 'Innovating', colour: 'green', chemical: 'Dopamine' },
  { key: 'Initiating', colour: 'green', chemical: 'Dopamine' },
  { key: 'Supporting', colour: 'blue', chemical: 'Estrogen' },
  { key: 'Co-ordinating', colour: 'blue', chemical: 'Estrogen' },
  { key: 'Focusing', colour: 'red', chemical: 'Testosterone' },
  { key: 'Delivering', colour: 'red', chemical: 'Testosterone' },
  { key: 'Finishing', colour: 'gold', chemical: 'Serotonin' },
  { key: 'Evaluating', colour: 'gold', chemical: 'Serotonin' },
];

const MAP_TYPES = ['Natural Preference', 'Adapted Preference', 'Overall Pattern'];

const REPORT_TYPES = ['Professional (Individual)', '360-Degree Feedback', 'Team Diagnostic', 'Career Explorer'];

const DOT = { green: 'bg-emerald-400', blue: 'bg-blue-400', red: 'bg-red-400', gold: 'bg-amber-400' };

function ColourDot({ colour }) {
  return <span className={`inline-block w-2 h-2 rounded-full shrink-0 ${DOT[colour] || 'bg-zinc-500'}`} />;
}

/* ---------- storage constants ---------- */

const STORAGE_KEYS = [
  'organizations', 'units', 'consultants', 'campaigns',
  'benchmarks', 'enrollments', 'evaluations', 'publications'
];

const EMPTY = STORAGE_KEYS.reduce((acc, k) => ({ ...acc, [k]: [] }), {});

/* Campaign/enrollment workflow colours are deliberately kept OUT of the
   green/blue/red/gold set, which is reserved everywhere for PRISM's actual
   behavioural colour model. */
const STATUS_COLORS = {
  Planning: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
  Active: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
  Evaluation: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
  Completed: 'bg-teal-500/15 text-teal-300 border-teal-500/30',
  Published: 'bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30',
  Enrolled: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
  'In Progress': 'bg-violet-500/15 text-violet-300 border-violet-500/30',
};

const STATUS_BAR = {
  Planning: 'bg-slate-400', Active: 'bg-sky-400', Evaluation: 'bg-violet-400',
  Completed: 'bg-teal-400', Published: 'bg-fuchsia-400',
};

const ACCENT_TEXT = {
  slate: 'text-slate-400', sky: 'text-sky-400', violet: 'text-violet-400', fuchsia: 'text-fuchsia-400',
  indigo: 'text-indigo-400', teal: 'text-teal-400', cyan: 'text-cyan-400', pink: 'text-pink-400',
};

const NAV = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'organizations', label: 'Organizations', icon: Building2 },
  { key: 'units', label: 'Org Units', icon: Layers },
  { key: 'consultants', label: 'Practitioners', icon: Users },
  { key: 'campaigns', label: 'Campaigns', icon: Target },
  { key: 'benchmarks', label: 'PRISM Benchmarks', icon: Ruler },
  { key: 'enrollments', label: 'Enrollments', icon: UserPlus },
  { key: 'evaluations', label: 'Evaluations', icon: ClipboardCheck },
  { key: 'publish', label: 'Publish Results', icon: Send },
];

const DEPENDENTS = {
  organizations: [{ key: 'units', field: 'orgId' }, { key: 'campaigns', field: 'orgId' }],
  units: [{ key: 'campaigns', field: 'unitId' }],
  consultants: [{ key: 'campaigns', field: 'consultantId' }],
  campaigns: [
    { key: 'benchmarks', field: 'campaignId' }, { key: 'enrollments', field: 'campaignId' },
    { key: 'evaluations', field: 'campaignId' }, { key: 'publications', field: 'campaignId' },
  ],
  benchmarks: [{ key: 'evaluations', field: 'benchmarkId' }],
  enrollments: [{ key: 'evaluations', field: 'enrollmentId' }],
};

const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);

/* ---------- helpers ---------- */

function computeCampaignResults(data, campaignId) {
  const benchmarks = data.benchmarks.filter(b => b.campaignId === campaignId);
  const evaluations = data.evaluations.filter(e => e.campaignId === campaignId);
  const enrollments = data.enrollments.filter(e => e.campaignId === campaignId);

  const benchmarkResults = benchmarks.map(b => {
    const evals = evaluations.filter(e => e.benchmarkId === b.id);
    const avgActual = evals.length
      ? evals.reduce((s, e) => s + Number(e.actualIntensity || 0), 0) / evals.length
      : null;
    const pass = avgActual !== null && Number(b.targetIntensity) > 0 && avgActual >= Number(b.targetIntensity);
    return { ...b, avgActual, pass, sampleSize: evals.length };
  });

  const avgScore = evaluations.length
    ? Math.round(evaluations.reduce((s, e) => s + Number(e.score || 0), 0) / evaluations.length)
    : null;

  const completed = enrollments.filter(e => e.status === 'Completed').length;
  const completionRate = enrollments.length ? Math.round((completed / enrollments.length) * 100) : 0;

  return { benchmarkResults, avgScore, completionRate, totalEnrolled: enrollments.length };
}

function buildConfig(data) {
  const orgOptions = data.organizations.map(o => ({ value: o.id, label: o.name }));
  const consultantOptions = data.consultants.map(c => ({ value: c.id, label: c.name }));
  const campaignOptions = data.campaigns.map(c => ({ value: c.id, label: c.name }));

  return {
    organizations: {
      label: 'Organizations', singular: 'Organization', icon: Building2,
      empty: 'No organizations yet. Add the first client organization to get started.',
      columns: [
        { key: 'name', label: 'Organization' },
        { key: 'industry', label: 'Industry' },
        { key: 'contactEmail', label: 'Contact' },
      ],
      fields: [
        { key: 'name', label: 'Organization name', type: 'text', required: true, placeholder: 'Acme Corp' },
        { key: 'industry', label: 'Industry', type: 'text', placeholder: 'Manufacturing' },
        { key: 'contactEmail', label: 'Contact email', type: 'email', placeholder: 'hr@acme.com' },
        { key: 'contactPhone', label: 'Contact phone', type: 'text', placeholder: '+1 555 0100' },
        { key: 'address', label: 'Address', type: 'textarea' },
      ],
    },
    units: {
      label: 'Organization Units', singular: 'Unit', icon: Layers,
      empty: 'No units yet. Create units like HR or Engineering under an organization.',
      columns: [
        { key: 'name', label: 'Unit' },
        { key: 'orgId', label: 'Organization', render: v => orgOptions.find(o => o.value === v)?.label || '—' },
        { key: 'description', label: 'Description' },
      ],
      fields: [
        { key: 'orgId', label: 'Organization', type: 'select', required: true, getOptions: () => orgOptions },
        { key: 'name', label: 'Unit name', type: 'text', required: true, placeholder: 'HR' },
        { key: 'description', label: 'Description', type: 'textarea' },
      ],
    },
    consultants: {
      label: 'PRISM Practitioners', singular: 'Practitioner', icon: Users,
      empty: 'No certified practitioners yet. Add the practitioners who will administer and interpret PRISM assessments.',
      columns: [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'accreditationNumber', label: 'Accreditation' },
        { key: 'specialization', label: 'Specialization' },
      ],
      fields: [
        { key: 'name', label: 'Full name', type: 'text', required: true, placeholder: 'Jordan Reyes' },
        { key: 'email', label: 'Email', type: 'email', required: true, placeholder: 'jordan@prism.io' },
        { key: 'phone', label: 'Phone', type: 'text', placeholder: '+1 555 0100' },
        { key: 'accreditationNumber', label: 'PRISM accreditation number', type: 'text', placeholder: 'PRISM-UK-00123' },
        { key: 'specialization', label: 'Specialization', type: 'text', placeholder: 'Team Development, 360 Feedback' },
      ],
    },
    campaigns: {
      label: 'Campaigns', singular: 'Campaign', icon: Target,
      empty: 'No campaigns yet. Launch a PRISM implementation for a client organization.',
      columns: [
        { key: 'name', label: 'Campaign' },
        { key: 'orgId', label: 'Organization', render: v => orgOptions.find(o => o.value === v)?.label || '—' },
        { key: 'unitId', label: 'Unit', render: v => data.units.find(u => u.id === v)?.name || '—' },
        { key: 'consultantId', label: 'Practitioner', render: v => consultantOptions.find(o => o.value === v)?.label || '—' },
        { key: 'reportType', label: 'Report' },
        { key: 'status', label: 'Status', badge: true },
      ],
      fields: [
        { key: 'name', label: 'Campaign name', type: 'text', required: true, placeholder: 'Q1 Engagement PRISM' },
        { key: 'orgId', label: 'Organization', type: 'select', required: true, getOptions: () => orgOptions },
        {
          key: 'unitId', label: 'Unit', type: 'select', dependsOn: 'orgId',
          getOptions: form => data.units.filter(u => u.orgId === form.orgId).map(u => ({ value: u.id, label: u.name })),
        },
        { key: 'consultantId', label: 'PRISM Practitioner', type: 'select', getOptions: () => consultantOptions },
        {
          key: 'reportType', label: 'PRISM report type', type: 'select', default: 'Professional (Individual)',
          getOptions: () => REPORT_TYPES.map(s => ({ value: s, label: s })),
        },
        {
          key: 'status', label: 'Status', type: 'select', default: 'Planning',
          getOptions: () => ['Planning', 'Active', 'Evaluation', 'Completed', 'Published'].map(s => ({ value: s, label: s })),
        },
        { key: 'startDate', label: 'Start date', type: 'date' },
        { key: 'endDate', label: 'End date', type: 'date' },
        { key: 'description', label: 'Description', type: 'textarea' },
      ],
    },
    benchmarks: {
      label: 'PRISM Benchmarks', singular: 'Benchmark', icon: Ruler,
      empty: 'No benchmarks yet. Set the target intensity for the PRISM dimensions this campaign or role requires.',
      columns: [
        {
          key: 'dimension', label: 'Dimension',
          render: v => {
            const d = DIMENSIONS.find(x => x.key === v);
            return <span className="inline-flex items-center gap-2">{d && <ColourDot colour={d.colour} />}{v || '—'}</span>;
          },
        },
        { key: 'campaignId', label: 'Campaign', render: v => campaignOptions.find(o => o.value === v)?.label || '—' },
        { key: 'targetIntensity', label: 'Target', render: v => `${v} / 10` },
      ],
      fields: [
        { key: 'campaignId', label: 'Campaign', type: 'select', required: true, getOptions: () => campaignOptions },
        {
          key: 'dimension', label: 'PRISM dimension', type: 'select', required: true,
          getOptions: () => DIMENSIONS.map(d => ({ value: d.key, label: `${d.key} (${d.colour[0].toUpperCase()}${d.colour.slice(1)})` })),
        },
        { key: 'targetIntensity', label: 'Target intensity (1–10)', type: 'number', required: true, placeholder: '7' },
        { key: 'description', label: 'Notes', type: 'textarea', placeholder: 'Why this level matters for the role' },
      ],
    },
    enrollments: {
      label: 'Enrollments', singular: 'Enrollment', icon: UserPlus,
      empty: 'No employees enrolled yet. Enroll employees into a campaign.',
      columns: [
        { key: 'employeeName', label: 'Employee' },
        { key: 'campaignId', label: 'Campaign', render: v => campaignOptions.find(o => o.value === v)?.label || '—' },
        { key: 'department', label: 'Department' },
        { key: 'status', label: 'Status', badge: true },
      ],
      fields: [
        { key: 'campaignId', label: 'Campaign', type: 'select', required: true, getOptions: () => campaignOptions },
        { key: 'employeeName', label: 'Employee name', type: 'text', required: true, placeholder: 'Sam Patel' },
        { key: 'employeeEmail', label: 'Employee email', type: 'email', placeholder: 'sam@acme.com' },
        { key: 'department', label: 'Department', type: 'text', placeholder: 'HR' },
        {
          key: 'status', label: 'Status', type: 'select', default: 'Enrolled',
          getOptions: () => ['Enrolled', 'In Progress', 'Completed'].map(s => ({ value: s, label: s })),
        },
      ],
    },
    evaluations: {
      label: 'Evaluations', singular: 'Evaluation', icon: ClipboardCheck,
      empty: 'No evaluation entries yet. Score enrolled employees against PRISM dimension benchmarks.',
      columns: [
        { key: 'campaignId', label: 'Campaign', render: v => campaignOptions.find(o => o.value === v)?.label || '—' },
        { key: 'enrollmentId', label: 'Employee', render: v => data.enrollments.find(e => e.id === v)?.employeeName || '—' },
        { key: 'benchmarkId', label: 'Dimension', render: v => data.benchmarks.find(b => b.id === v)?.dimension || '—' },
        { key: 'mapType', label: 'Map' },
        { key: 'actualIntensity', label: 'Actual' },
        { key: 'score', label: 'Score' },
      ],
      fields: [
        { key: 'campaignId', label: 'Campaign', type: 'select', required: true, getOptions: () => campaignOptions },
        {
          key: 'enrollmentId', label: 'Employee', type: 'select', required: true, dependsOn: 'campaignId',
          getOptions: form => data.enrollments.filter(e => e.campaignId === form.campaignId).map(e => ({ value: e.id, label: e.employeeName })),
        },
        {
          key: 'benchmarkId', label: 'PRISM dimension', type: 'select', required: true, dependsOn: 'campaignId',
          getOptions: form => data.benchmarks.filter(b => b.campaignId === form.campaignId).map(b => ({ value: b.id, label: b.dimension })),
        },
        {
          key: 'mapType', label: 'Behaviour map', type: 'select', default: 'Overall Pattern',
          getOptions: () => MAP_TYPES.map(s => ({ value: s, label: s })),
        },
        { key: 'actualIntensity', label: 'Actual intensity (1–10)', type: 'number', required: true, placeholder: '6' },
        { key: 'score', label: 'Alignment score (0–100)', type: 'number', placeholder: '82' },
        { key: 'notes', label: 'Notes', type: 'textarea' },
      ],
    },
  };
}

/* ---------- small shared components ---------- */

function SpectrumBar({ thin }) {
  return (
    <div className={`flex ${thin ? 'h-1 mt-3 w-24' : 'h-1.5'} rounded-full overflow-hidden`}>
      <div className="flex-1 bg-emerald-400" />
      <div className="flex-1 bg-blue-400" />
      <div className="flex-1 bg-amber-400" />
      <div className="flex-1 bg-red-400" />
    </div>
  );
}

function Badge({ status }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${STATUS_COLORS[status] || 'bg-zinc-500/15 text-zinc-300 border-zinc-500/30'}`}>
      {status || '—'}
    </span>
  );
}

function EmptyState({ icon: Icon = Inbox, text }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-zinc-800 rounded-xl">
      <Icon size={28} className="text-zinc-600 mb-3" />
      <p className="text-zinc-500 text-sm max-w-sm">{text}</p>
    </div>
  );
}

function DataTable({ config, rows, onEdit, onDelete }) {
  if (!rows.length) return <EmptyState icon={config.icon} text={config.empty} />;
  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-zinc-900/60 text-zinc-400 text-left">
            {config.columns.map(c => <th key={c.key} className="px-4 py-3 font-medium whitespace-nowrap">{c.label}</th>)}
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {rows.map(row => (
            <tr key={row.id} className="hover:bg-zinc-900/40 transition-colors">
              {config.columns.map(c => (
                <td key={c.key} className="px-4 py-3 text-zinc-200 max-w-xs truncate">
                  {c.badge ? <Badge status={row[c.key]} /> : (c.render ? c.render(row[c.key], row) : (row[c.key] || '—'))}
                </td>
              ))}
              <td className="px-4 py-3 text-right whitespace-nowrap">
                <button onClick={() => onEdit(row)} className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 mr-1">
                  <Pencil size={15} />
                </button>
                <button onClick={() => onDelete(row)} className="p-1.5 rounded-lg hover:bg-rose-500/10 text-zinc-400 hover:text-rose-400">
                  <Trash2 size={15} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FormModal({ config, record, onSave, onClose }) {
  const [form, setForm] = useState(() => {
    const base = {};
    config.fields.forEach(f => { base[f.key] = record?.[f.key] ?? f.default ?? ''; });
    return base;
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const depFields = config.fields.filter(f => f.dependsOn);
    if (!depFields.length) return;
    setForm(prev => {
      let changed = false;
      const next = { ...prev };
      depFields.forEach(f => {
        const opts = f.getOptions(prev);
        if (prev[f.key] && !opts.some(o => o.value === prev[f.key])) {
          next[f.key] = '';
          changed = true;
        }
      });
      return changed ? next : prev;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.fields.map(f => f.dependsOn ? form[f.dependsOn] : null).join('|')]);

  const setField = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  function handleSubmit(e) {
    e.preventDefault();
    const errs = {};
    config.fields.forEach(f => { if (f.required && !form[f.key]) errs[f.key] = 'Required'; });
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSave(form);
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 sticky top-0 bg-zinc-950">
          <h3 className="font-semibold text-zinc-50">{record ? 'Edit ' : 'Add '}{config.singular}</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {config.fields.map(f => (
            <div key={f.key} className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide">
                {f.label}{f.required && <span className="text-rose-400"> *</span>}
              </label>
              {f.type === 'textarea' ? (
                <textarea
                  rows={3}
                  value={form[f.key]}
                  placeholder={f.placeholder}
                  onChange={e => setField(f.key, e.target.value)}
                  className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500"
                />
              ) : f.type === 'select' ? (
                <select
                  value={form[f.key]}
                  onChange={e => setField(f.key, e.target.value)}
                  className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500"
                >
                  <option value="">Select…</option>
                  {f.getOptions(form).map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              ) : (
                <input
                  type={f.type}
                  value={form[f.key]}
                  placeholder={f.placeholder}
                  onChange={e => setField(f.key, e.target.value)}
                  className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500"
                />
              )}
              {errors[f.key] && <p className="text-xs text-rose-400">{errors[f.key]}</p>}
            </div>
          ))}
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-3.5 py-2 rounded-lg text-sm text-zinc-300 hover:bg-zinc-800">Cancel</button>
            <button type="submit" className="px-3.5 py-2 rounded-lg text-sm bg-violet-500 hover:bg-violet-400 text-white font-medium">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-w-sm w-full">
        <div className="flex items-center gap-3 mb-3 text-rose-400">
          <AlertTriangle size={20} />
          <h3 className="font-semibold text-zinc-100">Confirm</h3>
        </div>
        <p className="text-sm text-zinc-400 mb-5">{message}</p>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-3 py-1.5 rounded-lg text-sm text-zinc-300 hover:bg-zinc-800">Cancel</button>
          <button onClick={onConfirm} className="px-3 py-1.5 rounded-lg text-sm bg-rose-500/90 hover:bg-rose-500 text-white font-medium">Confirm</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- sections ---------- */

function Sidebar({ section, setSection, onReset }) {
  return (
    <aside className="w-60 shrink-0 border-r border-zinc-900 bg-zinc-950/80 p-5 flex flex-col gap-6 sticky top-0 h-screen">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-emerald-400 via-blue-400 to-red-400 flex items-center justify-center">
            <span className="text-[10px] font-bold text-zinc-950">P</span>
          </div>
          <span className="font-semibold tracking-tight text-zinc-50">PRISM</span>
        </div>
        <p className="text-[11px] text-zinc-500 pl-9 -mt-1">Implementation manager</p>
      </div>
      <SpectrumBar />
      <nav className="flex-1 space-y-1 overflow-y-auto">
        {NAV.map(item => {
          const Icon = item.icon;
          const active = section === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setSection(item.key)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors border-l-2 ${
                active ? 'bg-zinc-900 text-zinc-50 border-violet-400' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60 border-transparent'
              }`}
            >
              <Icon size={16} />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="space-y-2">
        <p className="text-[10px] text-zinc-600 leading-relaxed">Modeled on the PRISM Brain Mapping methodology.</p>
        <button onClick={onReset} className="text-[11px] text-zinc-600 hover:text-rose-400 underline underline-offset-2 text-left">
          Reset all data
        </button>
      </div>
    </aside>
  );
}

function Overview({ data, setSection }) {
  const stats = [
    { key: 'organizations', label: 'Organizations', icon: Building2, accent: 'slate' },
    { key: 'units', label: 'Org Units', icon: Layers, accent: 'sky' },
    { key: 'consultants', label: 'Practitioners', icon: Users, accent: 'violet' },
    { key: 'campaigns', label: 'Campaigns', icon: Target, accent: 'fuchsia' },
    { key: 'benchmarks', label: 'PRISM Benchmarks', icon: Ruler, accent: 'indigo' },
    { key: 'enrollments', label: 'Enrollments', icon: UserPlus, accent: 'teal' },
    { key: 'evaluations', label: 'Evaluations', icon: ClipboardCheck, accent: 'cyan' },
    { key: 'publications', label: 'Published Reports', icon: Send, accent: 'pink' },
  ];
  const statusCounts = ['Planning', 'Active', 'Evaluation', 'Completed', 'Published'].map(s => ({
    status: s, count: data.campaigns.filter(c => c.status === s).length,
  }));
  const maxCount = Math.max(1, ...statusCounts.map(s => s.count));

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-widest text-zinc-500 mb-2">PRISM control center</p>
        <h1 className="text-2xl font-semibold text-zinc-50 mb-3">Behavioural preference, mapped in four colours and eight dimensions</h1>
        <SpectrumBar />
        <p className="text-xs text-zinc-500 mt-2">
          Green · Blue · Gold · Red — the four PRISM behavioural colours, each linked to a brain chemical system (dopamine, estrogen, serotonin, testosterone).
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(s => (
          <button
            key={s.key}
            onClick={() => setSection(s.key === 'publications' ? 'publish' : s.key)}
            className="text-left bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-colors"
          >
            <s.icon size={18} className={`mb-3 ${ACCENT_TEXT[s.accent]}`} />
            <p className="text-2xl font-semibold text-zinc-50 tabular-nums">{data[s.key]?.length ?? 0}</p>
            <p className="text-xs text-zinc-500 mt-1">{s.label}</p>
          </button>
        ))}
      </div>
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5">
        <h2 className="text-sm font-medium text-zinc-300 mb-4">Campaign status distribution</h2>
        {data.campaigns.length === 0 ? (
          <p className="text-sm text-zinc-500">No campaigns yet.</p>
        ) : (
          <div className="space-y-3">
            {statusCounts.map(s => (
              <div key={s.status} className="flex items-center gap-3">
                <span className="w-24 text-xs text-zinc-400">{s.status}</span>
                <div className="flex-1 h-2 rounded-full bg-zinc-800 overflow-hidden">
                  <div className={`h-full ${STATUS_BAR[s.status]}`} style={{ width: `${(s.count / maxCount) * 100}%` }} />
                </div>
                <span className="w-6 text-xs text-zinc-500 text-right tabular-nums">{s.count}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SectionView({ entityKey, config, data, openModal, requestDelete }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-zinc-50">{config.label}</h1>
          <SpectrumBar thin />
        </div>
        <button
          onClick={() => openModal(entityKey)}
          className="inline-flex items-center gap-1.5 bg-violet-500 hover:bg-violet-400 text-white text-sm font-medium px-3.5 py-2 rounded-lg transition-colors"
        >
          <Plus size={16} /> Add {config.singular}
        </button>
      </div>
      <DataTable
        config={config}
        rows={data[entityKey]}
        onEdit={r => openModal(entityKey, r)}
        onDelete={r => requestDelete(entityKey, r, config.singular.toLowerCase())}
      />
    </div>
  );
}

function EvaluationsSection({ data, config, openModal, requestDelete }) {
  const [selectedCampaign, setSelectedCampaign] = useState('');

  useEffect(() => {
    if (!selectedCampaign && data.campaigns.length) setSelectedCampaign(data.campaigns[0].id);
    if (selectedCampaign && !data.campaigns.some(c => c.id === selectedCampaign)) {
      setSelectedCampaign(data.campaigns[0]?.id || '');
    }
    // eslint-disable-next-line
  }, [data.campaigns]);

  const results = selectedCampaign ? computeCampaignResults(data, selectedCampaign) : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-zinc-50">Evaluations</h1>
        <SpectrumBar thin />
      </div>

      <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-1 gap-3 flex-wrap">
          <h2 className="text-sm font-medium text-zinc-300">Evaluate campaign results</h2>
          <select
            value={selectedCampaign}
            onChange={e => setSelectedCampaign(e.target.value)}
            className="rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
          >
            {data.campaigns.length === 0 && <option value="">No campaigns yet</option>}
            {data.campaigns.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <p className="text-xs text-zinc-500 mb-4">Average actual intensity per PRISM dimension against this campaign's benchmark, across all logged Natural, Adapted, and Overall entries.</p>

        {results && results.benchmarkResults.length ? (
          <div className="space-y-3">
            {results.benchmarkResults.map(b => {
              const dim = DIMENSIONS.find(d => d.key === b.dimension);
              return (
                <div key={b.id} className="flex items-center gap-3">
                  <span className="w-40 flex items-center gap-2 text-xs text-zinc-400 truncate" title={b.dimension}>
                    {dim && <ColourDot colour={dim.colour} />}{b.dimension}
                  </span>
                  <div className="flex-1 h-2 rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className={`h-full ${b.pass ? 'bg-emerald-400' : 'bg-amber-400'}`}
                      style={{ width: `${b.avgActual !== null ? Math.min(100, (b.avgActual / 10) * 100) : 0}%` }}
                    />
                  </div>
                  <span className="w-32 text-xs text-zinc-500 text-right tabular-nums">
                    {b.avgActual !== null ? `${b.avgActual.toFixed(1)} / 10 (target ${b.targetIntensity})` : 'No data yet'}
                  </span>
                </div>
              );
            })}
            <div className="flex gap-6 pt-3 text-xs text-zinc-400 border-t border-zinc-800 mt-3">
              <span>Avg score: <span className="text-zinc-100 font-medium">{results.avgScore ?? '—'}</span></span>
              <span>Completion: <span className="text-zinc-100 font-medium">{results.completionRate}%</span> ({results.totalEnrolled} enrolled)</span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-zinc-500">Add PRISM benchmarks and enrollments to this campaign, then log evaluation entries below to see results here.</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-zinc-300">Evaluation entries</h2>
        <button
          onClick={() => openModal('evaluations')}
          className="inline-flex items-center gap-1.5 bg-violet-500 hover:bg-violet-400 text-white text-sm font-medium px-3.5 py-2 rounded-lg transition-colors"
        >
          <Plus size={16} /> Add Evaluation
        </button>
      </div>
      <DataTable
        config={config}
        rows={data.evaluations}
        onEdit={r => openModal('evaluations', r)}
        onDelete={r => requestDelete('evaluations', r, 'evaluation entry')}
      />
    </div>
  );
}

function PublishSection({ data, addRecord, updateRecord, deleteRecord }) {
  const [expandedId, setExpandedId] = useState(null);

  function handlePublish(campaign) {
    const results = computeCampaignResults(data, campaign.id);
    addRecord('publications', {
      campaignId: campaign.id,
      publishedAt: new Date().toISOString(),
      avgScore: results.avgScore,
      completionRate: results.completionRate,
      totalEnrolled: results.totalEnrolled,
      benchmarkSnapshot: results.benchmarkResults.map(b => ({
        dimension: b.dimension,
        colour: (DIMENSIONS.find(d => d.key === b.dimension) || {}).colour,
        targetIntensity: b.targetIntensity, avgActual: b.avgActual, pass: b.pass,
      })),
    });
    updateRecord('campaigns', campaign.id, { status: 'Published' });
  }

  function handleUnpublish(campaign) {
    const pub = data.publications.find(p => p.campaignId === campaign.id);
    if (pub) deleteRecord('publications', pub.id);
    updateRecord('campaigns', campaign.id, { status: 'Completed' });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-zinc-50">Publish Results</h1>
        <SpectrumBar thin />
        <p className="text-sm text-zinc-500 mt-3">Share finalized PRISM campaign results with the client organization's HR team.</p>
      </div>

      {data.campaigns.length === 0 ? (
        <EmptyState icon={Send} text="No campaigns yet. Create a campaign to publish results once it's evaluated." />
      ) : (
        <div className="space-y-4">
          {data.campaigns.map(c => {
            const org = data.organizations.find(o => o.id === c.orgId);
            const unit = data.units.find(u => u.id === c.unitId);
            const results = computeCampaignResults(data, c.id);
            const pub = data.publications.find(p => p.campaignId === c.id);
            const hasEvaluations = data.evaluations.some(e => e.campaignId === c.id);
            const expanded = expandedId === c.id;

            return (
              <div key={c.id} className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-zinc-100">{c.name}</h3>
                      <Badge status={c.status} />
                    </div>
                    <p className="text-xs text-zinc-500">
                      {org?.name || 'No organization'}{unit ? ` · ${unit.name}` : ''}{c.reportType ? ` · ${c.reportType}` : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-zinc-400">
                    <span>Avg score: <span className="text-zinc-100 font-medium">{results.avgScore ?? '—'}</span></span>
                    <span>Completion: <span className="text-zinc-100 font-medium">{results.completionRate}%</span></span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 flex-wrap">
                  {c.status === 'Published' && pub ? (
                    <>
                      <span className="text-xs text-emerald-400">Published {new Date(pub.publishedAt).toLocaleDateString()} to {org?.name || 'client'} HR</span>
                      <button
                        onClick={() => setExpandedId(expanded ? null : c.id)}
                        className="ml-auto px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-300 hover:bg-zinc-800 border border-zinc-800"
                      >
                        {expanded ? 'Hide report' : 'View client report'}
                      </button>
                      <button
                        onClick={() => handleUnpublish(c)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium text-rose-400 hover:bg-rose-500/10 border border-rose-900/40"
                      >
                        Unpublish
                      </button>
                    </>
                  ) : (
                    <button
                      disabled={!hasEvaluations}
                      onClick={() => handlePublish(c)}
                      title={!hasEvaluations ? 'Add evaluation entries before publishing' : ''}
                      className={`ml-auto px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                        hasEvaluations ? 'bg-violet-500 hover:bg-violet-400 text-white' : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                      }`}
                    >
                      <span className="inline-flex items-center gap-1.5"><Send size={14} /> Publish results to client HR</span>
                    </button>
                  )}
                </div>

                {expanded && pub && (
                  <div className="mt-5 pt-5 border-t border-zinc-800">
                    <p className="text-xs uppercase tracking-widest text-zinc-500 mb-1">PRISM results report</p>
                    <p className="text-sm text-zinc-300 mb-4">Shared with {org?.name || 'client organization'} HR{unit ? ` · ${unit.name}` : ''}</p>
                    {pub.benchmarkSnapshot.length ? (
                      <div className="space-y-2">
                        {pub.benchmarkSnapshot.map((b, i) => (
                          <div key={i} className="flex items-center justify-between text-sm border-b border-zinc-800/60 py-1.5">
                            <span className="text-zinc-300 flex items-center gap-2">
                              {b.colour && <ColourDot colour={b.colour} />}{b.dimension}
                            </span>
                            <span className="text-zinc-500 tabular-nums">
                              {b.avgActual !== null ? b.avgActual.toFixed(1) : '—'} / 10 (target {b.targetIntensity})
                              <span className={`ml-2 ${b.pass ? 'text-emerald-400' : 'text-amber-400'}`}>{b.pass ? 'On target' : 'Below target'}</span>
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : <p className="text-sm text-zinc-500">No benchmarks were recorded for this campaign.</p>}
                    <div className="flex gap-6 pt-3 text-xs text-zinc-400">
                      <span>Overall score: <span className="text-zinc-100 font-medium">{pub.avgScore ?? '—'}</span></span>
                      <span>Completion rate: <span className="text-zinc-100 font-medium">{pub.completionRate}%</span> ({pub.totalEnrolled} enrolled)</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ---------- app ---------- */

export default function App() {
  const [data, setData] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState('overview');
  const [modal, setModal] = useState(null);
  const [confirm, setConfirm] = useState(null);

  useEffect(() => {
    (async () => {
      const loaded = {};
      for (const key of STORAGE_KEYS) {
        try {
          const res = await window.storage.get(key, false);
          loaded[key] = res ? JSON.parse(res.value) : [];
        } catch (e) {
          loaded[key] = [];
        }
      }
      setData({ ...EMPTY, ...loaded });
      setLoading(false);
    })();
  }, []);

  const persist = useCallback(async (key, arr) => {
    try {
      await window.storage.set(key, JSON.stringify(arr), false);
    } catch (e) {
      console.error('Storage failed', e);
    }
  }, []);

  const addRecord = useCallback((key, record) => {
    setData(prev => {
      const nextArr = [...prev[key], { ...record, id: uid(), createdAt: new Date().toISOString() }];
      persist(key, nextArr);
      return { ...prev, [key]: nextArr };
    });
  }, [persist]);

  const updateRecord = useCallback((key, id, updates) => {
    setData(prev => {
      const nextArr = prev[key].map(r => r.id === id ? { ...r, ...updates } : r);
      persist(key, nextArr);
      return { ...prev, [key]: nextArr };
    });
  }, [persist]);

  const deleteRecord = useCallback((key, id) => {
    setData(prev => {
      const nextArr = prev[key].filter(r => r.id !== id);
      persist(key, nextArr);
      return { ...prev, [key]: nextArr };
    });
  }, [persist]);

  const openModal = (entityKey, record = null) => setModal({ entityKey, record });

  const handleModalSave = (form) => {
    const config = buildConfig(data)[modal.entityKey];
    const processed = { ...form };
    config.fields.forEach(f => {
      if (f.type === 'number' && processed[f.key] !== '') processed[f.key] = Number(processed[f.key]);
    });
    if (modal.record) updateRecord(modal.entityKey, modal.record.id, processed);
    else addRecord(modal.entityKey, processed);
    setModal(null);
  };

  const requestDelete = (entityKey, record, label) => {
    const deps = DEPENDENTS[entityKey] || [];
    const counts = deps
      .map(d => ({ ...d, count: data[d.key].filter(r => r[d.field] === record.id).length }))
      .filter(d => d.count > 0);
    const message = counts.length
      ? `This ${label} has related records (${counts.map(c => `${c.count} ${c.key}`).join(', ')}) that reference it. Delete anyway?`
      : `Delete this ${label}? This can't be undone.`;
    setConfirm({ message, onConfirm: () => { deleteRecord(entityKey, record.id); setConfirm(null); } });
  };

  const resetAll = async () => {
    for (const key of STORAGE_KEYS) {
      try { await window.storage.delete(key, false); } catch (e) { /* ignore missing key */ }
    }
    setData(EMPTY);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader2 className="animate-spin text-violet-400" size={28} />
      </div>
    );
  }

  const CONFIG = buildConfig(data);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex">
      <Sidebar
        section={section}
        setSection={setSection}
        onReset={() => setConfirm({
          message: 'This will permanently delete all organizations, campaigns, and related data. Continue?',
          onConfirm: async () => { await resetAll(); setConfirm(null); },
        })}
      />
      <main className="flex-1 p-8 max-w-5xl mx-auto w-full">
        {section === 'overview' && <Overview data={data} setSection={setSection} />}
        {['organizations', 'units', 'consultants', 'campaigns', 'benchmarks', 'enrollments'].includes(section) && (
          <SectionView entityKey={section} config={CONFIG[section]} data={data} openModal={openModal} requestDelete={requestDelete} />
        )}
        {section === 'evaluations' && (
          <EvaluationsSection data={data} config={CONFIG.evaluations} openModal={openModal} requestDelete={requestDelete} />
        )}
        {section === 'publish' && (
          <PublishSection data={data} addRecord={addRecord} updateRecord={updateRecord} deleteRecord={deleteRecord} />
        )}
      </main>

      {modal && (
        <FormModal
          config={CONFIG[modal.entityKey]}
          record={modal.record}
          onSave={handleModalSave}
          onClose={() => setModal(null)}
        />
      )}
      {confirm && (
        <ConfirmDialog message={confirm.message} onConfirm={confirm.onConfirm} onCancel={() => setConfirm(null)} />
      )}
    </div>
  );
}
