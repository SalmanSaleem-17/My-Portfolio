'use client'

import { memo, useState, useRef, useEffect } from 'react';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const inputBase =
  'w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/60 ' +
  'px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 ' +
  'focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition';

const ContactForm = memo(() => {
  const [status, setStatus]     = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Timestamp of when the form became interactive — used server-side to reject
  // near-instant (bot) submissions. Set after mount so it's never in the SSR HTML.
  const loadedAt = useRef<number | null>(null);
  useEffect(() => { loadedAt.current = Date.now(); }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    // Real users take seconds to fill the form; direct-POST bots send nothing here.
    const elapsedMs = loadedAt.current ? Date.now() - loadedAt.current : 9999;

    setStatus('submitting');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, elapsedMs }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || 'Something went wrong. Please try again.');
      setStatus('success');
      form.reset();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  return (
    <div
      className="backdrop-blur-sm p-4 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-white/40 dark:border-slate-700/40"
      style={{ background: 'var(--card-bg)' }}
    >
      {/* Heading */}
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <div className="p-2 sm:p-3 bg-linear-to-r from-purple-500 to-violet-500 rounded-xl sm:rounded-2xl shadow-lg">
          <Send className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
            Send Me a Message
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            I usually reply within 24 hours.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Honeypot — hidden from users, bots tend to fill it */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="cf-name" className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
              Name <span className="text-purple-500">*</span>
            </label>
            <input id="cf-name" name="name" type="text" required maxLength={100}
              placeholder="Your name" className={inputBase} disabled={status === 'submitting'} />
          </div>
          <div>
            <label htmlFor="cf-email" className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
              Email <span className="text-purple-500">*</span>
            </label>
            <input id="cf-email" name="email" type="email" required
              placeholder="you@example.com" className={inputBase} disabled={status === 'submitting'} />
          </div>
        </div>

        <div>
          <label htmlFor="cf-subject" className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
            Subject
          </label>
          <input id="cf-subject" name="subject" type="text" maxLength={150}
            placeholder="What's this about?" className={inputBase} disabled={status === 'submitting'} />
        </div>

        <div>
          <label htmlFor="cf-message" className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
            Message <span className="text-purple-500">*</span>
          </label>
          <textarea id="cf-message" name="message" required rows={5} minLength={10} maxLength={5000}
            placeholder="Tell me about your project or idea…"
            className={`${inputBase} resize-y min-h-30`} disabled={status === 'submitting'} />
        </div>

        {/* Status messages */}
        {status === 'success' && (
          <div className="flex items-center gap-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            Thanks! Your message has been sent — I&apos;ll get back to you soon.
          </div>
        )}
        {status === 'error' && (
          <div className="flex items-center gap-2.5 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/40 px-4 py-3 text-sm text-red-700 dark:text-red-300">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {errorMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl
            text-white font-bold text-sm bg-linear-to-r from-purple-600 to-violet-600 hover:opacity-95
            transition-all hover:scale-[1.02] shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              <Send className="w-4 h-4" /> Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
});

ContactForm.displayName = 'ContactForm';
export default ContactForm;
